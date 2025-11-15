import * as React from 'react';
import { type ReactElement, type ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';
import { styled, Typography } from '@mui/material';
import { Breakpoint } from '@mui/system';

const StyledDialog = styled(Dialog)(
  ({ theme }) => `
    padding: 16px;
    border-radius: 12px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      margin-top: 80px;
    }
`,
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  maxWidth?: Breakpoint | false;
}

const Modal = ({ title, open, onClose, children, fullWidth, maxWidth }: ModalProps): ReactElement => (
  <StyledDialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onClose}
    PaperProps={{ sx: { borderRadius: '12px', maxHeight: '100%', width: '100%', p: 1, m: 0 } }}
    fullWidth={!!fullWidth}
    maxWidth={maxWidth}
  >
    {title && (
      <Typography sx={{ pl: 3, pt: 2 }} variant="h5">{title}</Typography>
    )}
    <DialogContent>{children}</DialogContent>
  </StyledDialog>
);

export default Modal;
