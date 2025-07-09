import axiosInstance from './axiosInstance';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export const apiClient = {
  get: async <T>(url: string, config: AxiosRequestConfig = {}, errorMessage?: string): Promise<AxiosResponse<T>> => {
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response;
    } catch (error) {
      handleApiError(error, errorMessage);
    }
  },

  post: async <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}, errorMessage?: string): Promise<AxiosResponse<T>> => {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return response;
    } catch (error) {
      handleApiError(error, errorMessage);
    }
  },

  put: async <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}, errorMessage?: string): Promise<AxiosResponse<T>> => {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return response;
    } catch (error) {
      handleApiError(error, errorMessage);
    }
  },

  patch: async <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}, errorMessage?: string): Promise<AxiosResponse<T>> => {
    try {
      const response = await axiosInstance.patch<T>(url, data, config);
      return response;
    } catch (error) {
      handleApiError(error, errorMessage);
    }
  },

  delete: async <T>(url: string, config: AxiosRequestConfig = {}, errorMessage?: string): Promise<AxiosResponse<T>> => {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return response;
    } catch (error) {
      handleApiError(error, errorMessage);
    }
  },
};

function handleApiError(error: unknown, fallbackMessage?: string): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    const message =
      data?.message ||
      fallbackMessage ||
      error.message ||
      'An unexpected error occurred.';

    // Include more error details
    throw {
      message,
      status,
      data,
      isAxiosError: true,
      raw: error,
    };
  } else {
    throw {
      message: fallbackMessage || 'An unexpected error occurred.',
      raw: error,
    };
  }
}

