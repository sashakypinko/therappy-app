import { ReactElement, useEffect, useState } from 'react';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { UserApi } from '../../../../../../services/api/user';
import { DataTableResponse } from '../../../../../../interfaces/data-table-response.interface';
import { dataTableInitValue } from '../../../../../../store/init-state';
import { IReview } from '../../../../../../services/api/user/dto/review.dto';
import List from '../../../../../../common/ui/list';
import { Card, Grid, Rating, styled, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { StarRounded } from '@mui/icons-material';
import { colors } from '../../../../../../config/theme/colors';

export const ItemCard = styled(Card)(
  ({ theme }) => `
    margin-bottom: 16px;
    width: 100%;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 3%);

     @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 8px;
    }
`,
);

const ReviewItem = ({ item }: { item: IReview }): ReactElement => {
  return (
    <ItemCard>
      <Grid container>
        <Grid item lg={8} md={9} sm={12}>
          <Typography variant="body2" fontWeight={600}>
            {item.user?.first_name} {item.user?.first_name}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body2" fontSize={14}>
            {item.comment}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body2" fontSize={12} fontWeight={600}>
            {dayjs(item.created_at).format('DD.MM.YYYY')}
          </Typography>
        </Grid>
        <Grid item display="flex" justifyContent="end" lg={4} md={3} sm={12} xs={12}>
          <Rating
            value={item.rating}
            icon={<StarRounded fontSize="inherit" />}
            emptyIcon={<StarRounded color="secondary" />}
            readOnly
          />
        </Grid>
      </Grid>
    </ItemCard>
  );
};

interface Props {
  providerId: number;
  onLoad: (data: DataTableResponse<IReview>) => void;
}

const ReviewsList = ({ providerId, onLoad }: Props): ReactElement => {
  const [reviews, setReviews] = useState<DataTableResponse<IReview>>(dataTableInitValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(25);
  const { errorSnackbar } = useSnackbar();

  const getReviews = async () => {
    try {
      setLoading(true);
      const newReviews = await UserApi.getReviews({ target_id: providerId, offset, limit });
      setReviews(newReviews);
      onLoad(newReviews);
    } catch (e) {
      errorSnackbar('Error while loading reviews!');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeOffset = (newOffset: number) => {
    setOffset(newOffset > 0 ? newOffset - 1 : 0);
  };

  const handleChangeLimit = (newLimit: number) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    getReviews().then();
  }, [limit, offset]);

  return (
    <List
      data={reviews.data}
      total={reviews.recordsTotal}
      loading={loading}
      page={offset + 1}
      rowsPerPage={limit}
      emptyPageTitle="You have any reviews yet"
      onPageChange={handleChangeOffset}
      onRowsPerPageChange={handleChangeLimit}
      customItem={(item) => <ReviewItem item={item} />}
    />
  );
};

export default ReviewsList;
