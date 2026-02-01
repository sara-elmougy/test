import { useEffect, useState } from 'react';
import { TWKService } from '@tawakalna/services';

function App() {
  const twkService = new TWKService({
    twkEnabled: import.meta.env.VITE_TWK_ENABLED === 'true',
  });

  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [deviceInfo, setDeviceInfo] = useState<any>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const mobileRes = await twkService.getUserMobileNumber();
        setMobile(mobileRes?.result?.mobile_number);

        const nameRes = await twkService.getUserFullName();
        setName(nameRes?.result?.full_name);

        const deviceRes = await twkService.getDeviceInfo();
        setDeviceInfo({ app_language: deviceRes?.result?.app_language });
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [deviceInfo == null]);

  return (
    <div>
      <h2>TWK Integration Example</h2>
      <p>Mobile: {mobile}</p>
      <p>Name: {name}</p>
      <p>Language: {deviceInfo?.app_language}</p>
    </div>
  );
}

export default App;
