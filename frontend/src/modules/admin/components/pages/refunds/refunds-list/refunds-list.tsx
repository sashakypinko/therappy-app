import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProviders } from '../../../../../../store/selectors';
import { UserStatusesEnum } from '../../../../../../enums/user-statuses.enum';
import { TableCell } from '../../../../../../common/components/table/table';
import {
  FilterItemProps,
  FilterValue,
} from '../../../../../../common/components/table/table-filters/filter-item/filter-item';
import { Dayjs } from 'dayjs';
import { CategoryLabels, ServiceCategoriesEnum } from '../../../../../../enums/service-categories.enum';
import StatusBadge from '../../../../../../common/components/appointments-list/status-badge';
import { getProviders } from '../../../../../../store/actions/providers';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import {Box, styled} from '@mui/material';
import { AppointmentTimeLabels } from '../../../../../../enums/appointment-statuses.enum';
import { AdminAppointmentApi } from '../../../../../../services/api/appointment/appointment.api';
import useDataTable from '../../../../../../common/components/table/hooks/use-data-table.hook';
import Button from '../../../../../../common/ui/button';

const Link = styled('a')({
  textDecoration: 'none',
})

const initFilter = {
  therapist_id: undefined,
  category_id: undefined,
  status: undefined,
  date: undefined,
};

interface AppointmentFilter {
  therapist_id?: FilterValue;
  category_id?: FilterValue;
  status?: FilterValue;
  date?: string
}

interface Props {
  search: string;
}

const RefundsList = ({ search }: Props): ReactElement => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const dispatch = useDispatch();
  const { providers } = useSelector(selectProviders);

  const {
    DataTable,
    data: appointments,
    reloadData,
    loading,
    requestData,
    updateRequestData,
    updateSearch,
  } = useDataTable<IAppointment>({
    fetchDataFn: AdminAppointmentApi.getRefundsByQuery,
  });

  const fetchProviders = () =>
    dispatch(
      getProviders({
        filter: { status: UserStatusesEnum.ACTIVE },
      }),
    );

  useEffect(() => {
    fetchProviders();
  }, []);

  useEffect(() => {
    updateSearch(search);
  }, [search]);

  const cells: TableCell<IAppointment>[] = useMemo(() => {
    return [
      {
        field: 'therapist',
        label: 'Service Provider',
        render: ({ therapist }) => (therapist ? `${therapist.first_name} ${therapist.last_name}` : '---'),
      },
      {
        field: 'user',
        label: 'Client',
        render: ({ user }) => (user ? `${user.first_name} ${user.last_name}` : '---'),
      },
      {
        field: 'service_id',
        label: 'Type of service',
        render: ({ service }) => CategoryLabels[service?.category_id as ServiceCategoriesEnum],
      },
      {
        field: 'status',
        label: 'Status',
        render: ({ status }) => <StatusBadge status={status} />,
      },
    ];
  }, [appointments]);

  const filterOptions: FilterItemProps[] = useMemo(
    () => [
      {
        name: 'Service Provider',
        field: 'therapist_id',
        value: requestData.filter?.therapist_id,
        options: providers.data.map(({ id, first_name, last_name }: IProvider) => ({
          value: id,
          label: `${first_name} ${last_name}`,
        })),
        onChange: (therapist_id) => handleFiltersChange({ ...requestData.filter, therapist_id } as AppointmentFilter),
      },
      {
        name: 'Type of service',
        field: 'category_id',
        value: requestData.filter?.category_id,
        options: Object.entries(CategoryLabels).map(([value, label]) => ({ value, label })),
        onChange: (category_id) => handleFiltersChange({ ...requestData.filter, category_id } as AppointmentFilter),
      },
      {
        name: 'Status',
        field: 'status',
        value: requestData.filter?.status,
        options: Object.entries(AppointmentTimeLabels).map(([value, label]) => ({ value, label })),
        onChange: (status) => handleFiltersChange({ ...requestData.filter, status } as AppointmentFilter),
      },
    ],
    [requestData.filter],
  );

  const handleFiltersChange = (filter: AppointmentFilter) => {
    updateRequestData({ filter });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDate(date);
    handleFiltersChange({ date: date ? date.format('YYYY-MM-DD') : undefined });
  };

  return (
    <Box>
      <DataTable
        tableKey="ADMIN_BOOKINGS"
        keyField="id"
        cells={cells}
        rows={appointments.data}
        total={appointments.recordsTotal}
        filterOptions={filterOptions}
        date={date}
        onDateChange={handleDateChange}
        onClearFilter={() => handleFiltersChange(initFilter)}
        onLimitChange={(limit) => updateRequestData({ limit })}
        onOffsetChange={(offset) => updateRequestData({ offset })}
        onOrderChange={({ order_by, order_direction }) =>
          updateRequestData({
            order_by: order_by as keyof IAppointment,
            order_direction,
          })
        }
        customActions={({ external_transaction_id }) => (
          <Link
            href={`${process.env.REACT_APP_TYRO_ADMIN_PANEL_URL}/invoices/view?id=${external_transaction_id}`}
            target="_blank"
          >
            <Button variant="contained">
              Pay refund
            </Button>
          </Link>
        )}
        loading={loading}
        onLoad={reloadData}
      />
    </Box>
  );
};

export default RefundsList;
