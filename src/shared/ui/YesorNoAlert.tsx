import { Button, Dialog, Portal, Text, DefaultTheme } from 'react-native-paper';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  content: string;
  onPressYes: () => void;
  onPressNo: () => void;
}

const YesorNoAlert = ({
  visible,
  onDismiss,
  title,
  content,
  onPressYes,
  onPressNo,
}: Props) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} theme={DefaultTheme}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressYes}>{'확인'}</Button>
          <Button onPress={onPressNo}>{'취소'}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default YesorNoAlert;
