import React, { type ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', icon, ...props }) => {
  const classNames = [styles.button];
  if (variant === 'secondary') classNames.push(styles.secondaryButton);
  if (icon) classNames.push(styles.iconButton);

  return (
    <button className={classNames.join(' ')} onClick={onClick} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
