import React, { type ReactNode } from 'react';
import styles from './Typography.module.css';

type TypographyVariant = 'heading' | 'subheading' | 'link' | 'helper';

interface TypographyProps {
  variant?: TypographyVariant;
  children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ variant = 'subheading', children }) => {
  let className = '';

  switch (variant) {
    case 'heading':
      className = styles.heading;
      break;
    case 'subheading':
      className = styles.subheading;
      break;
    case 'link':
      className = styles.link;
      break;
    case 'helper':
      className = styles.helperText;
      break;
    default:
      className = '';
  }

  return <p className={className}>{children}</p>;
};

export default Typography;
