import { MutableRefObject, ReactElement, useRef } from 'react';
import { Grid, styled } from '@mui/material';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import Modal from '../../../../../../common/ui/modal';
import * as Yup from 'yup';
import ClientModalFormContent from './client-modal-form-content';
import { useDispatch, useSelector } from 'react-redux';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { deleteUser, updateUser } from '../../../../../../store/actions/users';
import { defaultClientValue } from '../../../../../../services/api/client';
import { deleteClient, updateClient } from '../../../../../../store/actions/clients';
import { IClient } from '../../../../../../services/api/client/dto/client.dto';
import { selectClients } from '../../../../../../store/selectors';

const ModalContainer = styled(Grid)(
  () => `
    width: 100%;
`,
);

const validationSchema = () =>
  Yup.object().shape({
    details: Yup.object().shape({
      phone: Yup.string().required(() => 'Please enter phone'),
      address: Yup.string().required(() => 'Please enter address'),
    }),
  });

interface Props {
  open: boolean;
  editableClient: IClient | null;
  deletableClient: IClient | null;
  onClose: () => void;
  onListUpdate: () => void;
}

const ClientModal = ({ open, editableClient, deletableClient, onClose, onListUpdate }: Props): ReactElement => {
  const formRef: MutableRefObject<FormikProps<IClient> | null> = useRef<FormikProps<IClient> | null>(null);
  const { deleting } = useSelector(selectClients);
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();

  const handleClose = (): void => {
    onClose();
    formRef.current && formRef.current.resetForm();
  };

  const handleSubmit = (values: IClient, { resetForm, setSubmitting }: FormikHelpers<IClient>) => {
    dispatch(
      updateClient(
        values,
        false,
        () => {
          resetForm();
          handleClose();
          onListUpdate();
        },
        () => {
          setSubmitting(false);
          errorSnackbar('Something went wrong!');
        },
      ),
    );
  };

  const handleDelete = () => {
    if (deletableClient) {
      dispatch(
        deleteClient(
          deletableClient.id,
          () => {
            handleClose();
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
    <Modal open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <ModalContainer container spacing={1}>
        <Grid item md={12}>
          <Formik
            initialValues={editableClient || deletableClient || defaultClientValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema()}
            innerRef={(formikRef) => (formRef.current = formikRef)}
            enableReinitialize
          >
            <ClientModalFormContent
              deletableClient={deletableClient}
              loading={deleting}
              onDelete={handleDelete}
              onClose={handleClose}
            />
          </Formik>
        </Grid>
      </ModalContainer>
    </Modal>
  );
};

export default ClientModal;
