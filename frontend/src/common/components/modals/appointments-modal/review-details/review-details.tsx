import React, { MutableRefObject, ReactElement } from 'react';
import { Box, Grid, Rating, styled, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { TextField } from '../../../../ui/text-field';
import * as Yup from 'yup';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import ReviewRequestDto from '../../../../../services/api/appointment/dto/review-request.dto';
import Switch from '../../../../ui/switch';
import { colors } from '../../../../../config/theme/colors';
import { IAppointment } from '../../../../../services/api/appointment/dto/appointment.dto';

const BlockUserContainer = styled(Box)(
  () => `
    display: flex;
    padding: 8px 12px;
    border-radius: 8px;
`,
);

const initialValues: ReviewRequestDto = {
  rating: 0,
  comment: '',
  blockUser: false,
};

const validationSchema = () =>
  Yup.object().shape({
    comment: Yup.string().required(() => 'Please enter your feedback'),
  });

const ReviewForm = ({ disabled }: { disabled: boolean }): ReactElement => {
  const { values, setFieldValue, isSubmitting } = useFormikContext<ReviewRequestDto>();

  return (
    <>
      <Grid item xs={12} md={12}>
        <BlockUserContainer sx={{ border: `1px solid ${values.blockUser ? colors.error[60] : colors.secondary[20]}` }}>
          <Switch
            color="error"
            checked={!!values.blockUser}
            onChange={(e, checked) => setFieldValue('blockUser', checked)}
          />
          <Box>
            <Typography variant="subtitle1">Block this client</Typography>
            <Typography variant="body2" fontSize={14}>
              A blocked client won’t be able to book a session with you again. You’ll be able to unblock them later.
            </Typography>
          </Box>
        </BlockUserContainer>
      </Grid>
      <Grid sx={{ mt: 2 }} item xs={12} md={12}>
        <Form>
          <Typography fontWeight={600}>Rate your customer experience</Typography>
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
    </>
  );
};

interface Props {
  formRef: MutableRefObject<FormikProps<any> | null>;
}

const ReviewDetails = ({ formRef }: Props): ReactElement => {
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
      <ReviewForm disabled={!!values?.review} />
    </Formik>
  );
};

export default ReviewDetails;
