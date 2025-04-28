import { StyleSheet, TextInput, View } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import SubmitButton from '@/shared/ui/SubmitButton';
import { useCallback, useState } from 'react';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { useAuthStackNavigation } from '@/app/navigation/AuthStackNavigator';

export default function AddressScreen() {
  const navigation = useAuthStackNavigation();
  const [address, setAddress] = useState('');
  const setSeniorAddress = useAuthStore(state => state.setSeniorAddress);
  const onPress = useCallback(() => {
    if (!address) {
      showErrorToast({ text: '주소를 선택해주세요.' });
      return;
    }
    setSeniorAddress(address);
    navigation.goBack();
  }, [address]);

  return (
    <ScreenLayout title={'주소 설정'}>
      <Postcode
        style={{ flex: 1 }}
        onSelected={data => setAddress(data.address)}
        onError={() => {}}
      />
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} value={address} editable={false} />
      </View>
      <SubmitButton title="확인" onPress={onPress} disabled={address === ''} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 18,
  },
  textInput: {
    color: '#000',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
