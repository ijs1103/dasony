import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
}

const BackActionNavBar = ({ title }: Props) => {
  const { goBack } = useNavigation();

  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={title} color="#000" />
      <Appbar.Action icon="calendar" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default BackActionNavBar;
