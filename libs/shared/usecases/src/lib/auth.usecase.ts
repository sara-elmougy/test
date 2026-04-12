import { TWKService } from '@tawakalna/services';
import { verifyTawakalnaLogin } from '@tawakalna/services';
import type { VerifyTawakalnaLoginResponse } from '@tawakalna/models';

interface MockLoginOptions {
  twkEnabled: boolean;
  apiUrl: string;
  appId: string;
}

export async function mockLogin(options: MockLoginOptions): Promise<VerifyTawakalnaLoginResponse> {
  const { twkEnabled, apiUrl, appId } = options;
  const twkService = new TWKService({ twkEnabled });

  // Step 1: Gather all TWK data in parallel
  console.log('[AuthUseCase] Login started - gathering TWK data');

  const [tokenRes, nationalityRes, genderRes, birthDateRes, fullNameRes, userIdRes] =
    await Promise.all([
      twkService.generateToken(),
      twkService.getUserNationality(),
      twkService.getUserGender(),
      twkService.getUserBirthDate(),
      twkService.getUserFullName(),
      twkService.getUserId(),
    ]);

  console.log('[AuthUseCase] TWK data gathered', {
    tokenRes, nationalityRes, genderRes, birthDateRes, fullNameRes, userIdRes,
  });

  // Step 2: Validate all responses
  if (
    !tokenRes.success ||
    !nationalityRes.success ||
    !genderRes.success ||
    !birthDateRes.success ||
    !fullNameRes.success ||
    !userIdRes.success
  ) {
    throw new Error('Failed to gather TWK data');
  }

  // Step 3: Build payload
  const [year, month, day] = birthDateRes.result.birth_date.split('-');
  const dateOfBirthG = `${day}/${month}/${year}`;

  const arFullName = fullNameRes.result.full_name_ar ? fullNameRes.result.full_name_ar.split(' ') : [];
  const enFullName = fullNameRes.result.full_name_en ? fullNameRes.result.full_name_en.split(' ') : [];

  const isLangAr = (localStorage.getItem('lang') || 'ar') === 'ar';
  localStorage.setItem('userName', String(isLangAr ? arFullName : enFullName));

  const payload = {
    appId,
    token: tokenRes.result.token,
    nationalId: String(userIdRes.result.user_id),
    tawakalnaPersonDto: {
      nationalityCode: String(nationalityRes.result.nationality_code),
      arFirstName: arFullName[0] || 'جون',
      arSecondName: arFullName[1] || 'دو',
      arThirdName: arFullName[2] || 'سميث',
      arLastName: arFullName[3] || arFullName[arFullName.length - 1] || 'دو',
      enFirstName: enFullName[0] || 'John',
      enSecondName: enFullName[1] || 'Doe',
      enThirdName: enFullName[2] || 'Smith',
      enhLastName: enFullName[3] || enFullName[enFullName.length - 1] || 'Doe',
      gender: String(genderRes.result.gender),
      dateOfBirthG,
    },
  };

  // Step 4: Verify with backend
  console.log('[AuthUseCase] Sending verifyTawakalnaLogin payload', payload);
  return verifyTawakalnaLogin(apiUrl, payload);
}
