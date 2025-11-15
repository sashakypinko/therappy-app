import React, { type ReactElement } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { colors } from '../../../../config/theme/colors';
import { Filter } from '../../../ui/icon-v2';
import Button from '../../../ui/button';
import FilterItem from './filter-item';
import { FilterItemProps } from './filter-item/filter-item';
import { useQuery } from "../../../../hooks";

const FiltersContainer = styled(Box)(
  () => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    padding: 12px;
    border: 1px solid ${colors.secondary[30]};
    background: ${colors.background.BG_1};
`,
);

interface Props {
  options: FilterItemProps[];
  onClear: () => void;
}

const TableFilters = ({ options, onClear }: Props): ReactElement => {
  const { params } = useQuery();

  const setParams = (data: object) => {
    // todo remove this later
  };

  const handleClear = () => {
    delete params.filter;
    setParams(params);
    onClear();
  };

  return (
    <FiltersContainer sx={{ mb: 2 }}>
      <Box display="flex" alignItems="center">
        <IconButton>
          <Filter size={28} />
        </IconButton>
        {options.map((props, index) => (
          <FilterItem key={index} {...props} />
        ))}
      </Box>
      <Button sx={{ fontWeight: 500 }} onClick={handleClear}>
        Clear filters
      </Button>
    </FiltersContainer>
  );
};

export default TableFilters;
