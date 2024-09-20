import { ReactElement } from 'react';
import Modal from '../../../../ui/modal';
import { Divider, Grid, Typography } from '@mui/material';
import Button from '../../../../ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddedBankDetailsMessage = ({ open, onClose }: Props): ReactElement => {
  return (
    <Modal open={open} maxWidth="xs" onClose={onClose}>
      <Grid container spacing={3}>
        <Grid item textAlign="center" xs={12}>
          <img src="/img/card-added.svg" />
        </Grid>
        <Grid item textAlign="center" xs={12}>
          <Typography variant="h5">Your EFT info has been successfully linked</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item display="flex" justifyContent="end" xs={12}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddedBankDetailsMessage;
