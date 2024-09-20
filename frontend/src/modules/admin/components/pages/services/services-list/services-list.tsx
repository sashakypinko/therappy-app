import { ReactElement, useEffect, useMemo, useState } from 'react';
import { IService } from '../../../../../../services/api/service/dto/service.dto';
import ServiceModal from '../service-modal';
import { CategoryLabels, ServiceCategoriesEnum } from '../../../../../../enums/service-categories.enum';
import { TableCell } from '../../../../../../common/components/table/table';
import { getImagePath } from '../../../../../../helpers/image.helper';
import { styled } from '@mui/material';
import {
  FilterItemProps,
  FilterValue,
} from '../../../../../../common/components/table/table-filters/filter-item/filter-item';
import useDataTable from '../../../../../../common/components/table/hooks/use-data-table.hook';
import { PublicServiceApi } from '../../../../../../services/api/service';
import { ImageSizesEnum } from '../../../../../../enums/image-sizes.enum';
import { shortString } from "../../../../../../helpers/string.helper";

const Image = styled('img')(
  () => `
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 2px;
`,
);

const initFilters = {
  category: undefined,
};

interface ServiceFilters {
  category?: FilterValue;
}

interface Props {
  search: string;
  openModal: boolean;
  onModalClose: () => void;
}

const ServicesList = ({ search, openModal, onModalClose }: Props): ReactElement => {
  const [editableService, setEditableService] = useState<IService | null>(null);
  const [deletableService, setDeletableService] = useState<IService | null>(null);
  const {
    DataTable,
    data: services,
    reloadData,
    loading,
    requestData,
    updateRequestData,
    updateSearch
  } = useDataTable<IService>({
    fetchDataFn: PublicServiceApi.getByQuery
  });

  useEffect(() => {
    updateSearch(search);
  }, [search]);

  const cells: TableCell<IService>[] = useMemo(() => {
    return [
      {
        field: 'image_id',
        label: '',
        align: 'center',
        render: ({ image_id }) => <Image src={getImagePath(image_id || 0, ImageSizesEnum.THUMBNAIL)} />,
      },
      {
        field: 'name',
        label: 'Type of therapy',
      },
      {
        field: 'category_id',
        label: 'Category',
        render: ({ category_id }) => CategoryLabels[category_id as ServiceCategoriesEnum],
      },
      {
        field: 'description',
        label: 'Description',
        render: ({ description }) => shortString(description, 70),
      },
    ];
  }, [services]);

  const filterOptions: FilterItemProps[] = useMemo(
    () => [
      {
        name: 'Category',
        field: 'category',
        value: requestData.filter?.category,
        options: Object.entries(CategoryLabels).map(([value, label]) => ({ value, label })),
        onChange: (category) => handleFiltersChange({ ...requestData.filter, category }),
      },
    ],
    [requestData.filter],
  );

  const handleFiltersChange = (filter: ServiceFilters) => {
    updateRequestData({ filter });
  };

  const handleModalClose = () => {
    onModalClose();
    setEditableService(null);
    setDeletableService(null);
  };

  return (
    <>
      <DataTable
        tableKey="ADMIN_SERVICES"
        keyField="id"
        cells={cells}
        rows={services.data}
        total={services.recordsTotal}
        filterOptions={filterOptions}
        onClearFilter={() => handleFiltersChange(initFilters)}
        loading={loading}
        onEditClick={setEditableService}
        onDeleteClick={setDeletableService}
        onLimitChange={(limit) => updateRequestData({ limit })}
        onOffsetChange={(offset) => updateRequestData({ offset })}
        onOrderChange={({ order_by, order_direction }) =>
          updateRequestData({
            order_by: order_by as keyof IService,
            order_direction,
          })
        }
        onLoad={updateRequestData}
      />
      <ServiceModal
        open={openModal || !!editableService || !!deletableService}
        editableService={editableService}
        deletableService={deletableService}
        onClose={handleModalClose}
        onListUpdate={reloadData}
      />
    </>
  );
};

export default ServicesList;
