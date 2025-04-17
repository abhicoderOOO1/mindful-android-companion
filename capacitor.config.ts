
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.17283e277b1141f2b801419c8f77832e',
  appName: 'mindful-android-companion',
  webDir: 'dist',
  server: {
    url: 'https://17283e27-7b11-41f2-b801-419c8f77832e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  android: {
    backgroundColor: "#141419"
  }
};

export default config;
