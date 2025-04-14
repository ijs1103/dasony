import { Appbar } from 'react-native-paper';

interface Props {
  title: string;
}

const MainTitleNavBar = ({ title }: Props) => {
  return (
    <Appbar.Header statusBarHeight={0} mode="center-aligned">
      <Appbar.Content title={title} color="#000" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default MainTitleNavBar;
