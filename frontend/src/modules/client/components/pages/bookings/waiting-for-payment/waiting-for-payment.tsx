import {ReactElement, useEffect, useMemo, useState} from 'react';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import Button from '../../../../../../common/ui/button';
import useIsMobile from '../../../../../../hooks/use-is-mobile.hook';
import CartModal from './cart-modal';
import PaymentModal from './payment-modal';
import { BookingsTabs, TabProps } from "../bookings";
import {useAuthUser, useQuery} from '../../../../../../hooks';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { AppointmentApi } from '../../../../../../services/api/appointment';
import SuccessPaymentModal from './success-payment-modal';
import { useNavigate } from "react-router-dom";
import {PaymentApi} from "../../../../../../services/api/payment";
import { MedipassPayment } from './payment-modal/medipass-payment';
import { ICreatePaymentData } from '../../../../../../services/api/payment/dto';

const WaitingForPayment = ({
  updateListRef,
  onUpdateAppointmentOpen,
  onCancelAppointmentOpen,
  onTabChange,
}: TabProps): ReactElement => {
  const { params } = useQuery();

  const user = useAuthUser();
  const [openCartModal, setOpenCartModal] = useState<boolean | null>(null);
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentToken, setPaymentToken] = useState<string>('');
  const [paymentData, setPaymentData] = useState<ICreatePaymentData | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [selected, setSelected] = useState<IAppointment[]>([]);
  const isMobile = useIsMobile();
  const { errorSnackbar, successSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [paymentId, setPaymentId] = useState<number | null>(null);

  const handleRemoveItem = (item: IAppointment) => {
    const newSelectedItems = selected.filter(({ id }) => id !== item.id);
    setSelected(newSelectedItems);
    if (!newSelectedItems.length) {
      setOpenCartModal(false);
    }
  };

  const appointmentsIds = useMemo(() => selected.map(item => item.id), [selected]);

  const handleCreatePayment = async () => {
    if (!user) return void 0;

    try {
      setLoading(true);

      const { data } = await PaymentApi.createPayment({
        user_id: user.id,
        appointment_ids: appointmentsIds,
      });

      setPaymentData({
        token: data.token,
        paymentId: data.paymentId,
        amount: `$${data.amount}`
      });
      setOpenCartModal(false);
    } catch (e) {
      errorSnackbar("Error while checking out!");
    } finally {
      setLoading(false);
    }

    // try {
    //   setLoading(true);
    //   const { client_secret, status, order_id } = await AppointmentApi.createPayment({
    //     items: selected.map(({ id }) => id),
    //   });
    //
    //   if (status) {
    //     setPaymentToken(client_secret);
    //     setOrderId(order_id);
    //     setOpenCartModal(false);
    //     setOpenPaymentModal(true);
    //   } else {
    //     errorSnackbar('Error while checking out!');
    //   }
    // } catch (e) {
    //   errorSnackbar('Error while checking out!');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCompletePayment = async () => {
    if (orderId) {
      try {
        setLoading(true);
        const { status } = await AppointmentApi.completePayment({
          items: selected.map(({ id }) => id),
          client_secret: paymentToken,
          order_id: orderId,
        });

        if (status) {
          setPaymentToken('');
          setOpenPaymentModal(false);
          setOpenSuccessPaymentModal(true);
          setSelected([]);
          onTabChange(BookingsTabs.UPCOMING);
        } else {
          errorSnackbar('Error while paying appointments!');
        }
      } catch (e) {
        errorSnackbar('Error while paying appointments!');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTableLoad = () => {
    if (params.openCartModal && openCartModal === null) {
      setOpenCartModal(true);
    }
  };

  return (
    <>
      <AppointmentsList
        type="cart"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: 'Cancel',
            color: 'info',
            onClick: onCancelAppointmentOpen,
          },
          {
            label: 'Edit',
            variant: 'contained',
            onClick: onUpdateAppointmentOpen,
          },
        ]}
        selectedAppointments={selected}
        onSelect={setSelected}
        onLoad={handleTableLoad}
        selectedAction={
          <Button sx={{ width: isMobile ? '100%' : 'auto' }} variant="contained" onClick={() => setOpenCartModal(true)}>
            Review and pay (selected {selected.length} appointment{selected.length > 1 ? 's' : ''})
          </Button>
        }
      />
      <CartModal
        open={!!openCartModal}
        items={selected}
        loading={loading}
        onRemove={handleRemoveItem}
        onClose={() => setOpenCartModal(false)}
        onSubmit={handleCreatePayment}
      />
      {paymentData && <MedipassPayment paymentData={paymentData} />}
      <SuccessPaymentModal
        open={openSuccessPaymentModal}
        onClose={() => setOpenSuccessPaymentModal(false)}
      />
    </>
  );
};

export default WaitingForPayment;
