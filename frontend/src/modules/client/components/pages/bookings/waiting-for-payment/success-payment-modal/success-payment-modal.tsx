import React, { ReactElement } from 'react';
import Modal from '../../../../../../../common/ui/modal';
import { Box, Divider, styled, Typography } from "@mui/material";

import Button from '../../../../../../../common/ui/button';
import { colors } from '../../../../../../../config/theme/colors';

const SubmitBox = styled(Box)(
  () => `
  display: flex;
  justify-content: center;
  padding: 22px 24px;
  border-radius: 6px;
  border: 1px solid ${colors.primary[20]};
  background: ${colors.primary[10]};
`,
);

interface Props {
  open: boolean;
  onClose: () => void;
}

const SuccessPaymentModal = ({ open, onClose }: Props): ReactElement => {
  return (
    <Modal open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ mt: 1 }} display="flex" justifyContent="center">
        <img src="/img/credit-card.svg" />
      </Box>
      <Typography sx={{ mt: 2 }} variant="h5" color={colors.success[70]} textAlign="center">
        Thank you! We have received your payment
      </Typography>
      <Typography sx={{ mt: 2 }} textAlign="center">
        Now sit back and relax and we&apos;ll come to you
      </Typography>
      <Divider sx={{ mt: 3, mb: 3 }}/>
      <Box display="flex" justifyContent="end">
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessPaymentModal;
