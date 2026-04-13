import type { RouteObject } from 'react-router-dom';
import AuthPage from '@features/auth/pages/auth.page';
import HomePage from '@features/home/pages/home.page';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
];
