import type { RouteObject } from 'react-router-dom';
import AuthPage from '@features/auth/pages/auth.page';
import ProfilePage from '@features/profile/pages/profile.page';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
];
