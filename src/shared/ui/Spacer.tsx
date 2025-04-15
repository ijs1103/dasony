import { View, ViewStyle } from 'react-native';

interface Props {
  size: number;
  horizontal?: boolean;
}

const Spacer = ({ size, horizontal = false }: Props) => {
  const style: ViewStyle = horizontal
    ? { width: size, height: '100%' }
    : { height: size, width: '100%' };

  return <View style={style} />;
};

export default Spacer;
