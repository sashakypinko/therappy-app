import { Box, Divider, Popover, styled } from '@mui/material';
import { MouseEvent, Fragment, useEffect, useState } from 'react';
import { Filter as FilterIcon } from '../../../../../common/ui/icon';
import Button from '../../../../../common/ui/button';
import SelectFilterItem from './select-filter-item';
import DateFilterItem from './date-filter-item';
import { FilterTypes } from './enums/filter.enum';
import { SelectOption } from '../../../../../common/ui/select-field/select-field';

const FilterButton = styled(Button)(
  ({ theme }) => `
    background: #fff;
    border: 1px solid #d8d9df;
    stroke: ${theme.palette.primary.main};
    height: 40px;
    margin-left: 8px;
`,
);

const StyledPopover = styled(Popover)(
  () => `
    margin-top: 10px;
`,
);

const Title = styled('p')(
  () => `
    font-size: 18px;
    font-weight: 500;
    padding: 10px 14px;
    margin: 0;
`,
);

const filterComponents = {
  [FilterTypes.SELECT]: SelectFilterItem,
  [FilterTypes.DATE_PICKER]: DateFilterItem,
};

export interface FilterOption {
  label: string;
  name: string;
  type: FilterTypes;
  options?: SelectOption[];
  default?: '';
}

export interface Filter {
  [key: string]: string;
}

interface Props {
  filterOptions?: FilterOption[];
  onFilter?: (filter: Filter) => void;
}

const FilterModal = ({ filterOptions, onFilter }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filter, setFilter] = useState<Filter>({});

  useEffect(() => {
    if (onFilter) onFilter(filter);
  }, [filter]);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (name: string, value: any) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleReset = (name: string) => {
    const newFilter = { ...filter };
    delete newFilter[name];
    setFilter(newFilter);
  };

  const open = Boolean(anchorEl);

  if (!filterOptions) return null;

  return (
    <>
      <FilterButton variant="outlined" onClick={handleOpen}>
        <FilterIcon sx={{ mr: 1 }} />
        Filter
      </FilterButton>
      <StyledPopover
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
        PaperProps={{
          sx: {
            background: '#fff',
            borderRadius: '8px',
            width: '360px',
            border: '1px solid #D8D9DF',
            boxShadow: '0 4px 13px 0 rgba(55, 56, 67, 0.05), 0 20px 80px 0 rgba(55, 56, 67, 0.10)',
          },
        }}
      >
        <Title>Filter</Title>
        {filterOptions.map((filterOption: FilterOption) => {
          const FilterComponent = filterComponents[filterOption.type];
          return (
            <Fragment key={filterOption.name}>
              <Divider />
              <FilterComponent
                {...filterOption}
                value={filter[filterOption.name] || ''}
                onChange={handleChange}
                onReset={handleReset}
              />
            </Fragment>
          );
        })}
      </StyledPopover>
    </>
  );
};

export default FilterModal;
