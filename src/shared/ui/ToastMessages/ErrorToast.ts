import Toast from 'react-native-toast-message';

interface Props {
  text: string;
  onHide?: () => void;
}

const showErrorToast = ({ text, onHide }: Props) => {
  Toast.show({
    type: 'error',
    text1: text,
    position: 'top',
    autoHide: true,
    visibilityTime: 2000,
    onHide,
  });
};

export default showErrorToast;
