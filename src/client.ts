/**
 * HTTP client for Pega Traditional DX API V1.
 * Base path: /prweb/api/v1/
 */

import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { getConfig } from "./config.js";
import { getAuthHeader } from "./auth.js";

const API_PREFIX = "/api/v1";

function buildUrl(path: string): string {
  const { baseUrl } = getConfig();
  // baseUrl already has /prweb stripped to root — keep flexible
  return `${baseUrl}${API_PREFIX}${path}`;
}

function buildHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getAuthHeader(),
    ...extra,
  };
}

function formatError(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status ?? "unknown";
    const data = error.response?.data;
    const message =
      typeof data === "object" && data !== null
        ? JSON.stringify(data)
        : String(data ?? error.message);
    return `Pega API error ${status}: ${message}`;
  }
  return String(error);
}

export async function pegaGet<T = unknown>(
  path: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  try {
    const config: AxiosRequestConfig = { headers: buildHeaders(), params };
    const response = await axios.get<T>(buildUrl(path), config);
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
}

export async function pegaPost<T = unknown>(
  path: string,
  body: unknown
): Promise<T> {
  try {
    const response = await axios.post<T>(buildUrl(path), body, { headers: buildHeaders() });
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
}

export async function pegaPut<T = unknown>(
  path: string,
  body: unknown,
  eTag?: string
): Promise<T> {
  try {
    const response = await axios.put<T>(buildUrl(path), body, {
      headers: buildHeaders(eTag ? { "If-Match": eTag } : {}),
    });
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
}

export async function pegaPatch<T = unknown>(
  path: string,
  body: unknown,
  eTag?: string
): Promise<T> {
  try {
    const response = await axios.patch<T>(buildUrl(path), body, {
      headers: buildHeaders(eTag ? { "If-Match": eTag } : {}),
    });
    return response.data;
  } catch (err) {
    throw new Error(formatError(err));
  }
}

export async function pegaDelete(path: string, eTag?: string): Promise<void> {
  try {
    await axios.delete(buildUrl(path), {
      headers: buildHeaders(eTag ? { "If-Match": eTag } : {}),
    });
  } catch (err) {
    throw new Error(formatError(err));
  }
}
