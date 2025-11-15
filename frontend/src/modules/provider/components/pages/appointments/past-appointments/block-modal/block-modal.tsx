import { ReactElement } from 'react';
import Modal from '../../../../../../../common/ui/modal';
import { Divider, Grid, Typography } from '@mui/material';
import Button from '../../../../../../../common/ui/button';

interface Props {
  open: boolean;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const BlockModal = ({ open, loading, onConfirm, onClose }: Props): ReactElement => {
  return (
    <Modal open={open} onClose={onClose} maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item textAlign="center" xs={12}>
          <img src="/img/confirmation.svg" />
          <Typography sx={{ mt: 3 }} variant="h5">
            Are you sure you want to block this client?
          </Typography>
          <Typography sx={{ mt: 3 }} variant="body2">
            Confirm your decision to block this client
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item display="flex" justifyContent="space-between" xs={12}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onConfirm} disabled={loading} loading={loading}>
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default BlockModal;
