import { ReactElement, useRef, useState } from 'react';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import AppointmentsModal from '../../../../../../common/components/modals/appointments-modal';
import { AppointmentsModalTypes } from '../../../../../../common/components/modals/appointments-modal/appointments-modal';
import { AppointmentApi, defaultAppointmentValue } from '../../../../../../services/api/appointment';
import { useSnackbar } from '../../../../../../hooks';
import AcceptRequestDto from '../../../../../../services/api/appointment/dto/accept-request.dto';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';
import { TabProps } from '../appointments';

const FindAppointments = ({ filters }: TabProps): ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<IAppointment>(defaultAppointmentValue);
  const [loading, setLoading] = useState<boolean>(false);
  const updateListRef = useRef<(() => void) | null>(null);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const handleSetAppointment = (appointment: IAppointment) => {
    setAppointment(appointment);
    setOpenModal(true);
  };

  const handleListUpdate = () => {
    if (updateListRef.current) {
      updateListRef.current();
    }
  };

  const handleAccept = async (value: IAppointment) => {
    if(value.start && value.end) {
      setLoading(true);
      try {
        await AppointmentApi.accept(appointment.id, {
          start: value.start,
          end: value.end,
        });
        successSnackbar('Appointment accepted successfully');
        handleListUpdate();
        setOpenModal(false);
      } catch (e) {
        errorSnackbar('Error while accepting an Appointment');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <AppointmentsList
        type="find"
        userType={UserTypesEnum.PROVIDER}
        updateListRef={(method) => (updateListRef.current = method)}
        filters={filters}
        actions={() => [
          {
            label: 'Accept',
            variant: 'contained',
            onClick: handleSetAppointment,
          },
        ]}
      />
      <AppointmentsModal
        open={openModal}
        type={AppointmentsModalTypes.ACCEPT}
        userType={UserTypesEnum.PROVIDER}
        appointment={appointment}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAccept}
        submitProps={{
          label: 'Accept',
        }}
      />
    </>
  );
};

export default FindAppointments;
