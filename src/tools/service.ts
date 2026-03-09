/**
 * Service / connectivity tool for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. ping_pega_service — Tests authentication and server connectivity
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet } from "../client.js";
import { getConfig } from "../config.js";

// ── Tool definitions ────────────────────────────────────────────────────────

export const serviceToolDefinitions: Tool[] = [
  {
    name: "ping_pega_service",
    description:
      "Test connectivity and Basic Auth credentials against the Pega Infinity server. Makes a lightweight GET /casetypes call to verify the server is reachable and the username/password are valid.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleServiceTool(
  toolName: string,
  _args: Record<string, unknown>
): Promise<string> {
  if (toolName !== "ping_pega_service") {
    throw new Error(`Unknown service tool: ${toolName}`);
  }

  const config = getConfig();

  try {
    // GET /casetypes is available to all authenticated users
    await pegaGet("/casetypes");

    return JSON.stringify({
      status: "ok",
      baseUrl: config.baseUrl,
      authMethod: "Basic Auth",
      username: config.username,
      message: "Successfully connected to Pega DX API V1.",
    });
  } catch (err) {
    return JSON.stringify({
      status: "error",
      baseUrl: config.baseUrl,
      authMethod: "Basic Auth",
      message: String(err),
    });
  }
}
