export const convertDayToKorean = (day: string): string => {
  const dayMap: { [key: string]: string } = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일',
  };

  return dayMap[day] || '';
};
