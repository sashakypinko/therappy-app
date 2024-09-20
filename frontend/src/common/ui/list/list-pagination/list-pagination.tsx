import { ChangeEvent, ReactElement, useEffect } from 'react';
import {
  Box,
  Grid,
  Pagination,
  styled, Table,
  TableBody,
  TablePagination as MuiTablePagination,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ListItemObject } from '../list-item/list-item';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';

const PaginationContainer = styled(Grid)(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,
);

interface Props {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (value: number) => void;
  onRowsPerPageChange: (value: number) => void;
}

const ListPagination = ({ page, rowsPerPage, total, onPageChange, onRowsPerPageChange }: Props): ReactElement => {
  const isMobile = useIsMobile();

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <PaginationContainer container>
      <Grid item display="flex" justifyContent={isMobile ? 'center' : 'start'} xs={12} md={6}>
        <Table>
          <TableBody>
            <TableRow>
              <TablePagination
                sx={{ display: 'flex', justifyContent: 'start' }}
                rowsPerPageOptions={[5, 10, 25]}
                count={total}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                nextIconButtonProps={{ sx: { display: 'none' } }}
                backIconButtonProps={{ sx: { display: 'none' } }}
                onPageChange={() => ({})}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item display="flex" justifyContent={isMobile ? 'center' : 'end'} xs={12} md={6}>
        <Pagination
          count={Math.ceil(total / rowsPerPage)}
          page={page}
          variant="text"
          color="primary"
          onChange={handleChangePage}
        />
      </Grid>
    </PaginationContainer>
  );
};

export default ListPagination;
