// Code snippet from Query.ts
type ObjectQuery = {
  [key: string]: number | string | string[];
};

type Sort = string;

export type Query = {
  filters: ObjectQuery;
  paramsObj: ObjectQuery;
  fields: string;
  model?: string;
  sorts: Sort[];
  limitValue?: number;
  pageValue?: number;
  perPage?: number;
};
