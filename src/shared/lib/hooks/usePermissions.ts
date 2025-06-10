import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Platform,
  PermissionsAndroid,
  AppState,
  Linking,
  Alert,
} from 'react-native';
import {
  requestNotifications,
  PermissionStatus,
} from 'react-native-permissions';
import usePermissionStore from '../stores/usePermissionStore';

type PermissionStatuses = {
  notifications: PermissionStatus | undefined;
};

type PermissionType = 'notifications';

const usePermissions = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatuses>({
    notifications: undefined,
  });
  const { isAllGranted, setAllGranted } = usePermissionStore();
  const isInitialized = useRef(false);

  const checkPermission = useCallback(
    async (type: PermissionType) => {
      let status: PermissionStatus | undefined;

      try {
        if (Platform.OS === 'ios') {
          // iOS에서는 알림 권한을 직접 확인할 수 없으므로 현재 상태를 사용
          status = permissions.notifications;
          console.log('iOS 알림 권한 상태:', status);
        } else if (Platform.OS === 'android') {
          if (Platform.Version >= 33) {
            const notificationsGranted = await PermissionsAndroid.check(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            status = notificationsGranted ? 'granted' : 'denied';
            console.log('Android 알림 권한 상태:', status);
          } else {
            status = 'granted' as PermissionStatus;
            console.log('Android 알림 권한 상태 (API < 33):', status);
          }
        }
      } catch (err) {
        console.log(`${type} 권한 확인 에러:`, err);
        status = 'denied';
      }

      return status;
    },
    [permissions.notifications],
  );

  const updateAllGranted = useCallback(async () => {
    const notificationsStatus = await checkPermission('notifications');

    const newPermissions = {
      notifications: notificationsStatus,
    };

    setPermissions(newPermissions);

    const allGranted = notificationsStatus === 'granted';

    console.log('권한 상태 업데이트:', {
      notifications: notificationsStatus,
      allGranted,
    });

    if (allGranted !== isAllGranted) {
      console.log('isAllGranted 값 업데이트:', allGranted);
      setAllGranted(allGranted);
    }
  }, [isAllGranted]);

  const openSettings = useCallback(() => {
    Alert.alert(
      '권한 허용',
      '정상적인 앱 사용을 위해 모든 권한을 허용해주세요.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
    );
  }, []);

  const requestSinglePermission = useCallback(async (type: PermissionType) => {
    let permissionStatus: PermissionStatus | undefined;

    try {
      if (Platform.OS === 'ios') {
        const { status } = await requestNotifications([
          'alert',
          'sound',
          'badge',
        ]);
        permissionStatus = status;
      } else if (Platform.OS === 'android') {
        try {
          if (Platform.Version >= 33) {
            permissionStatus = (await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            )) as PermissionStatus;
          } else {
            permissionStatus = 'granted' as PermissionStatus;
          }
        } catch (err) {
          console.log('Android 권한요청 에러:', err);
        }
      }
    } catch (err) {
      console.log('권한요청 에러:', err);
    }

    setPermissions(prev => ({
      ...prev,
      [type]: permissionStatus,
    }));

    // 권한이 거절된 경우 설정 화면으로 이동
    // if (permissionStatus !== 'granted') {
    //   openSettings();
    // }

    // 권한 요청 후 전체 권한 상태 업데이트
    await updateAllGranted();

    return permissionStatus;
  }, []);

  const requestPermissions = useCallback(async () => {
    console.log('권한 요청 시작');

    // 현재 권한 상태 확인
    const notificationsStatus = await checkPermission('notifications');

    // 권한이 없는 경우에만 요청
    if (notificationsStatus !== 'granted') {
      await requestSinglePermission('notifications');
    }

    // 최종 권한 상태 업데이트
    await updateAllGranted();

    console.log('권한 요청 완료');
  }, []);

  // 앱이 포커스될 때마다 권한 상태를 확인
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.log('앱이 활성화됨 - 권한 상태 확인');
        updateAllGranted();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // 초기 권한 상태 확인 및 요청
  useEffect(() => {
    const initializePermissions = async () => {
      console.log('권한 초기화 시작');

      // 권한 상태 확인
      await updateAllGranted();

      // 권한이 모두 허용되지 않은 경우에만 권한 요청
      if (!isAllGranted && !isInitialized.current) {
        isInitialized.current = true;
        await requestPermissions();
      }

      setIsCompleted(true);
      console.log('권한 초기화 완료');
    };

    initializePermissions();
  }, [isAllGranted]);

  return {
    permissions,
    isCompleted,
    requestSinglePermission,
    requestPermissions,
    updateAllGranted,
  };
};

export default usePermissions;
