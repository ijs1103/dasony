export const formatPhoneNumber = (number: string): string => {
  if (number.length === 11 && number.startsWith('010')) {
    return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
  }
  return number;
};
