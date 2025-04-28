import { Modal, StyleSheet, TextInput, View } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import SubmitButton from '@/shared/ui/SubmitButton';
import { useCallback, useState } from 'react';
import { useSeniors } from '@/features/senior/model/useSeniors';
import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import { useUpdateSenior } from '@/features/senior/model/useUpdateSenior';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import FormInput from '@/shared/ui/FormInput';
import { useForm } from 'react-hook-form';
import { splitAddress } from '@/features/senior/lib/splitAddress';

interface IForm {
  address: string;
  detailAddress: string;
}

export default function AddressUpdateScreen() {
  const navigation = useHomeStackNavigation();
  const { data, refetch } = useSeniors();
  const [modalVisible, setModalVisible] = useState(false);
  const { address, detailAddress } = splitAddress(data?.address ?? '');
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    getValues,
  } = useForm<IForm>({
    mode: 'onChange',
    defaultValues: { address, detailAddress },
  });
  const serialCode = useAuthStore(state => state.serialCode);
  const updateAddressMutation = useUpdateSenior();

  const onValid = useCallback(
    ({ address, detailAddress }: IForm) => {
      if (!address) {
        showErrorToast({ text: '주소를 선택해주세요.' });
        return;
      }

      updateAddressMutation.mutate(
        { serialCode: serialCode!, address: `${address},${detailAddress}` },
        {
          onSuccess: () => {
            showSuccessToast({ text: '보호대상자 주소가 변경되었습니다.' });
            refetch();
            navigation.goBack();
          },
          onError: () => {
            showErrorToast({ text: '주소 업데이트에 실패했습니다.' });
          },
        },
      );
    },
    [serialCode],
  );

  const disabled =
    !isValid ||
    data?.address === `${getValues('address')},${getValues('detailAddress')}` ||
    updateAddressMutation.isPending;

  return (
    <ScreenLayout title={'주소 변경'}>
      <View style={styles.subContainer}>
        <View style={styles.textInputContainer}>
          <FormInput
            control={control}
            label="주소"
            name="address"
            onPress={() => setModalVisible(true)}
            editable={false}
            placeholder="우편번호 검색"
            rules={{
              required: true,
            }}
          />
          <FormInput
            control={control}
            name="detailAddress"
            label="상세 주소"
            placeholder="상세주소 입력"
            rules={{
              required: true,
            }}
          />
        </View>
        <SubmitButton
          title="저장하기"
          onPress={handleSubmit(onValid)}
          disabled={disabled}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Postcode
          style={{ flex: 1 }}
          onSelected={data => {
            setValue('address', data.address);
            setModalVisible(false);
          }}
          onError={() => {}}
        />
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textInputContainer: {
    paddingTop: 16,
    paddingHorizontal: 18,
    backgroundColor: '#eee',
    gap: 16,
  },
});
