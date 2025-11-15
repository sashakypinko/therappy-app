import { ReactElement, useRef, useState } from 'react';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import AppointmentsModal from '../../../../../../common/components/modals/appointments-modal';
import { AppointmentsModalTypes } from '../../../../../../common/components/modals/appointments-modal/appointments-modal';
import { AppointmentApi, defaultAppointmentValue } from '../../../../../../services/api/appointment';
import BlockModal from './block-modal';
import { useSnackbar } from '../../../../../../hooks';
import ReviewRequestDto from '../../../../../../services/api/appointment/dto/review-request.dto';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';
import { TabProps } from '../appointments';
import { ProviderApi } from '../../../../../../services/api/provider';
import AppointmentTotals from './appointment-totals';
import { Box } from '@mui/material';

const PastAppointments = ({ filters }: TabProps): ReactElement => {
  const [openAppointmentModal, setOpenAppointmentModal] = useState<boolean>(false);
  const [blockUserId, setBlockUserId] = useState<number | null>(null);
  const [appointment, setAppointment] = useState<IAppointment>(defaultAppointmentValue);
  const [loading, setLoading] = useState<boolean>(false);
  const updateListRef = useRef<(() => void) | null>(null);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const handleSetAppointment = (appointment: IAppointment) => {
    setAppointment(appointment);
    setOpenAppointmentModal(true);
  };

  const handleListUpdate = () => {
    if (updateListRef.current) {
      updateListRef.current();
    }
  };

  const handleReview = async (data: ReviewRequestDto) => {
    setLoading(true);
    const { blockUser, ...requestData } = data;
    try {
      await AppointmentApi.review(appointment.id, { ...requestData, author: UserTypesEnum.PROVIDER });
      successSnackbar('Feedback sent successfully');
      handleListUpdate();

      if (blockUser) {
        setBlockUserId(appointment.user.id);
      }

      setOpenAppointmentModal(false);
    } catch (e) {
      errorSnackbar('Error while sending feedback!');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async () => {
    if (blockUserId) {
      setLoading(true);
      try {
        await ProviderApi.blockUsers({ target_id: blockUserId, block: 1 });
        successSnackbar('User blocked successfully');
        setBlockUserId(null);
      } catch (e) {
        errorSnackbar('Error while blocking user!');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <AppointmentsList
        type="past"
        userType={UserTypesEnum.PROVIDER}
        updateListRef={(method) => (updateListRef.current = method)}
        filters={filters}
        actions={() => [
          {
            label: 'Review or Block Patient',
            variant: 'contained',
            onClick: handleSetAppointment,
          },
        ]}
      />
      <Box sx={{ mb: 4 }}>
        <AppointmentTotals />
      </Box>
      <AppointmentsModal
        open={openAppointmentModal}
        type={AppointmentsModalTypes.REVIEW}
        userType={UserTypesEnum.PROVIDER}
        appointment={appointment}
        loading={loading}
        onClose={() => setOpenAppointmentModal(false)}
        onSubmit={handleReview}
        submitProps={{
          label: 'Send',
          disabled: !!appointment?.review
        }}
      />
      <BlockModal
        open={!!blockUserId}
        loading={loading}
        onConfirm={handleBlockUser}
        onClose={() => setBlockUserId(null)}
      />
    </>
  );
};

export default PastAppointments;
