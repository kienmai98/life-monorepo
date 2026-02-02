import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import storage from '../../utils/storage';

type BiometricSetupScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'BiometricSetup'>;
  route: {
    params: {
      userId: string;
    };
  };
};

const BiometricSetupScreen: React.FC<BiometricSetupScreenProps> = ({
  navigation: _navigation,
  route,
}) => {
  const theme = useTheme();
  const [biometryType, setBiometryType] = React.useState<string | null>(null);
  const [isAvailable, setIsAvailable] = React.useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    const { available, biometryType } = await ReactNativeBiometrics.isSensorAvailable();
    setIsAvailable(available);

    if (available) {
      switch (biometryType) {
        case BiometryTypes.TouchID:
          setBiometryType('Touch ID');
          break;
        case BiometryTypes.FaceID:
          setBiometryType('Face ID');
          break;
        case BiometryTypes.Biometrics:
          setBiometryType('Biometric Authentication');
          break;
        default:
          setBiometryType('Biometrics');
      }
    }
  };

  const enableBiometric = async () => {
    try {
      const { success } = await ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Confirm your identity',
      });

      if (success) {
        await storage.setBiometricEnabled(true);
        // Navigate to main app - the store will handle the navigation
      }
    } catch (error) {
      console.error('Biometric setup error:', error);
    }
  };

  const skipBiometric = async () => {
    await storage.setBiometricEnabled(false);
    // Navigate to main app - the store will handle the navigation
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <Surface style={styles.iconContainer} elevation={2}>
          <Text style={styles.icon}>{biometryType === 'Face ID' ? '👤' : '👆'}</Text>
        </Surface>

        <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onBackground }]}>
          Enable {biometryType || 'Biometric Authentication'}
        </Text>

        <Text
          variant="bodyLarge"
          style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
        >
          {isAvailable
            ? `Use ${biometryType} for quick and secure access to your Life app. You can always change this in settings later.`
            : 'Biometric authentication is not available on this device. You can still use the app with your password.'}
        </Text>

        {isAvailable && (
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔒</Text>
              <Text variant="bodyMedium">Quick & Secure Login</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text variant="bodyMedium">No need to remember passwords</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🛡️</Text>
              <Text variant="bodyMedium">Protected by your device</Text>
            </View>
          </View>
        )}

        <View style={styles.buttons}>
          {isAvailable && (
            <Button
              mode="contained"
              onPress={enableBiometric}
              style={styles.enableButton}
              contentStyle={styles.buttonContent}
            >
              Enable {biometryType}
            </Button>
          )}

          <Button
            mode={isAvailable ? 'text' : 'contained'}
            onPress={skipBiometric}
            style={styles.skipButton}
          >
            {isAvailable ? 'Maybe Later' : 'Continue'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  features: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
  },
  buttons: {
    width: '100%',
  },
  enableButton: {
    marginBottom: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  skipButton: {
    marginBottom: 12,
  },
});

export default BiometricSetupScreen;
