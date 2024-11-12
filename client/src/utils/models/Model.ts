import Parser, { initQuery } from "./Parser";
import { Query } from "./type";
import { fetch } from "./fetch";
import { BASE_API_URL } from "@/config";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export type OptionProperty = {
  isServerSide?: boolean;
  requestInit?: RequestInit;
};

export class Model {
  private baseUrl = BASE_API_URL;

  private query: Query = { ...initQuery };
  private parser: Parser;
  private customEndpoint: string = "";
  private options: OptionProperty = {
    isServerSide: false,
  };

  constructor(options?: OptionProperty) {
    this.parser = new Parser(this.query);
    this.options = { ...this.options, ...options };
  }

  public static new(options?: OptionProperty) {
    return new this(options);
  }

  // Implement a default request method
  private request(url: string, config: {}) {
    return fetch(url, { ...this.options.requestInit, ...config });
  }

  public for(value: string) {
    this.query.model = value;
    return this;
  }

  public resource() {
    return "";
  }

  public customUrl(customEndpoint: string) {
    this.customEndpoint = customEndpoint;
    return this;
  }

  public parseQuery() {
    if (
      !this.query.model &&
      this.resource() === "" &&
      this.customEndpoint === ""
    ) {
      throw new Error(
        "Please add resource() to model or call the for()  method before adding filters or calling url() / get().",
      );
    }

    let resource = this.resource();

    if (this.customEndpoint !== "") {
      resource = this.customEndpoint;
    }
    return `/${resource}${this.parser.parse()}`;
  }

  public reset() {
    // reset the uri
    this.parser.uri = "";
  }

  public where(key: string, value: string) {
    if (key === undefined || value === undefined)
      throw new Error(
        "The where() function takes 2 arguments both of string values.",
      );

    if (Array.isArray(value))
      throw new Error(
        "The second argument to the where() function must be a string. Use whereIn() if you need to pass in an array.",
      );

    this.query.filters = { ...this.query.filters, [key]: value };

    return this;
  }

  public whereIn(key: string, array: string[]) {
    if (!key || !array) {
      throw new Error(
        "The whereIn() function takes 2 arguments of (string, array).",
      );
    }

    if ((!key && Array.isArray(key)) || typeof key === "object") {
      throw new Error(
        "The first argument for the whereIn() function must be a string or integer.",
      );
    }

    if (!Array.isArray(array)) {
      throw new Error(
        "The second argument for the whereIn() function must be an array.",
      );
    }

    this.query.filters = { ...this.query.filters, [key]: array.join(",") };

    return this;
  }

  public sort(...args: string[]) {
    this.query.sorts = args;

    return this;
  }

  public limit(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error(
        "The limit() function takes a single argument of a number.",
      );
    }

    this.query.limitValue = value;

    return this;
  }

  public page(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error(
        "The page() function takes a single argument of a number",
      );
    }

    this.query.pageValue = value;

    return this;
  }

  public perPage(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error(
        "The perPage() function takes a single argument of a number",
      );
    }

    this.query.perPage = value;

    return this;
  }

  public select(...fields: string[]) {
    if (!fields.length) {
      throw new Error(
        `The select() function takes a single argument of an array.`,
      );
    }

    // single entity .fields(['age', 'firstname'])
    if (fields[0].constructor === String || Array.isArray(fields[0])) {
      this.query.fields = fields.join(",");
    }

    return this;
  }

  public params(params: { [key: string]: number | string | string[] }) {
    if (params === undefined || params.constructor !== Object) {
      throw new Error(
        "The params() function takes a single argument of an object.",
      );
    }

    this.query.paramsObj = params;

    return this;
  }

  public getUrl() {
    // generate the url
    const url = this.baseUrl
      ? this.baseUrl + this.getEndpoint()
      : this.getEndpoint();

    return url;
  }

  public getEndpoint() {
    const url = this.parseQuery();

    this.reset(); // reset the url so the query object can be re-used

    return url;
  }

  public async get() {
    const url = this.getEndpoint();
    const response = await this.request(url, { method: "GET" });
    return response;
  }

  public async find(id: number) {
    const url = this.getEndpoint();
    const response = await this.request(`${url}/${id}`, { method: "GET" });
    return response;
  }

  public async post(data: { [key: string]: any }) {
    const url = this.getEndpoint();
    const res = await this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return res;
  }

  public async patch(data: { [key: string]: any }, id?: number | string) {
    const patchData = { ...data, _method: "put" };
    const url = `${this.getEndpoint()}${id ? "/" + id : ""}`;
    const res = await this.request(url, {
      method: "PUT",
      body: JSON.stringify(patchData),
    });

    return res;
  }
  public async multipleFormPatch(data: FormData) {
    const url = `${this.getEndpoint()}`;
    const res = await this.request(url, {
      method: "POST",
      "content-type": "multipart/form-data; boundary=----",
      body: data,
    });
    return res;
  }
  public async multipleForm(data: FormData, id?: number) {
    const url = `${this.getEndpoint()}${id ? "/" + id : ""}`;
    const res = await this.request(url, {
      method: "POST",
      body: data,
    });

    return res;
  }

  public async delete(id?: number | string) {
    const url = `${this.getEndpoint()}${id ? "/" + id : ""}`;
    const res = await this.request(url, {
      method: "DELETE",
    });
    return res;
  }

  public async remove(data: { [key: string]: any }) {
    const url = this.getEndpoint();
    const res = await this.request(url, {
      method: "DELETE",
      body: JSON.stringify(data),
    });

    return res;
  }
}
