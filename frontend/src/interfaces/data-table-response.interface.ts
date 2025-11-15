export interface DataTableResponse<Model> {
  recordsTotal: number;
  data: Model[];
}
