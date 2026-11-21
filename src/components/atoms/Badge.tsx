import React from 'react';
import { Badge as BadgePrimitive, BadgeProps, badgeVariants } from './Badge.ts';

export { badgeVariants, type BadgeProps };

export const Badge: React.FC<BadgeProps> = (props) => {
  return <BadgePrimitive {...props} />;
};

export default Badge;
