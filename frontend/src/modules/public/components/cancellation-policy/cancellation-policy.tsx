import React, { ReactElement } from 'react';
import Header from '../../../../common/layouts/header';
import Footer from '../../../../common/layouts/footer';
import { Container, Grid, MenuItem, MenuList, styled, Typography } from '@mui/material';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import { colors } from '../../../../config/theme/colors';
import { Link } from 'react-router-dom';
import { PublicRouteEnum } from '../../routes/enums/route.enum';

const StyledLink = styled(Link)(
  () => `
  margin-top: 4px;
  text-decoration: none;
  color: ${colors.secondary[90]};
  font-size: 14px;
`,
);

const CancellationPolicy = (): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <>
      <Header />
      <Container>
        <Grid sx={{ pt: 12, pb: 4 }} container spacing={1}>
          {!isMobile && (
            <Grid item md={3}>
              <MenuList>
                <StyledLink to={PublicRouteEnum.PRIVACY_POLICY}>
                  <MenuItem sx={{ mb: 3 }}>Privacy Policy</MenuItem>
                </StyledLink>
                <StyledLink to={PublicRouteEnum.TERMS_AND_CONDITIONS}>
                  <MenuItem sx={{ mb: 3 }}>Terms & Conditions</MenuItem>
                </StyledLink>
                <MenuItem sx={{ mb: 3, color: colors.primary[70] }}>Cancellation Policy</MenuItem>
              </MenuList>
            </Grid>
          )}
          <Grid item xs={12} md={9} lg={8} xl={7}>
            <Typography variant="h1">Cancellation Policy</Typography>
            <Typography sx={{ mt: 3 }} variant="h6" color={colors.secondary[50]}>
              Last modified: January 28, 2024
            </Typography>
            <Typography sx={{ mt: 4 }} variant="h6" color={colors.secondary[70]}>
              Corporis aut eaque eaque totam magnam. Et dolorum ad. Enim aliquam doloribus assumenda expedita libero
              aliquid iusto eos ut. Rerum amet delectus animi neque. Nihil natus culpa nostrum quia id et quo
              perferendis. Ad eos quod eius magni. Aliquid distinctio eos libero et ducimus neque.
              <br />
              At alias quis voluptatem officia ut dicta qui. Illum eaque sapiente eos animi rerum sed accusantium
              officiis itaque. Aut ea magni velit ut laboriosam. Et qui temporibus provident sint mollitia voluptate
              aliquam. Iusto qui voluptatem praesentium.
              <br />
              At alias quis voluptatem officia ut dicta qui. Illum eaque sapiente eos animi rerum sed accusantium
              officiis itaque. Aut ea magni velit ut laboriosam. Et qui temporibus provident sint mollitia voluptate
              aliquam. Iusto qui voluptatem praesentium. Corporis aut eaque eaque totam magnam. Et dolorum ad. Enim
              aliquam doloribus assumenda expedita libero aliquid iusto eos ut. Rerum amet delectus animi neque. Nihil
              natus culpa nostrum quia id et quo perferendis. Ad eos quod eius magni. Aliquid distinctio eos libero et
              ducimus neque.
              <br />
              At alias quis voluptatem officia ut dicta qui. Illum eaque sapiente eos animi rerum sed accusantium
              officiis itaque. Aut ea magni velit ut laboriosam. Et qui temporibus provident sint mollitia voluptate
              aliquam. Iusto qui voluptatem praesentium.
              <br />
              At alias quis voluptatem officia ut dicta qui. Illum eaque sapiente eos animi rerum sed accusantium
              officiis itaque. Aut ea magni velit ut laboriosam. Et qui temporibus provident sint mollitia voluptate
              aliquam. Iusto qui voluptatem praesentium. Corporis aut eaque eaque totam magnam. Et dolorum ad. Enim
              aliquam doloribus assumenda expedita libero aliquid iusto eos ut. Rerum amet delectus animi neque. Nihil
              natus culpa nostrum quia id et quo perferendis. Ad eos quod eius magni. Aliquid distinctio eos libero et
              ducimus neque.
              <br />
              At alias quis voluptatem officia ut dicta qui. Illum eaque sapiente eos animi rerum sed accusantium
              officiis itaque. Aut ea magni velit ut laboriosam. Et qui temporibus provident sint mollitia voluptate
              aliquam. Iusto qui voluptatem praesentium.
              <br />
              At alias quis voluptatem officia ut dicta qui. Illum eaque sapiente eos animi rerum sed accusantium
              officiis itaque. Aut ea magni velit ut laboriosam. Et qui temporibus provident sint mollitia voluptate
              aliquam. Iusto qui voluptatem praesentium.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CancellationPolicy;
