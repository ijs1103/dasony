import { ChartData } from '../types/chart';
import { DailyRawData } from '../types/daily';
import { MonthlyRawData } from '../types/monthly';
import { WeeklyRawData } from '../types/weekly';
import { convertDayToKorean } from './mapDayToKorean';
import { convertMonthToKorean } from './mapMonthToKorean';

export const mapToDailyChartData = (data: DailyRawData[]): ChartData[] => {
  return data.map(item => ({
    value: item.count,
    label: `${item.hour}`,
  }));
};

export const mapToWeeklyChartData = (data: WeeklyRawData[]): ChartData[] => {
  return data.map(item => ({
    value: item.count,
    label: `${convertDayToKorean(item.month)}`,
  }));
};

export const mapToMonthlyChartData = (data: MonthlyRawData[]): ChartData[] => {
  return data.map(item => ({
    value: item.count,
    label: `${convertMonthToKorean(item.month)}`,
  }));
};
