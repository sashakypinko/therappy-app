import { ReactElement, ReactNode } from 'react';
import { Box, Container, Grid, styled, Typography } from '@mui/material';

const FormContainerGrid = styled(Grid)(
  ({ theme }) => `
  display: flex;
  justify-content: center;
  padding-top: 148px;
  width: 100%;
  
   @media (max-width: ${theme.breakpoints.values.md}px) {
      padding-top: 24px;
   }
`,
);

const FormContent = styled(Box)(
  ({ theme }) => `
    width: 70%;
    
    @media (max-width: ${theme.breakpoints.values.sm}px) {
        width: 100%;
      }
`,
);

const Subtitle = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
`,
);

const Description = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.text.secondary};
`,
);

const ImageWrapper = styled(Grid)(
  ({ theme }) => `
      margin-top: 24px;
      position: fixed;
      right: 60;
      
      @media (max-width: ${theme.breakpoints.values.md}px) {
        position: relative;
        right: 0;
      }
`,
);

const ImageContainer = styled(Box)(
  ({ theme }) => `
    position: relative;
    display: flex;
    justify-content: center;
    
      @media (min-width: ${theme.breakpoints.values.md}px) {
        justify-content: start !important;
      }
  
`,
);

const Image = styled('img')(
  ({ theme }) => `
  max-height: 93vh;
  max-width: 45vw;
  width: auto;
  border-radius: 8px;
  
  @media (max-width: ${theme.breakpoints.values.md}px) {
      max-height: none;
    max-width: 92vw; 
  }
`,
);

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageSlider?: ReactNode;
  paddingTop?: number;
  children: ReactNode;
}

const AuthPage = ({ children, title, subtitle, description, image, imageSlider }: Props): ReactElement => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container>
        <FormContainerGrid item lg={7} md={6} sm={12}>
          <FormContent>
            <Typography variant="h3" sx={{ mb: 3 }}>
              {title}
            </Typography>
            {subtitle && (
              <Subtitle variant="subtitle1" sx={{ mb: 1 }}>
                {subtitle}
              </Subtitle>
            )}
            {description && <Description sx={{ mb: 7 }}>{description}</Description>}
            <Box sx={{ mt: 1 }}>{children}</Box>
          </FormContent>
        </FormContainerGrid>
        <ImageWrapper sx={{ mt: 3, position: 'fixed', right: 60 }} item>
          <ImageContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <Image src={image} />
              {imageSlider && imageSlider}
            </Box>
          </ImageContainer>
        </ImageWrapper>
      </Grid>
    </Container>
  );
};

export default AuthPage;
