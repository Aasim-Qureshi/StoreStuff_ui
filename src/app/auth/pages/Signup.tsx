import React, { useState } from 'react';
import SignupForm from '../components/SignupForm/SignupForm';
import { signup } from '../api';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrorMessage(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage(null);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!name || !email || !password) {
      setErrorMessage('Name, email and password are required');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await signup({ 
        username: name, 
        email, 
        password 
      });
      console.log('Signup successful:', response);
      navigate('/login', { state: { signupSuccess: true } });
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.response) {
        setErrorMessage(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        setErrorMessage('Network error. Please try again.');
      } else {
        setErrorMessage(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SignupForm
      name={name}
      email={email}
      password={password}
      onNameChange={handleNameChange}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    />
  );
};

export default Signup;