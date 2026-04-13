import axios from 'axios';
import { applyAuthInterceptor } from '@tawakalna/interceptors';

const apiClient = axios.create({
  baseURL: import.meta.env['VITE_API_URL'] as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

applyAuthInterceptor(apiClient);

export default apiClient;
