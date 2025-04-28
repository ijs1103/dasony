import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';
import { useSeniorSignup } from '@/features/auth/model/useSeniorSignup';
import { useSignup } from '@/features/auth/model/useSignup';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import FormInput from '@/shared/ui/FormInput';
import KeyboardAvoidingLayout from '@/shared/ui/KeyboardAvoidingLayout';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import SubmitButton from '@/shared/ui/SubmitButton';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

interface IForm {
  name: string;
  address: string;
  detailAddress: string;
}

const SeniorSignUpScreen = () => {
  const navigation = useAuthStackNavigation();
  const serialCode = useAuthStore(state => state.serialCode);
  const setAccessToken = useAuthStore(state => state.setAccessToken);
  const setSerialCode = useAuthStore(state => state.setSerialCode);
  const guardianName = useAuthStore(state => state.guardianName);
  const guardianPhoneNumber = useAuthStore(state => state.guardianPhoneNumber);
  const setGuardianInfo = useAuthStore(state => state.setGuardianInfo);
  const setSeniorAddress = useAuthStore(state => state.setSeniorAddress);
  const seniorAddress = useAuthStore(state => state.seniorAddress);
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<IForm>({ mode: 'onChange' });
  const signupMutation = useSignup();
  const seniorSignupMutation = useSeniorSignup();
  const onValid = useCallback(
    ({ name: seniorName, address, detailAddress }: IForm) => {
      if (!guardianName || !guardianPhoneNumber || !serialCode) {
        showErrorToast({
          text: '보호자 정보가 없습니다. 처음부터 다시 시도해주세요.',
        });
        navigation.navigate('SignUpScreen');
        return;
      }
      // 보호자 회원가입
      signupMutation.mutate(
        { name: guardianName, phoneNumber: guardianPhoneNumber, serialCode },
        {
          onSuccess: ({ accessToken }) => {
            setAccessToken(accessToken);
            setSerialCode(serialCode);
            // 어르신 회원가입
            seniorSignupMutation.mutate(
              {
                name: seniorName,
                address: `${address},${detailAddress}`,
                serialCode,
              },
              {
                onSuccess: () => {
                  showSuccessToast({
                    text: '회원가입 성공! 로그인 해주세요.',
                    onHide: () => {
                      setGuardianInfo(null, null);
                      setSeniorAddress(null);
                      navigation.navigate('LoginScreen');
                    },
                  });
                },
                onError: () => {
                  showErrorToast({ text: '어르신 회원가입에 실패했습니다.' });
                },
              },
            );
          },
          onError: () => {
            showErrorToast({ text: '보호자 회원가입에 실패했습니다.' });
          },
        },
      );
    },
    [],
  );
  const navigateToAddressScreen = () => {
    navigation.navigate('AddressScreen');
  };

  useEffect(() => {
    if (seniorAddress) {
      setValue('address', seniorAddress);
    }
  }, [seniorAddress]);

  return (
    <ScreenLayout title="회원가입 - 보호 대상자">
      <KeyboardAvoidingLayout>
        <View style={styles.subContainer}>
          <View style={styles.formContainer}>
            <FormInput
              control={control}
              name="name"
              label="보호 대상자 성함"
              placeholder="성함"
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
              onPress={navigateToAddressScreen}
              name="address"
              label="보호 대상자 주소"
              placeholder="우편번호 검색"
              rules={{
                required: true,
              }}
            />
            <FormInput
              control={control}
              name="detailAddress"
              placeholder="상세주소 입력"
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
