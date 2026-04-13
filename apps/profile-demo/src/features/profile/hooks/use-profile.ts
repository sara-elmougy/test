import { useState, useEffect } from 'react';
import { TWKService } from '@tawakalna/services';
import { environment } from '@tawakalna/environments';

export interface ProfileData {
  fullNameAr: string;
  fullNameEn: string;
  nationalId: string;
  mobileNumber: string;
  birthDate: string;
}

interface UseProfileResult {
  profile: ProfileData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useProfile(): UseProfileResult {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const twkService = new TWKService({ twkEnabled: environment.twkEnabled });

        const [userIdRes, fullNameRes, mobileRes, birthDateRes] = await Promise.all([
          twkService.getUserId(),
          twkService.getUserFullName(),
          twkService.getUserMobileNumber(),
          twkService.getUserBirthDate(),
        ]);

        if (!userIdRes.success || !fullNameRes.success || !mobileRes.success || !birthDateRes.success) {
          throw new Error('Failed to fetch profile data');
        }

        setProfile({
          fullNameAr: fullNameRes.result.full_name_ar,
          fullNameEn: fullNameRes.result.full_name_en,
          nationalId: String(userIdRes.result.user_id),
          mobileNumber: mobileRes.result.mobile_number,
          birthDate: birthDateRes.result.birth_date,
        });
      } catch (err) {
        console.log(err);
        
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, isLoading, error };
}
