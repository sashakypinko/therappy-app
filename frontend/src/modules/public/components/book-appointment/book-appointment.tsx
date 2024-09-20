import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Box, Container, styled } from '@mui/material';
import Stepper from './stepper';
import StepsEnum from './enums/steps.enum';
import CategoryStep from './steps/category-step';
import ServiceStep from './steps/service-step';
import DateTimeStep from './steps/date-time-step';
import TypeStep from './steps/type-step';
import LocationStep from './steps/location-step';
import { CreateAppointmentDto } from '../../../../services/api/appointment/dto/create-appointment.dto';
import { AppointmentStorage } from '../../../../services/storage/appointment.storage';
import { ClientRouteEnum } from '../../../client/routes/enums/route.enum';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';
import { defaultCreateAppointmentValue } from '../../../../services/api/appointment/default-appointment-value';
import { appendIntervals } from '../../../../helpers/appointment.helper';
import Header from "../../../../common/layouts/header";
import Footer from "../../../../common/layouts/footer";

const Page = styled(Box)(
  () => `
  background-image: url(/img/bg-lines.svg);
  background-position: center;
  background-size: cover;
`,
);

export interface StepProps {
  appointment: CreateAppointmentDto;
  setAppointment: (newAppointment: CreateAppointmentDto) => void;
  setActiveStep: (step: StepsEnum) => void;
  onFinish: () => void;
}

const steps: { [key: number]: FC<StepProps> } = {
  [StepsEnum.CATEGORY]: CategoryStep,
  [StepsEnum.SERVICE]: ServiceStep,
  [StepsEnum.DATE_TIME]: DateTimeStep,
  [StepsEnum.TYPE]: TypeStep,
  [StepsEnum.LOCATION]: LocationStep,
};

const BookAppointment = (): ReactElement => {
  const [activeStep, setActiveStep] = useState<StepsEnum>(StepsEnum.CATEGORY);
  const [appointment, setAppointment] = useState<CreateAppointmentDto>(defaultCreateAppointmentValue);
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
    if (step === StepsEnum.LOCATION && !appointment.type) {
      return;
    }

    setActiveStep(step);
  };

  const handleFinish = () => {
    AppointmentStorage.storeAppointment(appendIntervals({ ...appointment }) as CreateAppointmentDto);
    window.location.href = ClientRouteEnum.SIGN_UP;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeStep]);

  const ActiveStep = steps[activeStep];

  return (
    <>
      <Header />
      <Page sx={{ mt: isMobile ? 10 : 0 }}>
        <Container sx={{ minHeight: '80vh' }} maxWidth={activeStep === StepsEnum.CATEGORY ? 'lg' : 'md'}>
          <Stepper activeStep={activeStep} onStepChange={handleChangeStep} />
          <ActiveStep
            appointment={appointment}
            setAppointment={setAppointment}
            setActiveStep={setActiveStep}
            onFinish={handleFinish}
          />
        </Container>
      </Page>
      <Footer />
    </>
  );
};

export default BookAppointment;
