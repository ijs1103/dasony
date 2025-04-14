import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Easing,
  PanResponder,
} from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isVisible, onClose, children }: Props) => {
  const interpolateAnim = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 100) {
        hideModal();
      }
    },
  });

  const showModal = () => {
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  };

  React.useEffect(() => {
    if (isVisible) {
      showModal();
    } else {
      hideModal();
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={hideModal}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000090',
            opacity: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          bottom: interpolateAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-500, 0],
          }),
          backgroundColor: 'blue',
          width: '100%',
          padding: 20,
          paddingBottom: 20,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        {children}
      </Animated.View>
    </>
  );
};

export default Modal;
