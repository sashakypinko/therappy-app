import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Profile = ({ size = 20, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_1822_2574)">
        <circle cx="10" cy="10.0003" r="8.33333" strokeWidth="1.5" strokeLinejoin="round" />
        <path
          d="M14.1667 14.1667C12.9322 13.1047 11.5116 12.5 10 12.5C8.48839 12.5 7.06782 13.1047 5.83333 14.1667"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(1 0 0 -1 7.5 10)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1822_2574">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Profile;
