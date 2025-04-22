export const formatDateTime = (dateTimeStr: string): string => {
  const date = new Date(dateTimeStr);

  // 시간을 12시간 형식으로 변환
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? '오후' : '오전';

  // 12시간 형식으로 변환
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시는 12시로 표시

  // 월, 일, 년도 추출
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${ampm} ${hours
    .toString()
    .padStart(2, '0')}:${minutes} | ${year}년 ${month}월 ${day}일`;
};
