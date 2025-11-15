import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const CalendarDots = ({ size = 20, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M2.5 6.91602C2.5 4.70688 4.29086 2.91602 6.5 2.91602H13.5C15.7091 2.91602 17.5 4.70688 17.5 6.91602V14.3327C17.5 16.5418 15.7091 18.3327 13.5 18.3327H6.5C4.29086 18.3327 2.5 16.5418 2.5 14.3327V6.91602Z"
        strokeWidth="1.5"
      />
      <path d="M2.5 7.5H17.5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.66667 1.66602L6.66667 4.16602" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.3333 1.66602V4.16602" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="12.4993" r="0.833333" fill="#006FCC" />
      <ellipse cx="13.3333" cy="12.4993" rx="0.833333" ry="0.833333" fill="#006FCC" />
      <ellipse cx="6.66667" cy="12.4993" rx="0.833333" ry="0.833333" fill="#006FCC" />
    </svg>
  </Icon>
);

export default CalendarDots;
