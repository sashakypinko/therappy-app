import React, { type ReactElement, useState } from 'react';
import { Form, useFormikContext } from 'formik';
import Button from '../../../../../../common/ui/button';
import { Checkbox, Divider, FormControlLabel, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import { TextField } from '../../../../../../common/ui/text-field';
import { Link } from 'react-router-dom';
import OwnGenderRadioGroup from '../../../../../../common/components/own-gender-radio-group';
import { IClient } from '../../../../../../services/api/client/dto/client.dto';
import PreferredGenderRadioGroup from '../../../../../../common/components/preferred-gender-radio-group';

const SectionTitle = styled(Typography)(
  () => `
    margin-top: 24px;
    color: ${colors.secondary[90]};
`,
);

const PolicyLink = styled(Link)(
  () => `
    color: ${colors.secondary[90]};
`,
);

interface Props {
  onBackClick: () => void;
}

const SignUpLastStepFormContent = ({ onBackClick }: Props): ReactElement => {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState<boolean>(false);
  const { values, setFieldValue, isSubmitting } = useFormikContext<IClient>();

  return (
    <Form>
      <TextField label="First Name" name="first_name" fullWidth />
      <TextField label="Last Name" name="last_name" fullWidth />
      <TextField label="Your phone number" name="details.phone" fullWidth />

      <SectionTitle>Select your gender</SectionTitle>
      <OwnGenderRadioGroup value={values.details.gender} onChange={(value) => setFieldValue('details.gender', value)} />
      <SectionTitle>Select your preferred therapist gender</SectionTitle>
      <PreferredGenderRadioGroup
        value={values.details.preferred_gender}
        onChange={(value) => setFieldValue('details.preferred_gender', value)}
      />

      <TextField
        sx={{ mt: 1 }}
        rows={4}
        maxLength={240}
        name="details.description"
        type="textarea"
        placeholder="Tell your therapist about any current or past medical conditions or any special instructions before your treatment"
      />

      <Divider sx={{ mt: 3, mb: 3 }} />
      <FormControlLabel
        componentsProps={{
          typography: {
            fontSize: 14,
          },
        }}
        checked={privacyPolicyAccepted}
        control={<Checkbox />}
        onChange={(e, checked) => setPrivacyPolicyAccepted(checked)}
        label={
          <Typography>
            I have read and agree to the&nbsp;
            <PolicyLink to={''}>Privacy Policy</PolicyLink>,&nbsp;
            <PolicyLink to={''}>Terms & Conditions</PolicyLink>,&nbsp;*
          </Typography>
        }
      />

      <Button
        sx={{ mt: 3, mb: 3 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting || !privacyPolicyAccepted}
        loading={isSubmitting}
      >
        Continue
      </Button>
      <Button sx={{ mb: 3 }} fullWidth onClick={onBackClick} disabled={isSubmitting}>
        Back
      </Button>
    </Form>
  );
};

export default SignUpLastStepFormContent;
