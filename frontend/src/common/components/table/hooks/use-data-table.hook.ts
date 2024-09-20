import Table from '../index';
import { useEffect, useState } from 'react';
import { DataTableRequest } from '../../../../interfaces/data-table-request.interface';
import { OrderDirection } from '../table';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { DataTableResponse } from '../../../../interfaces/data-table-response.interface';
import { dataTableInitValue } from '../../../../store/init-state';
import { Dayjs } from "dayjs";

interface DataTableParams<Model> {
  fetchDataFn: (requestData: DataTableRequest<Model>) => Promise<DataTableResponse<Model>>;
  filters?: { [key: string]: string | number | undefined };
  order?: OrderDirection;
  orderBy?: keyof Model;
}

const useDataTable = <Model>(
  { fetchDataFn, filters, orderBy, order }: DataTableParams<Model> = {
    fetchDataFn: async () => await dataTableInitValue,
  },
) => {
  const [tableInit, setTableInit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<DataTableRequest<Model>>({
    offset: 0,
    limit: 25,
    order_by: orderBy,
    order_direction: order,
    filter: filters,
    search: { value: '' },
  });
  const [data, setData] = useState<DataTableResponse<Model>>(dataTableInitValue);
  const { errorSnackbar } = useSnackbar();

  const fetchData = async () => {
    setLoading(true);
    try {
      const newData = await fetchDataFn(requestData);
      setData(newData);
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get table data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tableInit) {
      fetchData();
    } else {
      setTableInit(true);
    }
  }, [requestData]);

  const updateRequestData = (newData: object) => {
    setRequestData({ ...requestData, ...newData });
  };

  const updateSearch = (search: string) => {
    tableInit && setRequestData({ ...requestData, search: { value: search } });
  };

  const DataTable = Table<Model>;

  return {
    DataTable,
    requestData,
    updateRequestData,
    updateSearch,
    data,
    reloadData: fetchData,
    loading,
  };
};

export default useDataTable;
