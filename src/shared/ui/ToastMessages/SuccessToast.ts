import Toast from 'react-native-toast-message';

interface Props {
  text: string;
  onHide?: () => void;
}

const showSuccessToast = ({ text, onHide }: Props) => {
  Toast.show({
    type: 'success',
    text1: text,
    position: 'top',
    autoHide: true,
    visibilityTime: 2000,
    onHide,
  });
};

export default showSuccessToast;
