import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

interface Props {
  title: string;
}

const ListEmptyComponent = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Icon source="fridge-alert-outline" color={'#3182F6'} size={76} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 32,
    color: '#3182F6',
  },
});
