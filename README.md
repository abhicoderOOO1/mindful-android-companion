
# Mindful Android Assistant

A privacy-focused AI assistant for Android devices.

## Building the Android APK

To build and run the Android application:

1. Clone this repository to your local machine
2. Install dependencies:
   ```
   npm install
   ```
3. Build the web app:
   ```
   npm run build
   ```
4. Sync the built files with Capacitor:
   ```
   npx cap sync
   ```
5. Open the Android project in Android Studio:
   ```
   npx cap open android
   ```
6. Use Android Studio to build and run the app on an emulator or physical device.

## Live Development

For development with live reloads:

1. Run the dev server:
   ```
   npm run dev
   ```
2. In another terminal window, run:
   ```
   npx cap run android
   ```

This will start the app on your Android device with live reloading from your development environment.
