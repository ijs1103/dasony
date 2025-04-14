import { StyleSheet, Text, View } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import ScreenLayout from '@/shared/ui/ScreenLayout';

export default function AddressSearchScreen() {
  return (
    <ScreenLayout>
      <Postcode
        style={{ flex: 1 }}
        onSelected={data => console.log(data.address)}
        onError={() => {}}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({});
