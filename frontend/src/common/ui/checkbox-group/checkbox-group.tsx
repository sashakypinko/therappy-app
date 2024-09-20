import React, { ReactElement, ReactNode } from 'react';
import { Checkbox, FormControlLabel, SxProps } from '@mui/material';

interface Props {
  label: string | ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  sx?: SxProps;
}

const CheckboxGroup = ({ label, checked, onChange, sx }: Props): ReactElement => {
  return (
    <FormControlLabel
      sx={sx}
      componentsProps={{
        typography: {
          fontSize: 15,
        },
      }}
      control={<Checkbox checked={checked} onChange={(e, checked) => onChange(checked)} />}
      label={label}
    />
  );
};

export default CheckboxGroup;
