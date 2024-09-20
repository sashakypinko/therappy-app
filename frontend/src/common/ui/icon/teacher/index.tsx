import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Teacher = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5.83335 5.83333V4.16667C5.83335 3.24619 6.57955 2.5 7.50002 2.5H16.6667C17.5872 2.5 18.3334 3.24619 18.3334 4.16667V11.6667C18.3334 12.5871 17.5872 13.3333 16.6667 13.3333H12.5M9.16669 6.25H15M11.6667 9.58333H15M4.65484 13.8215C5.30572 14.4724 6.36099 14.4724 7.01187 13.8215C7.32443 13.5089 7.74835 13.3333 8.19038 13.3333H8.33335C9.25383 13.3333 10 14.0795 10 15V15.8333C10 16.7538 9.25383 17.5 8.33335 17.5H3.33335C2.41288 17.5 1.66669 16.7538 1.66669 15.8333V15C1.66669 14.0795 2.41288 13.3333 3.33335 13.3333H3.47633C3.91836 13.3333 4.34228 13.5089 4.65484 13.8215ZM7.50002 10C7.50002 10.9205 6.75383 11.6667 5.83335 11.6667C4.91288 11.6667 4.16669 10.9205 4.16669 10C4.16669 9.07953 4.91288 8.33333 5.83335 8.33333C6.75383 8.33333 7.50002 9.07953 7.50002 10Z" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </Icon>
);

export default Teacher;
