import { Image, StyleSheet, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import SosButton from '../../../../assets/Home/sos_button.svg';
import ClosedFrige from '../../../../assets/Home/closed_frige.svg';
import OpenedFrige from '../../../../assets/Home/opened_frige.svg';
import { FrigeStatus } from '../types/FrigeStatus';

interface Props {
  status: FrigeStatus;
  onPress: () => void;
}

const FrigeStatusView = ({ status, onPress }: Props) => {
  return (
    <View style={styles.container}>
      {status === 'emergency' && (
        <>
          <Chip
            style={{ backgroundColor: '#C32E1F' }}
            textStyle={{ color: '#F9F9FB' }}
            mode="flat">
            {'긴급 이슈'}
          </Chip>
          <SosButton />
          <Button
            onPress={onPress}
            style={{
              borderRadius: 6,
              paddingHorizontal: 20,
            }}
            mode="contained"
            buttonColor="#448DF6"
            textColor="#fff">
            {'확인해제'}
          </Button>
        </>
      )}
      {status === 'inactive' && (
        <>
          <Chip
            style={{ backgroundColor: '#000' }}
            textStyle={{ color: '#F9F9FB' }}
            mode="flat">
            {'오늘 동작없음'}
          </Chip>
          <ClosedFrige />
        </>
      )}
      {status === 'active' && (
        <>
          <Chip
            style={{ backgroundColor: '#878BFF' }}
            textStyle={{ color: '#F9F9FB' }}
            mode="flat">
            {'사용감지됨'}
          </Chip>
          <OpenedFrige />
        </>
      )}
      {status === 'unused' && (
        <>
          <Chip
            style={{ backgroundColor: '#9F9F9F' }}
            textStyle={{ color: '#F9F9FB' }}
            mode="flat">
            {'장시간 미사용'}
          </Chip>
          <Image
            source={require('../../../../assets/Home/unused_device.png')}
            style={{ width: 110, height: 135 }}
          />
        </>
      )}
    </View>
  );
};

export default FrigeStatusView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: 'center',
  },
});
