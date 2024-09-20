import { ParsedUserStatuses } from '../../../../../enums/user-statuses.enum';
import { Box } from '@mui/material';
import UserStatusBadge from '../../../user-status-badge';
import { FilterItemProps, FilterValue } from '../filter-item/filter-item';

export const userStatusFilter = (value: FilterValue, field: string, onChange: (value: FilterValue) => void): FilterItemProps => ({
  name: 'Status',
  field,
  value,
  options: Object.entries(ParsedUserStatuses).map(([value, label]) => ({
    value,
    label: (
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        {label} <UserStatusBadge status={parseInt(value)} />
      </Box>
    ),
  })),
  renderSelectedValue: (value) =>
    value ? <UserStatusBadge status={typeof value === 'string' ? parseInt(value) : value} /> : null,
  onChange,
});
