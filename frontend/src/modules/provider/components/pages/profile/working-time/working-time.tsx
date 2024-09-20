import { ReactElement } from 'react';
import ProfileContainer from '../profile-container';
import ScheduleCard from '../../../layouts/profile-cards/schedule-card';

const WorkingTime = ({ loading }: { loading: boolean }): ReactElement => {
  return (
    <ProfileContainer title="Working Time" subtitle="Update your working time here.">
      <ScheduleCard loading={loading} withDateOverrides />
    </ProfileContainer>
  );
};

export default WorkingTime;
