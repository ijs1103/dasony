const BASE_URL = 'https://www.toppingfranchise.com';

const WEB_VIEW_URL = {
  PRIVACY_POLICY: 'https://plum-puppet-fa1.notion.site/1ecaf4da899480b496b7f6fa07755c63?pvs=4',
  SERVICE_POLICY: 'https://plum-puppet-fa1.notion.site/1ecaf4da899480a8bc44f92650544f3f?pvs=4',
} as const;

const REGEX = {
  NAME: /^[가-힣]{1,6}$/,
  PHONE_NUMBER: /^01[016789]\d{3,4}\d{4}$/,
  SERIALCODE: /^\d{6}$/,
} as const;

const FORM_ERROR_MESSAGE = {
  NAME: '한글 최대 6글자까지 입력.',
  PHONE_NUMBER: '올바르지 않은 전화번호 형식입니다.',
  SERIALCODE: '일련번호는 숫자 6자리입니다.',
} as const;
export { BASE_URL, REGEX, FORM_ERROR_MESSAGE, WEB_VIEW_URL };
