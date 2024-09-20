import { ReactElement, useEffect, useMemo, useState } from 'react';
import ClientModal from '../client-modal';
import { TableCell } from '../../../../../../common/components/table/table';
import {
  FilterItemProps,
  FilterValue,
} from '../../../../../../common/components/table/table-filters/filter-item/filter-item';
import { IClient } from '../../../../../../services/api/client/dto/client.dto';
import { Dayjs } from 'dayjs';
import UserStatusBadge from '../../../../../../common/components/user-status-badge';
import { userStatusFilter } from '../../../../../../common/components/table/table-filters/base-filters/base-filters';
import useDataTable from "../../../../../../common/components/table/hooks/use-data-table.hook";
import { ClientApi } from "../../../../../../services/api/client/client.api";

const initFilters = {
  status: undefined,
  date: undefined,
};

interface ClientFilters {
  status?: FilterValue;
  date?: string;
}

interface Props {
  search: string;
}

const ClientsList = ({ search }: Props): ReactElement => {
  const [editableClient, setEditableClient] = useState<IClient | null>(null);
  const [deletableClient, setDeletableClient] = useState<IClient | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);

  const {
    DataTable,
    data: clients,
    reloadData,
    loading,
    requestData,
    updateRequestData,
    updateSearch,
  } = useDataTable<IClient>({
    fetchDataFn: ClientApi.getByQuery,
  });

  useEffect(() => {
    updateSearch(search);
  }, [search]);

  const cells: TableCell<IClient>[] = useMemo(() => {
    return [
      {
        field: 'first_name',
        label: 'First Name',
      },
      {
        field: 'last_name',
        label: 'Last Name',
      },
      {
        field: 'email',
        label: 'Email',
      },
      {
        field: 'status',
        label: 'Status',
        render: ({ status }) => (
          <>
            <UserStatusBadge status={status} />
          </>
        ),
      },
    ];
  }, [clients]);

  const filterOptions: FilterItemProps[] = useMemo(
    () => [
      userStatusFilter(requestData.filter?.status, 'status', (status) =>
        handleFiltersChange({
          ...requestData.filter,
          status,
        }),
      ),
    ],
    [requestData.filter],
  );

  const handleFiltersChange = (filter: ClientFilters) => {
    updateRequestData({ filter });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDate(date);
    handleFiltersChange({ date: date ? date.format('YYYY-MM-DD') : undefined })
  };

  const handleModalClose = () => {
    setEditableClient(null);
    setDeletableClient(null);
  };

  return (
    <div>
      <DataTable
        tableKey="ADMIN_CLIENTS"
        keyField="id"
        cells={cells}
        rows={clients.data}
        total={clients.recordsTotal}
        filterOptions={filterOptions}
        date={date}
        onDateChange={handleDateChange}
        onClearFilter={() => handleFiltersChange(initFilters)}
        onLimitChange={(limit) => updateRequestData({ limit })}
        onOffsetChange={(offset) => updateRequestData({ offset })}
        onOrderChange={({ order_by, order_direction }) =>
          updateRequestData({
            order_by: order_by as keyof IClient,
            order_direction,
          })
        }
        loading={loading}
        onEditClick={setEditableClient}
        onDeleteClick={setDeletableClient}
        onLoad={updateRequestData}
      />
      <ClientModal
        open={!!editableClient || !!deletableClient}
        editableClient={editableClient}
        deletableClient={deletableClient}
        onClose={handleModalClose}
        onListUpdate={reloadData}
      />
    </div>
  );
};

export default ClientsList;
