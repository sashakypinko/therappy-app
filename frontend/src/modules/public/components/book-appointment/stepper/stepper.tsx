import { ReactElement } from 'react';
import StepsEnum from '../enums/steps.enum';
import { Box, styled } from '@mui/material';
import { colors } from '../../../../../config/theme/colors';
import useIsMobile from "../../../../../hooks/use-is-mobile.hook";

const StepsContainer = styled(Box)(
  () => `
    display: flex;
    justify-content: center;
    padding: 16px 0;
  `,
);

const StepButton = styled(Box)(
  () => `
    width: 16px;
    height: 16px;
    margin: 16px;
    border-radius: 8px;
    cursor: pointer;
  `,
);

interface Props {
  activeStep: StepsEnum;
  onStepChange: (step: StepsEnum) => void;
}

const Stepper = ({ activeStep, onStepChange }: Props): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <StepsContainer sx={{ pt: isMobile ? 0 : 10 }}>
      {Object.values(StepsEnum)
        .filter((step) => typeof step === 'number')
        .map((step) => (
          <StepButton
            key={step}
            sx={{ background: colors.primary[activeStep === step ? 60 : 20] }}
            onClick={() => onStepChange(step as StepsEnum)}
          />
        ))}
    </StepsContainer>
  );
};

export default Stepper;
