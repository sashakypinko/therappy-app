import Modal from '../../../ui/modal';
import { Box, styled, Typography } from '@mui/material';
import { MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";
import AddEftModalFormContent from './add-bank-details-modal-form-content';
import * as Yup from 'yup';
import { Formik, FormikHelpers, FormikProps } from "formik";
import { BankDetails } from '../../../../services/api/user/dto/user.dto';
import AddedBankDetailsMessage from './added-bank-details-message';
import { colors } from '../../../../config/theme/colors';
import { Lock } from '../../../ui/icon-v2';
import { ProviderApi } from '../../../../services/api/provider';
import useSnackbar from '../../../../hooks/use-snackbar.hook';

const SecurityMessage = styled(Box)(
  () => `
    margin-top: 16px;
    display: flex;
    padding: 8px;
    align-items: center;
    border-radius: 8px
    background: ${colors.primary[10]};
`,
);

interface Props {
  open: boolean;
  providerId: number;
  onClose: () => void;
  onSave?: () => void;
}

const initialValue: BankDetails = {
  name: '',
  bank_name: '',
  bsb: '',
  account_number: '',
};

const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(() => 'Please enter account name'),
    bank_name: Yup.string().required(() => 'Please enter bank name'),
    bsb: Yup.string()
      .min(6, () => 'Please enter BSB')
      .required(() => 'Please enter BSB'),
    account_number: Yup.string()
      .length(9, () => 'The account number field must be 9 characters')
      .required(() => 'Please enter account number'),
  });

const AddBankDetailsModal = ({ open, providerId, onClose, onSave }: Props): ReactElement => {
  const formRef: MutableRefObject<FormikProps<BankDetails> | null> = useRef<FormikProps<BankDetails> | null>(null);
  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [bankDetails, setBankDetails] = useState<BankDetails>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const getBankDetails = async () => {
    try {
      setLoading(true);
      const newBankDetails = await ProviderApi.getBankDetails(providerId);
      setBankDetails({ ...newBankDetails, bsb: newBankDetails.bsb.replace(/-/g, '') });
    } catch (e) {
      errorSnackbar("Something went wrong. Can't fetch bank details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getBankDetails().then();
    }
  }, [open]);

  const handleSubmit = async (values: BankDetails, { resetForm, setSubmitting }: FormikHelpers<BankDetails>) => {
    try {
      await ProviderApi.editBankDetails(providerId, {
        ...values,
        bsb: [values.bsb.slice(0, 3), values.bsb.slice(0, 3)].join('-'),
      });
      successSnackbar('Bank details saved successfully');
      resetForm();
      onClose();
      setOpenMessage(true);
      onSave && onSave();
    } catch (e) {
      errorSnackbar("Something went wrong. Can't save bank details.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    formRef.current && formRef.current.resetForm();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Typography variant="subtitle1">Add your bank account details</Typography>
        <Typography sx={{ mt: 3 }} variant="subtitle2" fontSize={14}>
          To get you paid as soon as possible, enter your bank details below so that Thepappy can process payments to
          you on behalf of your clients
        </Typography>
        <SecurityMessage>
          <Lock />
          <Typography sx={{ ml: 2, mr: 2 }} variant="subtitle2" fontSize={14}>
            Your bank details will not be displayed on your profile and only used to process your payments by the
            Therappy team
          </Typography>
        </SecurityMessage>
        <Formik
          innerRef={(formikRef) => (formRef.current = formikRef)}
          initialValues={bankDetails}
          onSubmit={handleSubmit}
          validationSchema={validationSchema()}
          enableReinitialize
        >
          <AddEftModalFormContent loading={loading} onClose={handleClose} />
        </Formik>
      </Modal>
      <AddedBankDetailsMessage open={openMessage} onClose={() => setOpenMessage(false)} />
    </>
  );
};

export default AddBankDetailsModal;
