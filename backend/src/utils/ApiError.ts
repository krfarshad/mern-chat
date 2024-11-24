export class ApiError {
  status: number;
  message: any;
  data: null;
  constructor(status: number, message: string) {
    this.status = status;
    this.data = null;
    this.message = message;
  }
}
