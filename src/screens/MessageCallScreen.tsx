import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import { Button } from 'react-native-paper';

const MessageCallScreen = () => {
  // 문자 메시지 보내기 함수
  const sendSMS = useCallback((phoneNumber: string, message: string) => {
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('문자 메시지 기능을 지원하지 않습니다.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.log('문자 메시지 에러:', err));
  }, []);

  // 전화 걸기 함수
  const makeCall = useCallback((phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('전화 걸기 기능을 지원하지 않습니다.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.log('오류 발생:', err));
  }, []);

  return (
    <ScreenLayout>
      <Button
        textColor="#fff"
        mode="contained"
        onPress={() => sendSMS('01058725292', '테스트용 문자')}>
        {'메시지 보내기'}
      </Button>
      <Button
        textColor="#fff"
        mode="contained"
        onPress={() => makeCall('01058725292')}>
        {'전화 걸기'}
      </Button>
    </ScreenLayout>
  );
};

export default MessageCallScreen;
