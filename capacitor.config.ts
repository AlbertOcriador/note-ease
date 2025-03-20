
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.notafacil',
  appName: 'NotaFácil',
  webDir: 'dist',
  server: {
    url: 'https://36199513-9819-4027-9168-b1abb3b8e3ee.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#7c3aed"
    }
  },
  android: {
    buildOptions: {
      keystorePath: 'notafacil.keystore',
      keystoreAlias: 'notafacil',
    }
  }
};

export default config;
