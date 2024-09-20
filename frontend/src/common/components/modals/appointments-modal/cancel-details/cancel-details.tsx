import React, { MutableRefObject, ReactElement, useState } from 'react';
import { Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import { Grid, Typography } from '@mui/material';
import { TextField } from '../../../../ui/text-field';
import CancelRequestDto from '../../../../../services/api/appointment/dto/cancel-request.dto';
import PrivacyPolicyCheckbox from '../../../../privacy-policy-checkbox';

const initialValues: CancelRequestDto = {
  comment: '',
};

const validationSchema = () =>
  Yup.object().shape({
    comment: Yup.string().required(() => 'Please enter the comment'),
  });

const CancelForm = (): ReactElement => {
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);

  return (
    <Grid sx={{ mt: 2 }} item xs={12} md={12}>
      <Form>
        <Typography fontWeight={600}>Reason for Сanceling</Typography>
        <TextField
          sx={{ mt: 2, mb: 1 }}
          name="comment"
          type="textarea"
          placeholder="Please indicate the reason for the cancellation..."
        />
        <PrivacyPolicyCheckbox checked={policyAccepted} onChange={setPolicyAccepted} />
      </Form>
    </Grid>
  );
};

interface Props {
  formRef: MutableRefObject<FormikProps<any> | null>;
}

const CancelDetails = ({ formRef }: Props): ReactElement => {
  return (
    <Formik
      innerRef={(formikRef) => (formRef.current = formikRef)}
      initialValues={initialValues}
      validationSchema={validationSchema()}
      onSubmit={() => {
        //
      }}
    >
      <CancelForm />
    </Formik>
  );
};

export default CancelDetails;
