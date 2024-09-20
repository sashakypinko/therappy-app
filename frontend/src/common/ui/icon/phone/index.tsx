import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Phone = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M14 12.6667V11.5694C14 11.0242 13.6681 10.5339 13.1619 10.3314L11.8058 9.78897C11.1619 9.53143 10.4281 9.81041 10.118 10.4307L10 10.6667C10 10.6667 8.33333 10.3333 7 9C5.66667 7.66667 5.33333 6 5.33333 6L5.56934 5.88199C6.18959 5.57187 6.46857 4.83809 6.21103 4.19424L5.66859 2.83815C5.46611 2.33194 4.97583 2 4.43062 2H3.33333C2.59695 2 2 2.59695 2 3.33333C2 9.22437 6.77563 14 12.6667 14C13.403 14 14 13.403 14 12.6667Z"
        stroke="#8D8FA3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default Phone;
