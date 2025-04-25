import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform, PermissionsAndroid, AppState } from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
  PermissionStatus,
  check,
} from 'react-native-permissions';
import usePermissionStore from '../stores/usePermissionStore';

type PermissionStatuses = {
  camera: PermissionStatus | undefined;
  notifications: PermissionStatus | undefined;
  photoLibrary: PermissionStatus | undefined;
};

type PermissionType = 'camera' | 'notifications' | 'photoLibrary';

const usePermissions = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatuses>({
    camera: undefined,
    notifications: undefined,
    photoLibrary: undefined,
  });
  const { isAllGranted, setAllGranted } = usePermissionStore();
  const isInitialized = useRef(false);

  const checkPermission = useCallback(
    async (type: PermissionType) => {
      let status: PermissionStatus | undefined;

      try {
        if (Platform.OS === 'ios') {
          switch (type) {
            case 'camera':
              status = await check(PERMISSIONS.IOS.CAMERA);
              console.log('iOS 카메라 권한 상태:', status);
              break;
            case 'notifications':
              // iOS에서는 알림 권한을 직접 확인할 수 없으므로 현재 상태를 사용
              status = permissions.notifications;
              console.log('iOS 알림 권한 상태:', status);
              break;
            case 'photoLibrary':
              status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
              console.log('iOS 사진 라이브러리 권한 상태:', status);
              break;
          }
        } else if (Platform.OS === 'android') {
          switch (type) {
            case 'camera':
              const cameraGranted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA,
              );
              status = cameraGranted ? 'granted' : 'denied';
              console.log('Android 카메라 권한 상태:', status);
              break;
            case 'notifications':
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
              break;
            case 'photoLibrary':
              if (Platform.Version >= 33) {
                const photoGranted = await PermissionsAndroid.check(
                  PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                );
                status = photoGranted ? 'granted' : 'denied';
                console.log(
                  'Android 사진 라이브러리 권한 상태 (API >= 33):',
                  status,
                );
              } else {
                const storageGranted = await PermissionsAndroid.check(
                  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                );
                status = storageGranted ? 'granted' : 'denied';
                console.log(
                  'Android 사진 라이브러리 권한 상태 (API < 33):',
                  status,
                );
              }
              break;
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
    const cameraStatus = await checkPermission('camera');
    const notificationsStatus = await checkPermission('notifications');
    const photoLibraryStatus = await checkPermission('photoLibrary');

    const newPermissions = {
      camera: cameraStatus,
      notifications: notificationsStatus,
      photoLibrary: photoLibraryStatus,
    };

    setPermissions(newPermissions);

    const allGranted =
      cameraStatus === 'granted' &&
      notificationsStatus === 'granted' &&
      photoLibraryStatus === 'granted';

    console.log('권한 상태 업데이트:', {
      camera: cameraStatus,
      notifications: notificationsStatus,
      photoLibrary: photoLibraryStatus,
      allGranted,
    });

    if (allGranted !== isAllGranted) {
      console.log('isAllGranted 값 업데이트:', allGranted);
      setAllGranted(allGranted);
    }
  }, [isAllGranted]);

  const requestSinglePermission = useCallback(
    async (type: PermissionType) => {
      let permissionStatus: PermissionStatus | undefined;

      try {
        if (Platform.OS === 'ios') {
          switch (type) {
            case 'notifications':
              const { status } = await requestNotifications([
                'alert',
                'sound',
                'badge',
              ]);
              permissionStatus = status;
              break;
            case 'camera':
              permissionStatus = await request(PERMISSIONS.IOS.CAMERA);
              break;
            case 'photoLibrary':
              permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
              break;
          }
        } else if (Platform.OS === 'android') {
          try {
            switch (type) {
              case 'camera':
                permissionStatus = (await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                  {
                    title: '카메라 접근 권한 요청',
                    message: '앱이 카메라를 사용하려면 접근 권한이 필요합니다.',
                    buttonNeutral: '나중에',
                    buttonNegative: '취소',
                    buttonPositive: '허용',
                  },
                )) as PermissionStatus;
                break;
              case 'notifications':
                if (Platform.Version >= 33) {
                  permissionStatus = (await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                  )) as PermissionStatus;
                } else {
                  permissionStatus = 'granted' as PermissionStatus;
                }
                break;
              case 'photoLibrary':
                if (Platform.Version >= 33) {
                  permissionStatus = (await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                  )) as PermissionStatus;
                  if (permissionStatus !== RESULTS.GRANTED) {
                    permissionStatus = (await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                    )) as PermissionStatus;
                  }
                } else {
                  permissionStatus = (await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                  )) as PermissionStatus;
                }
                break;
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

      // 권한 요청 후 전체 권한 상태 업데이트
      await updateAllGranted();

      return permissionStatus;
    },
    [updateAllGranted],
  );

  const requestPermissions = useCallback(async () => {
    console.log('권한 요청 시작');

    // 현재 권한 상태 확인
    const cameraStatus = await checkPermission('camera');
    const notificationsStatus = await checkPermission('notifications');
    const photoLibraryStatus = await checkPermission('photoLibrary');

    // 권한이 없는 경우에만 요청
    if (cameraStatus !== 'granted') {
      await requestSinglePermission('camera');
    }
    if (notificationsStatus !== 'granted') {
      await requestSinglePermission('notifications');
    }
    if (photoLibraryStatus !== 'granted') {
      await requestSinglePermission('photoLibrary');
    }

    // 최종 권한 상태 업데이트
    await updateAllGranted();

    console.log('권한 요청 완료');
  }, [checkPermission, requestSinglePermission, updateAllGranted]);

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
  }, [updateAllGranted]);

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
