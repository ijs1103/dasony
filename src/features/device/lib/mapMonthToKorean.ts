export const convertMonthToKorean = (dateStr: string): string => {
  const parts = dateStr.split('-');
  if (parts.length !== 2) {
    return '';
  }
  const month = String(Number(parts[1]));
  return `${month}월`;
};
