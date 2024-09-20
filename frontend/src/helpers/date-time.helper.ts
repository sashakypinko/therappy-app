import dayjs from 'dayjs';

export const getHoursInterval = (start = 0, end = 60 * 24, interval = 30): string[] => {
  const times = [];

  for (let i = 0; start < 24 * 60; i++) {
    if (start > end) break;
    const hh = Math.floor(start / 60);
    const mm = start % 60;

    times[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) + ':00';
    start = start + interval;
  }

  return times;
};

export const formatTime = (time: string) => dayjs(time, 'HH:mm:ss').format('H:mma');
