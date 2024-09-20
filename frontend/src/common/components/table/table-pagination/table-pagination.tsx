import { type ChangeEvent, type ReactElement, useEffect } from 'react';
import {
  Grid,
  Pagination,
  styled,
  Table,
  TableBody,
  TablePagination as MuiTablePagination,
  TableRow,
} from "@mui/material";
import useIsMobile from '../../../../hooks/use-is-mobile.hook';

const PaginationContainer = styled(Grid)(
  () => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,
);

interface Props {
  rows: any[];
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (value: number) => void;
  onRowsPerPageChange: (value: number) => void;
}

const TablePagination = ({ page, total, rowsPerPage, onPageChange, onRowsPerPageChange }: Props): ReactElement => {
  const isMobile = useIsMobile();

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  return (
    <PaginationContainer container>
      <Grid item display="flex" justifyContent={isMobile ? 'center' : 'start'} xs={12} md={6}>
        <Table>
          <TableBody>
            <TableRow>
              <MuiTablePagination
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

export default TablePagination;
