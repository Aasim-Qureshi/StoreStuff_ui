import React from 'react';
import Button from '../../../../shared/components/Button/Button';
import InputField from '../../../../shared/components/InputField/InputField';
import Typography from '../../../../shared/components/Typography/Typography';

import styles from './SignupForm.module.css';

type SignupFormProps = {
  name: string;
  email: string;
  password: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  isSubmitting?: boolean;
  errorMessage: string | null;
};

const SignupForm: React.FC<SignupFormProps> = ({
  name, // Changed from username
  email,
  password,
  onNameChange, // Changed from onUsernameChange
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}) => {
  return (
    <div className={styles.centerWrapper}>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <Typography variant="heading">Sign Up</Typography>

        {errorMessage && (
          <Typography variant="helper">
            {errorMessage}
          </Typography>
        )}

        <InputField
          label="Name" // Changed from Username
          value={name}
          onChange={onNameChange} // Changed from onUsernameChange
          required
          disabled={isSubmitting}
        />

        {/* Rest of the form remains the same */}
        <InputField
          label="Email"
          value={email}
          onChange={onEmailChange}
          required
          disabled={isSubmitting}
        />

        <InputField
          label="Password"
          isPassword
          value={password}
          onChange={onPasswordChange}
          required
          disabled={isSubmitting}
        />

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </Button>

        <div className={styles.footer}>
          <Typography variant="helper">
            Already have an account? <a href="/">Log in</a>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;