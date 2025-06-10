import { useEffect, useCallback } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform, AppState } from 'react-native';
import useAuthStore from '../stores/useAuthStore';
import { BASE_URL } from '@/shared/utils/constants';

export const useFirebaseMessaging = () => {
  const setFcmToken = useAuthStore(state => state.setFcmToken);
  const { serialCode, phoneNumber, setAccessToken, setRefreshToken } =
    useAuthStore();

  const subscribeTopic = async (topic: string) => {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`${topic} 토픽 구독 성공`);
    } catch (error) {
      console.error(`${topic} 토픽 구독 실패:`, error);
    }
  };

  // 직접 로그인 요청 함수
  const loginWithToken = useCallback(
    async (fcmToken: string) => {
      if (!serialCode || !phoneNumber) {
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/login`, {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ serialCode, phoneNumber, fcmToken }),
        });

        if (!response.ok) {
          throw new Error('Login failed');
        }

        const data = await response.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        console.log('FCM 토큰으로 로그인 성공');
      } catch (error) {
        console.error('FCM 토큰으로 로그인 실패:', error);
      }
    },
    [serialCode, phoneNumber, setAccessToken, setRefreshToken],
  );

  // FCM 토큰 가져오는 함수
  const getFcmToken = useCallback(async () => {
    try {
      // iOS에서는 APNS 토큰이 설정될 때까지 기다림
      if (Platform.OS === 'ios') {
        let retryCount = 0;
        const maxRetries = 10;

        const tryGetToken = async () => {
          try {
            const token = await messaging().getToken();
            setFcmToken(token);
            if (serialCode && phoneNumber) {
              loginWithToken(token);
            }
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

        if (serialCode && phoneNumber) {
          loginWithToken(token);
        }

        console.log('FCM Token:', token);
      }
    } catch (error) {
      console.error('FCM 토큰 가져오기 실패:', error);
    }
  }, [loginWithToken, setFcmToken, serialCode, phoneNumber]);

  // 권한 요청 함수
  const requestUserPermission = useCallback(async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
        return true;
      } else {
        console.log('알림 권한 거부됨');
        // iOS에서 권한이 거부되어도 빈 토큰 설정
        if (Platform.OS === 'ios') {
          const tempToken = 'temp_ios_token_' + Date.now().toString();
          setFcmToken(tempToken);
        }
        return false;
      }
    } catch (error) {
      console.error('권한 요청 오류:', error);
      return false;
    }
  }, [getFcmToken, setFcmToken]);

  useEffect(() => {
    // 앱 상태 변경 감지
    const appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState === 'active') {
          console.log('앱이 활성화됨 - FCM 토큰 상태 확인');
          requestUserPermission();
        }
      },
    );

    // 포그라운드 메시지 핸들러
    const unsubscribeMessages = messaging().onMessage(async remoteMessage => {
      console.log('알림', JSON.stringify(remoteMessage.notification?.body));
    });

    // 초기 권한 요청
    requestUserPermission();

    return () => {
      unsubscribeMessages();
      appStateSubscription.remove();
    };
  }, [requestUserPermission]);

  // 백그라운드
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('백그라운드 메시지 수신:', remoteMessage);
  });

  return { subscribeTopic };
};
