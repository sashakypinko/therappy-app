import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Card = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M1.66675 5.83333C1.66675 3.99238 3.15913 2.5 5.00008 2.5H15.0001C16.841 2.5 18.3334 3.99238 18.3334 5.83333V14.1667C18.3334 16.0076 16.841 17.5 15.0001 17.5H5.00008C3.15913 17.5 1.66675 16.0076 1.66675 14.1667V5.83333Z"
        stroke="#8D8FA3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M1.66675 5.83398H18.3334V9.16732H1.66675V5.83398Z"
        stroke="#8D8FA3"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6.66667 14.166H5" stroke="#8D8FA3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Icon>
);

export default Card;
