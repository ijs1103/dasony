import { useState, useEffect, useCallback } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
  PermissionStatus,
} from 'react-native-permissions';

type PermissionStatuses = {
  camera: PermissionStatus | undefined;
  notifications: PermissionStatus | undefined;
  photoLibrary: PermissionStatus | undefined;
};

const usePermissions = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [permissions, setPermissions] = useState<PermissionStatuses>({
    camera: undefined,
    notifications: undefined,
    photoLibrary: undefined,
  });

  const requestPermissions = useCallback(async () => {
    let camera: PermissionStatus | undefined,
      notifications: PermissionStatus | undefined,
      photoLibrary: PermissionStatus | undefined;

    if (Platform.OS === 'ios') {
      camera = await request(PERMISSIONS.IOS.CAMERA);
      const { status } = await requestNotifications([
        'alert',
        'sound',
        'badge',
      ]);
      notifications = status;
      photoLibrary = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } else if (Platform.OS === 'android') {
      try {
        // 카메라 권한 요청
        camera = (await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '카메라 접근 권한 요청',
            message: '앱이 카메라를 사용하려면 접근 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '취소',
            buttonPositive: '허용',
          },
        )) as PermissionStatus;

        // 알림 권한 요청
        if (Platform.Version >= 33) {
          notifications = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          )) as PermissionStatus;
        } else {
          notifications = 'granted' as PermissionStatus;
        }

        // 사진 라이브러리 권한 요청
        if (Platform.Version >= 33) {
          photoLibrary = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          )) as PermissionStatus;
          if (photoLibrary !== RESULTS.GRANTED) {
            photoLibrary = (await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            )) as PermissionStatus;
          }
        } else {
          photoLibrary = (await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          )) as PermissionStatus;
        }
      } catch (err) {
        console.log('권한요청 에러발생 -', err);
      }
    }

    setPermissions({
      camera,
      notifications,
      photoLibrary,
    });
  }, []);

  useEffect(() => {
    const initializePermissions = async () => {
      await requestPermissions();
      setIsCompleted(true);
    };
    initializePermissions();
  }, []);

  return { permissions, isCompleted };
};

export default usePermissions;

//TODO: 권한허용 요청하는곳에서 해당 코드 실행하여 모든 권한 허용되었는지 확인

// const { permissions, isCompleted } = usePermissions();

// useEffect(() => {
//   if (isCompleted) {
//     const allGranted =
//       permissions.camera === 'granted' &&
//       permissions.notifications === 'granted' &&
//       permissions.photoLibrary === 'granted';

//     if (allGranted) {
//       console.log('모든 권한이 허용되었습니다.');
//     } else {
//       console.log('허용되지 않은 권한이 있습니다:', permissions);
//     }
//   }
// }, [permissions, isCompleted]);
