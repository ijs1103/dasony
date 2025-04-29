export const formatKoreanDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${year}년 ${month}월 ${day}일`;
};
