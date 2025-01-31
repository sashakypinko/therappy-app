import { ReactElement } from 'react';
import { TabProps } from '../bookings';
import AppointmentsList from '../../../../../../common/components/appointments-list';

const CancelPending = ({ updateListRef, onShowAppointmentOpen }: TabProps): ReactElement => {
  return (
    <>
      <AppointmentsList
        type="cancelPending"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: 'Details',
            variant: 'contained',
            onClick: onShowAppointmentOpen,
          },
        ]}
      />
    </>
  );
};

export default CancelPending;
