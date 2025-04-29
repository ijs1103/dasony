import Spacer from '@/shared/ui/Spacer';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  guardian: string;
  content: string;
  date: string;
  onPress: () => void;
}
const MemoListItem = ({ guardian, content, date, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton
        style={styles.iconButton}
        icon="trash-can-outline"
        iconColor="#aaa"
        size={22}
        onPress={onPress}
      />
      <Spacer size={8} />
      <Text style={styles.content} numberOfLines={5}>
        {content}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.guardian}>{guardian}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default MemoListItem;

const styles = StyleSheet.create({
  container: {
    width: 166,
    height: 168,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 12,
    marginVertical: 12,
    marginRight: 16,
    justifyContent: 'space-between',
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
      android: {
        elevation: 5,
      },
    }),
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  content: {
    fontWeight: '400',
    color: '#000',
  },
  guardian: {
    fontWeight: '600',
    color: '#000',
    fontSize: 12,
  },
  date: {
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
  },
});
