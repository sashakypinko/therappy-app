import React, { MutableRefObject, ReactElement } from 'react';
import { Grid, Rating, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from '../../../../ui/text-field';
import * as Yup from 'yup';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import ReviewRequestDto from '../../../../../services/api/appointment/dto/review-request.dto';
import { UserTypesEnum } from '../../../../../enums/user-types.enum';
import { IAppointment } from '../../../../../services/api/appointment/dto/appointment.dto';

const initialValues: ReviewRequestDto = {
  rating: 0,
  comment: '',
  author: UserTypesEnum.CLIENT,
};

const validationSchema = () =>
  Yup.object().shape({
    comment: Yup.string().required(() => 'Please enter your feedback'),
  });

const FeedbackForm = ({ disabled }: { disabled: boolean }): ReactElement => {
  const { values, setFieldValue } = useFormikContext<ReviewRequestDto>();

  return (
    <Grid sx={{ mt: 2 }} item xs={12} md={12}>
      <Form>
        <Typography fontWeight={600}>Tell us about your experience</Typography>
        <Rating
          sx={{ mt: 2 }}
          value={values.rating}
          onChange={(e, rating) => setFieldValue('rating', rating)}
          emptyIcon={<Star style={{ color: '#000', opacity: 0.2 }} fontSize="inherit" />}
          size="large"
          disabled={disabled}
        />
        <TextField
          sx={{ mt: 2, mb: 3 }}
          name="comment"
          type="textarea"
          placeholder="Leave a feedback..."
          disabled={disabled}
        />
      </Form>
    </Grid>
  );
};

interface Props {
  formRef: MutableRefObject<FormikProps<any> | null>;
}

const FeedbackDetails = ({ formRef }: Props): ReactElement => {
  const { values } = useFormikContext<IAppointment>();

  return (
    <Formik
      innerRef={(formikRef) => (formRef.current = formikRef)}
      initialValues={values?.review || initialValues}
      validationSchema={validationSchema()}
      onSubmit={() => {
        //
      }}
      enableReinitialize
    >
      <FeedbackForm disabled={!!values?.review} />
    </Formik>
  );
};

export default FeedbackDetails;
