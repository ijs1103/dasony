import { useHomeStackNavigation } from '@/app/navigation/HomeStackNavigator';
import { useUser } from '@/features/auth/model/useUser';
import { getMemoDate } from '@/features/memo/lib/getMemoDate';
import useMemoStore from '@/features/memo/model/useMemoStore';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import SubmitButton from '@/shared/ui/SubmitButton';
import showSuccessToast from '@/shared/ui/ToastMessages/SuccessToast';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import uuid from 'react-native-uuid';

const MemoScreen = () => {
  const navigation = useHomeStackNavigation();
  const [content, setContent] = useState('');
  const { data } = useUser();
  const addMemo = useMemoStore(state => state.addMemo);
  const saveButtonHandler = () => {
    addMemo({
      id: uuid.v4(),
      guardian: data?.name ?? '보호자',
      content,
      date: getMemoDate(),
    });
    showSuccessToast({
      text: '메모가 저장되었습니다.',
      onHide: () => {
        navigation.goBack();
      },
    });
  };
  return (
    <ScreenLayout title="메모 작성">
      <View style={styles.subContainer}>
        <TextInput
          value={content}
          onChangeText={setContent}
          multiline={true}
          numberOfLines={4}
          maxLength={50}
          placeholder="메모를 입력해주세요. (최대 50자)"
          style={styles.textInput}
        />
        <SubmitButton
          title="저장"
          onPress={saveButtonHandler}
          disabled={content.length === 0}
        />
      </View>
    </ScreenLayout>
  );
};

export default MemoScreen;

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  textInput: {
    padding: 16,
    fontSize: 22,
    color: '#111',
  },
});
