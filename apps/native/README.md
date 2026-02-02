# 📱 Life Mobile App

A feature-rich React Native application for personal life management — track your schedule, monitor expenses, and stay organized with a beautiful, intuitive interface.

[![React Native](https://img.shields.io/badge/React_Native-0.83+-61DAFB?logo=react)](https://reactnative.dev/)
[![iOS](https://img.shields.io/badge/iOS-13+-000000?logo=apple)](https://developer.apple.com/ios/)
[![Android](https://img.shields.io/badge/Android-6.0+-3DDC84?logo=android)](https://developer.android.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?logo=typescript)](https://www.typescriptlang.org/)

---

## ✨ Features

### 📅 Calendar Management
- **Device Calendar Sync** - Two-way synchronization with native calendars
- **Event Creation** - Add events with location, reminders, and notes
- **Multiple Calendar Support** - Work, personal, and shared calendars
- **Smart Scheduling** - Conflict detection and suggestions

### 💰 Transaction Tracking
- **Quick Entry** - Add expenses in seconds with templates
- **Smart Categories** - AI-powered category suggestions
- **Receipt Capture** - Photo upload with OCR
- **Location Tagging** - Auto-tag based on GPS
- **Budget Insights** - Visual spending analytics
- **Export Data** - CSV/PDF reports

### 🔐 Authentication
- **Email/Password** - Traditional authentication
- **Google Sign-In** - One-tap Google authentication
- **Apple Sign-In** - Native iOS authentication
- **Biometric Auth** - Face ID / Touch ID / Fingerprint
- **Secure Storage** - Keychain/Keystore token storage

### 🔔 Notifications
- **Push Notifications** - Firebase Cloud Messaging
- **Smart Reminders** - Context-aware alerts
- **Quiet Hours** - Respect Do Not Disturb

### 🎨 UI/UX
- **Dark Mode** - Automatic system theme detection
- **Responsive Design** - Optimized for phones and tablets
- **Smooth Animations** - 60fps Reanimated transitions
- **Offline Support** - Works without internet
- **Accessibility** - Screen reader and large text support

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Screens   │  │  Components │  │   Navigation        │ │
│  │  (React)    │  │   (UI Kit)  │  │ (React Navigation)  │ │
│  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘ │
└─────────┼────────────────┼──────────────────────────────────┘
          │                │
          ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                     STATE LAYER (Zustand)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  AuthStore  │  │  TxnStore   │  │   CalendarStore     │ │
│  │  (User)     │  │ (Expenses)  │  │   (Events)          │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
└─────────┼────────────────┼────────────────────┼────────────┘
          │                │                    │
          └────────────────┼────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                     DATA LAYER                               │
├──────────────────────────┼──────────────────────────────────┤
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    API CLIENT                          │  │
│  │         (Firebase SDK + Supabase Client)               │  │
│  └───────────────────────────┬───────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   🔥 Firebase   │  │   🐘 Supabase   │  │  💾 Local Store │
│                 │  │                 │  │                 │
│ • Authentication│  │ • PostgreSQL    │  │ • AsyncStorage  │
│ • Firestore     │  │ • Realtime      │  │ • Secure Store  │
│ • FCM           │  │ • Storage       │  │ • SQLite        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 20.0.0 | Use [nvm](https://github.com/nvm-sh/nvm) to manage |
| Watchman | Latest | For file watching |
| Xcode | >= 15.0 | macOS only, for iOS |
| Android Studio | Latest | SDK 33+ required |
| CocoaPods | >= 1.12 | `sudo gem install cocoapods` |
| JDK | 17 | For Android builds |

### 1. Installation

```bash
# Navigate to native app
cd apps/native

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..
```

### 2. Environment Configuration

Copy the environment template and configure:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```bash
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Sign-In
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id.apps.googleusercontent.com
GOOGLE_IOS_CLIENT_ID=your_google_ios_client_id.apps.googleusercontent.com

# App Configuration
APP_NAME=Life
APP_VERSION=1.0.0
API_URL=https://api.life-app.example.com
```

---

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the wizard
3. Enable Google Analytics (optional)

### 2. Register Apps

#### iOS App

1. In Firebase Console, click "Add app" → iOS
2. Enter Bundle ID (e.g., `com.yourcompany.life`)
3. Download `GoogleService-Info.plist`
4. Place in `ios/Life/GoogleService-Info.plist`

#### Android App

1. In Firebase Console, click "Add app" → Android
2. Enter Package Name (e.g., `com.yourcompany.life`)
3. Download `google-services.json`
4. Place in `android/app/google-services.json`

### 3. Enable Services

| Service | How to Enable |
|---------|---------------|
| **Authentication** | Build → Authentication → Get Started → Enable Email/Password, Google, Apple |
| **Firestore** | Build → Firestore Database → Create Database → Start in test mode |
| **Cloud Messaging** | Build → Cloud Messaging → Click "Enable" |
| **Analytics** | Already enabled with Google Analytics |

### 4. Configure Auth Providers

#### Google Sign-In

1. Go to Authentication → Sign-in method
2. Enable "Google"
3. Add support email
4. Save

#### Apple Sign-In (iOS only)

1. Go to Authentication → Sign-in method
2. Enable "Apple"
3. Configure Apple Developer settings
4. Save

---

## 🐘 Supabase Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.io/)
2. Click "New Project"
3. Enter project name and database password
4. Choose region closest to your users

### 2. Get Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`

### 3. Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  receipt_url TEXT,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to see only their transactions
CREATE POLICY "Users can only access their own transactions"
  ON transactions
  FOR ALL
  USING (auth.uid() = user_id);

-- Create calendar events table
CREATE TABLE calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title VARCHAR(255) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  location VARCHAR(255),
  is_all_day BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on calendar events
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Create policy for calendar events
CREATE POLICY "Users can only access their own calendar events"
  ON calendar_events
  FOR ALL
  USING (auth.uid() = user_id);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for transactions
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 4. Storage Setup (Receipts)

1. Go to Storage → New Bucket
2. Create bucket named: `receipts`
3. Set to Private
4. Add RLS policy:

```sql
-- Allow users to upload their own receipts
CREATE POLICY "Users can upload their own receipts"
  ON storage.objects
  FOR INSERT
  WITH CHECK (auth.uid() = owner);

-- Allow users to view their own receipts
CREATE POLICY "Users can view their own receipts"
  ON storage.objects
  FOR SELECT
  USING (auth.uid() = owner);
```

---

## 🔐 Biometric Authentication Setup

### iOS (Face ID / Touch ID)

#### 1. Add Permissions to Info.plist

Add to `ios/Life/Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>This app uses Face ID to secure your data</string>
```

#### 2. Enable Capabilities

In Xcode:
1. Select project → Target → Signing & Capabilities
2. Click "+ Capability"
3. Add "Keychain Sharing"

### Android (Fingerprint / Face Unlock)

#### 1. Add Permissions

Add to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

#### 2. Configure Biometric Prompt

The `react-native-biometrics` library handles the native setup automatically.

### Usage in Code

```typescript
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

// Check available biometry
const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable();

if (available) {
  console.log('Biometry type:', biometryType); // 'FaceID', 'TouchID', 'Biometrics'
}

// Prompt for biometric authentication
const { success } = await ReactNativeBiometrics.simplePrompt({
  promptMessage: 'Confirm your identity',
  cancelButtonText: 'Cancel',
});

if (success) {
  // User authenticated successfully
  console.log('Biometric authentication successful');
}

// Create and store keys for crypto operations
const { publicKey } = await ReactNativeBiometrics.createKeys();

// Sign data with biometric authentication
const { success, signature } = await ReactNativeBiometrics.createSignature({
  promptMessage: 'Sign in',
  payload: 'your-payload-data',
});
```

### Storing Credentials Securely

```typescript
import { useSecureStorage } from './shared/hooks/useSecureStorage';

// Store sensitive data
const [token, setToken, removeToken] = useSecureStorage('authToken');

// Save token
await setToken('your-jwt-token');

// Retrieve token
const currentToken = await token;

// Remove token
await removeToken();
```

---

## 📱 Build Commands

### Development

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on specific iOS device
npm run ios -- --simulator="iPhone 15 Pro"

# Run on Android emulator
npm run android

# Run on specific Android variant
npm run android -- --variant=debug
```

### Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- Transactions.test.tsx

# Watch mode
npm test -- --watch

# Update snapshots
npm test -- --updateSnapshot
```

### Code Quality

```bash
# Lint code
cd ../.. && npm run lint:biome -- apps/native

# Check types
npm run check

# Format code
npm run format
```

### Production Builds

#### iOS

```bash
# Archive for App Store
cd ios
xcodebuild archive \
  -workspace Life.xcworkspace \
  -scheme Life \
  -configuration Release \
  -archivePath build/Life.xcarchive

# Export IPA
xcodebuild -exportArchive \
  -archivePath build/Life.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/ipa
```

#### Android

```bash
# Build release APK
cd android
./gradlew assembleRelease

# Output: android/app/build/outputs/apk/release/app-release.apk

# Build release AAB (for Play Store)
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 📂 Project Structure

```
apps/native/
├── 📱 ios/                     # iOS native project
│   ├── Life/                  # iOS app source
│   ├── Life.xcworkspace       # Xcode workspace
│   └── Podfile                # CocoaPods dependencies
│
├── 🤖 android/                 # Android native project
│   ├── app/                   # Android app module
│   ├── gradle/                # Gradle wrapper
│   └── build.gradle           # Build configuration
│
├── 🎨 src/
│   ├── features/              # Feature-based modules
│   │   ├── auth/             # Authentication feature
│   │   │   ├── api/          # Firebase auth API
│   │   │   ├── screens/      # Login, Register, BiometricSetup
│   │   │   ├── stores/       # Zustand auth store
│   │   │   └── index.ts      # Public exports
│   │   ├── calendar/         # Calendar integration
│   │   ├── transactions/     # Expense tracking
│   │   └── dashboard/        # Home dashboard
│   │
│   ├── navigation/           # Navigation setup
│   │   ├── AppNavigator.tsx  # Root navigator
│   │   ├── AuthNavigator.tsx # Auth flow
│   │   └── MainNavigator.tsx # Main app tabs
│   │
│   └── shared/               # Shared resources
│       ├── components/       # Reusable UI components
│       ├── hooks/            # Custom React hooks
│       ├── types/            # TypeScript types
│       └── utils/            # Utility functions
│
├── 📋 __tests__/             # Test files
├── 📦 package.json           # Dependencies
├── ⚙️  tsconfig.json         # TypeScript config
└── 🔧 babel.config.js        # Babel configuration
```

---

## 🎨 Customization

### Theming

```typescript
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    secondary: '#03DAC6',
  },
};
```

### Adding New Features

1. Create feature folder: `src/features/newFeature/`
2. Add subdirectories: `api/`, `screens/`, `stores/`
3. Create barrel export: `index.ts`
4. Add navigation entry
5. Update root exports

---

## 🐛 Troubleshooting

### Common Issues

#### iOS Build Fails

```bash
# Clean build
cd ios && rm -rf build Pods Podfile.lock
cd .. && npx pod-install

# Reset Metro cache
npm start -- --reset-cache
```

#### Android Build Fails

```bash
# Clean build
cd android && ./gradlew clean
cd .. && npm run android

# Clear Gradle cache
./gradlew cleanBuildCache
```

#### Metro Bundler Issues

```bash
# Reset cache
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all

# Remove node_modules
rm -rf node_modules && npm install
```

#### Firebase Auth Not Working

- Verify `GoogleService-Info.plist` / `google-services.json` are correct
- Check bundle ID/package name matches Firebase
- Enable auth providers in Firebase Console

---

## 📚 Additional Documentation

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Firebase React Native](https://rnfirebase.io/)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

---

## 🤝 Contributing

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for development guidelines.

---

## 📝 License

[MIT](../../LICENSE) © 2024 Life App Team
