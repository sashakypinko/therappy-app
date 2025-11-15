import React, { ReactElement } from 'react';
import Card from '../card';
import { styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import { TextField } from '../../../../../../common/ui/text-field';
import { InfoOutlined } from '@mui/icons-material';
import CustomTooltip from '../../../../../../common/ui/custom-tooltip';
import CardSection from '../card-section';

const FieldDescription = styled(Typography)(
  () => `
    color: ${colors.secondary[50]};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 12px;
    margin-top: 12px;
`,
);

const BusinessNumberCard = ({ loading }: { loading?: boolean }): ReactElement => {
  return (
    <Card title="Your Australian Business Number (ABN)">
      <CardSection>
        <FieldDescription sx={{ mt: 3 }}>
          To accept any appointments(work) on our platform you must have an 11 digit ABN.
        </FieldDescription>
        <TextField
          name="details.abn"
          endIcon={
            <CustomTooltip
              title="
            Your ABN may be:
            A sole trader type in your name
            An incorporated entity of which you are a director
            If your ABN is an incorporated entity, email a copy of your ASIC or ABN document to
            help@therappy.com.au to show you are the director.
          "
            >
              <InfoOutlined sx={{ width: 24, height: 24 }} color="primary" />
            </CustomTooltip>
          }
          loading={loading}
        />
      </CardSection>
    </Card>
  );
};

export default BusinessNumberCard;
