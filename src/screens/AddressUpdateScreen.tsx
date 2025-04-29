import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ScreenLayout title="주소 변경">
      <View style={styles.subContainer}>
        <View style={styles.textInputContainer}>
          <FormInput
            control={control}
            label="주소"
            name="address"
            editable={false}
            placeholder="우편번호 검색"
            rules={{
              required: true,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addressButton}
            onPress={openModal}>
            <Text style={styles.addressButtonText}>우편번호 검색</Text>
          </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>주소 검색</Text>
          </View>
          <Postcode
            style={{ flex: 1 }}
            onSelected={data => {
              setValue('address', data.address);
              setModalVisible(false);
            }}
            onError={() => {}}
          />
        </SafeAreaView>
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
  addressButton: {
    backgroundColor: '#2752AB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  addressButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#2752AB',
  },
});
