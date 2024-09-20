import React, { ReactElement } from 'react';
import Card from '../card';
import CardSection from '../card-section';
import SelectField from '../../../../../../common/ui/select-field';
import { ParsedUserStatuses } from '../../../../../../enums/working-visa-types.enum';

const WorkingVisaCard = ({ loading }: { loading?: boolean }): ReactElement => {
  return (
    <Card title="Your working visa">
      <CardSection>
        <SelectField
          sx={{ mt: 2 }}
          name="details.visa"
          options={Object.entries(ParsedUserStatuses).map(([value, label]) => ({ label, value }))}
          loading={loading}
          fullWidth
        />
      </CardSection>
    </Card>
  );
};

export default WorkingVisaCard;
