export class ApiError extends Error {
  status: number;
  message: any;
  error: unknown;
  data: null;

  constructor(status: number, message: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = null;
  }
}
