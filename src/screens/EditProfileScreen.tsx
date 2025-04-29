import { StyleSheet, Text, TextInput, View } from 'react-native';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import Spacer from '@/shared/ui/Spacer';
import SubmitButton from '@/shared/ui/SubmitButton';
import { Controller, useForm } from 'react-hook-form';
import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/utils/constants';
import { useCallback, useState } from 'react';
import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import { useUpdateUser } from '@/features/auth/model/useUpdateUser';
import { useUser } from '@/features/auth/model/useUser';

interface IForm {
  name: string;
}

const EditProfileScreen = () => {
  const navigation = useHomeStackNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<IForm>({ mode: 'onChange' });
  const { data, refetch } = useUser();
  const updateNameMutation = useUpdateUser();

  const onValid = useCallback(
    ({ name }: IForm) => {
      if (!data?.id) {
        showErrorToast({ text: '보호자 정보를 불러오는데 실패했습니다.' });
        return;
      }
      if (getValues('name') === data?.name) {
        showErrorToast({ text: '변경전 이름과 같습니다.' });
        return;
      }

      updateNameMutation.mutate(
        { id: data.id, name },
        {
          onSuccess: () => {
            showSuccessToast({
              text: '보호자 이름이 변경되었습니다.',
              onHide: () => {
                refetch();
                navigation.goBack();
              },
            });
          },
          onError: () => {
            showErrorToast({ text: '성함 변경에 실패했습니다.' });
          },
        },
      );
    },
    [data],
  );
  return (
    <ScreenLayout title={'보호자 이름 변경'}>
      <View style={styles.subContainer}>
        <View style={styles.textInputContainer}>
          <Text style={styles.label}>{'이름'}</Text>
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
                placeholder={`현재 이름: ${data?.name ?? '보호자'}`}
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
          disabled={!isValid || updateNameMutation.isPending}
        />
      </View>
    </ScreenLayout>
  );
};

export default EditProfileScreen;

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
