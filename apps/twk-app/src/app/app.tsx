import { useEffect, useState } from 'react';
import { TWKService } from '@tawakalna/services';

function App() {
  const twkService = new TWKService({
    twkEnabled: import.meta.env.VITE_TWK_ENABLED === 'true',
  });

  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // === Get user mobile number ===
        twkService.getUserMobileNumber().then((ret) => {
          setMobile(ret?.result?.mobile_number);
        });

        // === Get user full name ===
        twkService.getUserFullName().then((ret) => {
          setName(ret?.result?.full_name);
        });

        // === Get device info (e.g., language) ===
        twkService.getDeviceInfo().then((ret) => {
          setDeviceInfo({ app_language: ret.result.app_language });
        });
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
