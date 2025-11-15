import { ReactElement } from 'react';
import { colors } from '../../../../../config/theme/colors';
import { Box, Grid, styled, Typography } from '@mui/material';
import Scrollable from '../../../../../common/components/scrollable';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { ILandingContent } from "../../../../../services/api/landing-content/dto/landing-content.dto";

const SliderImageContainer = styled(Box)(
  () => `
    margin-top: 8px;
`,
);

const SliderImage = styled('img')(
  () => `
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    aspect-ratio: 1 / 1.28;
`,
);

const professionalsImages = [
  '/img/professional-photo-1.png',
  '/img/professional-photo-2.png',
  '/img/professional-photo-3.png',
  '/img/professional-photo-4.png',
];

const ProfessionalsSection = ({ content }: { content: ILandingContent}): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Box id="our_professionals" sx={{ background: colors.background.BG_1, pb: isMobile ? 2 : 10, pt: 2 }}>
      <Grid container spacing={isMobile ? 2 : 7}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography variant="h1" textAlign="center" maxWidth={900}>
            {content.professionals_section_title}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Scrollable>
            <>
              {professionalsImages.map((image, index) => (
                <SliderImageContainer
                  key={index}
                  minWidth={isMobile ? window.innerWidth - 64 : 412}
                  marginLeft={index > 0 && professionalsImages.length > index ? (isMobile ? '12px' : '32px') : 0}
                >
                  <SliderImage src={image} fetchpriority="low"/>
                </SliderImageContainer>
              ))}
            </>
          </Scrollable>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography
            sx={{ p: isMobile ? 2 : 0 }}
            variant={isMobile ? 'h3' : 'h4'}
            textAlign="center"
            maxWidth={900}
            color={colors.secondary[70]}
          >
            {content.professionals_section_text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfessionalsSection;
