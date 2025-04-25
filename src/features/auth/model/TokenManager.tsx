import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import { useRefreshToken } from './useRefreshToken';
import usePermissionStore from '@/shared/lib/stores/usePermissionStore';

export const TokenManager = () => {
  const appState = useRef(AppState.currentState);
  const validateInterval = useRef<NodeJS.Timeout>();
  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    fcmToken,
    setAccessToken,
    setRefreshToken,
    handleLogout: logout,
  } = useAuthStore();
  const { isAllGranted } = usePermissionStore();
  const { mutate } = useRefreshToken();

  const startTokenValidation = () => {
    // 이전 인터벌 제거
    if (validateInterval.current) {
      clearInterval(validateInterval.current);
    }

    // 최초 실행
    validateToken();

    // 25분 간격으로 설정 (만료기간 30분 대비 여유시간 확보)
    validateInterval.current = setInterval(() => {
      validateToken();
    }, 25 * 60 * 1000);
  };

  const validateToken = async () => {
    if (!refreshToken) {
      logout();
      return;
    }

    const refreshAccessToken = () => {
      // 권한이 모두 허용되지 않은 경우에는 토큰 갱신을 시도하지 않음
      if (!isAllGranted) {
        console.log('권한이 모두 허용되지 않아 토큰 갱신을 건너뜁니다.');
        return;
      }

      if (!fcmToken) {
        console.log('There is no fcmToken');
        // FCM 토큰이 없을 때 바로 로그아웃하지 않고 권한 상태를 확인
        if (!isAllGranted) {
          console.log('권한이 모두 허용되지 않아 로그아웃을 건너뜁니다.');
          return;
        }
        logout();
        return;
      }
      mutate(
        { refreshToken, fcmToken },
        {
          onSuccess: data => {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            console.log('Access token refreshed successfully');
          },
          onError: () => {
            console.log('Failed to refresh token');
            logout();
          },
        },
      );
    };
    // 로그인이 한번 완료된 상태라면 재발급
    if (isLoggedIn) {
      refreshAccessToken();
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    // 앱 상태 변경 리스너
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // 앱이 포그라운드로 돌아올 때 토큰 검증 재시작
        startTokenValidation();
      }
      appState.current = nextAppState;
    });

    // 최초 토큰 검증 시작
    if (refreshToken) {
      startTokenValidation();
    }

    return () => {
      subscription.remove();
      if (validateInterval.current) {
        clearInterval(validateInterval.current);
      }
    };
  }, [isLoggedIn, refreshToken, isAllGranted]);
  return null;
};
