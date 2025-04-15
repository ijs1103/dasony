import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  vertical: boolean;
}

const Divider = ({ vertical = false }: Props) => {
  return <View style={[vertical ? styles.vDivider : styles.hDivider]} />;
};

const styles = StyleSheet.create({
  hDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D8D8D8',
  },
  vDivider: {
    height: '100%',
    width: 1,
    backgroundColor: '#D8D8D8',
  },
});

export default Divider;
