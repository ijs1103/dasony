export const splitAddress = (keyoword: string) => {
  const [address, detailAddress] = keyoword.split(',');
  return { address, detailAddress };
};

