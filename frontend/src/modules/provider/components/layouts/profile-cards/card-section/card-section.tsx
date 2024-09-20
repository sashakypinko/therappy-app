import React, { ReactElement, ReactNode } from 'react';
import { Box, Divider, styled, SxProps } from '@mui/material';

const StyledGrid = styled(Box)(
  ({ theme }) => `
   margin: 0 32px 32px 32px;  
   
   @media (max-width: ${theme.breakpoints.values.md}px) {
     margin: 0 16px 16px 16px;
   }
`,
);

interface Props {
  children: ReactNode;
  withTopBorder?: boolean;
  sx?: SxProps;
}

const CardSection = ({ children, withTopBorder = false, sx }: Props): ReactElement => {
  return (
    <>
      {withTopBorder && <Divider sx={{ mt: 2, mb: 2 }} />}
      <StyledGrid sx={sx}>{children}</StyledGrid>
    </>
  );
};

export default CardSection;
