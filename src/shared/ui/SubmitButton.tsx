import { StyleSheet, Platform, View } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const SubmitButton = ({ title, onPress, disabled, loading }: Props) => {
  return (
    <View style={styles.reportButtonContainer}>
      <Button
        style={[styles.reportButton, { opacity: disabled ? 0.6 : 1 }]}
        textColor="#fff"
        onPress={onPress}
        disabled={disabled || loading}
        loading={loading}
        mode="contained">
        {title}
      </Button>
    </View>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  reportButtonContainer: {
    ...Platform.select({
      android: {
        elevation: 8,
        backgroundColor: '#3182F6',
        borderRadius: 6,
        marginHorizontal: 18,
        marginTop: 16,
        padding: 1,
      },
      ios: {
        marginHorizontal: 18,
        marginTop: 16,
      },
    }),
  },
  reportButton: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: '#3182F6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
});
