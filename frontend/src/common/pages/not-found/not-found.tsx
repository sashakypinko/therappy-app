import { ReactElement } from 'react';
import { Container, Grid, styled, Typography } from '@mui/material';
import Button from '../../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { PublicRouteEnum } from '../../../modules/public/routes/enums/route.enum';
import { colors } from '../../../config/theme/colors';

const Title = styled(Typography)(
  () => `
  font-size: 44px;
  font-weight: 600;
  line-height: 50px;
`,
);

const Image = styled('img')(
  () => `
  width: 100%;
  max-width: 500px;
`,
);

const StyledLink = styled(Link)(
  () => `
  text-decoration: none;
  color: ${colors.primary[60]};
`,
);

const NotFound = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: 22 }} maxWidth="md">
      <Grid container spacing={5}>
        <Grid sx={{ textAlign: 'center' }} item md={12}>
          <Title>Page not found</Title>
        </Grid>
        <Grid sx={{ textAlign: 'center' }} item md={12}>
          <Typography variant="h4">
            Sorry, we can’t find the page you are looking for. Try going back to the previous page or see our
            <StyledLink to={''}>{' Help Center '}</StyledLink>
            for more
          </Typography>
        </Grid>
        <Grid sx={{ textAlign: 'center' }} item md={12}>
          <Button variant="contained" onClick={() => navigate(PublicRouteEnum.ROOT)}>
            GO TO HOME PAGE
          </Button>
        </Grid>
        <Grid sx={{ textAlign: 'center' }} item md={12}>
          <Image src="/img/not-found.svg" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
