import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

const MOCK_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYXRpb25hbElkIjoiMTAwMDAwMTIxMiIsImV4cCI6MTczODQxMDUzMywiaXNzIjoiVGF3YWtrYWxuYSIsImF1ZCI6Ik1pbmlTZXJ2aWNlMSJ9.AIN4Y6YtTBJLZLKcjtzMDlqSB42n0gP7YwMaqwnIxSudSKg0EChZLp4MElVl2LAkSq96YuSQsPZebmhhIuPsq7GybnhgVHsRi1BnWKG5ZTbZAbUxTX0-iMBjUHmbEWOlQYyn5Kxh9bfORY1yc8G6StPRV0P34xBrjEIKZFCUsEKsKUM02Y1eeByrCiCxlCHf9OBncqzkdpx-mYuNmLSNgCjNQ5AXzGP4ywwytg9cdCS4POlTJ4H6AqjVXCG5ZkAgs68XR_Q_-Wfp4o3K7DXUR9IjpkFA5TNI-F09m7Or_n0q-swSqR1FxOvDLVsBXWaqP0Rr9IV7S7f8gvS3KmYcxw';

export function applyAuthInterceptor(instance: AxiosInstance): void {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      return Promise.reject(error);
    },
  );
}

export function createAuthenticatedClient(baseURL: string): AxiosInstance {
  const instance = axios.create({ baseURL });
  applyAuthInterceptor(instance);
  return instance;
}

export { MOCK_TOKEN };
