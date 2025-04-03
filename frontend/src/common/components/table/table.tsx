import { Key, type ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  LinearProgress,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableRow,
  TableCell as MuiTableCell,
  IconButton,
} from '@mui/material';
import TableToolbar from './table-toolbar';
import TablePagination from './table-pagination';
import TableHead from './table-head/table-head';
import { colors } from '../../../config/theme/colors';
import { Edit, Trash } from '../../ui/icon';
import TableFilters from './table-filters';
import { FilterItemProps } from './table-filters/filter-item/filter-item';
import { Dayjs } from 'dayjs';
import { VisibilityOutlined } from '@mui/icons-material';
import { useQuery } from '../../../hooks';
import { DataTableRequest } from "../../../interfaces/data-table-request.interface";

export type OrderDirection = 'asc' | 'desc';

export interface Order<T> {
  order_by: keyof T;
  order_direction: OrderDirection;
}

export interface TableCell<T> {
  field: keyof T;
  label: string;
  fieldValue?: (row: any) => number | string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  padding?: 'normal' | 'checkbox' | 'none';
  render?: (row: T) => number | string | ReactNode;
}

interface Props<T> {
  tableKey: string;
  //    todo
  cells: TableCell<T>[];
  //    todo
  rows: T[];
  total: number;
  onLimitChange?: (rowsPerPage: number) => void;
  filterOptions?: FilterItemProps[];
  onClearFilter?: () => void;
  date?: Dayjs | null;
  onDateChange?: (date: Dayjs | null) => void;
  onOffsetChange?: (page: number) => void;
  keyField: keyof T;
  loading: boolean;
  withEmptyRows?: boolean;
  onViewClick?: (item: T) => void;
  onEditClick?: (item: T) => void;
  onDeleteClick?: (item: T) => void;
  onOrderChange?: (order: Order<T>) => void;
  onLoad?: (data: DataTableRequest<T>) => void;
  customActions?: (row: T) => ReactNode;
}

const Table = <T,>({
  cells,
  rows,
  total,
  onLimitChange,
  filterOptions,
  onClearFilter,
  date,
  onDateChange,
  onOffsetChange,
  keyField,
  loading,
  onViewClick,
  onEditClick,
  onDeleteClick,
  onOrderChange,
  onLoad,
  withEmptyRows,
  customActions,
}: Props<T>): ReactElement => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25);
  const [order, setOrder] = useState<OrderDirection>('asc');
  const [orderBy, setOrderBy] = useState<any>();
  const [hiddenCellIndexes, setHiddenCellIndexes] = useState<number[]>([]);

  const { params } = useQuery();

  const setParams = (data: object) => {
    // todo remove this later
  };

  const handleOrderChange = (column: keyof T) => {
    const orderDirection = order === 'asc' ? 'desc' : 'asc';
    const orderData: Order<T> = { order_by: column, order_direction: orderDirection };

    setOrder(orderDirection);
    setOrderBy(column);
    onOrderChange && onOrderChange(orderData);
    setParams({ ...params, ...orderData });
  };

  const handleChangeOffset = (newOffset: number) => {
    const calculatedOffset = newOffset > 0 ? newOffset - 1 : 0;

    setOffset(calculatedOffset);
    onOffsetChange && onOffsetChange(calculatedOffset);
    setParams({ ...params, offset: calculatedOffset });
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
    onLimitChange && onLimitChange(newLimit);
    setParams({ ...params, limit: newLimit });
  };

  useEffect(() => {
    const loadData: any = {};

    if (params.offset) {
      loadData.offset = parseInt(params.offset);
      setOffset(loadData.offset);
    }
    if (params.limit) {
      loadData.limit = parseInt(params.limit);
      setLimit(loadData.limit);
    }
    if (params.order_by && ['asc', 'desc'].includes(params.order_direction)) {
      const { order_by, order_direction } = params;
      setOrderBy(order_by);
      setOrder(order_direction as OrderDirection);
      loadData.order_by = order_by;
      loadData.order_direction = order_direction as OrderDirection;
    }
    if (params.filter) {
      loadData.filter = JSON.parse(params.filter);
    }
    onLoad && onLoad(loadData);
  }, []);

  const emptyRows = offset > 0 ? Math.max(0, (1 + offset) * limit - rows.length) : 0;

  const visibleCells = useMemo(
    () => cells.filter((cell, key) => !hiddenCellIndexes.includes(key)),
    [cells, hiddenCellIndexes],
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <TableToolbar date={date} onDateChange={onDateChange} />
        {filterOptions && onClearFilter && <TableFilters options={filterOptions} onClear={onClearFilter} />}
        <TableContainer sx={{ background: colors.background.BG_1, mb: 3 }}>
          {loading ? <LinearProgress /> : <Box sx={{ height: '4px', background: colors.primary[10] }} />}
          <MuiTable
            sx={{
              minWidth: 750,
              opacity: loading ? 0.5 : 1,
            }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHead
              visibleCells={visibleCells}
              cells={cells}
              order={order}
              orderBy={orderBy}
              onOrderChange={handleOrderChange}
              hiddenCellIndexes={hiddenCellIndexes}
              setHiddenCellIndexes={setHiddenCellIndexes}
            />
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row[keyField] as Key} sx={{ cursor: 'pointer' }}>
                    {visibleCells.map(({ field, align = 'left', padding = 1, render }) => (
                      <MuiTableCell sx={{ p: padding, pl: 4 }} key={field as Key} align={align}>
                        {render ? render(row) : row[field] as ReactNode}
                      </MuiTableCell>
                    ))}
                    <MuiTableCell sx={{ p: 1, minWidth: 100 }} align="center">
                        {onViewClick && (
                          <IconButton onClick={() => onViewClick(row)}>
                            <VisibilityOutlined sx={{ color: colors.secondary[90] }} />
                          </IconButton>
                        )}
                        {onDeleteClick && (
                          <IconButton onClick={() => onDeleteClick(row)}>
                            <Trash />
                          </IconButton>
                        )}
                        {onEditClick && (
                          <IconButton onClick={() => onEditClick(row)}>
                            <Edit />
                          </IconButton>
                        )}
                      {customActions && customActions(row)}
                    </MuiTableCell>
                  </TableRow>
                );
              })}
              {withEmptyRows && emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <MuiTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rows={rows}
          page={offset + 1}
          total={total}
          rowsPerPage={limit}
          onPageChange={handleChangeOffset}
          onRowsPerPageChange={handleChangeLimit}
        />
      </Box>
    </Container>
  );
};

export default Table;
