import { ReactElement } from 'react';

import FilterItem from '../filter-item';
import DatePicker from '../../../../../../common/ui/date-picker';
import dayjs from 'dayjs';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: any) => void;
  onReset: (name: string) => void;
}

const DateFilterItem = ({ label, name, value, onChange, onReset }: Props): ReactElement => {
  return (
    <FilterItem label={label} onResetClick={() => onReset(name)}>
      <DatePicker value={dayjs(value)} onChange={(value) => onChange(name, value)} />
    </FilterItem>
  );
};

export default DateFilterItem;
