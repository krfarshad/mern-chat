import qs from "@/lib/qs";
import { Query } from "./type";

export const initQuery = {
  filters: {},
  fields: "",
  model: undefined,
  sorts: [],
  params: null,
  limit: undefined,
  pageValue: undefined,
  perPage: undefined,
  paramsObj: {},
};

const initQueryParameters = {
  filters: "filter",
  fields: "fields",
  model: "model",
  sort: "sort",
  params: "params",
  limit: "limit",
  page: "page",
  perPage: "per_page",
  appends: "append",
};

export default class Parser {
  private query: Query = initQuery;
  private queryParameters = initQueryParameters;
  public uri = "";

  constructor(query: Query) {
    this.query = query;
  }

  public parse() {
    this.filters();
    this.fields();
    this.sorts();
    this.page();
    this.perPage();
    this.limit();
    this.params();
    return this.uri;
  }

  public prepend() {
    return this.uri === "" ? "?" : "&";
  }

  public filters() {
    if (!Object.keys(this.query.filters).length) {
      return;
    }

    const filters = {
      [this.queryParameters.filters]: this.query.filters,
    };
    this.uri += this.prepend() + qs.stringify(filters, { encode: false });
  }

  public fields() {
    if (!Object.keys(this.query.fields).length) {
      return;
    }

    const fields = {
      [`${this.queryParameters.fields}[${this.query.model}]`]:
        this.query.fields,
    };
    this.uri += this.prepend() + qs.stringify(fields, { encode: false });
  }

  public sorts() {
    if (!this.query.sorts.length) {
      return;
    }

    this.uri += `${this.prepend() + this.queryParameters.sort}=${
      this.query.sorts
    }`;
  }

  public page() {
    if (!this.query.pageValue) {
      return;
    }

    this.uri += `${this.prepend() + this.queryParameters.page}=${
      this.query.pageValue
    }`;
  }

  public perPage() {
    if (!this.query.perPage) {
      return;
    }

    this.uri += `${this.prepend() + this.queryParameters.perPage}=${
      this.query.perPage
    }`;
  }

  public limit() {
    if (!this.query.limitValue) {
      return;
    }

    this.uri += `${this.prepend() + this.queryParameters.limit}=${
      this.query.limitValue
    }`;
  }

  public params() {
    if (!Object.keys(this.query.paramsObj).length) {
      return;
    }

    this.uri +=
      this.prepend() + qs.stringify(this.query.paramsObj, { encode: false });
  }
}
