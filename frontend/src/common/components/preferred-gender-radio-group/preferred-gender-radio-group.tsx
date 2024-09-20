import React, { ReactElement } from 'react';
import { PreferenceGenderLabels } from '../../../enums/genders.enum';
import RadioGroup from '../../ui/radio-group';

interface Props {
  value: number;
  onChange: (newValue: number | string) => void;
  disabled?: boolean;
  loading?: boolean;
}

const PreferredGenderRadioGroup = ({ value, onChange, disabled, loading }: Props): ReactElement => {
  return (
    <RadioGroup
      row
      value={value}
      options={PreferenceGenderLabels}
      onChange={onChange}
      loading={loading}
      disabled={disabled}
    />
  );
};

export default PreferredGenderRadioGroup;
