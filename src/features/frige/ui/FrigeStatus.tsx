import { StyleSheet, Text, View } from 'react-native';
import { Chip } from 'react-native-paper';
import SosButton from '../../../../assets/Home/sos_button.svg';
import ClosedFrige from '../../../../assets/Home/closed_frige.svg';
import OpenedFrige from '../../../../assets/Home/opened_frige.svg';
import UnusedDevice from '../../../../assets/Home/unused_device.svg';

interface Props {
  type: 'emergency' | 'closed' | 'opened' | 'unused';
}

const FrigeStatus = ({ type }: Props) => {
  return (
    <View style={styles.container}>
      {type === 'emergency' && (
        <>
          <Chip
            style={{ backgroundColor: '#C32E1F' }}
            textStyle={{ color: '#F9F9FB' }}>
            {'긴급 이슈'}
          </Chip>
          <SosButton />
        </>
      )}
      {type === 'closed' && (
        <>
          <Chip
            style={{ backgroundColor: '#000' }}
            textStyle={{ color: '#F9F9FB' }}>
            {'문닫힘'}
          </Chip>
          <ClosedFrige />
        </>
      )}
      {type === 'opened' && (
        <>
          <Chip
            style={{ backgroundColor: '#878BFF' }}
            textStyle={{ color: '#F9F9FB' }}>
            {'문열림'}
          </Chip>
          <OpenedFrige />
        </>
      )}
      {type === 'unused' && (
        <>
          <Chip
            style={{ backgroundColor: '#9F9F9F' }}
            textStyle={{ color: '#F9F9FB' }}>
            {'장시간 미사용'}
          </Chip>
          <UnusedDevice />
        </>
      )}
    </View>
  );
};

export default FrigeStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    alignItems: 'center',
  },
});
