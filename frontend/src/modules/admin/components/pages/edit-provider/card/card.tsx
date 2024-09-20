import { Box, styled, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import { colors } from '../../../../../../config/theme/colors';

const StyledCard = styled(Box)(
  () => `
    padding: 32px;
    margin-bottom: 16px;
    border-radius: 16px;
    border: 1px solid ${colors.secondary[30]};
    background: ${colors.background.BG_1};
`,
);

interface Props {
  title?: string;
  children: ReactNode;
}

const Card = ({ title, children }: Props): ReactElement => {
  return (
    <StyledCard>
      {title && (
        <Typography sx={{ mb: 2 }} variant="subtitle1" color={colors.primary[60]}>
          {title}
        </Typography>
      )}
      {children}
    </StyledCard>
  );
};

export default Card;
