import { ReactElement, ReactNode } from 'react';
import { Box, Container, Divider as MuiDivider, Grid, styled, Typography } from '@mui/material';
import { Book, NoteBook, QuestionCircle } from '../../../../../common/ui/icon';
import { colors } from '../../../../../config/theme/colors';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)(
  ({ theme }) => `
     @media (min-width: ${theme.breakpoints.values.sm}px) {
       padding-top: 74px;
     }
`,
);

const Title = styled(Typography)(
  () => `
    color: ${colors.secondary[90]};
`,
);

const Description = styled(Typography)(
  () => `
    text-align: start;
    color: ${colors.secondary[70]};
`,
);

const AdditionalInfo = styled(Typography)(
  () => `
    margin-top: 16px;
    color: ${colors.secondary[40]};
`,
);

const Divider = styled(MuiDivider)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
       display: block;
     }
`,
);

const Image = styled('img')(
  () => `
    width: 100%;
`,
);

const BottomLinks = styled(Grid)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    
    @media (min-width: ${theme.breakpoints.values.md}px) {
       margin-top: 96px;
    }
`,
);

const BottomLinkContainer = styled(Grid)(
  ({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: start;
    margin-bottom: 32px;
    
     @media (max-width: ${theme.breakpoints.values.md}px) {
       justify-content: start;
     }
`,
);

const BottomLink = styled(Link)(
  () => `
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    color: ${colors.primary[60]};
    text-decoration: none;
`,
);

const BottomLinkDescription = styled(Typography)(
  () => `
    max-width: 172px;
    color: ${colors.secondary[70]};
`,
);

interface Props {
  title: string | ReactNode;
  description: string | ReactNode;
  image?: string;
  additionalInfo?: string | ReactNode;
}

const AuthMessagePage = ({
  title,
  description,
  image = '/img/email-verify.svg',
  additionalInfo,
}: Props): ReactElement => {
  return (
    <StyledContainer maxWidth="md">
      <Grid sx={{ display: 'flex', justifyContent: 'center', mb: 4 }} container>
        <Grid sx={{ textAlign: 'center', mt: 4 }} item lg={10} md={12} sm={12}>
          <Image src={image} />
        </Grid>
        <Grid sx={{ textAlign: 'center', mt: 4 }} item md={8} sm={8}>
          <Title sx={{ mb: 4 }} variant="h3">
            {title}
          </Title>
          {description}
          {additionalInfo && <AdditionalInfo variant="subtitle1">{additionalInfo}</AdditionalInfo>}
        </Grid>
      </Grid>
      <BottomLinks container>
        <Divider sx={{ display: 'none', width: '100%', mb: 4 }} />
        <BottomLinkContainer item md={4} sm={8} xs={12}>
          <Book />
          <Box sx={{ ml: 2 }}>
            <BottomLink to={''}>Guide for working with us</BottomLink>
            <BottomLinkDescription>Find out about the benefits of our platform</BottomLinkDescription>
          </Box>
        </BottomLinkContainer>
        <Divider sx={{ display: 'none', width: '100%', mb: 4 }} />
        <BottomLinkContainer item md={4} sm={8} xs={12}>
          <NoteBook />
          <Box sx={{ ml: 2 }}>
            <BottomLink to={''}>Read our FAQ</BottomLink>
            <BottomLinkDescription>Get answers to popular questions</BottomLinkDescription>
          </Box>
        </BottomLinkContainer>
        <Divider sx={{ display: 'none', width: '100%', mb: 4 }} />
        <BottomLinkContainer item md={4} sm={8} xs={12}>
          <QuestionCircle />
          <Box sx={{ ml: 2 }}>
            <BottomLink to={''}>Get more help</BottomLink>
            <BottomLinkDescription>Get a guide to solving common difficulties</BottomLinkDescription>
          </Box>
        </BottomLinkContainer>
      </BottomLinks>
    </StyledContainer>
  );
};

export default AuthMessagePage;
