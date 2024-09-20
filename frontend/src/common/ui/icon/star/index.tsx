import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Star = ({ size = 20, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g clipPath="url(#clip0_3226_3038)">
        <path
          d="M8.36068 2.72553C9.03125 1.31285 10.9687 1.31284 11.6393 2.72552L12.7982 5.167C13.0645 5.72797 13.5793 6.1168 14.1747 6.20675L16.7661 6.59826C18.2656 6.82479 18.8643 8.74064 17.7793 9.84025L15.9041 11.7407C15.4732 12.1773 15.2766 12.8065 15.3783 13.423L15.821 16.1065C16.0771 17.6592 14.5097 18.8432 13.1685 18.1101L10.8507 16.8432C10.3181 16.5521 9.68188 16.5521 9.14931 16.8432L6.83147 18.1101C5.49033 18.8432 3.92285 17.6592 4.17899 16.1065L4.62166 13.423C4.72337 12.8065 4.52676 12.1773 4.0959 11.7407L2.22073 9.84025C1.13572 8.74064 1.73444 6.82479 3.23388 6.59826L5.82531 6.20675C6.42074 6.1168 6.93547 5.72797 7.20176 5.167L8.36068 2.72553Z"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3226_3038">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </Icon>
);

export default Star;
