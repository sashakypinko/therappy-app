import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import { Box, styled, Typography } from '@mui/material';
import { TableCell } from '../../../../../../common/components/table/table';
import {
  FilterItemProps,
  FilterValue,
} from '../../../../../../common/components/table/table-filters/filter-item/filter-item';
import { Dayjs } from 'dayjs';
import { getImagePath } from '../../../../../../helpers/image.helper';
import UserStatusBadge from '../../../../../../common/components/user-status-badge';
import { CategoryLabels } from '../../../../../../enums/service-categories.enum';
import { AdminRouteEnum } from '../../../../routes/enums/route.enum';
import { useNavigate } from 'react-router-dom';
import { replaceParamsInReactUrl } from '../../../../../../helpers/url.helper';
import { userStatusFilter } from '../../../../../../common/components/table/table-filters/base-filters/base-filters';
import { ProviderApi } from '../../../../../../services/api/provider';
import useDataTable from '../../../../../../common/components/table/hooks/use-data-table.hook';
import UserDetailsCard from '../../../../../../common/components/user-details-card';
import { getServiceCategories, workWithChildren } from "../../../../../../helpers/provider.helper";
import { colors } from '../../../../../../config/theme/colors';
import { AdminUserApi } from '../../../../../../services/api/user/user.api';
import { useConfirmation } from '../../../../../../hooks';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { ImageSizesEnum } from '../../../../../../enums/image-sizes.enum';

const Image = styled('img')(
  () => `
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 2px;
`,
);

const ConfirmationBody = styled(Box)(
  () => `
    margin: 24px 8px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid ${colors.secondary[30]};
`,
);

const initFilters = {
  category_id: undefined,
  status: undefined,
  date: undefined,
};

interface ProviderFilters {
  category_id?: FilterValue;
  status?: FilterValue;
  date?: string;
}

interface Props {
  search: string;
}

const ProvidersList = ({ search }: Props): ReactElement => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const navigate = useNavigate();
  const { Confirmation, showConfirmation } = useConfirmation();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const {
    DataTable,
    data: providers,
    loading,
    requestData,
    updateRequestData,
    updateSearch,
    reloadData,
  } = useDataTable<IProvider>({
    fetchDataFn: ProviderApi.getByQuery,
  });

  useEffect(() => {
    updateSearch(search);
  }, [search]);

  const cells: TableCell<IProvider>[] = useMemo(() => {
    return [
      {
        field: 'image_id',
        label: '',
        align: 'center',
        render: ({ image_id }) => <Image src={getImagePath(image_id || 0, ImageSizesEnum.THUMBNAIL)} />,
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
    ];
  }, [providers]);

  const filterOptions: FilterItemProps[] = useMemo(
    () => [
      {
        name: 'Type of service',
        field: 'category_id',
        value: requestData.filter?.category_id,
        options: Object.entries(CategoryLabels).map(([value, label]) => ({ value, label })),
        onChange: (category_id) => handleFiltersChange({ ...requestData.filter, category_id }),
      },
      userStatusFilter(requestData.filter?.status, 'status', (status) =>
        handleFiltersChange({
          ...requestData.filter,
          status,
        }),
      ),
    ],
    [requestData.filter],
  );

  const handleFiltersChange = (filter: ProviderFilters) => {
    updateRequestData({ filter });
  };

  const handleDateChange = (date: Dayjs | null) => {
    setDate(date);
    handleFiltersChange({ date: date ? date.format('YYYY-MM-DD') : undefined })
  };

  const handleDelete = (provider: IProvider) => {
      showConfirmation({
        text: 'Confirm deletion',
        description: 'Are you sure you want to delete this therapist?',
        body: (
          <ConfirmationBody>
            <UserDetailsCard
              image={getImagePath(provider.image_id || 0, ImageSizesEnum.SMALL)}
              name={`${provider.first_name} ${provider.last_name}`}
              status={provider.status}
              workWithChildren={workWithChildren(provider)}
              subtitle={
                <Typography variant="body2" color={colors.secondary[60]}>
                  {getServiceCategories(provider)}
                </Typography>
              }
            />
          </ConfirmationBody>
        ),
        confirmProps: {
          variant: 'contained',
          color: 'error',
          title: 'Delete',
        },
        onConfirm: async () => {
          try {
            await AdminUserApi.deleteById(provider.id);
            successSnackbar('User deleted successfully');
            reloadData();
          } catch (e) {
            errorSnackbar('Error while declining user!');
          }
        },
      });
  };

  return (
    <div>
      {Confirmation}
      <DataTable
        tableKey="ADMIN_PROVIDERS"
        keyField="id"
        cells={cells}
        rows={providers.data}
        total={providers.recordsTotal}
        filterOptions={filterOptions}
        date={date}
        onDateChange={handleDateChange}
        onClearFilter={() => handleFiltersChange(initFilters)}
        onLimitChange={(limit) => updateRequestData({ limit })}
        onOffsetChange={(offset) => updateRequestData({ offset })}
        onOrderChange={({ order_by, order_direction }) =>
          updateRequestData({
            order_by: order_by as keyof IProvider,
            order_direction,
          })
        }
        loading={loading}
        onEditClick={({ id }) => navigate(replaceParamsInReactUrl(AdminRouteEnum.EDIT_PROVIDER, { id }))}
        onDeleteClick={handleDelete}
        onLoad={updateRequestData}
      />
    </div>
  );
};

export default ProvidersList;
