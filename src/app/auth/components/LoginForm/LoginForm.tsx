import React, { type FormEventHandler } from 'react';

import Button from '../../../../shared/components/Button/Button';
import InputField from '../../../../shared/components/InputField/InputField';
import Typography from '../../../../shared/components/Typography/Typography';

import styles from './LoginForm.module.css';

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean;
  errorMessage?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}) => {
  return (
  <div className={styles.centerWrapper}>
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Typography variant="heading">Log In</Typography>

      {errorMessage && <Typography variant="helper">{errorMessage}</Typography>}

      <InputField
        label="Email"
        value={email}
        onChange={onEmailChange}
        required
      />

      <InputField
        label="Password"
        isPassword
        value={password}
        onChange={onPasswordChange}
        required
      />

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </Button>

      <div className={styles.footer}>
        <Typography variant="helper">
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </div>
    </form>
  </div>
);

};

export default LoginForm;
