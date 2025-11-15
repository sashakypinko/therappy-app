import { ReactElement, useEffect, useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { Box, Grid, Typography } from '@mui/material';
import * as Yup from 'yup';
import ContactFormContent from './contact-form-content';
import { useAuthUser } from '../../../../../../hooks';
import Modal from '../../../../../../common/ui/modal';
import Button from '../../../../../../common/ui/button';
import { SupportApi } from '../../../../../../services/api/support';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { ServiceRequest } from '../../../../../../services/api/service/dto/service.dto';
import { ContactUsRequestDto } from '../../../../../../services/api/support/dto/contact-us-request.dto';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const defaultFormValue: ContactUsRequestDto = {
  first_name: '',
  last_name: '',
  email: '',
  subject: '',
  text: '',
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(() => 'Please enter your first name'),
  last_name: Yup.string().required(() => 'Please enter your last name'),
  email: Yup.string()
    .email()
    .required(() => 'Please enter your email'),
  subject: Yup.string().required(() => 'Please enter a subject'),
  text: Yup.string().required(() => 'Please enter a message'),
});

const ContactForm = ({ open, onClose }: Props): ReactElement => {
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [initFormValue, setInitFormValue] = useState<ContactUsRequestDto>(defaultFormValue);
  const authUser = useAuthUser();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const handleSubmit = async (
    values: ContactUsRequestDto,
    { resetForm, setSubmitting }: FormikHelpers<ContactUsRequestDto>,
  ) => {
    try {
      await SupportApi.contactUs(values);
      successSnackbar('Your message sent successfully');
      onClose();
      resetForm();
      setOpenSuccessModal(true);
    } catch (e) {
      errorSnackbar('Error while sending your message!');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      setInitFormValue({
        ...defaultFormValue,
        first_name: authUser.first_name,
        last_name: authUser.last_name,
        email: authUser.email,
      });
    }
  }, [authUser]);

  return (
    <>
      <Modal open={open} title="Contact us" onClose={onClose} maxWidth="sm">
        <Typography sx={{ mt: 2, mb: 3 }}>We are here for you. Let us know how we can help</Typography>
        <Formik
          initialValues={initFormValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <ContactFormContent onCancel={onClose} />
        </Formik>
      </Modal>
      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} maxWidth="xs">
        <Box>
          <Typography textAlign="center" variant="h5">
            Thank you for reaching out. We will be in touch soon!
          </Typography>
          <Typography sx={{ mt: 2 }} fontSize={14}>
            We aim to get back to you within 24 hours
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }} display="flex" justifyContent="end">
          <Button variant="contained" color="secondary" onClick={() => setOpenSuccessModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ContactForm;
