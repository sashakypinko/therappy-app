import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const PeopleSync = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_819_1477)">
        <ellipse cx="5" cy="3.33268" rx="1.66667" ry="1.66667" strokeWidth="1.5" />
        <ellipse cx="5" cy="6.66667" rx="2.5" ry="1.66667" strokeWidth="1.5" />
        <circle cx="15" cy="13.3327" r="1.66667" strokeWidth="1.5" />
        <path
          d="M18.3333 9.99935C18.3333 5.39698 14.6024 1.66602 10 1.66602M10 18.3327C5.39763 18.3327 1.66667 14.6017 1.66667 9.99935"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="15" cy="16.6667" rx="2.5" ry="1.66667" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_819_1477">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default PeopleSync;
