import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Location = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <ellipse cx="8" cy="7.33398" rx="2" ry="2" stroke="#8D8FA3" strokeWidth="1.5" />
      <path
        d="M14 7.25991C14 10.5327 10.25 14.6673 8 14.6673C5.75 14.6673 2 10.5327 2 7.25991C2 3.98711 4.68629 1.33398 8 1.33398C11.3137 1.33398 14 3.98711 14 7.25991Z"
        stroke="#8D8FA3"
        strokeWidth="1.5"
      />
    </svg>
  </Icon>
);

export default Location;
