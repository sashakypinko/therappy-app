import { ReactElement } from 'react';
import { colors } from '../../../../../config/theme/colors';
import { Box, Grid, styled, Typography } from '@mui/material';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { ILandingContent } from '../../../../../services/api/landing-content/dto/landing-content.dto';

const Section = styled(Box)(
  ({ theme }) => `
    background: ${colors.background.BG_1};
    padding: 82px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 16px;
    }
`,
);

const WelcomeCard = styled(Box)(
  ({ theme }) => `
    position: relative;
    border-radius: 24px;
    padding: 32px;
    margin-top: 64px;
    color: #fff;
    background: url(/img/welcome-background.png), lightgray 50% / cover no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      margin-top: 0;
      padding: 16px 0;
    }
`,
);

const WelcomeTextBackground = styled('img')(
  ({ theme }) => `
  position: absolute;
  background: rgba(0, 86, 165, 0.75);
  filter: blur(50px);
  width: 100%;
  height: 100%;
  
  @media (max-width: ${theme.breakpoints.values.md}px) {
    margin: 20px;
    width: 92%;
    height: 92%;
  }
`,
);

const WelcomeText = styled(Typography)(
  ({ theme }) => `
  padding-left: 32px;
  padding-right: 32px;
  position: relative;
  z-index: 10;
  
  @media (max-width: ${theme.breakpoints.values.md}px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`,
);

const ServiceImage = styled('img')(
  () => `
    border-radius: 50%;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`,
);

const ServicesSection = ({ content }: { content: ILandingContent }): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Section id="services">
      <Grid sx={{ p: 2 }} container spacing={isMobile ? 5 : 10}>
        <Grid sx={{ mb: isMobile ? 0 : 6 }} item sm={12}>
          <Typography
            sx={{ mt: 1 }}
            variant="h1"
            textAlign="center"
            dangerouslySetInnerHTML={{ __html: content.services_section_title }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceImage src="/img/massage.png" />
          <Typography sx={{ mt: 1 }} variant="h4" textAlign="center">
            Massage therapy
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceImage src="/img/physiotherapist.png" />
          <Typography sx={{ mt: 1 }} variant="h4" textAlign="center">
            Physiotherapy
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ServiceImage src="/img/exercise-physiologist.png" />
          <Typography sx={{ mt: 1 }} variant="h4" textAlign="center">
          Exercise physiologist
          </Typography>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <ServiceImage src="/img/nurse.png" />
          <Typography variant="h4" textAlign="center">
            Nurse
          </Typography>
        </Grid> */}
      </Grid>
      <Grid sx={{ mt: 2 }} container>
        <Grid item xs={12}>
          <WelcomeCard>
            <Box position="relative">
              <WelcomeTextBackground src="/img/ellipse.svg" />
              <WelcomeText
                sx={{ pt: 2 }}
                variant="h1"
                dangerouslySetInnerHTML={{ __html: content.services_section_card_title }}
              />
              <WelcomeText
                sx={{ pt: 3 }}
                variant="h4"
                maxWidth={900}
                dangerouslySetInnerHTML={{ __html: content.services_section_card_text }}
              />
            </Box>
          </WelcomeCard>
        </Grid>
      </Grid>
    </Section>
  );
};

export default ServicesSection;
