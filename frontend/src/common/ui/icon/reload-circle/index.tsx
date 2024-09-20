import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Dashboard = ({ size = 24, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_3665_9780)">
        <path
          d="M11.4881 5L12.1506 6.66846C11.5227 6.31468 10.7868 6.11111 10 6.11111C7.69881 6.11111 5.83333 7.85223 5.83333 10C5.83333 10.3457 5.88167 10.6809 5.97238 11M8.51191 15L7.84943 13.3315C8.47724 13.6853 9.21315 13.8889 10 13.8889C12.3012 13.8889 14.1667 12.1478 14.1667 10C14.1667 9.65427 14.1183 9.31909 14.0276 9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="9.99984" r="8.33333" strokeWidth="1.5" />
      </g>
      <defs>
        <clipPath id="clip0_3665_9780">
          <rect width={size} height={size} fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Dashboard;
