import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{t('home.title')}</h1>
      <p className="text-lg text-gray-600">{t('home.welcome')}</p>
    </div>
  );
}
