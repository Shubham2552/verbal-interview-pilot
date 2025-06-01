import axios, { AxiosRequestConfig, Method } from "axios";

const ENV_BASE_URLS: Record<string, string> = {
  development: "http://localhost:3000/api",
  production: "https://api.verbalpilot.com/api",
};

const baseUrl = ENV_BASE_URLS[import.meta.env.MODE || "development"];

type ApiCallOptions = {
  method: Method;
  path?: string;
  url?: string;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  token?: boolean;
};

export async function apiCall(options: ApiCallOptions): Promise<any> {
  const {
    method,
    path,
    url,
    query,
    body,
    headers = {},
    token = false,
  } = options;

  const endpoint = url ? url : `${baseUrl}${path || ""}`;
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    params: query,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data: body,
  };

  if (token) {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      config.headers["Authorization"] = `Bearer ${storedToken}`;
    }
  }
  console.log("API Call Config:", config);
  try {
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    // If unauthorized or token expired, redirect to login
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/login";
      return; // Prevent further execution
    }
    throw error;
  }
}