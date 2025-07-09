import { apiClient } from '../../shared/api/apiClient';

interface SignupData {
  username: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}

export const login = (loginData: LoginData) => {
  return apiClient.post('/auth/login', loginData, {}, 'Failed to login');
};

export const signup = async (signupData: SignupData) => {
  return apiClient.post('/auth/create', signupData, {}, 'Failed to create account');
};
