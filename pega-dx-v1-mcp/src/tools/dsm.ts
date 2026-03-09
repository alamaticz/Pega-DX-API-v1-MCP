/**
 * Decision Strategy Management (DSM) tools for Pega Traditional DX API V1.
 *
 * Service-oriented:
 *  1. get_dsm_services  — GET /nodes/all/DSMServices
 *  2. get_dsm_service   — GET /nodes/all/DSMServices/{serviceId}
 * Node-oriented:
 *  3. get_dsm_nodes     — GET /DSMServices/all/nodes
 *  4. get_node_details  — GET /nodes/{nodeId}
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const dsmToolDefinitions: Tool[] = [
  {
    name: "get_dsm_services",
    description:
      "Get the list of all Decision Strategy Management (DSM) services organized by service across all nodes.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_dsm_service",
    description:
      "Get details of a specific DSM service across all nodes, including its configuration and status on each node.",
    inputSchema: {
      type: "object",
      properties: {
        serviceId: {
          type: "string",
          description: "ID of the DSM service to retrieve details for.",
        },
      },
      required: ["serviceId"],
    },
  },
  {
    name: "get_dsm_nodes",
    description:
      "Get the list of nodes that are running any DSM service.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_node_details",
    description:
      "Get details of a specific node including DSM service information running on it.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: {
          type: "string",
          description: "ID of the node to retrieve details for.",
        },
      },
      required: ["nodeId"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleDsmTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_dsm_services": {
      const result = await pegaGet("/nodes/all/DSMServices");
      return JSON.stringify(result, null, 2);
    }

    case "get_dsm_service": {
      const { serviceId } = z.object({ serviceId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/all/DSMServices/${encodeURIComponent(serviceId)}`);
      return JSON.stringify(result, null, 2);
    }

    case "get_dsm_nodes": {
      const result = await pegaGet("/DSMServices/all/nodes");
      return JSON.stringify(result, null, 2);
    }

    case "get_node_details": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}`);
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown DSM tool: ${toolName}`);
  }
}
