import { Box, styled } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import Button from '../../../../../../common/ui/button';

const LabelContainer = styled(Box)(
  () => `
    padding-top: 4px;
    padding-right: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`,
);

const Label = styled('p')(
  () => `
    font-size: 16px;
    padding: 10px 14px;
    font-weight: 500;
    margin: 0;
`,
);

const ResetButton = styled(Button)(
  ({ theme }) => `
    font-size: 14px;
    
    &:hover {
        background: #fff;
    }
`,
);

const Field = styled(Box)(
  () => `
    padding: 0 14px 14px 14px;
`,
);

interface Props {
  label: string;
  children: ReactNode;
  onResetClick: () => void;
}

const FilterItem = ({ label, onResetClick, children }: Props): ReactElement => {
  return (
    <Box>
      <LabelContainer>
        <Label>{label}</Label>
        <ResetButton onClick={onResetClick}>Reset</ResetButton>
      </LabelContainer>
      <Field>{children}</Field>
    </Box>
  );
};

export default FilterItem;
