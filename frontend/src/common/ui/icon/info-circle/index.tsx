import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const InfoCircle = ({ size = 16, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_1068_6995)">
        <path
          d="M8 5.33301V5.99967M8 7.66634V10.6663M8 14.6663C11.6819 14.6663 14.6667 11.6816 14.6667 7.99967C14.6667 4.31778 11.6819 1.33301 8 1.33301C4.3181 1.33301 1.33333 4.31778 1.33333 7.99967C1.33333 11.6816 4.3181 14.6663 8 14.6663Z"
          stroke="#088CEF"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1068_6995">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default InfoCircle;
