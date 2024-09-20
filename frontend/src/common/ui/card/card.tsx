import { type ReactNode } from 'react';
import { Box, styled, type Theme, useTheme } from '@mui/material';

const StyledCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: `
                0px 3px 3px -2px rgba(0,0,0,0.2),
                0px 3px 4px 0px rgba(0,0,0,0.14),
                0px 1px 8px 0px rgba(0,0,0,0.12)
               `,
  borderRadius: 8,
  padding: 32,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  const theme: Theme = useTheme();

  return <StyledCard theme={theme}>{children}</StyledCard>;
};

export default Card;
