import { getHoursInterval } from '../helpers/date-time.helper';

const useWorkingHours = (interval = 30, start = 7 * 60, end = 21 * 60): string[] => {
  return getHoursInterval(start, end, interval);
};

export default useWorkingHours;
