import { ReactElement, useEffect, useState } from 'react';
import { Box, Divider, Grid, IconButton, styled, Typography, useTheme } from '@mui/material';
import { ClearRounded, KeyboardBackspaceRounded, StarRounded } from '@mui/icons-material';
import { colors } from '../../../../../config/theme/colors';
import { useQuery } from '../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import { IProvider } from '../../../../../services/api/provider/dto/provider.dto';
import { ProviderApi } from '../../../../../services/api/provider';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { getImagePath } from '../../../../../helpers/image.helper';
import { CategoryLabels } from '../../../../../enums/service-categories.enum';
import { IService } from '../../../../../services/api/service/dto/service.dto';
import Button from '../../../../../common/ui/button';
import { CreateAppointmentDto } from '../../../../../services/api/appointment/dto/create-appointment.dto';
import { defaultCreateAppointmentValue } from '../../../../../services/api/appointment/default-appointment-value';
import DesktopPageTabs from '../../../../../common/ui/page-container/desktop=page-tabs';
import AppointmentDatePicker from '../../../../../common/components/appointment-date-picker';
import { IAppointment, TimeRange } from '../../../../../services/api/appointment/dto/appointment.dto';
import { AppointmentTimeTypeLabels, AppointmentTimeTypesEnum } from '../../../../../enums/appointment-time-types.enum';
import useWorkingHours from '../../../../../hooks/use-working-hours.hook';
import dayjs from 'dayjs';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import ReviewsList from './reviews-list';
import { appendIntervals } from '../../../../../helpers/appointment.helper';
import { createAppointment, removeAppointment } from '../../../../../store/actions/appointments';
import { BookingsTabs } from '../bookings/bookings';
import { useDispatch } from 'react-redux';
import { DataTableResponse } from '../../../../../interfaces/data-table-response.interface';
import { IReview } from '../../../../../services/api/user/dto/review.dto';
import { ImageSizesEnum } from "../../../../../enums/image-sizes.enum";

const Card = styled(Box)(
  () => `
    border-radius: 6px;
    padding: 16px;
    height: 100%;
    border: 1px solid ${colors.secondary[30]};
    background: ${colors.background.BG_1};
`,
);

const Avatar = styled('img')(
  () => `
    object-fit: cover;
    border-radius: 4px;
    margin-right: 16px;
    width: 125px;
    height: 125px;
`,
);

const RatingBadge = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    padding: 0px 4px;
    border-radius: 4px;
    background: ${colors.primary[10]};
`,
);

const AddedAppointmentBadge = styled(Box)(
  () => `
    display: flex;
    padding: 8px;
    margin: 8px 0;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    color: ${colors.primary[50]};
    background: ${colors.primary[10]};
`,
);

const ConfirmButtonContainer = styled(Box)(
  () => `
    display: flex;
    justify-content: end;
    align-items: end;
    position: absolute;
    bottom: 0;
    right: 0;
`,
);

enum Tabs {
  ABOUT = 1,
  QUALIFICATIONS,
}

const RebookAppointment = (): ReactElement | null => {
  const hours = useWorkingHours();
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [reviewsCount, setReviewsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);
  const [removing, setRemoving] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<CreateAppointmentDto>({
    ...defaultCreateAppointmentValue,
    type: 2,
    date: dayjs(new Date()).format('YYYY-MM-DD'),
  });
  const [addedAppointments, setAddedAppointments] = useState<IAppointment[]>([]);
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.ABOUT);
  const { params } = useQuery();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const getProvider = async (id: number) => {
    try {
      const provider = await ProviderApi.getById(id);
      const firstService = provider.services[0] as IService;

      setProvider(provider);
      setAppointment({
        ...appointment,
        service_id: firstService.id,
        ...(firstService?.types && {
          price: firstService?.types[appointment?.type || 0].price,
          duration: firstService?.types[appointment?.type || 0].duration,
          preferred_therapist_id: provider.id,
        }),
      });
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get therapist data.");
      navigate(ClientRouteEnum.BOOKINGS);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date: string | null) => {
    setAppointment({ ...appointment, date });
  };

  const handleIntervalsChange = (intervals: TimeRange[]) => {
    setAppointment({ ...appointment, intervals });
  };

  const handleTimeTypeChange = (timeType: AppointmentTimeTypesEnum) => {
    setAppointment({
      ...appointment,
      timeType,
      intervals: timeType === AppointmentTimeTypesEnum.SPECIFIC ? [{ start: hours[0], end: hours[5] }] : [],
    });
  };

  const handleCreateAppointment = async () => {
    setCreating(true);

    dispatch(
      createAppointment(
        appendIntervals({ ...appointment }) as IAppointment,
        (newAppointment: IAppointment) => {
          setAddedAppointments([...addedAppointments, newAppointment]);
          successSnackbar('Appointment added successfully');
          setCreating(false);
        },
        () => {
          errorSnackbar('Error while adding new appointment!');
          setCreating(false);
        },
      ),
    );
  };

  const handleRemoveAppointment = async (id: number) => {
    setRemoving(true);

    dispatch(
      removeAppointment(
        id,
        () => {
          setAddedAppointments(addedAppointments.filter(({ id: appointmentId }) => appointmentId !== id));
          successSnackbar('Appointment removed successfully');
          setRemoving(false);
        },
        () => {
          errorSnackbar('Error while removing appointment!');
          setRemoving(false);
        },
      ),
    );
  };

  const handleBookingConfirm = () => {
    navigate(
      `${ClientRouteEnum.BOOKINGS}?tab=${BookingsTabs.WAITING_FOR_PAYMENT}&openCartModal=1&selected=[${addedAppointments
        .map(({ id }) => id)
        .join(',')}]`,
    );
  };

  const handleScrollToReviews = () => {
    const reviewsSection = document.getElementById('reviewsSection');
    if (!reviewsSection) return;

    window.scrollTo({
      top: reviewsSection.getBoundingClientRect().top - 50,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (params.providerId) {
      getProvider(parseInt(params.providerId)).then();
    } else {
      navigate(ClientRouteEnum.BOOKINGS);
    }
  }, []);

  if (loading || !provider) {
    return null;
  }

  const selectedService = (provider.services as IService[]).find(({ id }) => id === appointment.service_id);
  const price = addedAppointments.reduce((partialSum, { price }) => partialSum + price, 0);

  const handleServiceTypeChange = (type: number) => {
    if (selectedService?.types) {
      const serviceType = selectedService?.types[type];
      setAppointment({
        ...appointment,
        type,
        price: serviceType?.price,
        duration: serviceType?.duration,
      });
    }
  };

  return (
    <Grid sx={{ p: isMobile ? 2 : 4 }} container spacing={2} maxWidth={theme.breakpoints.values.xl}>
      <Grid item xs={12}>
        <Box sx={{ mt: isMobile ? 8 : 0 }} display="flex" alignItems="center">
          <IconButton onClick={() => navigate(ClientRouteEnum.BOOKINGS)}>
            <KeyboardBackspaceRounded />
          </IconButton>
          <Typography variant="h6">Past bookings</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Box display="flex">
                <Avatar src={getImagePath(provider.details.image_id || 0, ImageSizesEnum.MEDIUM)} />
                <Box>
                  <Typography variant="h6">
                    {provider.first_name} {provider.last_name}
                  </Typography>
                  <Typography variant="body2" color={colors.primary[60]} fontWeight={600}>
                    {CategoryLabels[(provider.services[0] as unknown as IService)?.category_id]}
                  </Typography>
                  <Typography sx={{ mt: 1 }} variant="body2">
                    {provider.email}
                  </Typography>
                  <Box sx={{ mt: 2 }} display="flex">
                    <RatingBadge sx={{ mr: 2 }}>
                      <StarRounded sx={{ color: colors.warning[40], fontSize: 20, mr: 1 }} />
                      <Typography variant="body2" color={colors.primary[50]} fontWeight={600}>
                        4.98
                      </Typography>
                    </RatingBadge>
                    <Typography
                      variant="body2"
                      sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                      color={colors.primary[50]}
                      fontWeight={600}
                      onClick={handleScrollToReviews}
                    >
                      ({reviewsCount}) reviews
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Typography sx={{ mt: 2 }} variant="body2">
                Services provided by the therapist
              </Typography>
              <Grid container sx={{ mt: 1 }} spacing={1} maxWidth={600}>
                {(provider.services as IService[]).map(({ id, name }) => (
                  <Grid sx={{ pl: 1, pr: 1 }} key={id} item xs={12} md={6}>
                    <Button
                      variant="outlined"
                      color={appointment.service_id === id ? 'primary' : 'info'}
                      onClick={() => setAppointment({ ...appointment, service_id: id })}
                      fullWidth
                    >
                      {name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid sx={!isMobile ? { borderLeft: `1px solid ${colors.secondary[30]}`, pl: 2 } : {}} item xs={12} md={4}>
              {isMobile && <Divider sx={{ mt: 3, mb: 3 }} />}
              <DesktopPageTabs
                tabs={[
                  { label: 'About', id: Tabs.ABOUT },
                  { label: 'Qualifications', id: Tabs.QUALIFICATIONS },
                ]}
                activeTab={activeTab || Tabs.ABOUT}
                onChange={setActiveTab}
                fullWidth
              />
              {activeTab === Tabs.ABOUT && (
                <Box>
                  <Typography variant="body2">Services</Typography>
                  <Typography sx={{ mt: 1 }} fontSize={14}>
                    {selectedService?.description}
                  </Typography>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Typography variant="body2">Location</Typography>
                  <Typography sx={{ mt: 1 }} fontSize={14}>
                    {provider.details.address}
                  </Typography>
                </Box>
              )}
              {activeTab === Tabs.QUALIFICATIONS && (
                <Box>
                  <Typography variant="body2">Additional Information</Typography>
                  <Typography sx={{ mt: 1 }} fontSize={14}>
                    {provider.details.description}
                  </Typography>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Grid container>
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 1 }}>
                <Typography fontWeight={600}>Available time</Typography>
                <Typography fontSize={14}>Select the desired date and time</Typography>
              </Box>
              <Divider sx={{ mt: 1 }} />
              <AppointmentDatePicker
                date={appointment.date}
                timeType={appointment.timeType}
                selectedIntervals={appointment.intervals}
                serviceType={appointment.type}
                serviceTypeOptions={Object.entries(selectedService?.types || {}).map(([value, { name: label }]) => ({
                  value,
                  label,
                }))}
                onServiceTypeChange={handleServiceTypeChange}
                onDateChange={handleDateChange}
                onIntervalsChange={handleIntervalsChange}
                onTimeTypeChange={handleTimeTypeChange}
                onAddClick={handleCreateAppointment}
                loading={creating}
              />
            </Grid>
            <Grid
              sx={!isMobile ? { borderLeft: `1px solid ${colors.secondary[30]}`, pl: 2 } : {}}
              position="relative"
              item
              xs={12}
              md={4}
            >
              <Box sx={{ mb: 7 }} maxWidth={300}>
                <Box sx={{ p: 1 }}>
                  <Typography fontWeight={600}>Selected time</Typography>
                  <Typography fontSize={14}>Check the selected dates and times</Typography>
                </Box>
                <Box>
                  {addedAppointments.map(({ id, date }, index) => (
                    <AddedAppointmentBadge key={index}>
                      <Typography fontSize={14} fontWeight={600}>
                        {dayjs(date, 'YYYY-MM-DD').format('MMMM D, dddd')}
                      </Typography>
                      <IconButton
                        sx={{ color: colors.primary[50] }}
                        size="small"
                        onClick={() => handleRemoveAppointment(id)}
                        disabled={removing}
                      >
                        <ClearRounded />
                      </IconButton>
                    </AddedAppointmentBadge>
                  ))}
                </Box>
                <Box sx={{ p: 1, mt: 3 }}>
                  <Typography fontWeight={600}>Service cost</Typography>
                  <Typography fontSize={14}>Calculation of service cost</Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ mt: 3 }} fontWeight={600}>
                      Service price
                    </Typography>
                    <Typography sx={{ mt: 3 }} fontWeight={600}>
                      ${price}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <ConfirmButtonContainer>
                <Button
                  variant="contained"
                  onClick={handleBookingConfirm}
                  loading={false}
                  disabled={!addedAppointments.length || creating}
                >
                  Confirm booking
                </Button>
              </ConfirmButtonContainer>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid id="reviewsSection" item xs={12}>
        <Typography sx={{ mt: 2, mb: 2 }} fontWeight={600}>
          Reviews
        </Typography>
        <ReviewsList
          providerId={parseInt(params.providerId)}
          onLoad={({ recordsTotal }: DataTableResponse<IReview>) => setReviewsCount(recordsTotal)}
        />
      </Grid>
    </Grid>
  );
};

export default RebookAppointment;
