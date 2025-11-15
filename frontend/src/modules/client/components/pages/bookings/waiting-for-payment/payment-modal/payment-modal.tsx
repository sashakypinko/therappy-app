import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import Modal from '../../../../../../../common/ui/modal';
import { IAppointment } from '../../../../../../../services/api/appointment/dto/appointment.dto';
import { Box, Grid, styled, Typography } from '@mui/material';
import Button from '../../../../../../../common/ui/button';
import { colors } from '../../../../../../../config/theme/colors';
import useIsMobile from '../../../../../../../hooks/use-is-mobile.hook';
import { ClientRouteEnum } from '../../../../../routes/enums/route.enum';

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

interface CheckoutFormProps {
  open: boolean;
  items: IAppointment[];
  paymentToken: string;
  loading: boolean;
  onClose: () => void;
  onPaid: () => void;
}

const CheckoutForm = ({ open, items, paymentToken, loading, onClose, onPaid }: CheckoutFormProps) => {
  const isMobile = useIsMobile();
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setSubmitting(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_BASE_URL}${ClientRouteEnum.BOOKINGS}`,
      },
      redirect: 'if_required',
    });

    setSubmitting(false);

    if (result.error) {
      setError(result.error.message || 'An error occurred.');
    } else {
      onPaid();
    }
  };

  const appearance: Appearance = {
    theme: 'night',
  };

  useEffect(() => {
    if (stripe) {
      stripe.elements({ clientSecret: paymentToken, appearance });
    }
  }, [stripe]);

  useEffect(() => {
    setError(null);
  }, [open]);

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          layout: 'tabs',
          wallets: {
            applePay: 'auto',
            googlePay: 'auto',
          },
        }}
      />
      {error && (
        <Typography sx={{ mt: 2 }} variant="subtitle1" color={colors.error[70]}>
          {error}
        </Typography>
      )}
      <Grid container>
        <Grid sx={{ pt: 2 }} display="flex" alignItems="center" item xs={12} md={4} order={isMobile ? 5 : 4}>
          <Button variant="contained" color="secondary" fullWidth={isMobile} onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid sx={{ pt: 2 }} item xs={12} md={8} order={isMobile ? 4 : 5}>
          <SubmitBox>
            <Typography sx={{ mr: 2 }} variant="h4">
              ${items.reduce((partialSum, { price }) => partialSum + price, 0)}
            </Typography>
            <Button type="submit" variant="contained" loading={loading || submitting} disabled={loading || submitting}>
              Proceed to checkout
            </Button>
          </SubmitBox>
        </Grid>
      </Grid>
    </form>
  );
};

interface Props {
  open: boolean;
  items: IAppointment[];
  loading: boolean;
  paymentToken: string;
  onClose: () => void;
  onSubmit: () => void;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const PaymentModal = ({ open, items, paymentToken, loading, onSubmit, onClose }: Props): ReactElement => {
  const options = {
    clientSecret: paymentToken,
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Grid container>
        <Grid sx={{ mb: 2 }} item xs={12}>
          <Typography variant="subtitle1">Select a payment method and pay</Typography>
        </Grid>
        <Grid item xs={12}>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm
              open={open}
              items={items}
              paymentToken={paymentToken}
              onPaid={onSubmit}
              loading={loading}
              onClose={onClose}
            />
          </Elements>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default PaymentModal;
