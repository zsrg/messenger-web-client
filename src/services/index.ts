export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ResponseFormat {
  TEXT = "text",
  JSON = "json",
  FORM_DATA = "formData",
  BLOB = "blob",
  ARRAY_BUFFER = "arrayBuffer",
}

export interface RequestParams {
  url: string;
  method?: RequestMethod;
  query?: { [key: string]: any };
  body?: { [key: string]: any };
  format?: ResponseFormat;
  keepalive?: boolean;
}

export interface EventSourceRequestParams {
  url: string;
}

export interface ResponseError {
  status: number;
  code?: string;
  text?: string;
}

export const sendRequest = async ({ url, method, body, query, format, keepalive }: RequestParams) => {
  const base = process.env.NODE_ENV === "development" ? process.env.PROXY : window.location.origin;
  const objectUrl = new URL(url, base);

  for (const key in query) {
    objectUrl.searchParams.append(key, query[key]);
  }

  const init: RequestInit = {
    method: method || RequestMethod.GET,
    keepalive,
    credentials: "include",
  };

  if (method === RequestMethod.POST || method === RequestMethod.PUT) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body || "");
  }

  const response = await fetch(objectUrl, init);

  if (response.ok) {
    return await response[format || ResponseFormat.JSON]();
  }

  const { status } = response;
  const { code, text } = await response.json();

  return Promise.reject({ status, code, text });
};

export const createEventSource = ({ url }: EventSourceRequestParams) => {
  const base = process.env.NODE_ENV === "development" ? process.env.PROXY : window.location.origin;
  const objectUrl = new URL(url, base);

  const init: EventSourceInit = {
    withCredentials: true,
  };

  return new EventSource(objectUrl, init);
};
