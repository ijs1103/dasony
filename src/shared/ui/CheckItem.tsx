import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
interface Props {
  title: string;
  checked: boolean;
  pressHandler: () => void;
}

const CheckItem = ({ title, checked, pressHandler }: Props) => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        isChecked={checked}
        size={26}
        fillColor="#3182F6"
        unFillColor="#fff"
        disableText
        innerIconStyle={{ borderWidth: 2 }}
        onPress={pressHandler}
      />
      <Text>{title}</Text>
    </View>
  );
};

export default CheckItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
