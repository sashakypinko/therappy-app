import React, { ReactElement } from 'react';
import Modal from '../../../../../../../common/ui/modal';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { Divider, Grid, Typography } from '@mui/material';
import { TextField } from '../../../../../../../common/ui/text-field';
import Button from '../../../../../../../common/ui/button';
import { IProvider } from '../../../../../../../services/api/provider/dto/provider.dto';
import { ServiceNotFoundRequestDto } from '../../../../../../../services/api/provider/dto/service-not-found-request.dto';
import { ProviderApi } from '../../../../../../../services/api/provider';
import useSnackbar from '../../../../../../../hooks/use-snackbar.hook';

const initialValues: ServiceNotFoundRequestDto = {
  title: '',
};

const validationSchema = () =>
  Yup.object().shape({
    title: Yup.string().required(() => 'Please enter service name'),
  });

const ServiceNotFoundForm = ({ onClose }: { onClose: () => void }): ReactElement => {
  const { isSubmitting } = useFormikContext<IProvider>();

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid display="flex" justifyContent="center" item md={12}>
          <img src="/img/service-not-found.svg" />
        </Grid>
        <Grid display="flex" justifyContent="center" item md={12}>
          <Typography variant="h5">Didn&apos;t find your service?</Typography>
        </Grid>
        <Grid textAlign="center" item md={12}>
          <Typography>
            If you haven&apos;t found your service, enter it in the field below and we will add it
          </Typography>
        </Grid>
        <Grid item md={12}>
          <TextField name="title" placeholder="Enter your service..." />
          <Divider />
        </Grid>
        <Grid display="flex" justifyContent="space-between" item md={12}>
          <Button variant="contained" color="secondary" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting} loading={isSubmitting}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

interface Props {
  open: boolean;
  onClose: () => void;
}

const ServiceNotFoundModal = ({ open, onClose }: Props): ReactElement => {
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const handleSubmit = async (
    values: ServiceNotFoundRequestDto,
    { setSubmitting, resetForm }: FormikHelpers<ServiceNotFoundRequestDto>,
  ) => {
    try {
      await ProviderApi.serviceNotFound(values);
      resetForm();
      onClose();
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get send your request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal maxWidth="xs" open={open} onClose={onClose}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema()}>
        <ServiceNotFoundForm onClose={onClose} />
      </Formik>
    </Modal>
  );
};

export default ServiceNotFoundModal;
