import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '@features/auth/pages/auth.page';
import HomePage from '@features/home/pages/home.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);
