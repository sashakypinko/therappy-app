import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const BlockUser = ({ size = 20, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_4045_9828)">
        <path
          d="M5.53477 12.6025C6.61082 12.0058 7.84907 11.666 9.16668 11.666C9.44835 11.666 9.72639 11.6815 10 11.7118"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="2.5"
          cy="2.5"
          r="2.5"
          transform="matrix(1 0 0 -1 6.66667 9.16602)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M16.1627 11.8744C16.4882 11.0343 16.6667 10.121 16.6667 9.16602C16.6667 5.02388 13.3088 1.66602 9.16667 1.66602C5.02453 1.66602 1.66667 5.02388 1.66667 9.16602C1.66667 13.3082 5.02453 16.666 9.16667 16.666C10.1217 16.666 11.035 16.4875 11.8751 16.1621M16.1627 11.8744C17.4304 12.3463 18.3333 13.5674 18.3333 14.9993C18.3333 16.8403 16.8409 18.3327 15 18.3327C13.568 18.3327 12.3469 17.4297 11.8751 16.1621M16.1627 11.8744C15.8007 11.7397 15.409 11.666 15 11.666C13.1591 11.666 11.6667 13.1584 11.6667 14.9993C11.6667 15.4083 11.7403 15.8001 11.8751 16.1621"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M17.0833 12.916L12.9167 17.0827" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_4045_9828">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default BlockUser;
