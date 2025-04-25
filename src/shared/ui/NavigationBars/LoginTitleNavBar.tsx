import { Image, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

const LoginTitleNavBar = () => {
  return (
    <Appbar.Header
      style={{
        backgroundColor: '#448DF6',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      statusBarHeight={0}
      mode="center-aligned">
      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
        {'어르신 안전 지킴이'}
      </Text>
      <Image
        style={{ width: 140, height: 100 }}
        source={require('../../../../assets/Login/dasony_logo.png')}
      />
    </Appbar.Header>
  );
};

export default LoginTitleNavBar;
