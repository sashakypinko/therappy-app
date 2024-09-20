import { ReactElement, useState } from 'react';
import { Divider, Grid } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import Button from '../../../../ui/button';
import { BankDetails } from '../../../../../services/api/user/dto/user.dto';
import { TextField } from '../../../../ui/text-field';
import CheckboxGroup from '../../../../ui/checkbox-group';
import CodeInput from '../../../../ui/code-input';

interface Props {
  loading: boolean;
  onClose: () => void;
}

const AddEftModalFormContent = ({ loading, onClose }: Props): ReactElement => {
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);
  const { values, isSubmitting, setFieldValue, errors, touched } = useFormikContext<BankDetails>();

  return (
    <Form>
      <Grid container>
        <Grid item sx={{ mt: 2 }} xs={12}>
          <TextField label="Account name" name="name" loading={loading} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Bank name" name="bank_name" loading={loading} fullWidth />
        </Grid>
        <Grid item sx={{ pr: 1 }} xs={12} md={6}>
          <CodeInput
            label="BSB"
            length={6}
            height={40}
            dividerAfter={2}
            type="number"
            value={values.bsb}
            onChange={(value) => setFieldValue('bsb', value)}
            error={touched.bsb && errors.bsb ? errors.bsb : ''}
            loading={loading}
          />
        </Grid>
        <Grid item sx={{ pl: 1 }} xs={12} md={6}>
          <TextField
            label="Account number"
            type="number"
            name="account_number"
            maxLength={9}
            loading={loading}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxGroup
            label="I understand that Therappy is not responsible for checking the accuracy of my BSB and Account Number. Any errors in this information may result in the service not being paid for. "
            checked={policyAccepted}
            onChange={setPolicyAccepted}
          />
        </Grid>
        <Grid item sx={{ mt: 2, mb: 2 }} xs={12}>
          <Divider />
        </Grid>
        <Grid item display="flex" justifyContent="space-between" xs={12}>
          <Button variant="contained" color="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting || !policyAccepted} loading={isSubmitting}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default AddEftModalFormContent;
