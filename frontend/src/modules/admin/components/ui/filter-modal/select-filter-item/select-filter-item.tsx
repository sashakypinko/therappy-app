import { ReactElement } from 'react';
import FilterItem from '../filter-item';
import SelectInput from '../../../../../../common/ui/select-input';
import { SelectOption } from '../../../../../../common/ui/select-field/select-field';

interface Props {
  label: string;
  name: string;
  value: string;
  options?: SelectOption[];
  onChange: (name: string, value: string) => void;
  onReset: (name: string) => void;
}

const SelectFilterItem = ({ label, name, value, options, onChange, onReset }: Props): ReactElement => {
  return (
    <FilterItem label={label} onResetClick={() => onReset(name)}>
      <SelectInput value={value} onChange={(e) => onChange(name, e.target.value)} options={options || []} fullWidth />
    </FilterItem>
  );
};

export default SelectFilterItem;
