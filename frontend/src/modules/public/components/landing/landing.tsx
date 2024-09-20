import React, { ReactElement, useEffect, useState } from "react";
import { Container, styled } from '@mui/material';
import WelcomeSection from './welcome-section';
import ServicesSection from './services-section';
import WhyTherappySection from './why-therappy-section';
import AdvantagesSection from './advantages-section';
import HowItWorksSection from './how-it-works-section';
import ProfessionalsSection from './professionals-section';
import ReviewsSection from './reviews-section';
import { colors } from '../../../../config/theme/colors';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import Footer from '../../../../common/layouts/footer';
import Header from '../../../../common/layouts/header';
import { ILandingContent } from "../../../../services/api/landing-content/dto/landing-content.dto";
import { LandingContentApi } from "../../../../services/api/landing-content";
import { defaultLandingContentValue } from "../../../../services/api/landing-content/default-landing-content-value";

const StyledContainer = styled(Container)(
  () => `
    max-width: 100% !important;
    padding: 0 !important;
`,
);

const Landing = (): ReactElement | null => {
  const [content, setContent] = useState<ILandingContent>(defaultLandingContentValue);
  const [loading, setLoading] = useState<boolean>(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    (async () => {
      try {
        setContent(await LandingContentApi.getAll());
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })()
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Header />
      <StyledContainer sx={isMobile ? { background: colors.background.BG_1 } : {}}>
        <WelcomeSection content={content}/>
        <ServicesSection content={content} />
        <WhyTherappySection content={content} />
        <AdvantagesSection content={content} />
        <HowItWorksSection content={content} />
        <ProfessionalsSection content={content} />
        <ReviewsSection content={content} />
      </StyledContainer>
      <Footer />
    </>
  );
};

export default Landing;
