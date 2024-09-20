import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Security = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M8.37545 2.38999L4.87762 3.94458C3.432 4.58708 2.46993 6.02375 2.58672 7.6014C2.93455 12.3 4.38504 14.5219 7.94439 17.0018C9.17759 17.861 10.8237 17.8632 12.0555 17.002C15.6213 14.5089 17.0257 12.2612 17.3953 7.62329C17.5219 6.03533 16.5583 4.58275 15.1026 3.93577L11.6246 2.38999C10.5903 1.93032 9.40971 1.93032 8.37545 2.38999Z"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.9987L8.83615 11.0676C9.25403 11.4019 9.86103 11.348 10.2134 10.9453L12.5 8.33203"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default Security;
