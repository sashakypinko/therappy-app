'use strict';

window.onload = () => {
  const [calendarDayRoot] = document.getElementsByClassName('MuiDayCalendar-root');
  const calendarDays = document.getElementsByClassName('MuiPickersDay-root MuiPickersDay-dayWithMargin');

  if (calendarDayRoot && calendarDays) {
    new ResizeObserver(() => {
      [].forEach.call(calendarDays, (el) => {
        el.style.height = `${el.clientWidth}px`;
      });
    }).observe(calendarDayRoot);
  }
};
