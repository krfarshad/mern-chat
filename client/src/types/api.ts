export type ApiResponse<T> = {
  data: T;
  errors?: { key: string; value: [] }[];
  message: string;
  status: number;
};

export type MetaResponse = {
  current_page: number;
  from: number;
  last_page: number;
  links: [];
  to: number;
  total: number;
};
export type ApiPaginateResponse<T> = {
  data: T;
  message: string;
  status: number;
  meta: MetaResponse;
};

export type PassportTokenResponse = {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export type QueryParams = {
  page?: number;
  per_page?: string;
  filters?: { [key: string]: string | any[] };
  sort?: string;
  params?: { [key: string]: any };
};
