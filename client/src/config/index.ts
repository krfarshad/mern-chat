export const BASE_API_URL = `${process?.env?.NEXT_PUBLIC_BASE_API_URL}`;

export const BASE_APP_URL = process?.env?.NEXT_PUBLIC_BASE_APP_URL;

export const NEXT_AUTH_SECRET = process?.env?.NEXT_PUBLIC_BASE_APP_URL;

const config = {
  pagination: {
    per_page: 20,
    max_per_page: 25,
  },
};

export const conf = function (callback: (cng: typeof config) => any) {
  return callback(config);
};
