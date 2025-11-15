import React, { ReactElement } from 'react';
import { PersonalGenderLabels } from '../../../enums/genders.enum';
import RadioGroup from '../../ui/radio-group';

interface Props {
  value: number;
  onChange: (newValue: string | number) => void;
  disabled?: boolean;
  loading?: boolean;
}

const OwnGenderRadioGroup = ({ value, onChange, loading, disabled }: Props): ReactElement => {
  return (
    <RadioGroup
      row
      value={value}
      options={PersonalGenderLabels}
      onChange={onChange}
      loading={loading}
      disabled={disabled}
    />
  );
};

export default OwnGenderRadioGroup;
