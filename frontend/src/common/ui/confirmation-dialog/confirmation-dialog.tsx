import { type ReactElement, ReactNode } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import Modal from '../modal';
import Button from '../button';
import { colors } from '../../../config/theme/colors';
import { ButtonProps } from '@mui/material/Button/Button';

const StyledDialogActions = styled(DialogActions)(
  () => `
    justify-content: space-between; 
`,
);

const StyledDialogContent = styled(DialogContent)(
  () => `
     text-align: center;
`,
);

const StyledDialogTitle = styled(DialogTitle)(
  () => `
    color: ${colors.secondary[90]};
`,
);

const StyledDialogContentText = styled(DialogContentText)(
  () => `
    color: ${colors.secondary[70]};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
`,
);

const ActionButton = styled(Button)(
  () => `
    width: 88px;
    height: 46px;
`,
);

export interface ConfirmationDialogProps {
  open: boolean;
  loading?: boolean;
  text: string;
  description?: string;
  body?: ReactNode;
  confirmProps?: ButtonProps;
  cancelProps?: ButtonProps;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  open,
  loading = false,
  text,
  description,
  body,
  confirmProps = { variant: 'contained', title: 'OK' },
  cancelProps = { variant: 'contained', color: 'secondary', title: 'Cancel' },
  onCancel,
  onConfirm,
}: ConfirmationDialogProps): ReactElement => {
  return (
    <Modal open={open} onClose={onCancel}>
      <StyledDialogContent sx={{ p: 0 }}>
        <StyledDialogTitle variant="h3">{text}</StyledDialogTitle>
        {description && <StyledDialogContentText>{description}</StyledDialogContentText>}
        {body && body}
      </StyledDialogContent>
      <StyledDialogActions>
        <ActionButton {...cancelProps} onClick={onCancel}>
          {cancelProps?.title}
        </ActionButton>
        <ActionButton {...confirmProps} onClick={onConfirm} disabled={loading} loading={loading}>
          {confirmProps?.title}
        </ActionButton>
      </StyledDialogActions>
    </Modal>
  );
};

export default ConfirmationDialog;
