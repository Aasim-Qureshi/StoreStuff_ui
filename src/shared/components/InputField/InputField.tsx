// InputField.tsx
import React, { type InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';
import { useToggle } from '../../hooks/useToggle';

type InputProps = {
  label: string;
  isPassword?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputProps> = ({ label, isPassword = false, ...props }) => {
  const [showPassword, { toggle }] = useToggle(false);

  const type = isPassword ? (showPassword ? 'text' : 'password') : props.type ?? 'text';

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWithIcon}>
        <input
          className={styles.inputField}
          type={type}
          {...props}
        />
        {isPassword && (
          <span className={styles.icon} onClick={toggle}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
