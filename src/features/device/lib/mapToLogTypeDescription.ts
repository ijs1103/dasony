import { LogType } from '../types/all';

export const mapToLogTypeDescription = (type: LogType): string => {
  switch (type) {
    case LogType.ExternalPowerOff:
      return '전원 연결 끊김';
    case LogType.ExternalPowerOn:
      return '전원 연결 확인';
    case LogType.Motion:
      return '활동감지';
    case LogType.PowerOff:
      return '전원 꺼짐';
    case LogType.PowerOn:
      return '전원 켜짐';
    case LogType.Sos:
      return '긴급상황';
    default:
      return '알 수 없음';
  }
};
