import { DataTableResponse } from '../interfaces/data-table-response.interface';

export const dataTableInitValue: DataTableResponse<any> = {
  recordsTotal: 0,
  data: [],
};

export const AuthState: App.Store.Auth = {
  authData: null,
  authUser: null,
  resetPasswordToken: null,
  loading: false,
  authUserLoading: false,
  error: null,
};

export const UIState: App.Store.UI = {
  successSnackbar: '',
  errorSnackbar: '',
  infoSnackbar: '',
};

export const ServicesState: App.Store.Services = {
  services: dataTableInitValue,
  loading: false,
  saving: false,
  deleting: false,
  error: null,
};

export const UsersState: App.Store.Users = {
  users: dataTableInitValue,
  additionalList: [],
  loading: false,
  error: null,
};

export const ProvidersState: App.Store.Providers = {
  providers: dataTableInitValue,
  loading: false,
  saving: false,
  deleting: false,
  error: null,
};

export const ClientsState: App.Store.Clients = {
  clients: dataTableInitValue,
  loading: false,
  saving: false,
  deleting: false,
  error: null,
};

export const AppointmentsState: App.Store.Appointments = {
  appointments: dataTableInitValue,
  loading: false,
  updating: false,
  error: null,
};
