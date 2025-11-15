import { ReactElement, ReactNode } from 'react';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import Button from '../../../../../../common/ui/button';
import { colors } from '../../../../../../config/theme/colors';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';

const GridContainer = styled(Grid)(
  ({ theme }) => `
   margin-left: 16px;
   padding-right: 32px;
  
   @media (max-width: ${theme.breakpoints.values.md}px) {
     margin-left: 0 !important;
     padding-right: 0 !important;
   }
`,
);

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const ProfileContainer = ({ title, subtitle, children }: Props): ReactElement => {
  const { isSubmitting } = useFormikContext<IProvider>();

  return (
    <Container sx={{ padding: '0 !important' }} maxWidth="xl">
      <GridContainer sx={{ mt: 3, mb: 3 }} container>
        <Grid item md={6} xs={12}>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography fontSize={14} color={colors.secondary[50]}>
            {subtitle}
          </Typography>
        </Grid>
        <Grid item display="flex" justifyContent="end" md={6} xs={12}>
          <Box>
            <Button type="reset" sx={{ mr: 2 }} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting}>
              Save
            </Button>
          </Box>
        </Grid>
      </GridContainer>
      {children}
    </Container>
  );
};

export default ProfileContainer;
