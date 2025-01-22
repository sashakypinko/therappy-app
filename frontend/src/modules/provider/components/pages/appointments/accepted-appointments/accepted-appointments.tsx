import {ReactElement, useRef, useState} from 'react';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import AppointmentsModal from '../../../../../../common/components/modals/appointments-modal';
import { AppointmentsModalTypes } from '../../../../../../common/components/modals/appointments-modal/appointments-modal';
import { AppointmentApi, defaultAppointmentValue } from '../../../../../../services/api/appointment';
import { useSnackbar } from '../../../../../../hooks';
import CancelRequestDto from '../../../../../../services/api/appointment/dto/cancel-request.dto';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';
import { TabProps } from '../appointments';

const AcceptedAppointments = ({ filters }: TabProps): ReactElement => {
  const updateListRef = useRef<(() => void) | null>(null);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<IAppointment>(defaultAppointmentValue);

  const handleSetAppointment = (appointment: IAppointment) => {
    setAppointment(appointment);
    setOpenModal(true);
  };

  const handleListUpdate = () => {
    if (updateListRef.current) {
      updateListRef.current();
    }
  };

  const handleCancel = async (data: CancelRequestDto) => {
    setLoading(true);
    try {
      await AppointmentApi.cancel(appointment.id, data);
      successSnackbar('Appointment cancelled successfully');
      handleListUpdate();
      setOpenModal(false);
    } catch (e) {
      errorSnackbar('Error while cancelling an appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppointmentsList
        type="upcoming"
        userType={UserTypesEnum.PROVIDER}
        updateListRef={(method) => (updateListRef.current = method)}
        filters={filters}
        actions={() => [
          {
            label: 'Cancel',
            variant: 'text',
            color: 'error',
            onClick: handleSetAppointment,
          },
        ]}
      />
      <AppointmentsModal
        open={openModal}
        type={AppointmentsModalTypes.CANCEL}
        userType={UserTypesEnum.PROVIDER}
        appointment={appointment}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCancel}
        submitProps={{
          label: 'Confirm Cancel',
          color: 'error',
        }}
      />
    </>
  );
};

export default AcceptedAppointments;
