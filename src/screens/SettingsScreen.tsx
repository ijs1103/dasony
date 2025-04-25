import { useSettingsStackNavigation } from '@/app/navigation/SettingsStackNavigator';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { StyleSheet, Text } from 'react-native';

const SettingsScreen = () => {
  const navigation = useSettingsStackNavigation();

  return (
    <ScreenLayout>
      <Text>SettingsScreen</Text>
    </ScreenLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
