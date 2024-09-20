import React, { ReactElement } from 'react';
import { RadioGroup as MuiRadioGroup, FormControlLabel, Radio, SxProps, Skeleton } from '@mui/material';
import { PersonalGenderLabels } from '../../../enums/genders.enum';

interface Props {
  value: string | number;
  options: object;
  onChange: (checked: string | number) => void;
  row?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const RadioGroup = ({ value, row, options, onChange, disabled, loading }: Props): ReactElement => {
  return (
    <MuiRadioGroup row={row} value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
      {loading ? (
        <Skeleton sx={{ borderRadius: '8px', mt: 1, mb: 1 }} variant="rectangular" width={200} height={24} />
      ) : (
        <>
          {Object.entries(options).map(([optionValue, label]) => (
            <FormControlLabel
              checked={parseInt(optionValue) === value}
              key={label}
              value={optionValue}
              control={<Radio sx={{ p: 1 }} />}
              label={label}
              disabled={disabled}
            />
          ))}
        </>
      )}
    </MuiRadioGroup>
  );
};

export default RadioGroup;
