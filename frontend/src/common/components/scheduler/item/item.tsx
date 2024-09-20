import { ReactElement, ReactNode } from 'react';
import { Box, styled } from '@mui/material';
import { colors } from '../../../../config/theme/colors';
import { ItemStatusEnum } from '../enums/item-status.enum';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';

const StyledBox = styled(Box)(
  () => `
   border-radius: 8px;
   min-height: 90px;
   min-width: -webkit-fill-available;
`,
);

const LeftBorder = styled(Box)(
  () => `
   width: 8px;
   height: 100%;
   border-radius: 5px 0 0 5px;
   position: absolute;
`,
);

export const getColorByType = (type: ItemStatusEnum) => {
  switch (type) {
    case ItemStatusEnum.PAST:
      return 'secondary';

    default:
      return 'primary';
  }
};

export interface SchedulerItem {
  itemContent: ReactNode;
  type: ItemStatusEnum;
}

const Item = ({ itemContent, type }: SchedulerItem): ReactElement => {
  const color = getColorByType(type);
  const current = type === ItemStatusEnum.CURRENT;
  const isMobile = useIsMobile();

  return (
    <StyledBox
      sx={{
        border: `1px solid ${current ? colors[color][70] : colors.secondary[30]}`,
        background: current ? colors[color][10] : colors.background.BG_1,
        position: isMobile ? 'relative' : 'absolute',
        marginBottom: isMobile ? 2 : 0,
        left: isMobile ? 0 : 70,
      }}
    >
      <LeftBorder
        sx={{
          background: colors[color][current ? 70 : 50],
        }}
      />
      {itemContent}
    </StyledBox>
  );
};

export default Item;
