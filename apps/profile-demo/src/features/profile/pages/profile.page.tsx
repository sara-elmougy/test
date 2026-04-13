import { useTranslation } from 'react-i18next';
import LoadingScreen from '@shared/components/loading-screen/loading-screen';
import { useProfile } from '../hooks/use-profile';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <LoadingScreen message={t('profile.loading')} />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-center">
          <p className="font-semibold text-red-700">{t('app.error')}</p>
          <p className="mt-1 text-sm text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <section className="mx-auto w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <header className="rounded-t-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold">{t('profile.title')}</h1>
          <p className="mt-1 text-sm text-white/90">{t('profile.subtitle')}</p>
        </header>

        <div className="space-y-4 px-8 py-6">
          <ProfileItem label={t('profile.fullNameAr')} value={profile?.fullNameAr} />
          <ProfileItem label={t('profile.fullNameEn')} value={profile?.fullNameEn} />
          <ProfileItem label={t('profile.nationalId')} value={profile?.nationalId} />
          <ProfileItem label={t('profile.mobileNumber')} value={profile?.mobileNumber} />
          <ProfileItem label={t('profile.birthDate')} value={profile?.birthDate} />
        </div>
      </section>
    </main>
  );
}

interface ProfileItemProps {
  label: string;
  value?: string;
}

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-slate-800">{value || '-'}</p>
    </div>
  );
}
