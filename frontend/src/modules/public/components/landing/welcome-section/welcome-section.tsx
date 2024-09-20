import { ReactElement } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import Button from '../../../../../common/ui/button';
import { colors } from '../../../../../config/theme/colors';
import { PublicRouteEnum } from '../../../routes/enums/route.enum';
import { Link } from 'react-router-dom';
import { ILandingContent } from "../../../../../services/api/landing-content/dto/landing-content.dto";

const Section = styled(Box)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 16px;
    }
`,
);

const MainImage = styled('img')(
  ({ theme }) => `
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      margin-top: 104px;
      border-radius: 18px;
      height: auto;
    }
`,
);

const StyledButton = styled(Button)(
  () => `
  background: ${colors.primary[50]};
  height: 56px;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`,
);

const WelcomeSection = ({ content }: { content: ILandingContent}): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Section id="welcome">
      <Grid container>
        <Grid item display="flex" justifyContent="center" alignItems="center" sm={12} md={6} order={isMobile ? 1 : 0}>
          <Box maxWidth={460}>
            <Typography sx={{ mt: 2 }} variant="h1" dangerouslySetInnerHTML={{ __html: content.welcome_section_title }} />
            <Typography sx={{ mt: 3 }} variant="h4" dangerouslySetInnerHTML={{ __html: content.welcome_section_subtitle }} />
            <Link to={PublicRouteEnum.BOOK_APPOINTMENT} style={{ textDecoration: 'none'}}>
              <StyledButton sx={{ mt: 4 }} variant="contained">
                {content.welcome_section_button}
              </StyledButton>
            </Link>
          </Box>
        </Grid>
        <Grid item sm={12} md={6} order={isMobile ? 0 : 1}>
          <MainImage
            src="/img/landing-main-720.png"
            srcSet="/img/landing-main-1200.png 1200w, /img/landing-main-960.png 960w, /img/landing-main-720.png 720w, /img/landing-main-480.png 480w"
            sizes="(min-width: 900px) calc(50.76vw - 23px), (min-width: 600px) calc(100vw - 32px), (min-width: 560px) 480px, calc(100vw - 32px)"
            alt="Therappy main image"
            loading="lazy"
            fetchpriority="high"
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default WelcomeSection;
