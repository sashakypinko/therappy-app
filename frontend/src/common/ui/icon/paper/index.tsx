import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Paper = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_1159_27411)">
        <path
          d="M4.66667 14.6663C5.91165 14.6663 6.95737 13.8132 7.25105 12.6596C7.34188 12.3028 7.63181 11.9997 8 11.9997H12.6667M4.66667 14.6663C3.19391 14.6663 2 13.4724 2 11.9997V3.33301C2 2.22844 2.89543 1.33301 4 1.33301H10.6667C11.7712 1.33301 12.6667 2.22844 12.6667 3.33301V11.9997M4.66667 14.6663H12.6667C13.9117 14.6663 14.9574 13.8132 15.251 12.6596C15.3419 12.3028 15.0349 11.9997 14.6667 11.9997H12.6667M10 4.66634H4.66667M7.33333 7.99967H4.66667"
          stroke="#8D8FA3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1159_27411">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Paper;
