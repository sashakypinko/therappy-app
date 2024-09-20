import { FC, ReactElement, useRef, useState } from 'react';
import PageContainer from '../../../../../common/ui/page-container';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import Cancelled from './cancelled';
import Past from './past';
import Upcoming from './upcoming';
import WaitingForPayment from './waiting-for-payment';
import Button from '../../../../../common/ui/button';
import { Add } from '@mui/icons-material';
import { AppointmentApi, defaultAppointmentValue } from '../../../../../services/api/appointment';
import { useQuery, useSnackbar } from '../../../../../hooks';
import { IAppointment } from '../../../../../services/api/appointment/dto/appointment.dto';
import AppointmentsModal from '../../../../../common/components/modals/appointments-modal';
import { AppointmentsModalTypes } from '../../../../../common/components/modals/appointments-modal/appointments-modal';
import { AppointmentTimeTypesEnum } from '../../../../../enums/appointment-time-types.enum';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import { useNavigate } from 'react-router-dom';
import ReviewRequestDto from '../../../../../services/api/appointment/dto/review-request.dto';
import { appendIntervals } from '../../../../../helpers/appointment.helper';
import { updateAppointment } from '../../../../../store/actions/appointments';
import { useDispatch } from 'react-redux';
import { UserTypesEnum } from '../../../../../enums/user-types.enum';

export enum BookingsTabs {
  WAITING_FOR_PAYMENT,
  UPCOMING,
  PAST,
  CANCELLED,
}

export interface TabProps {
  updateListRef: any;
  loading: boolean;
  onUpdateAppointmentOpen: (appointment: IAppointment) => void;
  onCancelAppointmentOpen: (appointment: IAppointment) => void;
  onShowAppointmentOpen: (appointment: IAppointment) => void;
  onFeedbackAppointmentOpen: (appointment: IAppointment) => void;
  onRebookAppointmentOpen: (appointment: IAppointment) => void;
  onTabChange: (id: number) => void;
}

const tabComponents: { [key: number]: FC<TabProps> } = {
  [BookingsTabs.WAITING_FOR_PAYMENT]: WaitingForPayment,
  [BookingsTabs.UPCOMING]: Upcoming,
  [BookingsTabs.PAST]: Past,
  [BookingsTabs.CANCELLED]: Cancelled,
};

const Bookings = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<number>(BookingsTabs.WAITING_FOR_PAYMENT);
  const [loading, setLoading] = useState<boolean>(false);
  const [editAppointment, setEditAppointment] = useState<IAppointment | null>(null);
  const [cancelAppointment, setCancelAppointment] = useState<IAppointment | null>(null);
  const [showAppointment, setShowAppointment] = useState<IAppointment | null>(null);
  const [feedbackAppointment, setFeedbackAppointment] = useState<IAppointment | null>(null);
  const [rebookAppointment, setRebookAppointment] = useState<IAppointment | null>(null);
  const updateListRef = useRef<(() => void) | null>(null);
  const isMobile = useIsMobile();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListUpdate = () => {
    if (updateListRef.current) {
      updateListRef.current();
    }
  };

  const handleSetEditableAppointment = (appointment: IAppointment) => {
    setEditAppointment(
      structuredClone({
        ...appointment,
        timeType: AppointmentTimeTypesEnum.SPECIFIC,
      }),
    );
  };

  const handleUpdateAppointment = async (value: IAppointment) => {
    if (value) {
      setLoading(true);
      const { start, end, ...appointment } = structuredClone(value);

      dispatch(
        updateAppointment(
          appendIntervals(appointment) as IAppointment,
          () => {
            successSnackbar('Appointment updated successfully');
            handleListUpdate();
            setEditAppointment(null);
            setLoading(false);
          },
          () => {
            errorSnackbar('Error while updating appointment!');
            setLoading(false);
          },
        ),
      );
    }
  };

  const handleCancelAppointment = async () => {
    if (cancelAppointment) {
      setLoading(true);
      try {
        await AppointmentApi.clientCancel(cancelAppointment.id);
        successSnackbar('Appointment cancelled successfully');
        handleListUpdate();
        setCancelAppointment(null);
      } catch (e) {
        errorSnackbar('Error while cancelling appointment!');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSendFeedback = async (data: ReviewRequestDto) => {
    if (feedbackAppointment) {
      setLoading(true);
      try {
        await AppointmentApi.review(feedbackAppointment.id, data);
        successSnackbar('Feedback sent successfully');
        handleListUpdate();
        setFeedbackAppointment(null);
      } catch (e) {
        errorSnackbar('Error while sending feedback!');
      } finally {
        setLoading(false);
      }
    }
  };

  const TabComponent = tabComponents[activeTab];

  return (
    <PageContainer
      title={!isMobile ? 'My Bookings' : undefined}
      activeTab={activeTab}
      tabs={[
        { label: 'Unpaid', id: BookingsTabs.WAITING_FOR_PAYMENT },
        { label: 'Upcoming', id: BookingsTabs.UPCOMING },
        { label: 'Past', id: BookingsTabs.PAST },
        { label: 'Cancelled', id: BookingsTabs.CANCELLED },
      ]}
      onTabChange={setActiveTab}
    >
      <Button
        sx={{ mb: 2, mt: 2 }}
        variant="outlined"
        color="info"
        onClick={() => navigate(ClientRouteEnum.CREATE_APPOINTMENT)}
        fullWidth
      >
        <Add /> Book one more service
      </Button>
      <TabComponent
        updateListRef={updateListRef}
        loading={loading}
        onUpdateAppointmentOpen={handleSetEditableAppointment}
        onCancelAppointmentOpen={setCancelAppointment}
        onShowAppointmentOpen={setShowAppointment}
        onFeedbackAppointmentOpen={setFeedbackAppointment}
        onRebookAppointmentOpen={setRebookAppointment}
        onTabChange={setActiveTab}
      />
      <AppointmentsModal
        open={!!editAppointment}
        type={AppointmentsModalTypes.EDIT}
        userType={UserTypesEnum.CLIENT}
        appointment={editAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setEditAppointment(null)}
        onSubmit={handleUpdateAppointment}
        submitProps={{
          label: 'Save',
        }}
      />
      <AppointmentsModal
        open={!!cancelAppointment}
        type={AppointmentsModalTypes.CLOSE}
        userType={UserTypesEnum.CLIENT}
        appointment={cancelAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setCancelAppointment(null)}
        onSubmit={handleCancelAppointment}
        submitProps={{
          label: 'Confirm',
          color: 'error',
        }}
      />
      <AppointmentsModal
        open={!!showAppointment}
        type={AppointmentsModalTypes.SHOW}
        userType={UserTypesEnum.CLIENT}
        appointment={showAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setShowAppointment(null)}
      />
      <AppointmentsModal
        open={!!feedbackAppointment}
        type={AppointmentsModalTypes.FEEDBACK}
        userType={UserTypesEnum.CLIENT}
        appointment={feedbackAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setFeedbackAppointment(null)}
        onSubmit={handleSendFeedback}
        submitProps={{
          label: 'Send',
          disabled: !!feedbackAppointment?.review
        }}
      />
      <AppointmentsModal
        open={!!rebookAppointment}
        type={AppointmentsModalTypes.REBOOK}
        userType={UserTypesEnum.CLIENT}
        appointment={rebookAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setRebookAppointment(null)}
        onSubmit={() => navigate(`${ClientRouteEnum.REBOOK_APPOINTMENT}?providerId=${rebookAppointment?.therapist_id}`)}
        submitProps={{
          label: 'Next',
        }}
      />
    </PageContainer>
  );
};

export default Bookings;
