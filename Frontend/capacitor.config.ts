import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'test1',
    webDir: 'build',
    server: {
        androidScheme: 'https',
    },
    plugins: {
        CapacitorCookies: { enabled: true },
    },
};

export default config;
