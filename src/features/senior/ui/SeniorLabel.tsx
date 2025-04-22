import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PersonIcon from '../../../../assets/Home/person_icon.svg';
import PowerIcon from '../../../../assets/Home/power_icon.svg';
import MarkerIcon from '../../../../assets/Home/marker_icon.svg';

interface Props {
  type: 'name' | 'power' | 'address';
  editNameHandler?: () => void;
  editAddressHandler?: () => void;
}

const SeniorLabel = ({ type, editNameHandler, editAddressHandler }: Props) => {
  return (
    <View style={styles.container}>
      {type === 'name' && <PersonIcon />}
      {type === 'power' && <PowerIcon />}
      {type === 'address' && <MarkerIcon />}
      <Text style={styles.title}>
        {type === 'name'
          ? '보호 대상자 |'
          : type === 'power'
          ? '전원공급'
          : '위치 |'}
      </Text>
      {type === 'name' && (
        <TouchableOpacity onPress={editNameHandler}>
          <Text style={styles.edit}>{'수정하기'}</Text>
        </TouchableOpacity>
      )}
      {type === 'address' && (
        <TouchableOpacity onPress={editAddressHandler}>
          <Text style={styles.edit}>{'수정하기'}</Text>
        </TouchableOpacity>
      )}
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
  edit: {
    fontWeight: '700',
    color: '#49A0F1',
  },
});
