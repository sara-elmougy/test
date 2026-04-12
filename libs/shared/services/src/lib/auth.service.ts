import axios from 'axios';
import type { VerifyTawakalnaLoginPayload, VerifyTawakalnaLoginResponse } from '@tawakalna/models';

export async function verifyTawakalnaLogin(
  apiUrl: string,
  payload: VerifyTawakalnaLoginPayload,
): Promise<VerifyTawakalnaLoginResponse> {
  const response = await axios.post<VerifyTawakalnaLoginResponse>(
    `${apiUrl}/userProfilePortal/v1/userProfileAuth/verifyTawakalnaLogin`,
    payload,
  );
  return response.data;
}
