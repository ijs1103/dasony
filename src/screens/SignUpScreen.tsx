import { StyleSheet, View } from 'react-native';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useForm } from 'react-hook-form';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import SubmitButton from '@/shared/ui/SubmitButton';
import FormInput from '@/shared/ui/FormInput';
import { useSignup } from '@/features/auth/model/useSignup';
import { useCallback, useState } from 'react';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';
import KeyboardAvoidingLayout from '@/shared/ui/KeyboardAvoidingLayout';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { useValidateSerialCode } from '@/features/device/model/useValidateSerialCode';
import CheckItem from '@/shared/ui/CheckItem';

interface IForm {
  name: string;
  phoneNumber: string;
  serialCode: string;
}

const SignUpScreen = () => {
  const navigation = useAuthStackNavigation();
  const setSerialCode = useAuthStore(state => state.setSerialCode);
  const setGuardianInfo = useAuthStore(state => state.setGuardianInfo);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IForm>({ mode: 'onChange' });
  const validateCodeMutation = useValidateSerialCode();
  const [checked, setChecked] = useState({
    personalInfo: false,
    service: false,
  });
  const onValid = useCallback(
    async ({ name, phoneNumber, serialCode }: IForm) => {
      try {
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
          showErrorToast({ text: '올바르지 않은 일련번호입니다.' });
          return;
        }
        setGuardianInfo(name, phoneNumber);
        setSerialCode(serialCode);
        navigation.navigate('SeniorSignUpScreen');
      } catch (error) {
        showErrorToast({ text: '올바르지 않은 일련번호입니다.' });
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
              label="보호자 이름"
              labelColor={'#000'}
              placeholder="이름 입력"
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
            <View style={styles.checkContainer}>
              <CheckItem
                title="개인정보 처리동의"
                checked={checked.personalInfo}
                pressHandler={() =>
                  setChecked(prev => ({
                    ...prev,
                    personalInfo: !prev.personalInfo,
                  }))
                }
              />
              <CheckItem
                title="서비스 이용동의"
                checked={checked.service}
                pressHandler={() =>
                  setChecked(prev => ({ ...prev, service: !prev.service }))
                }
              />
            </View>
          </View>

          <SubmitButton
            title="다음"
            onPress={handleSubmit(onValid)}
            disabled={!isValid || !checked.personalInfo || !checked.service}
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
  checkContainer: {
    marginTop: 10,
    gap: 12,
  },
});
