import { SetStateAction } from 'react';
import { Calendar } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';

interface Props {
  onDayPress: (day: { dateString: SetStateAction<string> }) => void;
  selectedDay: string;
}

const MyCalendar = ({ onDayPress, selectedDay }: Props) => {
  const theme = useTheme();

  return (
    <Calendar
      monthFormat={'yyyy년 MM월'}
      theme={{
        backgroundColor: '#fff',
        calendarBackground: theme.colors.background,
        selectedDayBackgroundColor: theme.colors.primary,
        todayTextColor: 'red',
      }}
      onDayPress={onDayPress}
      markedDates={{
        [selectedDay]: {
          selected: true,
          disableTouchEvent: true,
        },
      }}
    />
  );
};

export default MyCalendar;
