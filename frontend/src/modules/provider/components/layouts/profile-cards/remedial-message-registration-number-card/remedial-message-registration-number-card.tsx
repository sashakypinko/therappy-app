import React, { ReactElement } from 'react';
import Card from '../card';
import { TextField } from '../../../../../../common/ui/text-field';
import CardSection from '../card-section';

const RemedialMessageRegistrationNumberCard = ({ loading }: { loading?: boolean }): ReactElement => {
  return (
    <Card title="Remedial massage registration number">
      <CardSection>
        <TextField sx={{ mt: 2 }} name="details.remedial_number" loading={loading} />
      </CardSection>
    </Card>
  );
};

export default RemedialMessageRegistrationNumberCard;
