import HasNoNoti from '../../../../assets/Home/normal_bell.svg';
import HasNoti from '../../../../assets/Home/alarm_bell.svg';
import SettingButton from '../../../../assets/Home/setting_icon.svg';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';

interface Props {
  title: string;
  navigateToNotification?: () => void;
  navigateToSetting?: () => void;
}

const MainTitleNavBar = ({
  title,
  navigateToNotification,
  navigateToSetting,
}: Props) => {
  const hasNotification = false;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.hStack}>
        {navigateToNotification && (
          <>
            <TouchableOpacity onPress={navigateToNotification}>
              {hasNotification ? <HasNoti /> : <HasNoNoti />}
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSetting}>
              <SettingButton />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default MainTitleNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 28,
    paddingLeft: 24,
    paddingRight: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
  },
  hStack: {
    flexDirection: 'row',
    gap: 12,
  },
});
