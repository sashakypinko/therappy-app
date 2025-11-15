import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import PageContainer from '../../../../../common/ui/page-container';
import Scheduler from '../../../../../common/components/scheduler';
import { Box, Divider, Grid, styled, Typography } from '@mui/material';
import { colors } from '../../../../../config/theme/colors';
import Button from '../../../../../common/ui/button';
import { SchedulerItems } from '../../../../../common/components/scheduler/scheduler';
import { UserTypesEnum } from '../../../../../enums/user-types.enum';
import { IAppointment } from '../../../../../services/api/appointment/dto/appointment.dto';
import { CategoryLabels, ServiceCategoriesEnum } from '../../../../../enums/service-categories.enum';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppointments, selectServices } from '../../../../../store/selectors';
import { IService } from '../../../../../services/api/service/dto/service.dto';
import { ItemStatusEnum } from '../../../../../common/components/scheduler/enums/item-status.enum';
import DateCalendar from '../../../../../common/ui/calendar';
import { getAppointments } from '../../../../../store/actions/appointments';
import { AppointmentStatusesEnum } from '../../../../../enums/appointment-statuses.enum';
import AppointmentsChecklist from './appointments-checklist';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import AppointmentsModal from '../../../../../common/components/modals/appointments-modal';
import { AppointmentsModalTypes } from '../../../../../common/components/modals/appointments-modal/appointments-modal';
import { AppointmentApi, defaultAppointmentValue } from '../../../../../services/api/appointment';
import { useSnackbar } from '../../../../../hooks';
import ReviewRequestDto from '../../../../../services/api/appointment/dto/review-request.dto';
import CancelRequestDto from '../../../../../services/api/appointment/dto/cancel-request.dto';
import BlockUserModal from '../appointments/past-appointments/block-modal';
import { ProviderApi } from '../../../../../services/api/provider';
import useBackdrop from '../../../../../common/ui/backdrop/hooks/use-backdrop.hook';

const VerticalLine = styled(Divider)(
  ({ theme }) => `
    position: relative;
    color: blue;
    background: ${colors.primary[70]};
    right: 60px;
    width: 76px;
    top: 35px;
    transform: rotate(90deg);
`,
);

interface CalendarItemProps {
  appointment: IAppointment;
  type: ItemStatusEnum;
  onReview: ((appointment: IAppointment) => void) | false;
  onStart: ((appointment: IAppointment) => void) | false;
  onCancel: ((appointment: IAppointment) => void) | false;
}

const CalendarItem = ({ appointment, type, onStart, onCancel, onReview }: CalendarItemProps) => {
  const { services, loading } = useSelector(selectServices);
  const isMobile = useIsMobile();

  if (loading) {
    return null;
  }
  const categoryId = services.data.find(({ id }: IService) => appointment.service_id === id)
    ?.category_id as ServiceCategoriesEnum;

  return (
    <Grid container>
      <Grid item sx={{ pt: 1, pl: 4 }} xs={12} md={3}>
        <Typography variant="body2" fontWeight={700}>
          {CategoryLabels[categoryId]}
        </Typography>
        <Typography variant="body2">Patient</Typography>
        <Typography variant="body2">
          {appointment.user.first_name} {appointment.user.last_name}
        </Typography>
      </Grid>
      <Grid item sx={{ pt: 1, pl: 4 }} xs={12} md={6}>
        {!isMobile && (
          <Box>
            <VerticalLine
              sx={{ background: type === ItemStatusEnum.CURRENT ? colors.primary[70] : colors.secondary[30] }}
            />
          </Box>
        )}
        <Typography variant="body2" color={colors.primary[70]}>
          {dayjs(appointment?.start, 'HH:mm:ss').format('ha')}
        </Typography>
        <Typography variant="body2" color={colors.primary[70]}>
          {dayjs(appointment.date).format('DD MMMM YYYY')}
        </Typography>
        <Typography fontSize={14}>{appointment.address}</Typography>
      </Grid>
      <Grid
        item
        sx={isMobile ? { padding: '8px 32px' } : { pr: 3, pt: 2 }}
        display={isMobile ? 'flex' : 'grid'}
        justifyContent={isMobile ? 'space-between' : 'end'}
        alignItems="center"
        xs={12}
        md={3}
      >
        {onStart ? (
          <Button sx={{ height: 30 }} variant="contained" onClick={() => onStart(appointment)} fullWidth={isMobile}>
            Start
          </Button>
        ) : isMobile ? (
          <Box sx={{ width: '100%' }} />
        ) : (
          ''
        )}
        {onReview && (
          <Button
            sx={{ height: 30 }}
            variant="contained"
            color="info"
            onClick={() => onReview(appointment)}
            fullWidth={isMobile}
          >
            Review
          </Button>
        )}
        {onCancel && (
          <Button sx={{ height: 30 }} color="error" onClick={() => onCancel(appointment)} fullWidth={isMobile}>
            Cancel
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

const Calendar = (): ReactElement => {
  const now = dayjs(new Date());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(now);
  const [blockUserId, setBlockUserId] = useState<number | null>(null);
  const [cancelAppointment, setCancelAppointment] = useState<IAppointment | null>(null);
  const [reviewAppointment, setReviewAppointment] = useState<IAppointment | null>(null);
  const [startAppointment, setStartAppointment] = useState<IAppointment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { appointments, loading: appointmentsLoading } = useSelector(selectAppointments);
  const isMobile = useIsMobile();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const { startLoading, endLoading } = useBackdrop();

  const fetchAppointments = () => {
    dispatch(
      getAppointments({
        userType: UserTypesEnum.PROVIDER,
        tab: 'upcoming',
        date: selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null,
      }),
    );
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    appointmentsLoading ? startLoading() : endLoading();
  }, [appointmentsLoading]);

  const handleStart = async () => {
    if (startAppointment) {
      setLoading(true);
      try {
        await AppointmentApi.start(startAppointment.id);
        successSnackbar('Appointment started successfully');
        fetchAppointments();
        setStartAppointment(null);
      } catch (e) {
        errorSnackbar('Error while starting an appointment');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = async (data: CancelRequestDto) => {
    if (cancelAppointment) {
      setLoading(true);
      try {
        await AppointmentApi.cancel(cancelAppointment.id, data);
        successSnackbar('Appointment cancelled successfully');
        fetchAppointments();
        setCancelAppointment(null);
      } catch (e) {
        errorSnackbar('Error while cancelling an appointment');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReview = async (data: ReviewRequestDto) => {
    if (reviewAppointment) {
      setLoading(true);
      const { blockUser, ...requestData } = data;
      try {
        await AppointmentApi.review(reviewAppointment.id, requestData);
        successSnackbar('Feedback sent successfully');
        fetchAppointments();

        if (blockUser) {
          setBlockUserId(reviewAppointment.user.id);
        }

        setReviewAppointment(null);
      } catch (e) {
        errorSnackbar('Error while sending feedback!');
      } finally {
        setLoading(false);
      }
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

  const schedulerItems = useMemo(() => {
    const result: SchedulerItems = {};
    let currentChanged = false;

    appointments.data.forEach((appointment: IAppointment) => {
      if (appointment.start) {
        let type: ItemStatusEnum = ItemStatusEnum.UPCOMING;

        if (appointment.status === AppointmentStatusesEnum.FINISHED) {
          type = ItemStatusEnum.PAST;
        } else if (!currentChanged) {
          currentChanged = true;
          type = ItemStatusEnum.CURRENT;
        }

        result[appointment.start.slice(0, 2)] = {
          itemContent: (
            <CalendarItem
              appointment={appointment}
              type={type}
              onReview={type === ItemStatusEnum.PAST && setReviewAppointment}
              onStart={type === ItemStatusEnum.CURRENT && setStartAppointment}
              onCancel={(type === ItemStatusEnum.CURRENT || type === ItemStatusEnum.UPCOMING) && setCancelAppointment}
            />
          ),
          type,
        };
      }
    });

    return result;
  }, [appointments]);

  return (
    <PageContainer>
      <Grid container spacing={2}>
        {isMobile && (
          <Grid item xs={12}>
            <DateCalendar value={selectedDate} onChange={setSelectedDate} />
            <Divider />
          </Grid>
        )}
        <Grid item xs={12} md={8}>
          <Scheduler items={schedulerItems} date={selectedDate} />
        </Grid>
        {!isMobile && (
          <Grid item xs={12} md={4}>
            <Box sx={{ background: colors.background.BG_1 }}>
              <DateCalendar value={selectedDate} onChange={setSelectedDate} />
              <Divider />
              <AppointmentsChecklist appointments={appointments.data} />
            </Box>
          </Grid>
        )}
      </Grid>
      <AppointmentsModal
        open={!!cancelAppointment}
        type={AppointmentsModalTypes.CANCEL}
        userType={UserTypesEnum.PROVIDER}
        appointment={cancelAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setCancelAppointment(null)}
        onSubmit={handleCancel}
        submitProps={{
          label: 'Confirm',
          color: 'error',
        }}
      />
      <AppointmentsModal
        open={!!reviewAppointment}
        type={AppointmentsModalTypes.REVIEW}
        userType={UserTypesEnum.PROVIDER}
        appointment={reviewAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setReviewAppointment(null)}
        onSubmit={handleReview}
        submitProps={{
          label: 'Send',
        }}
      />
      <AppointmentsModal
        open={!!startAppointment}
        type={AppointmentsModalTypes.START}
        userType={UserTypesEnum.PROVIDER}
        appointment={startAppointment || defaultAppointmentValue}
        loading={loading}
        onClose={() => setStartAppointment(null)}
        onSubmit={handleStart}
        submitProps={{
          label: 'Start',
        }}
      />
      <BlockUserModal
        open={!!blockUserId}
        loading={loading}
        onConfirm={handleBlockUser}
        onClose={() => setBlockUserId(null)}
      />
    </PageContainer>
  );
};

export default Calendar;
