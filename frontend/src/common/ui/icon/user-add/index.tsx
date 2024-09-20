import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const UserAdd = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <ellipse cx="8.33333" cy="14.5837" rx="5.83333" ry="2.91667" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="8.33333" cy="5.83333" r="3.33333" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M17.5 9.16699H14.1667" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15.8333 7.49967L15.8333 10.833" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </Icon>
);

export default UserAdd;
