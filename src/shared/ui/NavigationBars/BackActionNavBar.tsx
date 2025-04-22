import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
}

const BackActionNavBar = ({ title }: Props) => {
  const { goBack } = useNavigation();

  return (
    <Appbar.Header
      style={{ backgroundColor: '#458EF7' }}
      statusBarHeight={0}
      mode="center-aligned">
      <Appbar.BackAction onPress={goBack} color="#fff" />
      <Appbar.Content title={title} color="#fff" />
    </Appbar.Header>
  );
};

export default BackActionNavBar;
