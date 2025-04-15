import { Image, StyleSheet, Text, View } from 'react-native';
import PersonIcon from '../../../../assets/Home/person_icon.svg';
import PowerIcon from '../../../../assets/Home/power_icon.svg';
import MarkerIcon from '../../../../assets/Home/marker_icon.svg';

interface Props {
  type: 'name' | 'power' | 'address';
}

const SeniorLabel = ({ type }: Props) => {
  return (
    <View style={styles.container}>
      {type === 'name' && <PersonIcon />}
      {type === 'power' && <PowerIcon />}
      {type === 'address' && <MarkerIcon />}
      <Text style={styles.title}>
        {type === 'name'
          ? '보호 대상자'
          : type === 'power'
          ? '전원공급'
          : '위치'}
      </Text>
    </View>
  );
};

export default SeniorLabel;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
});
