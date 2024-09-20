import { ReactElement, useRef } from 'react';
import { colors } from '../../../../../../config/theme/colors';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';
import { TabProps } from '../appointments';
import { AppointmentStatusesEnum } from "../../../../../../enums/appointment-statuses.enum";

const CancelledAppointments = ({ filters }: TabProps): ReactElement => {
  const updateListRef = useRef<(() => void) | null>(null);

  return (
    <>
      <AppointmentsList
        type="cancelled"
        userType={UserTypesEnum.PROVIDER}
        updateListRef={(method) => (updateListRef.current = method)}
        itemColor={colors.error[10]}
        statusOverride={AppointmentStatusesEnum.CANCELED}
        filters={filters}
      />
    </>
  );
};

export default CancelledAppointments;
