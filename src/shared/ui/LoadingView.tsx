import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={60} color={'#3182F6'} />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
