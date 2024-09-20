import { ReactElement } from 'react';
import { Icon, IconProps } from '../icon';

const Filter = ({ size = 16, ...props }: IconProps): ReactElement => (
  <Icon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M12.5459 1.33398H3.45411C2.29467 1.33398 1.6031 2.61102 2.24625 3.56441L6.06071 8.55228C6.37866 9.02361 6.54833 9.5774 6.54833 10.1439V13.9486C6.54833 14.5876 7.33016 14.9077 7.78741 14.4558L9.23908 13.0211C9.3752 12.8866 9.45167 12.7042 9.45167 12.5139V10.1439C9.45167 9.5774 9.62134 9.02361 9.93929 8.55228L13.7538 3.56441C14.3969 2.61102 13.7053 1.33398 12.5459 1.33398Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Icon>
);

export default Filter;
