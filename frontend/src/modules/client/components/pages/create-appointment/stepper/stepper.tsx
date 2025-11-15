import { ReactElement } from 'react';
import {
  Box,
  styled,
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Typography,
} from '@mui/material';
import StepsEnum, { StepLabels } from '../enums/steps.enum';
import { colors } from '../../../../../../config/theme/colors';
import useIsMobile from '../../../../../../hooks/use-is-mobile.hook';

const StepsContainer = styled(Box)(
  () => `
    display: flex;
    justify-content: center;
    margin: 24px 0;
  `,
);

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary[70],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: colors.primary[70],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

interface Props {
  activeStep: StepsEnum;
  stepDescription?: string;
  onStepChange: (step: StepsEnum) => void;
}

const Stepper = ({ activeStep, stepDescription, onStepChange }: Props): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <>
      {stepDescription && <Typography variant="h3">{stepDescription}</Typography>}
      <StepsContainer>
        <MuiStepper sx={{ width: '100%' }} activeStep={activeStep} connector={<Connector />}>
          {Object.values(StepsEnum)
            .filter((step) => typeof step === 'number')
            .map((step, index) => {
              return (
                <Step key={index} onClick={() => onStepChange(step as StepsEnum)}>
                  <StepLabel
                    slotProps={{
                      label: {
                        style: { color: activeStep === step ? colors.primary[70] : colors.secondary[90] },
                      },
                    }}
                  >
                    {!isMobile ? StepLabels[step as StepsEnum] : null}
                  </StepLabel>
                </Step>
              );
            })}
        </MuiStepper>
      </StepsContainer>
    </>
  );
};

export default Stepper;
