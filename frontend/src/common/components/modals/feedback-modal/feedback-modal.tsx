import { ReactElement, useEffect, useState } from 'react';
import Modal from '../../../ui/modal';
import { Box, Divider, Typography } from '@mui/material';
import FeedbackFormContent from './feedback-form-content';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../../../ui/button';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../store/selectors';
import { CreateFeedbackRequestDto } from '../../../../services/api/client/dto/create-feedback-request.dto';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { ClientApi } from '../../../../services/api/client/client.api';

export const defaultFormValue: CreateFeedbackRequestDto = {
  comment: '',
  rating_therapist: 0,
  rating_platform: 0,
  rating_general: 0,
};

const validationSchema = Yup.object().shape({
  comment: Yup.string().required(() => 'Please enter a message'),
});

const FeedbackModal = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const { authUser } = useSelector(selectAuth);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const handleSubmit = async (
    values: CreateFeedbackRequestDto,
    { resetForm, setSubmitting }: FormikHelpers<CreateFeedbackRequestDto>,
  ) => {
    try {
      await ClientApi.createFeedback(values);
      successSnackbar('Your feedback sent successfully');
      setOpen(false);
      resetForm();
      setOpenSuccessModal(true);
    } catch (e) {
      errorSnackbar('Error while sending your feedback!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = async () => {
    try {
      setOpen(false);
      await ClientApi.postponeFeedback();
    } catch (e) {
      console.error('postpone feedback error');
    }
  };

  useEffect(() => {
    if (authUser && authUser.is_rate_us) {
      setOpen(true);
    }
  }, [authUser]);

  return (
    <>
      <Modal open={open} title="Tell us about your experience?" onClose={handleClose}>
        <Typography>
          We love to hear from you. If you you had a great experience we want to hear about it. If you didn’t we want to
          know about it
        </Typography>
        <Formik initialValues={defaultFormValue} onSubmit={handleSubmit} validationSchema={validationSchema}>
          <FeedbackFormContent />
        </Formik>
        <Button sx={{ mt: 2 }} variant="contained" color="secondary" onClick={handleClose} fullWidth>
          Remind later
        </Button>
      </Modal>
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} maxWidth="xs">
        <Box textAlign="center">
          <img src="/img/feedback-pana.svg" />
          <Typography sx={{ mt: 3 }} variant="h5">
            Thank you for sharing your experience
          </Typography>
        </Box>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <Box display="flex" justifyContent="end">
          <Button variant="contained" color="secondary" onClick={() => setOpenSuccessModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default FeedbackModal;
