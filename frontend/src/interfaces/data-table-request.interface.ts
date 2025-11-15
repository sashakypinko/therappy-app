import { OrderDirection } from "../common/components/table/table";

export interface DataTableRequest<Model> {
  offset?: number;
  limit?: number;
  order_by?: keyof Model;
  order_direction?: OrderDirection;
  filter?: any;
  search?: {
    value: string;
  };
  date?: string;
}
