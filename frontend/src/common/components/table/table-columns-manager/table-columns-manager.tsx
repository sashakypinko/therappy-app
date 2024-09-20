import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReorderRounded } from '@mui/icons-material';
import { type MouseEvent, useState } from 'react';
import { type TableCell } from '../table';
import { colors } from '../../../../config/theme/colors';
import Button from '../../../ui/button';

const MenuContainer = styled(Box)(
  () => `
  padding: 8px;
`,
);

interface Props {
  cells: TableCell<any>[];
  hiddenCellIndexes: number[];
  setHiddenCellIndexes: (newIndexed: number[]) => void;
}

const TableColumnsManager = ({ cells, hiddenCellIndexes, setHiddenCellIndexes }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggleColumn = (checked: boolean, cellIndex: number) => {
    if (!checked) {
      setHiddenCellIndexes([...hiddenCellIndexes, cellIndex]);
      return;
    }
    setHiddenCellIndexes(hiddenCellIndexes.filter((index) => index !== cellIndex));
  };

  const handleShowAll = () => {
    setHiddenCellIndexes([]);
  };

  const handleHideAll = () => {
    setHiddenCellIndexes(Array.from({ length: cells.length }, (_, index) => index));
  };

  return (
    <Box sx={{ borderLeft: `1px solid ${colors.secondary[20]}` }}>
      <Tooltip title="Manage columns">
        <IconButton sx={{ p: 0 }} onClick={handleOpen} color="inherit" size="large">
          <ReorderRounded />
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        PaperProps={{
          sx: { borderRadius: '8px' },
        }}
      >
        <MenuContainer sx={{ minWidth: 200 }}>
          <Typography fontWeight={500}>Manage Columns</Typography>
          <FormGroup sx={{ mt: 1 }}>
            {cells.map((cell, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={cell.label}
                checked={!hiddenCellIndexes.includes(index)}
                onChange={(e, checked) => {
                  handleToggleColumn(checked, index);
                }}
              />
            ))}
          </FormGroup>
        </MenuContainer>
        <Box display="flex" justifyContent="space-between">
          <Button sx={{ p: 2 }} onClick={handleHideAll}>
            Hide All
          </Button>
          <Button sx={{ p: 2 }} onClick={handleShowAll}>
            Show All
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default TableColumnsManager;
