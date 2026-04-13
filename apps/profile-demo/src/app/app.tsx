import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from './app.routes';

const router = createBrowserRouter(routes);

export default function App() {
  useEffect(() => {
    const handleProfileSwitch = (_event: MessageEvent) => {
      window.location.href = '/';
    };

    window.addEventListener('message', handleProfileSwitch);
    return () => {
      window.removeEventListener('message', handleProfileSwitch);
    };
  }, []);

  return <RouterProvider router={router} />;
}
