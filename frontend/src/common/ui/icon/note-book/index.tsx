import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const NoteBook = ({ size = 32, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M10.6667 17.3332H21.3333M10.6667 11.9998H21.3333M10.6667 22.6665H16M10.6667 2.6665V6.6665M21.3333 2.6665V6.6665M9.33333 29.3332H22.6667C25.6122 29.3332 28 26.9454 28 23.9998V9.99984C28 7.05432 25.6122 4.6665 22.6667 4.6665H9.33333C6.38781 4.6665 4 7.05432 4 9.99984V23.9998C4 26.9454 6.38781 29.3332 9.33333 29.3332Z"
        stroke="#28303F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  </Icon>
);

export default NoteBook;
