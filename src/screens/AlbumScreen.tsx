import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon, Button } from 'react-native-paper';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useCallback, useEffect, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import YesorNoAlert from '@/shared/ui/YesorNoAlert';

const AlbumScreen = () => {
  //TODO: 유저프로필 데이터 받아오는 훅
  //const { data } = useUser();
  const [formData, setFormData] = useState(new FormData());
  const [imageUrl, setImageUrl] = useState<string>('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const toggleAlertVisible = useCallback(() => {
    setAlertVisible(prev => !prev);
  }, []);

  const onDismissAlert = useCallback(() => {
    //setImageUrl(data?.profile_img ?? '');
    toggleAlertVisible();
  }, []);

  const onPressYes = useCallback(() => {
    //TODO: 프로필 이미지 로컬에 저장하자 api 없다
    // imageUploadMutate(
    //   { requestBody: formData },
    //   {
    //     onSuccess: result => {
    //       updateAvatarMutate(
    //         {
    //           imageKey: result.keys.at(0) ?? '',
    //         },
    //         {
    //           onSuccess: () => {
    //             Toast.show({
    //               type: 'success',
    //               text1: '프로필 이미지를 업데이트 하였습니다',
    //               position: 'top',
    //               autoHide: true,
    //               visibilityTime: 2000,
    //             });
    //           },
    //           onError: error => {
    //             Toast.show({
    //               type: 'error',
    //               text1: `프로필 이미지 업데이트 실패 - ${error.message}`,
    //               position: 'top',
    //               autoHide: true,
    //               visibilityTime: 2000,
    //             });
    //           },
    //         },
    //       );
    //     },
    //     onError: error => {
    //       Toast.show({
    //         type: 'error',
    //         text1: `이미지 업로드 실패 - ${error.message}`,
    //         position: 'top',
    //         autoHide: true,
    //         visibilityTime: 2000,
    //       });
    //     },
    //   },
    // );
    toggleAlertVisible();
  }, []);

  const onPressNo = useCallback(() => {
    //setImageUrl(data?.profile_img ?? '');
    toggleAlertVisible();
  }, []);

  const showYesOrNoAlert = useCallback(() => {
    toggleAlertVisible();
  }, [formData]);

  const openCamera = useCallback(async () => {
    try {
      const { assets, didCancel } = await launchCamera({
        mediaType: 'photo',
        maxWidth: 150,
        maxHeight: 150,
        quality: 1,
      });
      if (didCancel) {
        return;
      }
      setImageUrl(
        assets
          ?.map(item => item.uri)
          .filter((uri): uri is string => uri !== undefined)
          .at(0) ?? '',
      );
      const newFormData = new FormData();
      if (assets) {
        for (const item of assets) {
          newFormData.append('files', {
            uri: item.uri,
            type: item.type,
            name: item.uri?.split('/').pop() || 'image.jpg',
          });
        }
      }
      setFormData(newFormData);
      setShouldShowAlert(true);
    } catch {
      showErrorToast({ text: '카메라 로드 실패.' });
    }
  }, []);

  const openImagePicker = useCallback(async () => {
    try {
      const { assets, didCancel } = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 150,
        maxHeight: 150,
        quality: 1,
        selectionLimit: 1,
      });
      if (didCancel) {
        return;
      }
      setImageUrl(
        assets
          ?.map(item => item.uri)
          .filter((uri): uri is string => uri !== undefined)
          .at(0) ?? '',
      );
      const newFormData = new FormData();
      if (assets) {
        for (const item of assets) {
          newFormData.append('files', {
            uri: item.uri,
            type: item.type,
            name: item.uri?.split('/').pop() || 'image.jpg',
          });
        }
      }
      setFormData(newFormData);
      setShouldShowAlert(true);
    } catch {
      showErrorToast({ text: '이미지를 선택해주세요.' });
    }
  }, []);

  useEffect(() => {
    if (shouldShowAlert) {
      showYesOrNoAlert();
      setShouldShowAlert(false);
    }
  }, [shouldShowAlert, showYesOrNoAlert]);

  return (
    <ScreenLayout>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarSubContainer}>
          <Avatar.Image size={150} source={{ uri: imageUrl }} />
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.editIconContainer}>
            <Icon source={'camera'} size={42} />
          </TouchableOpacity>
        </View>
      </View>
      <Button textColor="#fff" mode="contained" onPress={openCamera}>
        {'카메라 켜기'}
      </Button>
      <YesorNoAlert
        visible={alertVisible}
        onDismiss={toggleAlertVisible}
        title={'알림'}
        content={'이미지를 저장하시겠습니까?'}
        onPressYes={onPressYes}
        onPressNo={onPressNo}
      />
    </ScreenLayout>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
  },
  avatarSubContainer: {
    position: 'relative',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -8,
  },
});
