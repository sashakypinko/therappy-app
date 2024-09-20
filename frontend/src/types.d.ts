declare namespace App {
  namespace Store {
    export interface Auth {
      authData: AuthResponseInterface | null;
      resetPasswordToken: null;
      authUser: IClient | IProvider | IUser | null;
      loading: boolean;
      authUserLoading: boolean;
      error: unknown;
    }

    export interface UI {
      successSnackbar: string;
      errorSnackbar: string;
      infoSnackbar: string;
    }

    export interface Services {
      services: DataTableResponse<IService>;
      loading: boolean;
      saving: boolean;
      deleting: boolean;
      error: unknown;
    }

    export interface Users {
      users: DataTableResponse<IUser>;
      additionalList: IAdditional[];
      loading: boolean;
      error: unknown;
    }

    export interface Providers {
      providers: DataTableResponse<IProvider>;
      loading: boolean;
      saving: boolean;
      deleting: boolean;
      error: unknown;
    }

    export interface Clients {
      clients: DataTableResponse<IClient>;
      loading: boolean;
      saving: boolean;
      deleting: boolean;
      error: unknown;
    }

    export interface Appointments {
      appointments: DataTableResponse<IAppointment>;
      loading: boolean;
      updating: boolean;
      error: unknown;
    }
  }
}
