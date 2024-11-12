type MetaResponse = {
  total: number;
  page: number;
  totalPages?: number;
};
export class ApiSuccess {
  status: number;
  message: any;
  data: any;
  meta?: MetaResponse;

  constructor(status: number, data: any, message: string, meta?: MetaResponse) {
    this.status = status;
    this.data = data;

    if (message) {
      this.message = message;
    }
    if (meta) {
      this.meta = meta;
    }
  }
}
