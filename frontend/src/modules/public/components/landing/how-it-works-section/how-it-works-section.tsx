import { ReactElement } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { ILandingContent } from '../../../../../services/api/landing-content/dto/landing-content.dto';

const Section = styled(Box)(
  ({ theme }) => `
    padding: 82px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 16px;
    }
`,
);

const HowItWorksText = styled(Typography)(
  ({ theme }) => `
  padding-left: 148px;
  padding-right: 32px;
  margin-top: 22px;
  
  @media (max-width: ${theme.breakpoints.values.lg}px) {
    padding-left: 0;
  }
`,
);

const HowItWorksSection = ({ content }: { content: ILandingContent }): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Section id="how_it_works">
      <Grid container spacing={isMobile ? 0 : 10}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography
            variant="h1"
            textAlign="center"
            maxWidth={900}
            dangerouslySetInnerHTML={{ __html: content.how_it_works_section_title }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <img width="100%" src="/img/how-it-works-step1.svg" />
          </Box>
          <HowItWorksText
            variant={isMobile ? 'h3' : 'h4'}
            color="#000"
            dangerouslySetInnerHTML={{ __html: content.how_it_works_section_1_step_text }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <img width="100%" src="/img/how-it-works-step2.svg" />
          </Box>
          <HowItWorksText
            variant={isMobile ? 'h3' : 'h4'}
            color="#000"
            dangerouslySetInnerHTML={{ __html: content.how_it_works_section_2_step_text }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <img width="100%" src="/img/how-it-works-step3.svg" />
          </Box>
          <HowItWorksText
            variant={isMobile ? 'h3' : 'h4'}
            color="#000"
            dangerouslySetInnerHTML={{ __html: content.how_it_works_section_3_step_text }}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default HowItWorksSection;
