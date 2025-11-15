import { type ReactNode, useState } from 'react';
import ConfirmationDialog from '../common/ui/confirmation-dialog';
import { type ConfirmationDialogProps } from '../common/ui/confirmation-dialog/confirmation-dialog';
import { ButtonProps } from '@mui/material/Button/Button';

interface ShowConfirmationParams {
  text: string;
  description?: string;
  body?: ReactNode;
  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
  onConfirm: () => void;
  onCancel?: () => void;
}

const initConfirmationDialogProps: ConfirmationDialogProps = {
  open: false,
  text: '',
  /* eslint-disable @typescript-eslint/no-empty-function */
  onConfirm: () => {},
  /* eslint-disable @typescript-eslint/no-empty-function */
  onCancel: () => {},
};

const useConfirmation = (): { Confirmation: ReactNode; showConfirmation: (params: ShowConfirmationParams) => void } => {
  const [confirmationDialogProps, setConfirmationDialogProps] =
    useState<ConfirmationDialogProps>(initConfirmationDialogProps);
  const [loading, setLoading] = useState<boolean>(false);

  const Confirmation = <ConfirmationDialog {...confirmationDialogProps} loading={loading} />;

  /* eslint-disable @typescript-eslint/no-empty-function */
  const showConfirmation = ({
    text,
    description,
    body,
    confirmProps,
    cancelProps,
    onConfirm,
    onCancel = () => {},
  }: ShowConfirmationParams): void => {
    setConfirmationDialogProps({
      open: true,
      text,
      description,
      body,
      confirmProps,
      cancelProps,
      onConfirm: async () => {
        setLoading(true);
        await onConfirm();
        setConfirmationDialogProps(initConfirmationDialogProps);
        setLoading(false);
      },
      onCancel: async () => {
        await onCancel();
        setConfirmationDialogProps(initConfirmationDialogProps);
      },
    });
  };

  return {
    Confirmation,
    showConfirmation,
  };
};

export default useConfirmation;
