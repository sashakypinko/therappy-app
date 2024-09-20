import { ReactElement, ReactNode } from 'react';
import { styled, SxProps, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

const StyledIcon = styled(Typography)(
  () => `
  display: flex;
  align-items: center;
`,
);

export interface BaseIconProps {
  children: ReactNode;
  className?: string;
}

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  sx?: SxProps<Theme>;
}

export const Icon = ({ children, ...props }: BaseIconProps): ReactElement => {
  return <StyledIcon {...props}>{children}</StyledIcon>;
};
