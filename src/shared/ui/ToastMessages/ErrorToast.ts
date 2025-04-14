import Toast from 'react-native-toast-message';

interface Props {
  text: string;
}

const showErrorToast = ({ text }: Props) => {
  Toast.show({
    type: 'error',
    text1: text,
    position: 'top',
    autoHide: true,
    visibilityTime: 2000,
  });
};

export default showErrorToast;
