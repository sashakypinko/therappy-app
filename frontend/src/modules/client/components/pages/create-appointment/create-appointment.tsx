import { FC, ReactElement, useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import StepsEnum from './enums/steps.enum';
import { CreateAppointmentDto } from '../../../../../services/api/appointment/dto/create-appointment.dto';
import CategoryStep from './steps/category-step';
import ServiceStep from './steps/service-step';
import DateTimeStep from './steps/date-time-step';
import TypeStep from './steps/type-step';
import { defaultCreateAppointmentValue } from '../../../../../services/api/appointment/default-appointment-value';
import Stepper from './stepper';
import { createAppointment } from '../../../../../store/actions/appointments';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import { useDispatch } from 'react-redux';
import { IAppointment } from '../../../../../services/api/appointment/dto/appointment.dto';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { useNavigate } from 'react-router-dom';
import { BookingsTabs } from '../bookings/bookings';
import { appendIntervals } from '../../../../../helpers/appointment.helper';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import LocationStep from "./steps/location-step";

export interface StepProps {
  appointment: CreateAppointmentDto;
  setAppointment: (newAppointment: CreateAppointmentDto) => void;
  setActiveStep: (step: StepsEnum) => void;
  onFinish: () => void;
  loading: boolean;
}

const steps: { [key: number]: FC<StepProps> } = {
  [StepsEnum.CATEGORY]: CategoryStep,
  [StepsEnum.SERVICE]: ServiceStep,
  [StepsEnum.DATE_TIME]: DateTimeStep,
  [StepsEnum.TYPE]: TypeStep,
  [StepsEnum.LOCATION]: LocationStep,
};

const stepDescriptions: { [key: number]: string } = {
  [StepsEnum.CATEGORY]: 'Step 1: Select a therapy',
  [StepsEnum.SERVICE]: 'Step 2: Service',
  [StepsEnum.DATE_TIME]: 'Step 3: Date and Time Period',
  [StepsEnum.TYPE]: 'Step 4: Appointment type',
  [StepsEnum.LOCATION]: 'Step 5: Location',
};

const CreateAppointment = (): ReactElement | null => {
  const [activeStep, setActiveStep] = useState<StepsEnum>(StepsEnum.CATEGORY);
  const [appointment, setAppointment] = useState<CreateAppointmentDto>(defaultCreateAppointmentValue);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleChangeStep = (step: StepsEnum) => {
    if (step === StepsEnum.SERVICE && !appointment.category_id) {
      return;
    }
    if (step === StepsEnum.DATE_TIME && !appointment.service_id) {
      return;
    }
    if (step === StepsEnum.TYPE && !appointment.date) {
      return;
    }

    setActiveStep(step);
  };

  const handleFinish = () => {
    setLoading(true);
    dispatch(
      createAppointment(
        appendIntervals({ ...appointment }) as IAppointment,
        ({ id }) => {
          successSnackbar('Appointment created successfully');
          navigate(
            `${ClientRouteEnum.BOOKINGS}?tab=${BookingsTabs.WAITING_FOR_PAYMENT}&openCartModal=1&selected=[${id}]`,
          );
          setLoading(false);
        },
        () => {
          errorSnackbar('Error while creating new appointment!');
          setLoading(false);
        },
      ),
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const ActiveStep = steps[activeStep];

  return (
    <Container sx={{ minHeight: '80vh', mt: isMobile ? 10 : 0 }} maxWidth="lg">
      {!isMobile && (
        <Typography sx={{ pt: 4, pl: 1 }} variant="h5">
          My Bookings
        </Typography>
      )}
      <Stepper
        stepDescription={isMobile ? stepDescriptions[activeStep] : undefined}
        activeStep={activeStep}
        onStepChange={handleChangeStep}
      />
      <ActiveStep
        loading={loading}
        appointment={appointment}
        setAppointment={setAppointment}
        setActiveStep={setActiveStep}
        onFinish={handleFinish}
      />
    </Container>
  );
};

export default CreateAppointment;
