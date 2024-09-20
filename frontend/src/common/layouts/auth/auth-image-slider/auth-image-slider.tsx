import { ReactElement, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const Container = styled(Box)(
  () => `
    position: absolute;
    bottom: 12px;
    width: 95%;
    padding: 24px 40px;
    color: #fff;
    flex-grow: 1;
    font-size: 18px;
    border-radius: 8px;
    background: rgba(66, 68, 72, 0.72);
    backdrop-filter: blur(11px);
`,
);

const Text = styled(Typography)(
  ({ theme }) => `
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    
      @media (max-width: ${theme.breakpoints.values.md}px) {
        font-size: 12px;
        line-height: 20px;
       }
`,
);

const Quote = styled(Typography)(
  () => `
    font-size: 55px;
    font-weight: 700;
    line-height: 32px;
`,
);

const Steps = styled(Box)(
  () => `
    display: flex;
`,
);

const Step = styled(Box)(
  () => `
    height: 4px;
    width: 100%;
    margin-right: 4px;
    background: #fff;
    border-radius: 5px;
    opacity: 0.3;
`,
);

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const list = [
  {
    name: 'Matt Emard',
    text: "What sets this platform apart is the exceptional customer support. Anytime I've had a question or needed assistance, the response has been quick and helpful. It's evident that they prioritize user satisfaction and go above and beyond to ensure a positive experience.",
  },
  {
    name: 'Viola Davis',
    text: "I  can't say enough about how amazing this platform is! It's so user-friendly and takes the hassle out of finding a great massage therapist. The profiles are detailed, making it easy to choose a specialist tailored to my needs. ",
  },
  {
    name: 'Felipe Ebert',
    text: "I lead a busy life, and this platform has been a game-changer for me.  Every therapist I've seen has been professional, skilled, and attentive to my needs. The platform's commitment to user satisfaction is evident, and I couldn't be happier with the service.",
  },
  {
    name: 'Philip Wolff',
    text: "The therapists are truly exceptional. The app's interface is intuitive, and the customer support is outstanding. This has become my go-to for finding skilled massage specialists. Highly recommend!",
  },
];

const AuthImageSlider = (): ReactElement => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Container>
      <AutoPlaySwipeableViews index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
        {list.map((item, index) => (
          <Box key={item.name} sx={{ height: '240px', pt: 1 }}>
            <Quote>“</Quote>
            {Math.abs(activeStep - index) <= 2 ? <Text>{item.text}</Text> : null}
            <Quote sx={{ transform: 'rotate(180deg)' }}>“</Quote>
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <Steps>
        {list.map((item, index) => (
          <Step
            key={`step_${item.name}`}
            sx={{ opacity: activeStep === index ? 1 : 0.3 }}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </Steps>
    </Container>
  );
};

export default AuthImageSlider;
