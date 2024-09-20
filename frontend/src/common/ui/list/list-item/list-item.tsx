import React, { ChangeEvent, Fragment, ReactElement, ReactNode } from 'react';
import { Box, Card, Checkbox, Grid, Skeleton, styled } from '@mui/material';
import Button from '../../button';
import { IService } from '../../../../services/api/service/dto/service.dto';
import { ServiceStatusesEnum } from '../../../../enums/service-statuses.enum';
import { colors } from '../../../../config/theme/colors';
import useIsMobile from '../../../../hooks/use-is-mobile.hook';

export const ItemCard = styled(Card)(
  ({ theme }) => `
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 10%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 3%);

     @media (max-width: ${theme.breakpoints.values.md}px) {
      padding: 8px;
    }
`,
);

const GridContainer = styled(Grid)(
  () => `
    align-items: center;
`,
);

export const ItemCardInfo = styled(Grid)(
  () => `
    display: flex;
    align-items: start;
`,
);

const Actions = styled(Grid)(
  ({ theme }) => `
    display: flex;
    justify-content: end;
    padding-right: 8px;
    
    @media (max-width: ${theme.breakpoints.values.md}px) {
      padding-right: 0;
    }
`,
);

const Image = styled('img')(
  () => `
    object-fit: cover;
    border-radius: 4px;
    margin-right: 16px;
`,
);

const Title = styled('p')(
  () => `
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    margin: 0;
`,
);

const Subtitle = styled('p')(
  ({ theme }) => `
    color: ${colors.primary[60]};
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin: 0 0 8px 0;
`,
);

const Description = styled('p')(
  () => `
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin: 0;
`,
);

const StyledButton = styled(Button)(
  () => `
    height: 34px;
`,
);

export interface ListItemData {
  image?: (item: any) => string;
  title?: (item: any) => string | ReactNode;
  subtitle?: (item: any) => string | ReactNode;
  description?: (item: any) => string | ReactNode;
}

export interface ListItemAction {
  label: string;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick: (item: any) => void;
}

export type ListItemObject = IService | any;

export interface Props {
  item: ListItemObject;
  dataMap: ListItemData;
  imageSize: number;
  actions?: (item: any) => ListItemAction[];
  customActions?: ReactNode;
  color?: string;
  withBorder?: boolean;
  withCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

const ListItem = ({
  item,
  dataMap,
  imageSize,
  actions = () => [],
  customActions,
  color,
  withBorder,
  withCheckbox,
  onCheckboxChange,
  checked,
}: Props): ReactElement => {
  return (
    <ItemCard
      sx={{
        background:
          item.status === ServiceStatusesEnum.INACTIVE ? colors.background.BG_3 : color || colors.background.BG_1,
        width: '100%',
        ...(withBorder && { border: `1px solid ${colors.secondary[30]}` }),
      }}
    >
      <GridContainer container spacing={1}>
        <ItemCardInfo item lg={8} md={9} sm={12}>
          {withCheckbox && onCheckboxChange && (
            <Checkbox sx={{ transform: 'scale(1.5)' }} checked={checked} onChange={onCheckboxChange} />
          )}
          {dataMap.image && <Image sx={{ width: imageSize, height: imageSize }} src={dataMap.image(item)} />}
          <Box>
            {dataMap.title && <Title>{dataMap.title(item)}</Title>}
            {dataMap.subtitle && <Subtitle>{dataMap.subtitle(item)}</Subtitle>}
            {dataMap.description && <Description>{dataMap.description(item)}</Description>}
          </Box>
        </ItemCardInfo>
        <Actions item lg={4} md={3} sm={12} xs={12}>
          {actions(item).map(({ label, variant, color, onClick }, index) => {
            return (
              <StyledButton color={color} key={index} variant={variant} onClick={() => onClick(item)}>
                {label}
              </StyledButton>
            );
          })}
          {customActions}
        </Actions>
      </GridContainer>
    </ItemCard>
  );
};

export const ListItemSkeleton = ({
  imageSize,
  actions = () => [],
}: {
  imageSize: number;
  actions?: (item: any) => ListItemAction[];
}): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <ItemCard>
      <GridContainer container spacing={1}>
        <ItemCardInfo item lg={7} md={9} sm={12}>
          <Skeleton sx={{ borderRadius: 1, mr: 2 }} variant="rectangular" width={imageSize} height={imageSize} />
          <Box>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={130} />
            <Skeleton variant="text" height={48} width={isMobile ? 150 : 200} />
          </Box>
        </ItemCardInfo>
        <Actions item lg={5} md={3} sm={12} xs={12}>
          {actions({}).map((a, index) => (
            <Skeleton key={index} sx={{ borderRadius: 2, mr: 2 }} variant="rectangular" width={100} height={34} />
          ))}
        </Actions>
      </GridContainer>
    </ItemCard>
  );
};

export default ListItem;
