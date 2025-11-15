import { ReactElement } from 'react';
import { Box, Grid, Rating, styled, Typography } from '@mui/material';
import { colors } from '../../../../../config/theme/colors';
import Scrollable from '../../../../../common/components/scrollable';
import { StarRounded } from '@mui/icons-material';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { ILandingContent } from "../../../../../services/api/landing-content/dto/landing-content.dto";

const ReviewCard = styled(Box)(
  ({ theme }) => `
    margin: 8px;
    padding: 32px;
    border-radius: 16px;
    background: ${colors.background.BG_1};
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      border: 1px solid ${colors.secondary[30]};
    }
`,
);

const reviews = [
  {
    name: 'Ernest Nienow',
    rating: 4,
    text: "The specialists are truly exceptional. The app's interface is intuitive and customer support is excellent. This became my guide in finding a personal trainer. Highly recommend!",
  },
  {
    name: 'Philip Wolff',
    rating: 5,
    text: "The specialists are truly exceptional. The app's interface is intuitive and customer support is excellent. This became my guide in finding a personal trainer. Highly recommend!",
  },
  {
    name: 'Matt Emard',
    rating: 5,
    text: "What sets this platform apart is the exceptional customer support. Anytime I've had a question or needed assistance, the response has been quick and helpful. It's evident that.",
  },
  {
    name: 'Viola Davis ',
    rating: 3,
    text: "I  can't say enough about how amazing this platform is! It's so user-friendly and takes the hassle out of finding a great physiotherapist. The profiles are detailed, making it easy to choose a specialist...",
  },
  {
    name: 'Ernest Nienow',
    rating: 4,
    text: "The specialists are truly exceptional. The app's interface is intuitive and customer support is excellent. This became my guide in finding a personal trainer. Highly recommend!",
  },
  {
    name: 'Philip Wolff',
    rating: 5,
    text: "The specialists are truly exceptional. The app's interface is intuitive and customer support is excellent. This became my guide in finding a personal trainer. Highly recommend!",
  },
  {
    name: 'Matt Emard',
    rating: 5,
    text: "What sets this platform apart is the exceptional customer support. Anytime I've had a question or needed assistance, the response has been quick and helpful. It's evident that.",
  },
  {
    name: 'Viola Davis ',
    rating: 3,
    text: "I  can't say enough about how amazing this platform is! It's so user-friendly and takes the hassle out of finding a great physiotherapist. The profiles are detailed, making it easy to choose a specialist...",
  },
];

const ReviewsSection = ({ content }: { content: ILandingContent}): ReactElement => {
  const isMobile = useIsMobile();
  return (
    <Box id="reviews" sx={{ pt: isMobile ? 0 : 10, pb: 16 }}>
      <Grid container spacing={isMobile ? 2 : 10}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography variant="h1" textAlign="center" maxWidth={900} dangerouslySetInnerHTML={{ __html: content.reviews_section_title }} />
        </Grid>
        <Grid item xs={12}>
          <Scrollable>
            <>
              {reviews.map(({ name, rating, text }, index) => (
                <ReviewCard key={index} minWidth={isMobile ? window.innerWidth - 64 : 412} width={412}>
                  <Typography variant="subtitle1" color={colors.secondary[70]}>
                    {name}
                  </Typography>
                  <Box display="flex">
                    <Rating
                      value={rating}
                      icon={<StarRounded sx={{ color: colors.warning[40] }} fontSize="inherit" />}
                      emptyIcon={<StarRounded color="secondary" />}
                      readOnly
                    />
                    <Typography sx={{ ml: 2 }} color={colors.secondary[50]}>
                      {rating}
                    </Typography>
                  </Box>
                  <Typography color={colors.secondary[70]}>{text}</Typography>
                </ReviewCard>
              ))}
            </>
          </Scrollable>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewsSection;
