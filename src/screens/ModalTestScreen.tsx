import Modal from '@/shared/ui/Modal';
import ScreenLayout from '@/shared/ui/ScreenLayout';
import { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ListItem = ({ color = '#333', icon, title, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        height: 60,
      }}>
      <Icon name={icon} size={20} color={color} />
      <Text style={{ color, fontSize: 15, marginLeft: 20 }}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const ModalTestScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ScreenLayout title='모달 테스트'>
      <View style={{ marginTop: 100 }}>
        <Button title="Show Modal" onPress={openModal} />
      </View>

      <Modal isVisible={isModalVisible} onClose={closeModal}>
        <ListItem onPress={closeModal} icon="pushpino" title="저장하기" />
        <ListItem onPress={closeModal} icon="hearto" title="좋아요" />
        <ListItem onPress={closeModal} icon="delete" title="삭제하기" />
        <ListItem onPress={closeModal} color="#999" icon="back" title="닫기" />
      </Modal>
    </ScreenLayout>
  );
};

export default ModalTestScreen;
