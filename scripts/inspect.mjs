import fs from 'fs';

const content = fs.readFileSync('skills/enterprise-design-system/SKILL.md', 'utf8');
const s3Idx = content.indexOf('## 3. CLI Agent Tools & Commands');
console.log(content.substring(s3Idx, s3Idx + 2000));
