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
import { Button, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import KeyboardAvoidingLayout from '@/shared/ui/KeyboardAvoidingLayout';
import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { useLogin } from '@/features/auth/model/useLogin';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { useFirebaseMessaging } from '@/shared/lib/hooks/useFirebaseMessaging';
import { LoginRequest, LoginResponse } from '@/features/auth/types/login';
import Spacer from '@/shared/ui/Spacer';
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
    setFcmToken,
    setSerialCode,
  } = useAuthStore();
  const { fcmToken } = useFirebaseMessaging();
  const [isFcmTokenReady, setIsFcmTokenReady] = useState(false);

  // FCM 토큰이 준비되었는지 확인
  useEffect(() => {
    if (fcmToken) {
      setIsFcmTokenReady(true);
    }
  }, [fcmToken]);

  usePermissions();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: 'onChange' });

  const onValid = useCallback(
    ({ phoneNumber, serialCode }: IForm) => {
      if (!fcmToken) {
        return showErrorToast({
          text: 'FCM 토큰이 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.',
        });
      }
      const loginData: LoginRequest = { phoneNumber, serialCode, fcmToken };
      const onHide = (response: LoginResponse) => {
        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setFcmToken(fcmToken);
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
