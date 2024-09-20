import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const QuestionCircle = ({ size = 32, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M12 11.9998C12 9.7907 13.7909 7.99984 16 7.99984C18.2092 7.99984 20 9.7907 20 11.9998C20 13.7505 18.8754 15.2384 17.3092 15.7807C16.6134 16.0216 16 16.5968 16 17.3332V18.6665M29.3334 15.9998C29.3334 23.3636 23.3638 29.3332 16 29.3332C8.63622 29.3332 2.66669 23.3636 2.66669 15.9998C2.66669 8.63604 8.63622 2.6665 16 2.6665C23.3638 2.6665 29.3334 8.63604 29.3334 15.9998Z"
        stroke="#28303F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="16" cy="22.6668" rx="1.33333" ry="1.33333" fill="#28303F" />
    </svg>
  </Icon>
);

export default QuestionCircle;
