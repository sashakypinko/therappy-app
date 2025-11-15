import { type MouseEvent } from 'react';
import {
  Box,
  styled,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { colors } from '../../../../config/theme/colors';
import TableColumnsManager from '../table-columns-manager';
import { OrderDirection } from "../table";

const StyledTableHead = styled(MuiTableHead)(
  () => `
  height: 42px;
  background: ${colors.primary[10]};
`,
);

const StyledTableSortLabel = styled(TableSortLabel)(
  () => `
  border-left: 1px solid ${colors.secondary[20]};
  padding-left: 16px;
  font-weight: 600;
`,
);

interface Props<T> {
  onOrderChange: (column: keyof T) => void;
  order: OrderDirection;
  cells: any[];
  visibleCells: any[];
  orderBy: string;
  hiddenCellIndexes: number[];
  setHiddenCellIndexes: (newIndexed: number[]) => void;
}

const TableHead = <T,>(props: Props<T>) => {
  const { order, orderBy, onOrderChange, cells, visibleCells, hiddenCellIndexes, setHiddenCellIndexes } = props;
  const createSortHandler = (column: keyof T) => () => {
    onOrderChange(column);
  };

  return (
    <StyledTableHead>
      <TableRow>
        {visibleCells.map(({ label, field, align = 'left', padding = 'normal' }, index) => (
          <TableCell key={field} align={align} padding={padding} sortDirection={orderBy === field ? order : false}>
            <StyledTableSortLabel
              sx={index === 0 ? { borderLeft: 'none' } : {}}
              active={orderBy === field}
              direction={orderBy === field ? order : 'asc'}
              onClick={createSortHandler(field)}
            >
              {label}
              {orderBy === field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">
          <TableColumnsManager
            cells={cells}
            hiddenCellIndexes={hiddenCellIndexes}
            setHiddenCellIndexes={setHiddenCellIndexes}
          />
        </TableCell>
      </TableRow>
    </StyledTableHead>
  );
};

export default TableHead;
