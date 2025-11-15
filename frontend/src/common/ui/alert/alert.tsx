import React, { ReactElement, ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import { colors } from '../../../config/theme/colors';

const StyledBox = styled(Box)(
  () => `
    display: flex;
    padding: 8px;
    border-radius: 8px;
`,
);

interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  children: ReactNode;
}

const Alert = ({ icon, variant = 'primary', children }: Props): ReactElement => {
  return (
    <StyledBox
      sx={{
        border: `1px solid ${colors[variant][40]}`,
        background: colors[variant][10],
      }}
    >
      {icon && icon}
      <Box sx={{ ml: 2 }}>{children}</Box>
    </StyledBox>
  );
};

export default Alert;
