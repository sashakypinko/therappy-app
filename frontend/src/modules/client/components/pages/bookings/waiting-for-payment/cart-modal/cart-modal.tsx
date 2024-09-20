import React, { ReactElement, ReactNode } from 'react';
import Modal from '../../../../../../../common/ui/modal';
import { IAppointment } from '../../../../../../../services/api/appointment/dto/appointment.dto';
import { Box, Grid, IconButton, styled, Typography } from '@mui/material';
import ListItem from '../../../../../../../common/ui/list/list-item';
import { getImagePath } from '../../../../../../../helpers/image.helper';
import { IService } from '../../../../../../../services/api/service/dto/service.dto';
import { formatTime } from '../../../../../../../helpers/date-time.helper';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../../../../store/selectors';
import { Trash } from '../../../../../../../common/ui/icon';
import Button from '../../../../../../../common/ui/button';
import { colors } from '../../../../../../../config/theme/colors';
import useIsMobile from '../../../../../../../hooks/use-is-mobile.hook';
import { ImageSizesEnum } from '../../../../../../../enums/image-sizes.enum';
import dayjs from "dayjs";

const SubmitBox = styled(Box)(
  () => `
  display: flex;
  justify-content: center;
  padding: 22px 24px;
  border-radius: 6px;
  border: 1px solid ${colors.primary[20]};
  background: ${colors.primary[10]};
`,
);

interface Props {
  open: boolean;
  items: IAppointment[];
  loading: boolean;
  onRemove: (item: IAppointment) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const CartModal = ({ open, items, loading, onRemove, onClose, onSubmit }: Props): ReactElement => {
  const { services } = useSelector(selectServices);
  const isMobile = useIsMobile();

  return (
    <Modal open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Grid container>
        <Grid sx={{ mb: 2 }} item xs={12}>
          <Typography variant="subtitle1">Selected appointments</Typography>
        </Grid>
        <Grid sx={{ maxHeight: 450, overflowY: 'scroll' }} item xs={12}>
          {items.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              dataMap={{
                image: ({ service_id }) =>
                  getImagePath(
                    services.data.find(({ id }: IService) => id === service_id)?.image_id || 0,
                    ImageSizesEnum.SMALL,
                  ),
                title: ({ service_id }) => services.data.find(({ id }: IService) => id === service_id)?.name || '',
                subtitle: ({ intervals }: IAppointment): ReactNode => (
                  <>
                    <Typography sx={{ mt: 1 }} variant="body2" fontSize={14} fontWeight={600}>
                      {formatTime(intervals[0].start)} - {formatTime(intervals[0].end)}
                    </Typography>
                    <Typography variant="body2" fontSize={14} fontWeight={600}>
                      {dayjs(item.date).format('dddd, DD MMMM YYYY')}
                    </Typography>
                  </>
                ),
              }}
              imageSize={100}
              customActions={
                <IconButton onClick={() => onRemove(item)}>
                  <Trash />
                </IconButton>
              }
              withBorder
            />
          ))}
        </Grid>
        <Grid sx={{ pt: 2 }} display="flex" alignItems="center" item xs={12} md={4} order={isMobile ? 5 : 4}>
          <Button variant="contained" color="secondary" fullWidth={isMobile} onClick={onClose}>
            Cancel
          </Button>
        </Grid>
        <Grid sx={{ pt: 2 }} item xs={12} md={8} order={isMobile ? 4 : 5}>
          <SubmitBox>
            <Typography sx={{ mr: 2 }} variant="h4">
              ${items.reduce((partialSum, { price }) => partialSum + price, 0)}
            </Typography>
            <Button variant="contained" onClick={onSubmit} loading={loading} disabled={loading}>
              Proceed to checkout
            </Button>
          </SubmitBox>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default CartModal;
