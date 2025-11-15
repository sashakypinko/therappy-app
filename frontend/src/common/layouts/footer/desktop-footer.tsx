import { ReactElement } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { FacebookOutlined, GitHub, Instagram, Twitter } from '@mui/icons-material';
import { colors } from '../../../config/theme/colors';
import { ProviderRouteEnum } from "../../../modules/provider/routes/enums/route.enum";

const FooterContainer = styled(Box)(
  () => `
  display: flex;
  padding: 56px 80px;
  justify-content: space-between;
  background: ${colors.primary[100]};
`,
);

const Subtitle = styled(Typography)(
  () => `
  color: #F0F0F0;
  font-size: 14px;
  font-weight: 400;
  line-height: 28px;
  margin-left: 8px;
`,
);

const Signature = styled(Typography)(
  () => `
  color: ${colors.secondary[50]};
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-left: 8px;
  margin-top: 40px;
`,
);

const Link = styled('a')(
  () => `
  color: ${colors.secondary[30]};
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: none;
  margin-left: 24px;
  margin-right: 8px;
  cursor: pointer;
`,
);

const DesktopFooter = (): ReactElement => {
  const scrollToSection = (to: string) => document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <FooterContainer>
      <Box>
        <img src="/img/logo.svg" />
        <Subtitle>Therapy made easy.</Subtitle>
        <Signature>© 2023 Company name. All rights reserved. </Signature>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton color="secondary">
            <Twitter />
          </IconButton>
          <IconButton color="secondary">
            <FacebookOutlined />
          </IconButton>
          <IconButton color="secondary">
            <Instagram />
          </IconButton>
          <IconButton color="secondary">
            <GitHub />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
          <Link onClick={() => scrollToSection('services')}>Services</Link>
          <Link onClick={() => scrollToSection('advantages')}>About us</Link>
          <Link onClick={() => scrollToSection('why_therappy')}>Benefits</Link>
          <Link onClick={() => scrollToSection('our_professionals')}>Our specialists</Link>
          <Link href={ProviderRouteEnum.SIGN_UP}>Join us</Link>
          <Link>Contacts</Link>
        </Box>
      </Box>
    </FooterContainer>
  );
};

export default DesktopFooter;
