import React, { ReactElement, ReactNode } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import Button from '../../../../../../common/ui/button';

const StyledCard = styled(Box)(
  ({ theme }) => `
    position: relative;
    background: ${colors.background.BG_1};
    border-radius: 16px;
    border: 1px solid #EDEDF1;
    margin: 8px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      margin: 8px 0 !important;
    }
`,
);

const Row = styled(Box)(
  () => `
    margin-left: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`,
);

interface Props {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  buttonLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Card = ({ title, subtitle, icon, buttonLabel, disabled, onClick, children }: Props): ReactElement => {
  return (
    <Box sx={{ display: 'flow-root', width: '100%' }}>
      <StyledCard>
        <Row sx={{ mt: 2 }}>
          <Box display="flex">
            {icon && icon}
            <Typography variant="h6">{title}</Typography>
          </Box>
          {buttonLabel && onClick && (
            <Button onClick={onClick} disabled={disabled}>
              {buttonLabel}
            </Button>
          )}
        </Row>
        {subtitle && (
          <Row sx={{ mt: 0.5 }}>
            <Typography fontSize={14} color={colors.secondary[50]}>
              {subtitle}
            </Typography>
          </Row>
        )}
        {children}
      </StyledCard>
    </Box>
  );
};

export default Card;
