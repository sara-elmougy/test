import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@tawakalna/hooks';
import LoadingScreen from '@shared/components/loading-screen/loading-screen';

export default function AuthPage() {
  const { isLoading, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-2">
        <p className="text-red-500">{t('app.error')}</p>
        <p className="text-red-400 text-sm font-mono">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen message={t('auth.loading')} />;
  }

  return null;
}
