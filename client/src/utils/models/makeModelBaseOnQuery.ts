import { Model } from "./Model";
import { conf } from "@/config";

const maxPerPage = conf((config) => config.pagination.max_per_page);

export const makeModelBaseOnQuery = (model: Model, query: any) => {
  const { per_page, page, filters, sort, params } = query;

  if (per_page) {
    let perPage = per_page >= maxPerPage ? maxPerPage : per_page;
    model.perPage(+perPage);
  }

  if (page) {
    model.page(+page);
  }

  if (filters && Object.keys(filters).length) {
    Object.keys(filters).forEach((filterKey) => {
      const value = filters[filterKey];
      if (typeof value == "string") {
        model.where(filterKey, value);
      } else {
        model.whereIn(filterKey, value);
      }
    });
  }

  if (params && Object.keys(params).length) {
    model.params(params);
  }

  if (sort) {
    model.sort(sort);
  }

  return model;
};
