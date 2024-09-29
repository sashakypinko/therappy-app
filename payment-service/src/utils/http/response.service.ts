enum EStatus {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

export class ApiResponse<T = any> {
  data?: T
  error?: Error
  status: EStatus
  message: string

  constructor(status: EStatus, message: string, data?: T, error?: Error) {
    this.data = data;
    this.error = error;
    this.status = status;
    this.message = message;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>(EStatus.SUCCESS, message, data);
  }

  static error(message: string, error: Error): ApiResponse<null> {
    return new ApiResponse<null>(EStatus.ERROR, message, null, error);
  }
}
