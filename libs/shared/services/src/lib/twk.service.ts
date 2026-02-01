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

  getUserMobileNumber(): Promise<any> {
    return Promise.resolve(this.TWK.getUserMobileNumber());
  }

  getUserFullName(): Promise<any> {
    return Promise.resolve(this.TWKV2.getUserFullName());
  }

  getDeviceInfo(): Promise<any> {
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
