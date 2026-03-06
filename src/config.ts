/**
 * Configuration for Pega DX API V1.
 * All values are read from environment variables.
 */

export interface PegaConfig {
  /** Base URL of the Pega server, e.g. https://myserver.pegacloud.net/prweb */
  baseUrl: string;
  /** Pega operator/user ID */
  username: string;
  /** Pega password */
  password: string;
}

let _config: PegaConfig | null = null;

export function getConfig(): PegaConfig {
  if (_config) return _config;

  const baseUrl = process.env.PEGA_BASE_URL;
  const username = process.env.PEGA_USERNAME;
  const password = process.env.PEGA_PASSWORD;

  if (!baseUrl) throw new Error("PEGA_BASE_URL environment variable is required.");
  if (!username) throw new Error("PEGA_USERNAME environment variable is required.");
  if (!password) throw new Error("PEGA_PASSWORD environment variable is required.");

  _config = {
    baseUrl: baseUrl.replace(/\/$/, ""), // strip trailing slash
    username,
    password,
  };

  return _config;
}
