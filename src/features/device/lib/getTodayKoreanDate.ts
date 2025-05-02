export const getTodayKoreanDate = (): string => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${month}월 ${day}일`;
};
