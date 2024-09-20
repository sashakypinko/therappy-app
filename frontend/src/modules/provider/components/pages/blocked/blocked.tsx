import { ReactElement, useEffect, useState } from 'react';
import PageContainer from '../../../../../common/ui/page-container';
import { ProviderApi } from '../../../../../services/api/provider';
import { DataTableResponse } from '../../../../../interfaces/data-table-response.interface';
import { IUser } from '../../../../../services/api/user/dto/user.dto';
import { dataTableInitValue } from '../../../../../store/init-state';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { Typography } from '@mui/material';
import List from '../../../../../common/ui/list';
import { colors } from '../../../../../config/theme/colors';
import { useConfirmation } from '../../../../../hooks';

const Blocked = (): ReactElement => {
  const [blockedUsers, setBlockedUsers] = useState<DataTableResponse<IUser>>(dataTableInitValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25);
  const { successSnackbar, errorSnackbar } = useSnackbar();
  const { Confirmation, showConfirmation } = useConfirmation();

  const fetchBlockedUsers = async () => {
    try {
      setLoading(true);
      const newBlockedUsers = await ProviderApi.getBlockedUsers({ limit, offset });
      setBlockedUsers(newBlockedUsers);
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get blocked users list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedUsers().then();
  }, [limit, offset]);

  const handleChangeOffset = (newOffset: number) => {
    setOffset(newOffset > 0 ? newOffset - 1 : 0);
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
  };

  const handleUnblock = (id: number) => {
    showConfirmation({
      text: 'Are you sure you want to unblock this user?',
      onConfirm: async () => {
        try {
          await ProviderApi.blockUsers({ target_id: id, block: 0 });
          successSnackbar('User unblocked successfully');
          await fetchBlockedUsers();
        } catch (e) {
          errorSnackbar('Error while unblocking user!');
        }
      },
    });
  };

  return (
    <PageContainer title="Blocked">
      {Confirmation}
      <List
        data={blockedUsers.data}
        dataMap={{
          image: () => '/img/default-avatar.svg',
          title: ({ blocked }) => `${blocked.first_name} ${blocked.last_name}`,
          description: ({ blocked }) => (
            <Typography variant="subtitle2" color={colors.secondary[60]} fontSize={14}>
              {blocked.email}
            </Typography>
          ),
        }}
        imageSize={58}
        total={blockedUsers.recordsTotal}
        loading={loading}
        page={offset + 1}
        rowsPerPage={limit}
        emptyPageTitle="You have no blocked users"
        emptyPageImage="/img/empty-blocked-users.svg"
        onPageChange={handleChangeOffset}
        onRowsPerPageChange={handleChangeLimit}
        actions={() => [
          {
            label: 'Unblock',
            variant: 'contained',
            onClick: ({ target_id }) => handleUnblock(target_id),
          },
        ]}
        itemColor={colors.error[10]}
      />
    </PageContainer>
  );
};

export default Blocked;
