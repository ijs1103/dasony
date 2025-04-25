import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';
import { useSeniorSignup } from '@/features/auth/model/useSeniorSignup';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import FormInput from '@/shared/ui/FormInput';
import KeyboardAvoidingLayout from '@/shared/ui/KeyboardAvoidingLayout';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import SubmitButton from '@/shared/ui/SubmitButton';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

interface IForm {
  name: string;
  address: string;
}

const SeniorSignUpScreen = () => {
  const navigation = useAuthStackNavigation();
  const serialCode = useAuthStore(state => state.serialCode);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IForm>({ mode: 'onChange' });
  const seniorSignupMutation = useSeniorSignup();
  const onValid = useCallback(({ name, address }: IForm) => {
    seniorSignupMutation.mutate(
      { name, address, serialCode: serialCode! },
      {
        onSuccess: () => {
          showSuccessToast({
            text: '어르신 회원가입 성공',
            onHide: () => {
              navigation.navigate('LoginScreen');
            },
          });
        },
        onError: () => {
          showErrorToast({ text: '회원가입에 실패했습니다.' });
        },
      },
    );
  }, []);
  return (
    <ScreenLayout title="회원가입 - 어르신">
      <KeyboardAvoidingLayout>
        <View style={styles.subContainer}>
          <View style={styles.formContainer}>
            <FormInput
              control={control}
              name="name"
              label="성함"
              placeholder="어르신 성함 입력"
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
              name="address"
              label="주소"
              placeholder="어르신 주소 입력"
              rules={{
                required: true,
              }}
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

export default SeniorSignUpScreen;

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
