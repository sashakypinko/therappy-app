import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Calendar = ({ size = 20, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d="M6.66667 1.66699V4.16699" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.3333 1.66699V4.16699" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M2.5 6.91699C2.5 4.70786 4.29086 2.91699 6.5 2.91699H13.5C15.7091 2.91699 17.5 4.70785 17.5 6.91699V14.3337C17.5 16.5428 15.7091 18.3337 13.5 18.3337H6.5C4.29086 18.3337 2.5 16.5428 2.5 14.3337V6.91699Z"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 12.4997L8.83615 13.5686C9.25403 13.9029 9.86103 13.849 10.2134 13.4462L12.5 10.833"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.5 7.5H17.5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Icon>
);

export default Calendar;
