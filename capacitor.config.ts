
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.36199513981940279168b1abb3b8e3ee',
  appName: 'NotaFácil',
  webDir: 'dist',
  server: {
    url: 'https://36199513-9819-4027-9168-b1abb3b8e3ee.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF"
    }
  }
};

export default config;
