import { StyleSheet, TextInput, View } from 'react-native';
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

export default function AddressUpdateScreen() {
  const navigation = useHomeStackNavigation();
  const { data, refetch } = useSeniors();
  const serialCode = useAuthStore(state => state.serialCode);
  const [address, setAddress] = useState(data?.address ?? '');
  const updateAddressMutation = useUpdateSenior();

  const onPress = useCallback(() => {
    if (!address) {
      showErrorToast({ text: '주소를 선택해주세요.' });
      return;
    }

    updateAddressMutation.mutate(
      { serialCode: serialCode!, address },
      {
        onSuccess: () => {
          showSuccessToast({ text: '어르신 주소가 변경되었습니다.' });
          refetch();
          navigation.goBack();
        },
        onError: () => {
          showErrorToast({ text: '주소 업데이트에 실패했습니다.' });
        },
      },
    );
  }, [address, updateAddressMutation, serialCode, refetch, navigation]);

  const disabled = data?.address === address || updateAddressMutation.isPending;

  return (
    <ScreenLayout title={'어르신 주소 변경'}>
      <Postcode
        style={{ flex: 1 }}
        onSelected={data => setAddress(data.address)}
        onError={() => {}}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.textInput, { color: disabled ? '#000' : '#3182F6' }]}
          value={address}
          editable={false}
        />
      </View>
      <SubmitButton title="저장하기" onPress={onPress} disabled={disabled} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 18,
  },
  textInput: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
