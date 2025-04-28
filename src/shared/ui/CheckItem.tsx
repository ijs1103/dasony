import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface Props {
  title: string;
  checked: boolean;
  pressHandler: () => void;
}

const CheckItem = ({ title, checked, pressHandler }: Props) => {
  return (
    <View style={styles.container}>
      <Checkbox
        color="#3182F6"
        status={checked ? 'checked' : 'unchecked'}
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
    gap: 4,
  },
});
