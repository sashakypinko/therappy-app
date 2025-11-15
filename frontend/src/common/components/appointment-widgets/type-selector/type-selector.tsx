import { Grid } from '@mui/material';
import React, { ReactElement } from 'react';
import { CategoryLabels, ServiceCategoriesEnum } from '../../../../enums/service-categories.enum';
import { IService } from '../../../../services/api/service/dto/service.dto';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../store/selectors';
import TypeCard from './type-card';

interface Props {
  type: number | null;
  categoryId: number;
  onTypeSelect: (type: number, price: number) => void;
}

const TypeSelector = ({ type, categoryId, onTypeSelect }: Props): ReactElement => {
  const { services } = useSelector(selectServices);

  const service: IService = services.data.find(({ category_id }: IService) => category_id === categoryId);

  return (
    <Grid container spacing={2}>
      {Object.entries(service?.types || {}).map(([value, { price, name }]) => (
        <Grid key={value} item xs={12} md={6}>
          <TypeCard
            title={name}
            subtitle={CategoryLabels[categoryId as ServiceCategoriesEnum]}
            price={price}
            active={type === parseInt(value)}
            onSelect={() => onTypeSelect(parseInt(value), price)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TypeSelector;
