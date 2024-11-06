import {
  useMemo,
  useState,
  ReactElement,
} from "react";

import { PaymentApi } from "services/api/payment";

import CartModal from "./cart-modal";
import Button from "../../../../../../common/ui/button";
import useIsMobile from "../../../../../../hooks/use-is-mobile.hook";
import AppointmentsList from "../../../../../../common/components/appointments-list";

import { TabProps, BookingsTabs } from "../bookings";
import { ICreatePaymentData } from "../../../../../../services/api/payment/dto";
import { IErrorTransaction, ISuccessTransaction } from "hooks/medipass/interfaces";
import { IAppointment } from "../../../../../../services/api/appointment/dto/appointment.dto";

import { useQuery, useAuthUser } from "hooks";
import useSnackbar from "../../../../../../hooks/use-snackbar.hook";

import SuccessPaymentModal from "./success-payment-modal";
import { MedipassPayment } from "./payment-modal/medipass-payment";

const WaitingForPayment = ({
  onTabChange,
  updateListRef,
  onUpdateAppointmentOpen,
  onCancelAppointmentOpen,
}: TabProps): ReactElement => {
  const { params } = useQuery();
  const { errorSnackbar } = useSnackbar();

  const user = useAuthUser();
  const isMobile = useIsMobile();

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<IAppointment[]>([]);
  const [openCartModal, setOpenCartModal] = useState<boolean | null>(null);
  const [paymentData, setPaymentData] = useState<ICreatePaymentData | null>(null);
  const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState<boolean>(false);

  const appointmentsIds = useMemo(() => selected.map(item => item.id), [selected]);

  const handleTableLoad = () => {
    if (params.openCartModal && openCartModal === null) {
      setOpenCartModal(true);
    }
  };

  const handleRemoveItem = (item: IAppointment) => {
    const newSelectedItems = selected.filter(({ id }) => id !== item.id);
    setSelected(newSelectedItems);
    if (!newSelectedItems.length) {
      setOpenCartModal(false);
    }
  };

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
  };

  const handleCancel = async () => {
    if (paymentData) {
      await PaymentApi.cancelPayment({ payment_id: paymentData.paymentId });
    }

    setPaymentData(null);
  };

  const handleError = async (response: IErrorTransaction) => {
    if (paymentData) {
      await PaymentApi.cancelPayment({ payment_id: paymentData.paymentId });
    }

    setPaymentData(null);
    errorSnackbar(response);
  };

  const handleSuccess = async (response: ISuccessTransaction) => {
    if (paymentData) {
      await PaymentApi.completePayment({
        payment_id: paymentData.paymentId,
        transaction_id: response.transactionId,
      });
    }

    setPaymentData(null);
    setOpenSuccessPaymentModal(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccessPaymentModal(false);
    onTabChange(BookingsTabs.UPCOMING);
  };

  return (
    <>
      <AppointmentsList
        type="cart"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: "Cancel",
            color: "info",
            onClick: onCancelAppointmentOpen,
          },
          {
            label: "Edit",
            variant: "contained",
            onClick: onUpdateAppointmentOpen,
          },
        ]}
        selectedAppointments={selected}
        onSelect={setSelected}
        onLoad={handleTableLoad}
        selectedAction={
          <Button sx={{ width: isMobile ? "100%" : "auto" }} variant="contained" onClick={() => setOpenCartModal(true)}>
            Review and pay (selected {selected.length} appointment{selected.length > 1 ? "s" : ""})
          </Button>
        }
      />
      <CartModal
        items={selected}
        loading={loading}
        open={!!openCartModal}
        onRemove={handleRemoveItem}
        onSubmit={handleCreatePayment}
        onClose={() => setOpenCartModal(false)}
      />
      {(paymentData && user) && (
        <MedipassPayment
          user={user}
          onError={handleError}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
          paymentData={paymentData}
        />
      )}
      <SuccessPaymentModal
        onClose={handleCloseSuccess}
        open={openSuccessPaymentModal}
      />
    </>
  );
};

export default WaitingForPayment;
