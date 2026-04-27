import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lancarhijaiyah.app',
  appName: 'Lancar Hijaiyah',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#FDE56B',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
};

export default config;