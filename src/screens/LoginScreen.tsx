import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import KeyboardAvoidingLayout from '@/shared/ui/KeyboardAvoidingLayout';
import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { useLogin } from '@/features/auth/model/useLogin';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { LoginRequest, LoginResponse } from '@/features/auth/types/login';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import usePermissions from '@/shared/lib/hooks/usePermissions';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import FormInput from '@/shared/ui/FormInput';
import SubmitButton from '@/shared/ui/SubmitButton';

interface IForm {
  phoneNumber: string;
  serialCode: string;
}

const LoginScreen = () => {
  const navigation = useAuthStackNavigation();
  const loginMutation = useLogin();
  const {
    handleLogin,
    setAccessToken,
    setRefreshToken,
    fcmToken,
    setFcmToken,
    setSerialCode,
    setPhoneNumber,
  } = useAuthStore();

  usePermissions();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: 'onChange' });

  const openSettings = useCallback(() => {
    Alert.alert(
      '권한 허용',
      '정상적인 앱 사용을 위해 알림 권한을 허용해주세요.',
      [
        {
          text: '확인',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
    );
  }, []);

  const onValid = useCallback(
    ({ phoneNumber, serialCode }: IForm) => {
      const tempFcmToken = fcmToken || 'temp_token_' + Date.now().toString();

      const loginData: LoginRequest = {
        phoneNumber,
        serialCode,
        fcmToken: tempFcmToken,
      };

      const onHide = (response: LoginResponse) => {
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setFcmToken(tempFcmToken);
        setPhoneNumber(phoneNumber);
        setSerialCode(serialCode);
        handleLogin();
      };

      loginMutation.mutate(loginData, {
        onSuccess: result => {
          return showSuccessToast({
            text: '로그인 성공!',
            onHide: () => onHide(result),
          });
        },
        onError: _ => {
          return showErrorToast({ text: '로그인 실패' });
        },
      });
    },
    [
      fcmToken,
      handleLogin,
      loginMutation,
      setAccessToken,
      setFcmToken,
      setRefreshToken,
      setSerialCode,
      setPhoneNumber,
    ],
  );

  const navigateToSignup = useCallback(() => {
    navigation.navigate('SignUpScreen');
  }, [navigation]);

  return (
    <ScreenLayout isLogin>
      <KeyboardAvoidingLayout>
        <View style={styles.subContainer}>
          <View style={styles.formContainer}>
            <FormInput
              control={control}
              name="phoneNumber"
              label="보호자 핸드폰번호"
              labelColor={'#000'}
              placeholder="- 빼고 입력"
              rules={{
                required: true,
                pattern: {
                  value: REGEX.PHONE_NUMBER,
                  message: FORM_ERROR_MESSAGE.PHONE_NUMBER,
                },
              }}
              maxLength={11}
            />
            <FormInput
              control={control}
              name="serialCode"
              label="기기 일련번호"
              labelColor={'#000'}
              placeholder="6자리 숫자 입력"
              rules={{
                required: true,
                pattern: {
                  value: REGEX.SERIALCODE,
                  message: FORM_ERROR_MESSAGE.SERIALCODE,
                },
              }}
              maxLength={6}
            />
            <TouchableOpacity onPress={navigateToSignup}>
              <Text style={styles.signupButton}>{'회원가입'}</Text>
            </TouchableOpacity>
          </View>
          <SubmitButton
            title="로그인"
            onPress={handleSubmit(onValid)}
            disabled={!isValid}
          />
        </View>
      </KeyboardAvoidingLayout>
    </ScreenLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    paddingHorizontal: 18,
    marginTop: 40,
    gap: 16,
  },
  signupButton: {
    color: '#000',
    fontWeight: '600',
    textAlign: 'right',
  },
});
