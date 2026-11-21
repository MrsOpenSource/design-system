import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';

// Form component under test
import { Form, FormItem, useForm } from '../../src/components/forms/Form.ts';
import { Input } from '../../src/components/atoms/Input.ts';

// -----------------------------------------------------------------------------
// 1. Instantiation & Compound Attachments
// -----------------------------------------------------------------------------
test('Form — Compound Slots Attachment', () => {
  assert.equal(typeof Form, 'function', 'Form must be a component function');
  assert.equal(typeof Form.Item, 'function', 'Form.Item must be attached to Form');
  assert.equal(typeof Form.useForm, 'function', 'Form.useForm must be attached to Form');
  assert.equal(Form.Item, FormItem, 'Form.Item must reference FormItem');
  assert.equal(Form.useForm, useForm, 'Form.useForm must reference useForm');
});

test('Form — Default Rendering & Layout Classes', () => {
  const defaultEl = Form({ children: 'Form Content' });
  assert.ok(defaultEl, 'Default Form element renders');
  assert.equal(defaultEl.type, 'form');
  assert.ok(defaultEl.props.className.includes('eds-form'));
  assert.ok(defaultEl.props.className.includes('eds-form--vertical'));

  const horizontalEl = Form({ layout: 'horizontal', children: 'Form Content' });
  assert.ok(horizontalEl.props.className.includes('eds-form--horizontal'));

  const inlineEl = Form({ layout: 'inline', children: 'Form Content' });
  assert.ok(inlineEl.props.className.includes('eds-form--inline'));
});

// -----------------------------------------------------------------------------
// 2. Form Instance & Controlled State Management
// -----------------------------------------------------------------------------
test('Form — useForm instance management & initialValues', () => {
  const [form] = useForm({ username: 'alice', age: 28 });

  assert.equal(form.getFieldValue('username'), 'alice');
  assert.equal(form.getFieldValue('age'), 28);
  assert.deepEqual(form.getFieldsValue(), { username: 'alice', age: 28 });

  form.setFieldValue('username', 'bob');
  assert.equal(form.getFieldValue('username'), 'bob');

  form.setFieldsValue({ age: 30, city: 'London' });
  assert.equal(form.getFieldValue('age'), 30);
  assert.equal(form.getFieldValue('city'), 'London');
});

// -----------------------------------------------------------------------------
// 3. Form.Item — Labels & Required Asterisk
// -----------------------------------------------------------------------------
test('Form.Item — Label rendering and required asterisk indicator', () => {
  const itemEl = Form.Item({
    name: 'email',
    label: 'Email Address',
    required: true,
    children: React.createElement(Input, { placeholder: 'Enter email' }),
  });

  assert.ok(itemEl, 'Form.Item element renders');
  assert.ok(itemEl.props.className.includes('eds-form-item'));

  // Children should contain label with required asterisk
  const labelEl = itemEl.props.children[0];
  assert.ok(labelEl, 'Label element must exist');
  assert.equal(labelEl.type, 'label');
  assert.ok(labelEl.props.className.includes('eds-form-item__label'));
  assert.ok(labelEl.props.className.includes('eds-form-item__label--required'));
});

// -----------------------------------------------------------------------------
// 4. Form Validation & Rules Processing
// -----------------------------------------------------------------------------
test('Form — Validation Rules: required, min, max, pattern', async () => {
  const [form] = useForm();
  form.registerField('username', [
    { required: true, message: 'Username is required' },
    { min: 4, message: 'Must be at least 4 characters' },
    { max: 10, message: 'Must be at most 10 characters' },
    { pattern: /^[a-z]+$/, message: 'Only lowercase letters permitted' },
  ]);

  // Test 1: Empty field -> triggers required
  form.setFieldValue('username', '');
  const res1 = await form.validateFields();
  assert.equal(res1.valid, false);
  assert.deepEqual(form.getFieldError('username'), ['Username is required']);

  // Test 2: Too short -> triggers min
  form.setFieldValue('username', 'abc');
  const res2 = await form.validateFields();
  assert.equal(res2.valid, false);
  assert.deepEqual(form.getFieldError('username'), ['Must be at least 4 characters']);

  // Test 3: Pattern mismatch
  form.setFieldValue('username', 'abc12');
  const res3 = await form.validateFields();
  assert.equal(res3.valid, false);
  assert.deepEqual(form.getFieldError('username'), ['Only lowercase letters permitted']);

  // Test 4: Too long
  form.setFieldValue('username', 'abcdefghijk');
  const res4 = await form.validateFields();
  assert.equal(res4.valid, false);
  assert.deepEqual(form.getFieldError('username'), ['Must be at most 10 characters']);

  // Test 5: Perfectly valid
  form.setFieldValue('username', 'perfect');
  const res5 = await form.validateFields();
  assert.equal(res5.valid, true);
  assert.deepEqual(form.getFieldError('username'), []);
});

test('Form — Custom asynchronous & synchronous validator rule', async () => {
  const [form] = useForm();
  form.registerField('domain', [
    {
      validator: async (_rule, val) => {
        if (val === 'blocked.com') {
          return 'This domain is restricted';
        }
        return true;
      },
    },
  ]);

  form.setFieldValue('domain', 'blocked.com');
  const resFail = await form.validateFields();
  assert.equal(resFail.valid, false);
  assert.deepEqual(form.getFieldError('domain'), ['This domain is restricted']);

  form.setFieldValue('domain', 'allowed.com');
  const resPass = await form.validateFields();
  assert.equal(resPass.valid, true);
  assert.deepEqual(form.getFieldError('domain'), []);
});

// -----------------------------------------------------------------------------
// 5. Submission & Reset Lifecycle
// -----------------------------------------------------------------------------
test('Form — onFinish and onFinishFailed lifecycle hooks', async () => {
  let finishedValues = null;
  let failedInfo = null;

  const [form] = useForm({ age: 15 });
  form.registerField('age', [
    {
      validator: (_rule, val) => (val >= 18 ? true : 'Must be 18+ to register'),
    },
  ]);

  // Submit with invalid value
  await form.submit({
    onFinish: (vals) => { finishedValues = vals; },
    onFinishFailed: (info) => { failedInfo = info; },
  });
  assert.equal(finishedValues, null, 'onFinish should not be called on validation error');
  assert.ok(failedInfo, 'onFinishFailed should be invoked');
  assert.deepEqual(failedInfo.errors.age, ['Must be 18+ to register']);

  // Update value and submit again
  form.setFieldValue('age', 25);
  failedInfo = null;
  await form.submit({
    onFinish: (vals) => { finishedValues = vals; },
    onFinishFailed: (info) => { failedInfo = info; },
  });
  assert.ok(finishedValues, 'onFinish should be invoked on valid form');
  assert.equal(finishedValues.age, 25);
  assert.equal(failedInfo, null);
});

test('Form — resetFields restores initial values and clears errors', async () => {
  const [form] = useForm({ score: 100 });
  form.registerField('score', [{ min: 50, message: 'Too low' }]);

  form.setFieldValue('score', 10);
  await form.validateFields();
  assert.deepEqual(form.getFieldError('score'), ['Too low']);

  form.resetFields();
  assert.equal(form.getFieldValue('score'), 100, 'Should reset to initial score');
  assert.deepEqual(form.getFieldError('score'), [], 'Errors should be cleared');
});
