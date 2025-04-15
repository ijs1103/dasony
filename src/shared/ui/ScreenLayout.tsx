import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Platform } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BackActionNavBar from './NavigationBars/BackActionNavBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F4',
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
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 49 : 56;
  const bottomPadding = tabBarHeight + insets.bottom;

  return (
    <SafeAreaView style={styles.container}>
      {canGoBack() && title && <BackActionNavBar title={title} />}
      <View style={[styles.body, { paddingBottom: bottomPadding }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default ScreenLayout;
