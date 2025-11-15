import { MutableRefObject, ReactElement, useRef } from 'react';
import Modal from '../../../../../../common/ui/modal';
import { Grid, styled } from '@mui/material';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import ServiceModalFormContent from './service-modal-form-content';
import { createService, deleteService, updateService } from '../../../../../../store/actions/services';
import { IService, ServiceRequest } from '../../../../../../services/api/service/dto/service.dto';
import { defaultServiceValue } from '../../../../../../services/api/service';

const ModalContainer = styled(Grid)(
  () => `
    width: 100%;
`,
);
const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(() => 'Please enter service name'),
    duration: Yup.string().required(() => 'Please enter service duration'),
    price: Yup.string().required(() => 'Please enter service price'),
    description: Yup.string().required(() => 'Please enter service description'),
  });

interface Props {
  open: boolean;
  editableService: IService | null;
  deletableService: IService | null;
  onClose: () => void;
  onListUpdate: () => void;
}

const ServiceModal = ({ open, editableService, deletableService, onClose, onListUpdate }: Props): ReactElement => {
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();
  const formRef: MutableRefObject<FormikProps<ServiceRequest> | null> = useRef<FormikProps<ServiceRequest> | null>(
    null,
  );

  const handleSubmit = (values: ServiceRequest, { resetForm, setSubmitting }: FormikHelpers<ServiceRequest>) => {
    dispatch(
      (editableService ? updateService : createService)(
        values,
        () => {
          resetForm();
          onClose();
          onListUpdate();
        },
        () => {
          setSubmitting(false);
          errorSnackbar('Something went wrong!');
        },
      ),
    );
  };

  const handleClose = (): void => {
    onClose();
    formRef.current && formRef.current.resetForm();
  };

  const handleDelete = () => {
    if (deletableService) {
      dispatch(
        deleteService(
          deletableService.id,
          () => {
            onClose();
            onListUpdate();
          },
          () => {
            errorSnackbar('Something went wrong!');
          },
        ),
      );
    }
  };

  return (
    <Modal
      title={`${editableService ? 'Edit' : deletableService ? 'Delete' : 'Add'} Service`}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <ModalContainer container spacing={1}>
        <Grid item md={12}>
          <Formik
            initialValues={editableService || deletableService || defaultServiceValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            innerRef={(formikRef) => (formRef.current = formikRef)}
            enableReinitialize
          >
            <ServiceModalFormContent
              editableService={editableService}
              deletableService={deletableService}
              onDelete={handleDelete}
              onClose={handleClose}
            />
          </Formik>
        </Grid>
      </ModalContainer>
    </Modal>
  );
};

export default ServiceModal;
