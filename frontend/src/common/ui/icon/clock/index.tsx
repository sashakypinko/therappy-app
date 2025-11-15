import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Clock = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_719_10603)">
        <path
          d="M9.41418 7.25195L6.58576 10.0804"
          stroke="#8D8FA3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.41418 10.0811L6.58576 7.25263"
          stroke="#8D8FA3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8.66699" r="6" stroke="#8D8FA3" strokeWidth="1.5" />
        <path
          d="M11.2023 1.33301C12.618 1.95208 13.82 2.96909 14.6667 4.24261M4.79776 1.33301C3.38206 1.95208 2.18013 2.96909 1.33337 4.24261"
          stroke="#8D8FA3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 14.667L12.5048 12.667M2 14.667L3.49514 12.667"
          stroke="#8D8FA3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_719_10603">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Clock;
