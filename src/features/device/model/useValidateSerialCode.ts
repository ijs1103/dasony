import { BASE_URL } from '@/shared/utils/constants';
import { useMutation } from '@tanstack/react-query';

interface ValidateSerialCodeRequest {
  serialCode: string;
}

export const validateSerialCode = async (
  data: ValidateSerialCodeRequest,
): Promise<Boolean> => {
  const response = await fetch(`${BASE_URL}/serial-code/validate`, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData.message === '이미 등록된 일련 번호입니다.';
  }
  return true;
};

export const useValidateSerialCode = () => {
  return useMutation({
    mutationFn: (data: ValidateSerialCodeRequest) => validateSerialCode(data),
  });
};
