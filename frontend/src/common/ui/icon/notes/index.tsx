import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Notes = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M17.5 8.33268V6.24935C17.5 4.4084 16.0076 2.91602 14.1667 2.91602H5.83333C3.99238 2.91602 2.5 4.4084 2.5 6.24935V14.9993C2.5 16.8403 3.99238 18.3327 5.83333 18.3327H7.5M6.66667 1.66602V4.16602M13.3333 1.66602V4.16602M10 18.3327L12.5506 17.6055C12.6874 17.5666 12.8119 17.4933 12.9125 17.3928L17.0915 13.2138C17.6362 12.6691 17.6362 11.7859 17.0915 11.2412C16.5468 10.6965 15.6636 10.6965 15.1189 11.2412L10.9399 15.4202C10.8394 15.5208 10.7661 15.6453 10.7271 15.782L10 18.3327Z"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

export default Notes;
