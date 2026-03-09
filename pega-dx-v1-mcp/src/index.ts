#!/usr/bin/env node
/**
 * Pega DX API V1 MCP Server
 *
 * Exposes 20 tools covering the full Traditional DX API V1 surface:
 *   • Cases           (6 tools) — CRUD + view
 *   • Assignments     (5 tools) — list, get, action, refresh
 *   • Case Types      (3 tools) — list, get, refresh
 *   • Data Pages      (2 tools) — GET/POST
 *   • Attachments     (3 tools) — list, add, delete
 *   • Service         (1 tool)  — ping / connectivity check
 *
 * Authentication: Basic Auth | OAuth 2.0 | Direct Bearer Token
 * Base API path:  /prweb/api/v1/
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";

import { allTools, dispatchTool } from "./tools/index.js";

// ── Server setup ───────────────────────────────────────────────────────────

const server = new Server(
  {
    name: "pega-dx-v1-mcp",
    version: "1.0.0",
  },
  {
    capabilities: { tools: {} },
  }
);

// ── List tools ─────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: allTools };
});

// ── Call tool ──────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request): Promise<CallToolResult> => {
  const { name, arguments: rawArgs } = request.params;
  const args = (rawArgs ?? {}) as Record<string, unknown>;

  try {
    const text = await dispatchTool(name, args);
    return {
      content: [{ type: "text", text }],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// ── Start ──────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // MCP servers communicate via stdio — no console.log here
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${String(err)}\n`);
  process.exit(1);
});
