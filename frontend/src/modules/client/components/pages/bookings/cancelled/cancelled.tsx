import { ReactElement } from 'react';
import { TabProps } from '../bookings';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { colors } from '../../../../../../config/theme/colors';

const Cancelled = ({ updateListRef, onShowAppointmentOpen }: TabProps): ReactElement => {
  return (
    <>
      <AppointmentsList
        type="cancelled"
        updateListRef={(method) => (updateListRef.current = method)}
        actions={() => [
          {
            label: 'Details',
            variant: 'contained',
            onClick: onShowAppointmentOpen,
          },
        ]}
        itemColor={colors.error[10]}
      />
    </>
  );
};

export default Cancelled;
