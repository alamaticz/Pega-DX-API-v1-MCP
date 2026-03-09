/**
 * Authentication module for Pega DX API V1.
 * Uses HTTP Basic Auth: Authorization: Basic base64(username:password)
 */

import { getConfig } from "./config.js";

/**
 * Returns the Basic Auth Authorization header value.
 */
export function getAuthHeader(): string {
  const { username, password } = getConfig();
  const encoded = Buffer.from(`${username}:${password}`).toString("base64");
  return `Basic ${encoded}`;
}
