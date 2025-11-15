import React, { MouseEvent, ReactElement, ReactNode, useMemo, useState } from 'react';
import { Box, List, ListItemButton, Popover, styled } from '@mui/material';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';

import Button from '../../../../ui/button';
import { colors } from '../../../../../config/theme/colors';
import { useQuery } from '../../../../../hooks';
import { object } from 'yup';

const FilterButton = styled(Button)(
  () => `
    display: flex;
    justify-content: space-between;
    min-width: 150px;
    height: 40px;
    background: ${colors.primary[20]};
    border-radius: 8px;
    padding: 0 16px;
`,
);

export type FilterValue = string | number | undefined;

export interface FilterOption {
  label: ReactNode;
  value: string | number | undefined;
}

export interface FilterItemProps {
  name: string;
  field: string;
  value: FilterValue;
  options: FilterOption[];
  renderSelectedValue?: (value: FilterValue) => ReactNode;
  onChange: (value: FilterValue) => void;
}

const FilterItem = ({ name, field, value, options, renderSelectedValue, onChange }: FilterItemProps): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { params } = useQuery();

  const setParams = (data: object) => {
    // todo remove this later
  };

  const parsedFilter = useMemo(() => {
    if (params.filter) {
      return JSON.parse(params.filter);
    }
    return {};
  }, [params]);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value: FilterValue) => {
    onChange(value);
    handleClose();

    if (value) {
      setParams({ ...params, filter: JSON.stringify({ ...parsedFilter, [field]: value }) });
    } else {
      const newFilter = { ...parsedFilter };
      delete newFilter[field];

      if (Object.keys(newFilter).length) {
        setParams({ ...params, filter: JSON.stringify(newFilter) });
      } else {
        delete params.filter;
        setParams(params);
      }
    }
  };

  const open = Boolean(anchorEl);
  const activeLabel = options.find((option) => option.value === value)?.label;

  return (
    <Box sx={{ mr: 1 }}>
      <FilterButton color="inherit" onClick={handleOpen}>
        {name}
        {activeLabel && ': '}
        {renderSelectedValue ? renderSelectedValue(value) : activeLabel}
        {anchorEl ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
      </FilterButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List>
          <ListItemButton selected={value === undefined} onClick={() => handleChange(undefined)}>
            All
          </ListItemButton>
          {options.map(({ label, value: optionValue }) => (
            <ListItemButton
              key={optionValue}
              selected={optionValue === value}
              onClick={() => handleChange(optionValue)}
            >
              {label}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default FilterItem;
