import { StyleSheet, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F4',
  },
  body: {
    flexGrow: 1,
  },
});

interface Props {
  children: React.ReactNode;
}

const ScrollViewLayout = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  const tabBarHeight = Platform.OS === 'ios' ? 49 : 56;
  const bottomPadding = tabBarHeight + insets.bottom;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{
          paddingBottom: bottomPadding,
        }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollViewLayout;
