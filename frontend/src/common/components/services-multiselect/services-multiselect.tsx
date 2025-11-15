import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { IService } from '../../../services/api/service/dto/service.dto';
import MultiSelectInput from '../../ui/multi-select-input';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../store/selectors';
import { Box, SxProps } from '@mui/material';
import { CategoryLabels, ServiceCategoriesEnum } from '../../../enums/service-categories.enum';
import SelectInput from '../../ui/select-input';

interface Props {
  optionKey: string;
  categoryValue: ServiceCategoriesEnum;
  values: number[];
  onChange: (newValues: number[]) => void;
  sx?: SxProps;
  loading?: boolean;
}

const ServicesMultiselect = ({ sx, optionKey, categoryValue, values, onChange, loading }: Props): ReactElement => {
  const [category, setCategory] = useState('0');
  const { services } = useSelector(selectServices);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newServices: IService[]) => {
    onChange(newServices.map(({ id }) => id));
  };

  useEffect(() => {
    setCategory((categoryValue || 0).toString());
  }, [categoryValue]);

  return (
    <Box>
      <SelectInput
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={Object.entries(CategoryLabels).map(([value, label]) => ({ value, label }))}
        loading={loading}
        fullWidth
      />
      <MultiSelectInput
        sx={sx}
        label="Service"
        optionKey={optionKey}
        value={services.data.filter(({ id }: IService) => id && values.includes(id))}
        options={services.data.filter(({ category_id }: IService) => category_id === parseInt(category))}
        onChange={handleChange}
        loading={loading}
        fullWidth
      />
    </Box>
  );
};

export default ServicesMultiselect;
