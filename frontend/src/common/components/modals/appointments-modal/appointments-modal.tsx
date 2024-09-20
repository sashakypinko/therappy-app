import React, { MutableRefObject, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../../../ui/modal';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, styled, Typography } from '@mui/material';
import { IAppointment } from '../../../../services/api/appointment/dto/appointment.dto';
import { colors } from '../../../../config/theme/colors';
import CustomTooltip from '../../../ui/custom-tooltip';
import { ExpandMore, InfoOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../store/selectors';
import { IService } from '../../../../services/api/service/dto/service.dto';
import { AlarmDelete, Calendar, Call, File, Location, Note, Notepad } from '../../../ui/icon-v2';
import AcceptDetails from './accept-details';
import ReviewDetails from './review-details';
import StartDetails from './start-details';
import CancelDetails from './cancel-details';
import ShowDetails from './show-details';
import dayjs from 'dayjs';
import AcceptRequestDto from '../../../../services/api/appointment/dto/accept-request.dto';
import CancelRequestDto from '../../../../services/api/appointment/dto/cancel-request.dto';
import ReviewRequestDto from '../../../../services/api/appointment/dto/review-request.dto';
import EditDetails from './edit-details';
import { Form, Formik, FormikProps, useFormikContext } from 'formik';
import appointmentValidationSchema from '../../../../services/api/appointment/validations/appointment-validation-schema';
import { TextField } from '../../../ui/text-field';
import DatePicker from '../../../ui/date-picker';
import TimePicker from '../../appointment-date-picker/time-picker';
import { AppointmentTimeTypesEnum } from '../../../../enums/appointment-time-types.enum';
import useWorkingHours from '../../../../hooks/use-working-hours.hook';
import CloseDetails from './close-details';
import RebookDetails from './rebook-details';
import FeedbackDetails from './feedback-details';
import Button from '../../../ui/button';
import { UserTypesEnum } from '../../../../enums/user-types.enum';
import { getImagePath } from '../../../../helpers/image.helper';
import { ImageSizesEnum } from '../../../../enums/image-sizes.enum';
import SelectInput from '../../../ui/select-input';
import TextInput from '../../../ui/text-input';
import { formatTime } from "../../../../helpers/date-time.helper";

const StyledAccordion = styled(Accordion)(
  () => `
    &::before {
      opacity: 0 !important;
    }
`,
);

const StaticField = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`,
);

const FieldLabel = styled(Typography)(
  () => `
    margin-bottom: 4px;
    font-weight: 600;
`,
);

const FieldValue = styled(Typography)(
  () => `
    font-size: 14px;
    margin-left: 8px;
`,
);

const Image = styled('img')(
  () => `
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 16px;
`,
);

const TimeBox = styled(Box)(
  () => `
    padding: 9px 0;
    display: flex;
`,
);

export enum AppointmentsModalTypes {
  ACCEPT,
  REVIEW,
  START,
  CANCEL,
  CLOSE,
  EDIT,
  SHOW,
  FEEDBACK,
  REBOOK,
}

const detailsComponents = {
  [AppointmentsModalTypes.ACCEPT]: AcceptDetails,
  [AppointmentsModalTypes.REVIEW]: ReviewDetails,
  [AppointmentsModalTypes.START]: StartDetails,
  [AppointmentsModalTypes.CANCEL]: CancelDetails,
  [AppointmentsModalTypes.CLOSE]: CloseDetails,
  [AppointmentsModalTypes.EDIT]: EditDetails,
  [AppointmentsModalTypes.SHOW]: ShowDetails,
  [AppointmentsModalTypes.FEEDBACK]: FeedbackDetails,
  [AppointmentsModalTypes.REBOOK]: RebookDetails,
};

export interface AppointmentSubmitData {
  start?: string;
  end?: string;
}

interface UserDetailsProps {
  title: string;
  image: string;
  name: string;
  email: string;
}

const UserDetails = ({ title, image, name, email }: UserDetailsProps) => {
  return (
    <>
      <Grid sx={{ mb: 2 }} item display="flex" alignItems="center" xs={12}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item display="flex" alignItems="center" xs={12}>
        <Image src={image} />
        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color={colors.primary[60]}>
            {email}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};

const AdminHeader = (): ReactElement => {
  const { values } = useFormikContext<IAppointment>();

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <UserDetails
          title="Customer"
          image="/img/default-avatar.svg"
          name={`${values.user.first_name} ${values.user.last_name}`}
          email={values.user.email}
        />
      </Grid>
      {values.therapist && (
        <>
          <Grid item xs={12} md={6}>
            <UserDetails
              title="Service provider"
              image={getImagePath(values.therapist.image_id || 0, ImageSizesEnum.SMALL)}
              name={`${values.therapist.first_name} ${values.therapist.last_name}`}
              email={values.therapist.email}
            />
          </Grid>
        </>
      )}
      <Grid sx={{ mt: 3 }} item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

interface TimeFieldProps {
  type: AppointmentsModalTypes;
}

const TimeField = ({ type }: TimeFieldProps) => {
  const hours = useWorkingHours();
  const { values, setFieldValue } = useFormikContext<IAppointment>();

  useEffect(() => {
    if (!values.start) {
      handleTimeChange(values.intervals[0]?.start || '');
    }
  }, [values.start]);

  const handleTimeChange = (start: string) => {
    const end = dayjs(start, 'HH:mm:ss')
      .add(values?.service?.duration || 60, 'minutes')
      .format('HH:mm:ss');
    setFieldValue('start', start);
    setFieldValue('end', end);
  };

  const hourOptions = hours.map((hour) => {
    const result = {
      label: dayjs(hour, 'HH:mm:ss').format('hh:mm A'),
      value: hour,
      disabled: true,
    };

    values.intervals.forEach(({ start, end }) => {
      const formattedHour = dayjs(hour, 'HH:mm:ss');
      const startTime = dayjs(start, 'HH:mm:ss');
      const endTime = dayjs(end, 'HH:mm:ss');
      result.disabled = !(formattedHour >= startTime && formattedHour <= endTime);
    });

    return result;
  });

  const endTime = useMemo(() => {
    if (values.start) {
      return dayjs(values.start, 'HH:mm:ss')
        .add(values?.service?.duration || 60, 'minutes')
        .format('hh:mm A');
    }

    return '';
  }, [values.start]);

  if (type === AppointmentsModalTypes.EDIT) {
    return (
      <TimeBox>
        <TimePicker
          row
          type={values.timeType}
          selectedIntervals={values.intervals}
          onTypeChange={(newType) => {
            setFieldValue('timeType', newType);
            setFieldValue(
              'intervals',
              newType === AppointmentTimeTypesEnum.SPECIFIC
                ? [
                    {
                      start: hours[0],
                      end: hours[5],
                    },
                  ]
                : [],
            );
          }}
          onIntervalsChange={(newIntervals) => setFieldValue('intervals', newIntervals)}
        />
      </TimeBox>
    );
  }

  if (type === AppointmentsModalTypes.ACCEPT) {
    return (
      <Box sx={{ mb: 2 }} display="flex">
        <Box>
          <FieldLabel variant="subtitle2">Start time</FieldLabel>
          <SelectInput
            value={values.start || ''}
            options={hourOptions}
            onChange={(e) => handleTimeChange(e.target.value)}
          />
        </Box>
        <Box sx={{ ml: 3 }} width={128}>
          <FieldLabel variant="subtitle2">End time</FieldLabel>
          <TextInput value={endTime} disabled />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <FieldLabel variant="subtitle2">Time</FieldLabel>
      <TimeBox>
        <AlarmDelete size={16} />
        <Typography sx={{ ml: 1 }} variant="subtitle2" fontSize={14}>
          {formatTime(values.start || '')} - {formatTime(values.end || '')}
        </Typography>
      </TimeBox>
    </>
  );
};

interface AppointmentFormProps {
  type: AppointmentsModalTypes;
  userType: UserTypesEnum;
}

const AppointmentForm = ({ type, userType }: AppointmentFormProps): ReactElement => {
  const [expanded, setExpanded] = useState<boolean>(type !== AppointmentsModalTypes.REVIEW);
  const { values, setFieldValue } = useFormikContext<IAppointment>();
  const { services } = useSelector(selectServices);
  const service: IService = services.data.find(({ id }: IService) => values.service_id === id);

  return (
    <>
      {userType === UserTypesEnum.ADMIN && <AdminHeader />}
      <StyledAccordion
        sx={{ boxShadow: 'none' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        disableGutters
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight={600}>Appointment Details</Typography>
            {type === AppointmentsModalTypes.ACCEPT && (
              <CustomTooltip
                title={'Select "accept" a notification of the appointment will be sent to you and the client'}
              >
                <InfoOutlined sx={{ width: 24, height: 24 }} color="primary" />
              </CustomTooltip>
            )}
            {type === AppointmentsModalTypes.START && (
              <CustomTooltip
                title={
                  'Select “start appointment” to alert your client you are on the way and to prepare for your arrival'
                }
              >
                <InfoOutlined sx={{ width: 24, height: 24 }} color="primary" />
              </CustomTooltip>
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, ml: 2 }}>
          <Grid container spacing={2}>
            <Grid sx={{ paddingTop: 2 }} item xs={12}>
              <FieldLabel variant="subtitle2">Service</FieldLabel>
              <StaticField>
                <File size={16} />
                <FieldValue variant="body2">{service?.name}</FieldValue>
              </StaticField>
            </Grid>
            <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
              <FieldLabel variant="subtitle2">Phone number</FieldLabel>
              {type === AppointmentsModalTypes.EDIT ? (
                <TextField name="phone" startIcon={<Call size={18} />} />
              ) : (
                <StaticField>
                  <Call size={16} />
                  <FieldValue variant="body2">{values.phone}</FieldValue>
                </StaticField>
              )}
            </Grid>
            <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
              <FieldLabel variant="subtitle2">Date</FieldLabel>
              {type === AppointmentsModalTypes.EDIT ? (
                <DatePicker
                  sx={{ mb: 2 }}
                  value={dayjs(values.date, 'YYYY-MM-DD')}
                  onChange={(value) => setFieldValue('date', value.format('YYYY-MM-DD'))}
                  format="dddd, D MMMM YYYY"
                />
              ) : (
                <StaticField>
                  <Calendar size={16} />
                  <FieldValue variant="body2">
                    {dayjs(values.date, 'YYYY-MM-DD').format('dddd, D MMMM YYYY')}
                  </FieldValue>
                </StaticField>
              )}
            </Grid>
            <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
              <TimeField type={type} />
            </Grid>
            <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
              <FieldLabel variant="subtitle2">Address</FieldLabel>
              {type === AppointmentsModalTypes.EDIT ? (
                <TextField name="address" startIcon={<Location size={18} />} />
              ) : (
                <StaticField>
                  <Location size={16} />
                  <FieldValue variant="body2" color={colors.primary[60]}>
                    {values.address}
                  </FieldValue>
                </StaticField>
              )}
            </Grid>
            <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
              <FieldLabel variant="subtitle2">Details</FieldLabel>
              {type === AppointmentsModalTypes.EDIT ? (
                <TextField name="details" startIcon={<Notepad size={18} />} />
              ) : (
                <StaticField>
                  <Notepad size={16} />
                  <FieldValue variant="body2">{values.details}</FieldValue>
                </StaticField>
              )}
            </Grid>
            <Grid sx={{ paddingTop: '0 !important' }} item xs={12}>
              <FieldLabel variant="subtitle2">Description</FieldLabel>
              {type === AppointmentsModalTypes.EDIT ? (
                <TextField name="description" type="textarea" startIcon={<Note size={18} />} />
              ) : (
                <StaticField sx={{ alignItems: 'start' }}>
                  <Note size={16} />
                  <FieldValue variant="body2">{values.description}</FieldValue>
                </StaticField>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
};

interface Props {
  open: boolean;
  type: AppointmentsModalTypes;
  userType: UserTypesEnum;
  appointment: IAppointment;
  submitData?: AcceptRequestDto | CancelRequestDto | ReviewRequestDto | IAppointment;
  setSubmitData?: (submitData: AcceptRequestDto | CancelRequestDto | ReviewRequestDto) => void;
  onSubmit?: (data: any) => void;
  loading: boolean;
  onClose: () => void;
  submitProps?: {
    label: string;
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  };
}

const AppointmentsModal = ({
  open,
  type,
  userType,
  appointment,
  submitData,
  loading,
  setSubmitData = () => {
    /**/
  },
  onClose,
  onSubmit = () => {
    /**/
  },
  submitProps,
}: Props): ReactElement | null => {
  const innerFormRef: MutableRefObject<FormikProps<any> | null> = useRef<FormikProps<any> | null>(null);
  const Details = detailsComponents[type];

  const handleInnerFormSubmit = () => {
    onSubmit(innerFormRef.current?.values);
  };

  const userData = appointment[userType === UserTypesEnum.PROVIDER ? 'user' : 'therapist'];

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={appointment}
        onSubmit={onSubmit}
        validationSchema={appointmentValidationSchema}
        enableReinitialize
      >
        <Form>
          <Box sx={{ overflowY: 'auto', overflowX: 'unset', maxHeight: '60vh' }}>
            {(userType === UserTypesEnum.PROVIDER || userType === UserTypesEnum.CLIENT) && userData && (
              <>
                <Box display="flex" alignItems="center">
                  <Image
                    src={
                      userType === UserTypesEnum.PROVIDER
                        ? '/img/default-avatar.svg'
                        : getImagePath(appointment.therapist?.image_id || 0, ImageSizesEnum.SMALL)
                    }
                  />
                  <Box>
                    <Typography variant="h6">
                      {userData.first_name} {userData.last_name}
                    </Typography>
                    <Typography variant="body2" color={colors.primary[60]}>
                      {userData.email}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </>
            )}
            <AppointmentForm type={type} userType={userType} />
            {open && <Details formRef={innerFormRef} />}
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box display="flex" justifyContent={submitProps ? 'space-between' : 'end'}>
            <Button variant="contained" color="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            {submitProps && (
              <Button
                type={[AppointmentsModalTypes.EDIT, AppointmentsModalTypes.ACCEPT].includes(type) ? 'submit' : 'button'}
                variant="contained"
                color={submitProps.color || 'primary'}
                disabled={loading || submitProps.disabled}
                loading={loading}
                {...(![AppointmentsModalTypes.EDIT, AppointmentsModalTypes.ACCEPT].includes(type) && {
                  onClick: handleInnerFormSubmit,
                })}
              >
                {submitProps.label}
              </Button>
            )}
          </Box>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AppointmentsModal;
