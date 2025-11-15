import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Notebook = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_4784_2583)">
        <path d="M1.66669 5.00033H5.00002M1.66669 10.0003H5.00002M1.66669 15.0003H5.00002M15 5.00033L8.33335 5.00032M11.6667 8.33366L8.33335 8.33366M6.66669 18.3337H15C16.841 18.3337 18.3334 16.8413 18.3334 15.0003V5.00033C18.3334 3.15938 16.841 1.66699 15 1.66699H6.66669C4.82574 1.66699 3.33335 3.15938 3.33335 5.00033V15.0003C3.33335 16.8413 4.82574 18.3337 6.66669 18.3337Z" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <defs>
        <clipPath id="clip0_4784_2583">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Notebook;
