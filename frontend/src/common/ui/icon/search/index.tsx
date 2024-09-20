import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Search = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_340_5771)">
        <path
          d="M13 11.139L14.2811 12.4201C14.7952 12.9342 14.7952 13.7677 14.2811 14.2818C13.767 14.7958 12.9336 14.7958 12.4195 14.2818L11.1384 13.0007M1.33331 7.00065C1.33331 3.87104 3.87037 1.33398 6.99998 1.33398C10.1296 1.33398 12.6666 3.87104 12.6666 7.00065C12.6666 10.1303 10.1296 12.6673 6.99998 12.6673C3.87037 12.6673 1.33331 10.1303 1.33331 7.00065Z"
          stroke="#595A70"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_340_5771">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Search;
