import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const CircleError = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="17" r="1" transform="rotate(-180 12 17)" fill="#F04438" />
      <path
        d="M12 14L12 7M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke="#F04438"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default CircleError;
