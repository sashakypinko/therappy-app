import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import { UserStatusesEnum } from '../../../../../../enums/user-statuses.enum';
import { Box, styled, Typography } from '@mui/material';
import ProvidersVerificationModal from '../providers-verification-modal';
import { TableCell } from '../../../../../../common/components/table/table';
import { Dayjs } from 'dayjs';
import { getImagePath } from '../../../../../../helpers/image.helper';
import { defaultProviderValue, ProviderApi } from '../../../../../../services/api/provider';
import { useConfirmation } from '../../../../../../hooks';
import UserDetailsCard from '../../../../../../common/components/user-details-card';
import { colors } from '../../../../../../config/theme/colors';
import { CategoryLabels } from '../../../../../../enums/service-categories.enum';
import { workWithChildren } from '../../../../../../helpers/provider.helper';
import useDataTable from '../../../../../../common/components/table/hooks/use-data-table.hook';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { AdminUserApi } from "../../../../../../services/api/user/user.api";
import { ImageSizesEnum } from "../../../../../../enums/image-sizes.enum";

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

interface Props {
  search: string;
}

const ProvidersVerificationList = ({ search }: Props): ReactElement => {
  const [selectedProvider, setSelectedProvider] = useState<IProvider | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const { Confirmation, showConfirmation } = useConfirmation();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const {
    DataTable,
    data: providers,
    loading: tableLoading,
    updateRequestData,
    updateSearch,
    reloadData,
  } = useDataTable<IProvider>({
    fetchDataFn: ProviderApi.getByQuery,
    filters: { status: UserStatusesEnum.PENDING },
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

  const handleApprove = async () => {
    if (selectedProvider) {
      setLoading(true);
      try {
        await AdminUserApi.approve(selectedProvider.id);
        successSnackbar('User approved successfully');
        setSelectedProvider(null);
        reloadData();
      } catch (e) {
        errorSnackbar('Error while approving user!');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDecline = () => {
    if (selectedProvider) {
      showConfirmation({
        text: 'Confirm Decline',
        description: 'Are you sure you want to delete this therapist?',
        body: (
          <ConfirmationBody>
            <UserDetailsCard
              image={getImagePath(selectedProvider.image_id || 0, ImageSizesEnum.SMALL)}
              name={`${selectedProvider.first_name} ${selectedProvider.last_name}`}
              status={selectedProvider.status}
              workWithChildren={workWithChildren(selectedProvider)}
              subtitle={
                <Typography variant="body2" color={colors.secondary[60]}>
                  {CategoryLabels[selectedProvider.details.category_id]}
                </Typography>
              }
            />
          </ConfirmationBody>
        ),
        confirmProps: {
          variant: 'contained',
          color: 'error',
          title: 'Decline',
        },
        onConfirm: async () => {
          setLoading(true);
          try {
            await AdminUserApi.decline(selectedProvider.id);
            successSnackbar('User declined successfully');
            setSelectedProvider(null);
            reloadData();
          } catch (e) {
            errorSnackbar('Error while declining user!');
          } finally {
            setLoading(false);
          }
        },
      });
    }
    setSelectedProvider(null);
  };

  return (
    <>
      {Confirmation}
      <DataTable
        tableKey="ADMIN_PROVIDER_VERIFICATIONS"
        keyField="id"
        cells={cells}
        rows={providers.data}
        total={providers.recordsTotal}
        date={date}
        onDateChange={setDate}
        onLimitChange={(limit) => updateRequestData({ limit })}
        onOffsetChange={(offset) => updateRequestData({ offset })}
        loading={tableLoading}
        onViewClick={setSelectedProvider}
        onOrderChange={({ order_by, order_direction }) =>
          updateRequestData({
            order_by: order_by as keyof IProvider,
            order_direction,
          })
        }
        onLoad={updateRequestData}
      />
      <ProvidersVerificationModal
        open={!!selectedProvider}
        provider={selectedProvider || defaultProviderValue}
        loading={loading}
        onClose={() => setSelectedProvider(null)}
        onAccept={handleApprove}
        onDecline={handleDecline}
      />
    </>
  );
};

export default ProvidersVerificationList;
