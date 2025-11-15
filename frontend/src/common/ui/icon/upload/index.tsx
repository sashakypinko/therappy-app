import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Upload = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M9.5 6.5L12.5 3.5M12.5 3.5L15.5 6.5M12.5 3.5L12.5 15.5"
        stroke="#8D8FA3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 9.5L7.5 9.5C5.29086 9.5 3.5 11.2909 3.5 13.5L3.5 17.5C3.5 19.7091 5.29086 21.5 7.5 21.5L17.5 21.5C19.7091 21.5 21.5 19.7091 21.5 17.5L21.5 13.5C21.5 11.2909 19.7091 9.5 17.5 9.5L17 9.5"
        stroke="#8D8FA3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default Upload;
