import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackActionNavBar from './NavigationBars/BackActionNavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

interface Props {
  children: React.ReactNode;
  title?: string;
}

const ScreenLayout = ({ children, title }: Props) => {
  const { canGoBack } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {canGoBack() && title && <BackActionNavBar title={title} />}
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenLayout;
