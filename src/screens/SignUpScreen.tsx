import { StyleSheet, View } from 'react-native';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useForm } from 'react-hook-form';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import SubmitButton from '@/shared/ui/SubmitButton';
import FormInput from '@/shared/ui/FormInput';
import { useSignup } from '@/features/auth/model/useSignup';
import { useCallback } from 'react';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';
import KeyboardAvoidingLayout from '@/shared/ui/KeyboardAvoidingLayout';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { useValidateSerialCode } from '@/features/device/model/useValidateSerialCode';

interface IForm {
  name: string;
  phoneNumber: string;
  serialCode: string;
}

const SignUpScreen = () => {
  const navigation = useAuthStackNavigation();
  const setAccessToken = useAuthStore(state => state.setAccessToken);
  const setSerialCode = useAuthStore(state => state.setSerialCode);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IForm>({ mode: 'onChange' });
  const signupMutation = useSignup();
  const validateCodeMutation = useValidateSerialCode();
  const onValid = useCallback(
    async ({ name, phoneNumber, serialCode }: IForm) => {
      try {
        // validateCodeMutation을 Promise로 래핑하여 결과를 기다립니다
        const isValidCode = await new Promise<boolean>((resolve, reject) => {
          validateCodeMutation.mutate(
            { serialCode },
            {
              onSuccess: result => {
                resolve(!!result);
              },
              onError: () => {
                reject(new Error('일련번호 검증 실패'));
              },
            },
          );
        });

        if (!isValidCode) {
          showErrorToast({ text: '올바르지 않은 번호입니다.' });
          return;
        }

        signupMutation.mutate(
          { name, phoneNumber, serialCode },
          {
            onSuccess: ({ accessToken }) => {
              showSuccessToast({
                text: '보호자 회원가입 성공',
                onHide: () => {
                  setAccessToken(accessToken);
                  setSerialCode(serialCode);
                  navigation.navigate('SeniorSignUpScreen');
                },
              });
            },
            onError: () => {
              showErrorToast({ text: '회원가입에 실패했습니다.' });
            },
          },
        );
      } catch (error) {
        showErrorToast({ text: '올바르지 않은 번호입니다.' });
      }
    },
    [],
  );

  return (
    <ScreenLayout title="회원가입 - 보호자">
      <KeyboardAvoidingLayout>
        <View style={styles.subContainer}>
          <View style={styles.formContainer}>
            <FormInput
              control={control}
              name="name"
              label="성함"
              placeholder="보호자 성함 입력"
              rules={{
                required: true,
                pattern: {
                  value: REGEX.NAME,
                  message: FORM_ERROR_MESSAGE.NAME,
                },
              }}
              maxLength={6}
            />
            <FormInput
              control={control}
              name="phoneNumber"
              label="휴대폰 번호"
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
              label="시리얼 번호"
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
          </View>
          <SubmitButton
            title="저장하기"
            onPress={handleSubmit(onValid)}
            disabled={!isValid}
          />
        </View>
      </KeyboardAvoidingLayout>
    </ScreenLayout>
  );
};

export default SignUpScreen;

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
});
