import React, { ReactElement } from 'react';
import Header from '../../../../common/layouts/header';
import Footer from '../../../../common/layouts/footer';
import { Container, Grid, MenuItem, MenuList, styled, Typography } from "@mui/material";
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import { colors } from '../../../../config/theme/colors';
import { PublicRouteEnum } from '../../routes/enums/route.enum';
import { Link } from "react-router-dom";

const StyledLink = styled(Link)(
  () => `
  margin-top: 4px;
  text-decoration: none;
  color: ${colors.secondary[90]};
  font-size: 14px;
`,
);

const PrivacyPolicy = (): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <Container>
        <Grid sx={{ pt: 12, pb: 4 }} container spacing={1}>
          {!isMobile && (
            <Grid item md={3}>
              <MenuList>
                <MenuItem sx={{ mb: 3, color: colors.primary[70] }}>Privacy Policy</MenuItem>
                <StyledLink to={PublicRouteEnum.TERMS_AND_CONDITIONS}>
                  <MenuItem sx={{ mb: 3 }}>Terms & Conditions</MenuItem>
                </StyledLink>
                <StyledLink to={PublicRouteEnum.CANCELLATION_POLICY}>
                  <MenuItem sx={{ mb: 3 }}>Cancellation Policy</MenuItem>
                </StyledLink>
              </MenuList>
            </Grid>
          )}
          <Grid item xs={12} md={9} lg={8} xl={7}>
            <Typography variant="h1">Website Privacy Policy</Typography>
            <Typography sx={{ mt: 3 }} variant="h6" color={colors.secondary[50]}>
              Last modified: January 28, 2024
            </Typography>
            <Typography sx={{ mt: 4 }} variant="h2" fontWeight={600}>
              Introduction
            </Typography>
            <Typography sx={{ mt: 4 }} variant="h6" color={colors.secondary[70]} lineHeight={2}>
              At Therappy App, accessible from therappy.com.au, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Therappy App and how we use it.
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
              Consent
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              Information We Collect
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              How We Use Your Information
              We use the information we collect in various ways, including to:
              <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
              </ul>
              Log Files
              Therappy App follows a standard procedure of using log files.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
