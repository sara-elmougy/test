// --- Generic TWK wrapper ---
export interface TWKResponse<T> {
  success: boolean;
  result: T;
}

// --- TWK method result types ---
export interface TWKToken {
  token: string;
}

export interface TWKUserId {
  user_id: number;
}

export interface TWKNationality {
  nationality_code: number;
  nationality_name_ar: string;
  nationality_name_en: string;
}

export interface TWKGender {
  gender: number;
}

export interface TWKBirthDate {
  birth_date: string; // "YYYY-MM-DD"
}

export interface TWKFullName {
  full_name_ar: string;
  full_name_en: string;
}

// --- verifyTawakalnaLogin payload (mirrors TSI) ---
export interface TawakalnaPersonDto {
  nationalityCode: string;
  arFirstName: string;
  arSecondName: string;
  arThirdName: string;
  arLastName: string;
  enFirstName: string;
  enSecondName: string;
  enThirdName: string;
  enhLastName: string;
  gender: string;
  dateOfBirthG: string; // "DD/MM/YYYY"
}

export interface VerifyTawakalnaLoginPayload {
  appId: string;
  token: string;
  nationalId: string;
  tawakalnaPersonDto: TawakalnaPersonDto;
}

// --- verifyTawakalnaLogin response (mirrors TSI) ---
export interface AuthResponseDetails {
  token: string;
  refreshToken: string;
}

export interface VerifyTawakalnaLoginResponse {
  isSuccess: boolean;
  responseDetails: AuthResponseDetails;
}
