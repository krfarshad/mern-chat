import { BASE_API_URL } from "@/config";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

type FetchType = typeof fetch;

const customFetch: FetchType = async (url, init) => {
  let interceptinit = init;
  const reqHeaders = new Headers(interceptinit?.headers);

  let token = reqHeaders.get("Authorization")?.split(" ")[1] ?? undefined;

  if (!reqHeaders.get("Authorization")) {
    const session = await getSession();
    token = session?.user?.access_token;
    reqHeaders.set("Authorization", `Bearer ${token}`);
  }

  if (!reqHeaders.get("Accept")) {
    reqHeaders.set("Accept", "application/json");
  }
  // instanceof FormData added to exclude send content type for post multipart form data
  if (
    !reqHeaders.get("Content-Type") &&
    !(interceptinit?.body instanceof FormData)
  ) {
    reqHeaders.set("Content-Type", "application/json");
  }

  interceptinit = {
    ...interceptinit,
    headers: reqHeaders,
  };

  const endpointUrl = `${BASE_API_URL}${url}`;

  try {
    const data = await fetch(endpointUrl, interceptinit);
    // signOut user when get unAuthenticate response
    if (!data.ok && data.status == 401 && token) {
      const authURL = `${BASE_API_URL}/auth/logout`;
      const res = await fetch(authURL, interceptinit);
      if (res.status == 401) {
        signOut();
      }
    }

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export { customFetch as fetch };
