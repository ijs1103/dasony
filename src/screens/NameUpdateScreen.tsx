import { StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import Spacer from '@/shared/ui/Spacer';
import SubmitButton from '@/shared/ui/SubmitButton';
import { Controller, useForm } from 'react-hook-form';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import { useCallback } from 'react';
import { useUpdateSenior } from '@/features/senior/model/useUpdateSenior';
import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { useSeniors } from '@/features/senior/model/useSeniors';

interface IForm {
  name: string;
}

const NameUpdateScreen = () => {
  const navigation = useHomeStackNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({ mode: 'onChange' });
  const { refetch } = useSeniors();
  const updateNameMutation = useUpdateSenior();
  const serialCode = useAuthStore(state => state.serialCode);

  const onValid = useCallback(({ name }: IForm) => {
    updateNameMutation.mutate(
      { serialCode: serialCode!, name },
      {
        onSuccess: () => {
          showSuccessToast({ text: '어르신 성함이 변경되었습니다.' });
          refetch();
          navigation.goBack();
        },
        onError: () => {
          showErrorToast({ text: '성함 변경에 실패했습니다.' });
        },
      },
    );
  }, []);
  return (
    <ScreenLayout title={'어르신 성함 변경'}>
      <View style={styles.subContainer}>
        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{'성함'}</Text>
          <Spacer size={20} />
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: REGEX.NAME,
                message: FORM_ERROR_MESSAGE.NAME,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'#2752AB'}
                placeholder="어르신 성함 입력"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                maxLength={6}
              />
            )}
            name={'name'}
          />
          {errors.name?.message && (
            <Text style={styles.errorMessage}>{errors.name?.message}</Text>
          )}
        </View>
        <SubmitButton
          title="저장하기"
          onPress={handleSubmit(onValid)}
          disabled={!isValid}
        />
      </View>
    </ScreenLayout>
  );
};

export default NameUpdateScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textInputContainer: {
    paddingHorizontal: 18,
    marginTop: 40,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3C63B3',
  },
  textInput: {
    borderColor: '#2752AB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
