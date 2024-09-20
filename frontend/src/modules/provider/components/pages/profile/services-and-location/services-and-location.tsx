import { ReactElement } from 'react';
import ProfileContainer from '../profile-container';
import { Grid } from '@mui/material';
import ServicesCard from '../../../layouts/profile-cards/services-card';
import BusinessNumberCard from '../../../layouts/profile-cards/business-number-card';
import LocationCard from '../../../layouts/profile-cards/location-card';
import WorkingVisaCard from '../../../layouts/profile-cards/working-visa-card';
import AHRPARegistrationNumberCard from '../../../layouts/profile-cards/AHRPA-registration-number-card';
import RemedialMessageRegistrationNumberCard from '../../../layouts/profile-cards/remedial-message-registration-number-card';

const ServicesAndLocation = ({ loading }: { loading: boolean }): ReactElement => {
  return (
    <ProfileContainer title="Services & Location" subtitle="Update your services and locations here.">
      <Grid container>
        <Grid item xs={12} md={6}>
          <ServicesCard loading={loading} />
          <WorkingVisaCard loading={loading} />
          <BusinessNumberCard loading={loading} />
          <AHRPARegistrationNumberCard loading={loading} />
          <RemedialMessageRegistrationNumberCard loading={loading} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LocationCard loading={loading} />
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default ServicesAndLocation;
