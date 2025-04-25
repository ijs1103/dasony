import { StyleSheet, Text, View } from 'react-native';
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
    <KeyboardAvoidingLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text>{'로고'}</Text>
        </View>
        <View style={styles.bottomSheet}>
          <Text style={styles.label}>로그인</Text>
          <Spacer size={57} />
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="휴대폰번호를 입력해 주세요."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              )}
              name="phoneNumber"
            />
            {errors.phoneNumber?.message && (
              <Text style={styles.errorMessage}>
                {errors.phoneNumber?.message}
              </Text>
            )}
            <Spacer size={22} />
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: REGEX.SERIALCODE,
                  message: FORM_ERROR_MESSAGE.SERIALCODE,
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="일련번호를 입력해 주세요."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  maxLength={6}
                />
              )}
              name="serialCode"
            />
            {errors.serialCode?.message && (
              <Text style={styles.errorMessage}>
                {errors.serialCode?.message}
              </Text>
            )}
            <Spacer size={30} />
            <Button
              onPress={handleSubmit(onValid)}
              disabled={!isValid || !isFcmTokenReady}
              mode="outlined">
              {'로그인'}
            </Button>
            <Spacer size={20} />
            <Button onPress={navigateToSignup} mode="outlined">
              {'회원가입'}
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBBC0C',
    alignItems: 'center',
  },
  logoContainer: {
    height: '40%',
    justifyContent: 'center',
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    height: '60%',
    paddingHorizontal: 39,
    paddingVertical: 59,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 20,
    color: '#19181B',
  },
  formContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    color: '#C7BBAB',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#C0B4B2',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});
