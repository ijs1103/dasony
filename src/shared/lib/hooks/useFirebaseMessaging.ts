import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

export const useFirebaseMessaging = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const subscribeTopic = async (topic: string) => {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`${topic} 토픽 구독 성공`);
    } catch (error) {
      console.error(`${topic} 토픽 구독 실패:`, error);
    }
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
      }
    };

    const getFcmToken = async () => {
      try {
        // iOS에서는 APNS 토큰이 설정될 때까지 기다림
        if (Platform.OS === 'ios') {
          let retryCount = 0;
          const maxRetries = 10;

          const tryGetToken = async () => {
            try {
              const token = await messaging().getToken();
              setFcmToken(token);
              console.log('FCM Token:', token);
            } catch (error) {
              console.log('FCM 토큰 가져오기 시도 중...', retryCount + 1);
              if (retryCount < maxRetries) {
                retryCount++;
                // 1초 대기 후 다시 시도
                setTimeout(tryGetToken, 1000);
              } else {
                console.error('FCM 토큰 가져오기 실패:', error);
              }
            }
          };

          tryGetToken();
        } else {
          // Android는 바로 토큰 가져오기
          const token = await messaging().getToken();
          setFcmToken(token);
          console.log('FCM Token:', token);
        }
      } catch (error) {
        console.error('FCM 토큰 가져오기 실패:', error);
      }
    };

    // 포그라운드
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('fcm 새 메시지', JSON.stringify(remoteMessage));
    });

    requestUserPermission();

    return unsubscribe;
  }, []);

  // 백그라운드
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('백그라운드 메시지 수신:', remoteMessage);
  });

  return { fcmToken, subscribeTopic };
};
