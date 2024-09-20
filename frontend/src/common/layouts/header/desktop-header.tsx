import { ReactElement } from 'react';
import { Box, styled } from '@mui/material';
import { colors } from '../../../config/theme/colors';
import Button from '../../ui/button';
import { ClientRouteEnum } from '../../../modules/client/routes/enums/route.enum';
import { ProviderRouteEnum } from '../../../modules/provider/routes/enums/route.enum';

const HeaderContainer = styled(Box)(
  () => `
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 32px;
  justify-content: space-between;
  background: ${colors.background.BG_1};
  z-index: 9999;
`,
);

const Links = styled(Box)(
  () => `
  display: flex;
`,
);

const Link = styled('a')(() => `
  color: ${colors.secondary[70]};
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-decoration: none;
  margin-left: 40px;
  cursor: pointer;
`);

enum Test {
  ONE = 'one',
  TWO = 'two',
}

const DesktopHeader = (): ReactElement => {
  const scrollToSection = (to: string) => document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <HeaderContainer>
      <img src="/img/logo.svg" />
      <Links>
        <Link onClick={() => scrollToSection('services')}>Services</Link>
          <Link onClick={() => scrollToSection('advantages')}>How we work</Link>
        <Link onClick={() => scrollToSection('why_therappy')}>Benefits</Link>
        <Link onClick={() => scrollToSection('our_professionals')}>Our Therapists</Link>
        <Link href={ProviderRouteEnum.SIGN_IN}>Therapist Login</Link>
        <Link>Contacts</Link>
      </Links>
      <Box>
        <Button
          sx={{ mr: 2, color: colors.primary[50] }}
          onClick={() => (window.location.href = ClientRouteEnum.SIGN_IN)}
        >
          Login
        </Button>
        <Button
          sx={{ background: colors.primary[50] }}
          onClick={() => (window.location.href = ClientRouteEnum.SIGN_UP)}
          variant="contained"
        >
          Sign Up
        </Button>
      </Box>
    </HeaderContainer>
  );
};

export default DesktopHeader;
