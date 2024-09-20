import React, { ChangeEvent, ReactElement, ReactNode } from 'react';
import { Box, Checkbox, Grid } from '@mui/material';

import ListItem from './list-item';
import ListPagination from './list-pagination';
import { ListItemAction, ListItemData, ListItemObject, ListItemSkeleton } from './list-item/list-item';
import EmptyPage from '../empty-page';
import Button from '../button';
import useIsMobile from '../../../hooks/use-is-mobile.hook';

interface PlaceholderProps {
  actions?: (item: any) => ListItemAction[];
  length: number;
  imageSize: number;
}

const Placeholder = ({ length, imageSize, actions }: PlaceholderProps): ReactElement => {
  const count = Array.from({ length }, (_, index) => index + 1);

  return (
    <>
      {count.map((index) => (
        <ListItemSkeleton actions={actions} imageSize={imageSize} key={index} />
      ))}
    </>
  );
};

interface Props {
  data: ListItemObject[];
  dataMap?: ListItemData;
  total: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  emptyPageTitle: string;
  emptyPageImage?: string;
  emptyPageButtonLabel?: string;
  emptyPageOnClick?: () => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  actions?: (item: any) => ListItemAction[];
  imageSize?: number;
  itemColor?: string;
  selectedItems?: any[];
  onSelect?: (newItems: any[]) => void;
  selectedAction?: ReactNode;
  customItem?: (item: any) => ReactNode;
}

const List = ({
  data,
  total,
  dataMap = {},
  loading,
  page,
  emptyPageTitle,
  emptyPageImage = '/img/empty-page.svg',
  emptyPageButtonLabel,
  emptyPageOnClick,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  actions,
  imageSize = 128,
  itemColor,
  selectedItems,
  onSelect,
  selectedAction,
  customItem,
}: Props): ReactElement => {
  const isMobile = useIsMobile();

  const handleSelect = (checked: boolean, item: any) => {
    if (!onSelect || !selectedItems) {
      return;
    }
    if (checked) {
      onSelect([...selectedItems, item]);
    } else {
      onSelect(selectedItems.filter(({ id }) => id !== item.id));
    }
  };

  if (!loading && !data.length) {
    return (
      <EmptyPage
        title={emptyPageTitle}
        image={emptyPageImage}
        buttonLabel={emptyPageButtonLabel}
        onClick={emptyPageOnClick}
      />
    );
  }

  return (
    <Box>
      {loading ? (
        <Placeholder actions={actions} length={rowsPerPage} imageSize={imageSize} />
      ) : (
        data.map((item) => {
          return (
            <Box display="flex" alignItems="center" key={item.id}>
              {selectedItems && !isMobile && (
                <Box sx={{ pb: 2, pr: 2 }}>
                  <Checkbox
                    sx={{ transform: 'scale(1.5)' }}
                    checked={!!selectedItems.find(({ id }) => item.id === id)}
                    onChange={(e, checked) => handleSelect(checked, item)}
                  />
                </Box>
              )}
              {customItem ? (
                customItem(item)
              ) : (
                <ListItem
                  item={item}
                  dataMap={dataMap}
                  imageSize={imageSize}
                  actions={actions}
                  color={itemColor}
                  withCheckbox={selectedItems && isMobile}
                  checked={!!(selectedItems || []).find(({ id }) => item.id === id)}
                  onCheckboxChange={(e, checked) => handleSelect(checked, item)}
                />
              )}
            </Box>
          );
        })
      )}
      {selectedItems?.length && onSelect ? (
        <Grid container sx={{ mt: 3, mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Button sx={{ width: isMobile ? '100%' : 300, mb: 2 }} variant="outlined" onClick={() => onSelect([])}>
              Сancel selection
            </Button>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="end">
            {selectedAction}
          </Grid>
        </Grid>
      ) : (
        ''
      )}
      <ListPagination
        page={page}
        rowsPerPage={rowsPerPage}
        total={total}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Box>
  );
};

export default List;
