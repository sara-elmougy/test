export interface TWKConfig {
  twkEnabled: boolean;
  windowRef?: Window;
}

export class TWKService {
  private win: any;

  constructor(private config: TWKConfig) {
    this.win = config.windowRef ?? window;
  }

  private get TWK(): any {
    if (this.config.twkEnabled) return this.win.TWK;
    return this.win.MOCK_TWK;
  }

  private get TWKV2(): any {
    if (this.config.twkEnabled) return this.win.TWK?.V2;
    return this.win.MOCK_TWK?.V2;
  }

  generateToken(): Promise<{ success: boolean; result: { token: string } }> {
    return Promise.resolve(this.TWK.generateToken());
  }

  getUserId(): Promise<{ success: boolean; result: { user_id: number } }> {
    return Promise.resolve(this.TWK.getUserId());
  }

  getUserNationality(): Promise<{ success: boolean; result: { nationality_code: number; nationality_name_ar: string; nationality_name_en: string } }> {
    return Promise.resolve(this.TWKV2.getUserNationality());
  }

  getUserGender(): Promise<{ success: boolean; result: { gender: number } }> {
    return Promise.resolve(this.TWK.getUserGender());
  }

  getUserBirthDate(): Promise<{ success: boolean; result: { birth_date: string } }> {
    return Promise.resolve(this.TWK.getUserBirthDate());
  }

  getUserFullName(): Promise<{ success: boolean; result: { full_name_ar: string; full_name_en: string } }> {
    return Promise.resolve(this.TWKV2.getUserFullName());
  }

  getUserMobileNumber(): Promise<{ success: boolean; result: { mobile_number: string } }> {
    return Promise.resolve(this.TWK.getUserMobileNumber());
  }

  getDeviceInfo(): Promise<{ success: boolean; result: { app_language: string; appearance: number } }> {
    return Promise.resolve(this.TWK.getDeviceInfo());
  }

  apiLog(requestData?: any, responseData?: any): void {
    if (this.config.twkEnabled && this.TWK?.apiLog) {
      try {
        this.TWK.apiLog(requestData, responseData);
      } catch (error) {
        console.warn('TWK.apiLog failed:', error);
      }
    }
  }

  generalLog(eventData: any): void {
    if (this.config.twkEnabled && this.TWK?.generalLog) {
      try {
        this.TWK.generalLog(eventData);
      } catch (error) {
        console.warn('TWK.generalLog failed:', error);
      }
    }
  }
}
