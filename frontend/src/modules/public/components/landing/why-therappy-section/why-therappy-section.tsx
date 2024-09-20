import { ReactElement, useState } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';
import Button from '../../../../../common/ui/button';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { shortString } from '../../../../../helpers/string.helper';
import { ILandingContent } from '../../../../../services/api/landing-content/dto/landing-content.dto';

const Section = styled(Box)(
  ({ theme }) => `
    padding: 82px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 16px;
    }
`,
);

const StyledButton = styled(Button)(
  () => `
  height: 56px;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
`,
);

const WhyTherappyImage = styled('img')(
  () => `
  width: 100%;
  border-radius: 16px;
`,
);

const WhyTherappySection = ({ content }: { content: ILandingContent }): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <Section id="why_therappy">
      <Grid container spacing={isMobile ? 0 : 10}>
        <Grid item xs={12} md={5} lg={6} order={isMobile ? 1 : 0}>
          <Typography
            sx={{ mt: 2 }}
            variant="h1"
            textAlign={isMobile ? 'center' : 'start'}
            dangerouslySetInnerHTML={{ __html: content.why_therappy_section_title }}
          />
          <Typography
            sx={{ mt: 4 }}
            variant={isMobile ? 'h3' : 'h4'}
            dangerouslySetInnerHTML={{ __html: content.why_therappy_section_text }}
          />
          {/* <StyledButton */}
          {/*   sx={{ mt: 4 }} */}
          {/*   color={expanded ? 'secondary' : 'primary'} */}
          {/*   variant="contained" */}
          {/*   onClick={() => setExpanded(!expanded)} */}
          {/* > */}
          {/*   Snow {expanded ? 'less' : 'more'} */}
          {/* </StyledButton> */}
        </Grid>
        <Grid item xs={12} md={7} lg={6} order={isMobile ? 0 : 1}>
          <WhyTherappyImage src="/img/why-therappy.png" fetchpriority="low" />
        </Grid>
      </Grid>
    </Section>
  );
};

export default WhyTherappySection;
