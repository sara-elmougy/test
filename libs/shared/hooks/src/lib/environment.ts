export const environment = {
    production: import.meta.env.MODE === 'production',
    twkEnabled: import.meta.env['VITE_TWK_ENABLED'] === 'true',
    apiUrl: import.meta.env['VITE_API_URL'] as string,
};
