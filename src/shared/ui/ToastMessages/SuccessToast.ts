import Toast from 'react-native-toast-message';

interface Props {
  text: string;
}

const showSuccessToast = ({ text }: Props) => {
  Toast.show({
    type: 'success',
    text1: text,
    position: 'top',
    autoHide: true,
    visibilityTime: 2000,
  });
};

export default showSuccessToast;
