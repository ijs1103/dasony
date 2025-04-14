import { StyleSheet, Text, View } from 'react-native';
import { Button, Chip, useTheme } from 'react-native-paper';
import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { mapProviderToKR } from '@/shared/utils/util';

const SocailLoginScreen = () => {
  const theme = useTheme();
  const recentLogin = useAuthStore(state => state.recentLogin);
  const setRecentLogin = useAuthStore(state => state.setRecentLogin);
  const login = useAuthStore(state => state.login);

  const kakaoSignIn = async () => {
    try {
      const result = await kakaoLogin();
      setRecentLogin('kakao');
      login();
      console.log('카카오 로그인 성공:', result);
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setRecentLogin('google');
        login();
        console.log('구글 로그인 성공:', response);
      } else {
        console.log('구글 로그인 실패:', response);
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  return (
    <ScreenLayout>
      <View style={styles.buttonContainer}>
        {recentLogin && (
          <Chip
            mode="outlined"
            style={{ backgroundColor: theme.colors.background }}
            textStyle={{ color: '#000' }}
            icon="information">
            {`최근 ${mapProviderToKR(recentLogin)}로 로그인 했어요.`}
          </Chip>
        )}
        <Button textColor="#fff" mode="contained" onPress={kakaoSignIn}>
          {'카카오 로그인'}
        </Button>
        <Button textColor="#fff" mode="contained" onPress={googleSignIn}>
          {'구글 로그인'}
        </Button>
        {/* <Button textColor="#fff" mode="contained" onPress={onPress}>
        {'애플 로그인'}
      </Button> */}
      </View>
    </ScreenLayout>
  );
};

export default SocailLoginScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 16,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
});
