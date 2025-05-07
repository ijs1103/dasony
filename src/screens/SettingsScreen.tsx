import { useSettingsStackNavigation } from '@/app/navigation/SettingsStackNavigator';
import useLogout from '@/features/auth/model/useLogout';
import useSignout from '@/features/auth/model/useSignout';
import { useUser } from '@/features/auth/model/useUser';
import useAuthStore from '@/shared/lib/stores/useAuthStore';
import Divider from '@/shared/ui/Divider';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import showErrorToast from '@/shared/ui/ToastMessages/ErrorToast';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { useCallback } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

const SettingsScreen = () => {
  const navigation = useSettingsStackNavigation();
  const { data } = useUser();
  const logoutMutation = useLogout();
  const signoutMutation = useSignout();
  const handleLogout = useAuthStore(state => state.handleLogout);
  const navigateToEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('WebViewScreen', {
      uri: 'https://www.google.com',
    });
  };

  const navigateToServicePolicy = () => {
    navigation.navigate('WebViewScreen', {
      uri: 'https://www.naver.com',
    });
  };

  const logout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        handleLogout();
      },
    });
  }, []);

  const withdraw = useCallback(() => {
    Alert.alert('회원탈퇴', '정말 회원탈퇴를 진행하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '탈퇴',
        onPress: () => {
          signoutMutation.mutate(undefined, {
            onSuccess: () => {
              showSuccessToast({
                text: '회원탈퇴가 완료되었습니다.',
                onHide: handleLogout,
              });
            },
            onError: () => {
              showErrorToast({ text: '회원탈퇴에 실패했습니다.' });
            },
          });
        },
      },
    ]);
  }, []);
  return (
    <ScreenLayout>
      <List.Item
        title={'보호자'}
        titleStyle={{
          color: '#000',
          fontWeight: '700',
          fontSize: 20,
          marginBottom: 8,
        }}
        description={data?.name}
        descriptionStyle={{
          fontSize: 16,
          marginBottom: 24,
        }}
      />
      <View style={styles.container}>
        <List.Section>
          <List.Subheader style={styles.subheader}>유저 정보</List.Subheader>
          <List.Item
            onPress={navigateToEditProfile}
            title="유저 정보 변경"
            right={() => <List.Icon icon="chevron-right" color="#bbb" />}
          />
        </List.Section>
        <Divider />
        <List.Section>
          <List.Subheader style={styles.subheader}>고객 지원</List.Subheader>
          <List.Item
            onPress={navigateToPrivacyPolicy}
            title="개인정보 처리약관"
            right={() => <List.Icon icon="chevron-right" color="#bbb" />}
          />
          <List.Item
            onPress={navigateToServicePolicy}
            title="서비스 이용약관"
            right={() => <List.Icon icon="chevron-right" color="#bbb" />}
          />
        </List.Section>
        <Divider />
        <List.Section>
          <List.Item onPress={logout} title="로그아웃" />
          <List.Item onPress={withdraw} title="회원탈퇴" />
        </List.Section>
      </View>
    </ScreenLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  subheader: {
    color: '#000',
    fontWeight: '700',
  },
  container: {
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 48,
  },
});
