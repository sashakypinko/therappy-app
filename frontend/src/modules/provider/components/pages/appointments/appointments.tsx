import { FC, ReactElement, useEffect, useState } from "react";
import PageContainer from '../../../../../common/ui/page-container';
import FindAppointments from './find-appointments';
import AcceptedAppointments from './accepted-appointments';
import PastAppointments from './past-appointments';
import CancelledAppointments from './cancelled-appointments';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { Grid, useTheme } from '@mui/material';
import AppointmentFilters from './appointment-filters';
import { colors } from '../../../../../config/theme/colors';
import dayjs, { Dayjs } from 'dayjs';

enum Tabs {
  FIND,
  ACCEPTED,
  PAST,
  CANCELLED,
}

export interface TabProps {
  filters: {
    date: string | null;
  };
}

const tabComponents: { [key: number]: FC<TabProps> } = {
  [Tabs.FIND]: FindAppointments,
  [Tabs.ACCEPTED]: AcceptedAppointments,
  [Tabs.PAST]: PastAppointments,
  [Tabs.CANCELLED]: CancelledAppointments,
};

const Appointments = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<number>(Tabs.FIND);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const isMobile = useIsMobile();
  const TabComponent = tabComponents[activeTab];
  const { breakpoints } = useTheme();
  const isSmallScreen = window.innerWidth >= breakpoints.values.md;

  useEffect(() => {
    setSelectedDate(dayjs());
  }, [activeTab]);

  return (
    <Grid sx={{ p: 0 }} container>
      <Grid item sm={12} md={8} lg={8}>
        <PageContainer
          title={!isMobile ? 'Appointments' : undefined}
          activeTab={activeTab}
          tabs={[
            { label: 'Find', id: Tabs.FIND },
            { label: 'Accepted', id: Tabs.ACCEPTED },
            { label: 'Past', id: Tabs.PAST },
            { label: 'Cancelled', id: Tabs.CANCELLED },
          ]}
          onTabChange={setActiveTab}
        >
          {!isSmallScreen && (
            <Grid sx={{ background: colors.background.BG_1, mb: 3 }} item sm={12}>
              <AppointmentFilters date={selectedDate} onChange={setSelectedDate} />
            </Grid>
          )}
          <TabComponent filters={{ date: selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null }} />
        </PageContainer>
      </Grid>
      {isSmallScreen && (
        <Grid sx={{ background: colors.background.BG_1 }} item sm={12} md={4} lg={4}>
          <AppointmentFilters date={selectedDate} onChange={setSelectedDate} dateRequired={activeTab === Tabs.FIND} />
        </Grid>
      )}
    </Grid>
  );
};

export default Appointments;
