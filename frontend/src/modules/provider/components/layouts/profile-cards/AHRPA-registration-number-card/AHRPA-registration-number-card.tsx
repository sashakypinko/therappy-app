import React, { ReactElement } from 'react';
import Card from '../card';
import { TextField } from '../../../../../../common/ui/text-field';
import CardSection from '../card-section';

const AHRPARegistrationNumberCard = ({ loading }: { loading?: boolean }): ReactElement => {
  return (
    <Card title="AHRPA registration number">
      <CardSection>
        <TextField sx={{ mt: 2 }} name="details.ahrpa_number" loading={loading} />
      </CardSection>
    </Card>
  );
};

export default AHRPARegistrationNumberCard;
