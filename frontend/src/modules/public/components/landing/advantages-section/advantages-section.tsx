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

const AdvantagesSection = ({ content }: { content: ILandingContent }): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Section id="advantages">
      <Grid container spacing={isMobile ? 4 : 10}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography
            variant="h1"
            textAlign="center"
            maxWidth={900}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_title }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box width={64}>
            <img width="100%" src="/img/car.png" />
          </Box>
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h3' : 'h4'}
            fontWeight={600}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_1_card_title }}
          />
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h4' : 'h6'}
            fontWeight={500}
            color={colors.secondary[70]}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_1_card_text }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box width={64}>
            <img width="100%" src="/img/shield.png" />
          </Box>
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h3' : 'h4'}
            fontWeight={600}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_2_card_title }}
          />
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h4' : 'h6'}
            fontWeight={500}
            color={colors.secondary[70]}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_2_card_text }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box width={64}>
            <img width="100%" src="/img/card.png" />
          </Box>
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h3' : 'h4'}
            fontWeight={600}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_3_card_title }}
          />
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h4' : 'h6'}
            fontWeight={500}
            color={colors.secondary[70]}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_3_card_text }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box width={64}>
            <img width="100%" src="/img/time.png" />
          </Box>
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h3' : 'h4'}
            fontWeight={600}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_4_card_title }}
          />
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h4' : 'h6'}
            fontWeight={500}
            color={colors.secondary[70]}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_4_card_text }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box width={64}>
            <img width="100%" src="/img/smile.png" />
          </Box>
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h3' : 'h4'}
            fontWeight={600}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_5_card_title }}
          />
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h4' : 'h6'}
            fontWeight={500}
            color={colors.secondary[70]}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_5_card_text }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box width={64}>
            <img width="100%" src="/img/rating.png" />
          </Box>
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h3' : 'h4'}
            fontWeight={600}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_6_card_title }}
          />
          <Typography
            sx={{ mt: 1 }}
            variant={isMobile ? 'h4' : 'h6'}
            fontWeight={500}
            color={colors.secondary[70]}
            dangerouslySetInnerHTML={{ __html: content.advantages_section_6_card_text }}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default AdvantagesSection;
