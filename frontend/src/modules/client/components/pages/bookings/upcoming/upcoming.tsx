import { ReactElement } from 'react';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { TabProps } from '../bookings';

const Upcoming = ({ updateListRef, onCancelAppointmentOpen, onShowAppointmentOpen }: TabProps): ReactElement => {
  return (
    <>
      <AppointmentsList
        type="upcoming"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: 'Cancel',
            color: 'info',
            onClick: onCancelAppointmentOpen,
          },        {
            label: 'Details',
            variant: 'contained',
            onClick: onShowAppointmentOpen,
          },
        ]}
      />
    </>
  );
};

export default Upcoming;
