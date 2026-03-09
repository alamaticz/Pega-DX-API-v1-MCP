/**
 * Data Privacy tools for Pega Traditional DX API V1.
 *
 * Client requests:
 *  1. create_client_access_request    — POST /client_access_requests
 *  2. get_client_access_request       — GET  /client_access_requests/{requestID}
 *  3. create_client_rectify_request   — POST /client_rectify_requests
 *  4. get_client_rectify_request      — GET  /client_rectify_requests/{requestID}
 *  5. create_client_erase_request     — POST /client_erase_requests
 *  6. get_client_erase_request        — GET  /client_erase_requests/{requestID}
 * Metadata:
 *  7. get_data_privacy_metadata       — GET  /data_privacy_metadata
 * Usage restrictions:
 *  8. get_client_usage_restrictions   — GET  /client_usage_restrictions
 *  9. update_client_usage_restrictions — PUT /client_usage_restrictions
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost, pegaPut } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const privacyToolDefinitions: Tool[] = [
  {
    name: "create_client_access_request",
    description:
      "Create a new data subject access request (DSAR) for a client. Used for GDPR right-of-access compliance.",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body containing client identification fields (e.g. email, customerID) as returned by get_data_privacy_metadata.",
        },
      },
      required: ["body"],
    },
  },
  {
    name: "get_client_access_request",
    description: "Get the status and details of a specific client data access request.",
    inputSchema: {
      type: "object",
      properties: {
        requestID: {
          type: "string",
          description: "ID of the client access request to retrieve.",
        },
      },
      required: ["requestID"],
    },
  },
  {
    name: "create_client_rectify_request",
    description:
      "Create a new data rectification request for a client. Used for GDPR right-to-rectification compliance.",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body containing client identification and the data to rectify.",
        },
      },
      required: ["body"],
    },
  },
  {
    name: "get_client_rectify_request",
    description: "Get the status and details of a specific client data rectification request.",
    inputSchema: {
      type: "object",
      properties: {
        requestID: {
          type: "string",
          description: "ID of the client rectify request to retrieve.",
        },
      },
      required: ["requestID"],
    },
  },
  {
    name: "create_client_erase_request",
    description:
      "Create a new data erasure request for a client. Used for GDPR right-to-erasure (right to be forgotten) compliance.",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body containing client identification fields.",
        },
      },
      required: ["body"],
    },
  },
  {
    name: "get_client_erase_request",
    description: "Get the status and details of a specific client data erasure request.",
    inputSchema: {
      type: "object",
      properties: {
        requestID: {
          type: "string",
          description: "ID of the client erase request to retrieve.",
        },
      },
      required: ["requestID"],
    },
  },
  {
    name: "get_data_privacy_metadata",
    description:
      "Get the field names used for identifying clients in data privacy requests. Use this to understand what identifiers are required when creating access, rectify, or erase requests.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_client_usage_restrictions",
    description: "Get the current data usage restrictions configured for clients in the Pega application.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "update_client_usage_restrictions",
    description: "Update the data usage restrictions for clients in the Pega application.",
    inputSchema: {
      type: "object",
      properties: {
        restrictions: {
          type: "object",
          description: "The updated usage restrictions configuration.",
        },
      },
      required: ["restrictions"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handlePrivacyTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "create_client_access_request": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/client_access_requests", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_client_access_request": {
      const { requestID } = z.object({ requestID: z.string() }).parse(args);
      const result = await pegaGet(`/client_access_requests/${encodeURIComponent(requestID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "create_client_rectify_request": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/client_rectify_requests", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_client_rectify_request": {
      const { requestID } = z.object({ requestID: z.string() }).parse(args);
      const result = await pegaGet(`/client_rectify_requests/${encodeURIComponent(requestID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "create_client_erase_request": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/client_erase_requests", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_client_erase_request": {
      const { requestID } = z.object({ requestID: z.string() }).parse(args);
      const result = await pegaGet(`/client_erase_requests/${encodeURIComponent(requestID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "get_data_privacy_metadata": {
      const result = await pegaGet("/data_privacy_metadata");
      return JSON.stringify(result, null, 2);
    }

    case "get_client_usage_restrictions": {
      const result = await pegaGet("/client_usage_restrictions");
      return JSON.stringify(result, null, 2);
    }

    case "update_client_usage_restrictions": {
      const { restrictions } = z.object({ restrictions: z.record(z.unknown()) }).parse(args);
      const result = await pegaPut("/client_usage_restrictions", restrictions);
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown privacy tool: ${toolName}`);
  }
}
