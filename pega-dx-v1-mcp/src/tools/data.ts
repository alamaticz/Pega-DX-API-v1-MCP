/**
 * Data page tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. get_data_page          — GET  /data/{dataViewID}
 *  2. post_data_page         — POST /data/{dataViewID}
 *  3. get_data_view_metadata — GET  /data/{dataViewID}/metadata
 *
 * Note: V1 data endpoints are simpler than V2. They expose Pega Data Pages
 * directly. V2 adds queryable data views with filtering, sorting, pagination,
 * and aggregations. In V1, filtering/parameters are passed as query params
 * or in the POST body.
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const dataToolDefinitions: Tool[] = [
  {
    name: "get_data_page",
    description:
      "Retrieve data from a Pega Data Page (list or page mode). Pass optional parameters as query parameters to filter or parameterise the data page.",
    inputSchema: {
      type: "object",
      properties: {
        dataViewID: {
          type: "string",
          description:
            "ID of the data page, e.g. 'D_CustomerList' or 'D_pxWorkList'.",
        },
        parameters: {
          type: "object",
          description:
            "Optional key-value pairs passed as query parameters to the data page.",
          additionalProperties: { type: "string" },
        },
      },
      required: ["dataViewID"],
    },
  },
  {
    name: "post_data_page",
    description:
      "Post parameters to a Pega Data Page to retrieve filtered or parameterised data. Use this when parameter values are complex objects that cannot be passed as query strings.",
    inputSchema: {
      type: "object",
      properties: {
        dataViewID: {
          type: "string",
          description: "ID of the data page, e.g. 'D_CustomerList'.",
        },
        body: {
          type: "object",
          description:
            "Request body containing parameters for the data page. Structure depends on the specific data page configuration.",
        },
      },
      required: ["dataViewID", "body"],
    },
  },
  {
    name: "get_data_view_metadata",
    description:
      "Get the metadata for a Pega Data Page/View, including its parameters, fields, and configuration.",
    inputSchema: {
      type: "object",
      properties: {
        dataViewID: {
          type: "string",
          description: "ID of the data page, e.g. 'D_CustomerList'.",
        },
      },
      required: ["dataViewID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleDataTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_data_page": {
      const parsed = z
        .object({
          dataViewID: z.string(),
          parameters: z.record(z.string()).optional(),
        })
        .parse(args);

      const result = await pegaGet(
        `/data/${encodeURIComponent(parsed.dataViewID)}`,
        parsed.parameters
      );
      return JSON.stringify(result, null, 2);
    }

    case "post_data_page": {
      const parsed = z
        .object({
          dataViewID: z.string(),
          body: z.record(z.unknown()),
        })
        .parse(args);

      const result = await pegaPost(
        `/data/${encodeURIComponent(parsed.dataViewID)}`,
        parsed.body
      );
      return JSON.stringify(result, null, 2);
    }

    case "get_data_view_metadata": {
      const { dataViewID } = z.object({ dataViewID: z.string() }).parse(args);
      const result = await pegaGet(
        `/data/${encodeURIComponent(dataViewID)}/metadata`
      );
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown data tool: ${toolName}`);
  }
}
