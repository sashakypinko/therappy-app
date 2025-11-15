import { ReactElement } from "react";
import ProfileContainer from '../profile-container';
import { Grid } from '@mui/material';
import BasicDetailsCard from '../../../layouts/profile-cards/basic-details-card';
import ImageCard from '../../../layouts/profile-cards/image-card';
import DocumentsCard from '../../../layouts/profile-cards/documents-card';

const PersonalDetails = ({ loading }: { loading: boolean }): ReactElement => {
  return (
    <ProfileContainer title="Personal Details" subtitle="Update your photo and personal details here.">
      <Grid container>
        <Grid item xs={12} md={5}>
          <ImageCard loading={loading} />
          <DocumentsCard loading={loading} />
        </Grid>
        <Grid item xs={12} md={7}>
          <BasicDetailsCard loading={loading} fullInfo withoutImage />
        </Grid>
      </Grid>
    </ProfileContainer>
  );
};

export default PersonalDetails;
