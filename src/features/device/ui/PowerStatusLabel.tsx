import { StyleSheet, Text } from 'react-native';

interface PowerStatusLabelProps {
  powerStatus: string;
  batteryTime: number;
}

const PowerStatusLabel = ({
  powerStatus,
  batteryTime,
}: PowerStatusLabelProps) => {
  const isNormal = powerStatus === '정상';
  const statusText = `⦁ ${
    isNormal ? '정상' : '비정상'
  } | 배터리 ${batteryTime}%`;

  return (
    <Text style={[styles.text, isNormal ? styles.normal : styles.abnormal]}>
      {statusText}
    </Text>
  );
};

export default PowerStatusLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  normal: {
    color: '#10D75F',
  },
  abnormal: {
    color: '#FF2727',
  },
});
