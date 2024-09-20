import { FC, ReactElement, ReactNode } from 'react';
import { SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface BaseIconProps {
  children: ReactNode;
  className?: string;
  size: number;
}

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  sx?: SxProps<Theme>;
}

const Icon = ({ children, size, ...props }: BaseIconProps): ReactElement => {
  return (
    <Typography {...props} height={size + 4} component="span" lineHeight={0} padding="2px">
      {children}
    </Typography>
  );
};

export const makeIcon =
  (name: string): FC<IconProps> =>
  ({ size = 24, ...props }: IconProps): ReactElement =>
    (
      <Icon size={size} {...props}>
        <img style={{ width: `${size}px` }} src={`/img/icons/${name}`} />
      </Icon>
    );
