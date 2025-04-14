import ScreenLayout from '@/shared/ui/ScreenLayout';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import MainTitleNavBar from '@/shared/ui/NavigationBars/MainTitleNavBar';


const HomeScreen = () => {
  const navigation = useHomeStackNavigation();

  return (
    <ScreenLayout>
      <MainTitleNavBar title="어르신 안전 지킴이 다소니" />
    </ScreenLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({

});
