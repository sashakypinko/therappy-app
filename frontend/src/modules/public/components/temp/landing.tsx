import { ReactElement } from 'react';
import { Container, styled } from '@mui/material';
import { colors } from '../../../../config/theme/colors';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import TemporaryWelcomeSection from './temporary-welcome-section';

const StyledContainer = styled(Container)(
  ({ theme }) => `
    max-width: 100% !important;
    padding: 0 !important;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 16px !important;
    }
`,
);

const Landing = (): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <StyledContainer sx={isMobile ? { background: colors.background.BG_1 } : {}}>
      <TemporaryWelcomeSection />
    </StyledContainer>
  );
};

export default Landing;
