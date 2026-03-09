/**
 * Case type tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. get_case_types         — GET /casetypes
 *  2. get_case_type          — GET /casetypes/{ID}
 *  3. refresh_case_type_view — PUT /casetypes/{ID}/refresh
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPut } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const caseTypeToolDefinitions: Tool[] = [
  {
    name: "get_case_types",
    description:
      "Get the list of all case types that the authenticated user has permission to create in the Pega application.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_case_type",
    description:
      "Get detailed metadata for a specific case type including its creation form fields, layout, and available actions.",
    inputSchema: {
      type: "object",
      properties: {
        caseTypeID: {
          type: "string",
          description:
            "The case type ID (class name), e.g. 'MYORG-MYAPP-WORK-ORDER'.",
        },
      },
      required: ["caseTypeID"],
    },
  },
  {
    name: "refresh_case_type_view",
    description:
      "Refresh the creation-screen view for a case type after field changes. Applies content and page instructions, executes Data Transforms, and returns updated view metadata. Used to implement dynamic new-case form refresh.",
    inputSchema: {
      type: "object",
      properties: {
        caseTypeID: {
          type: "string",
          description: "The case type ID (class name) to refresh.",
        },
        content: {
          type: "object",
          description:
            "Current field values to supply as the refresh context.",
        },
        pageInstructions: {
          type: "array",
          description: "Optional page instructions for embedded pages.",
          items: { type: "object" },
        },
      },
      required: ["caseTypeID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleCaseTypeTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_case_types": {
      const result = await pegaGet("/casetypes");
      return JSON.stringify(result, null, 2);
    }

    case "get_case_type": {
      const { caseTypeID } = z
        .object({ caseTypeID: z.string() })
        .parse(args);
      const result = await pegaGet(
        `/casetypes/${encodeURIComponent(caseTypeID)}`
      );
      return JSON.stringify(result, null, 2);
    }

    case "refresh_case_type_view": {
      const parsed = z
        .object({
          caseTypeID: z.string(),
          content: z.record(z.unknown()).optional(),
          pageInstructions: z.array(z.object({ instruction: z.string(), target: z.string() }).passthrough()).optional(),
        })
        .parse(args);

      const body: Record<string, unknown> = {};
      if (parsed.content) body.content = parsed.content;
      if (parsed.pageInstructions)
        body.pageInstructions = parsed.pageInstructions;

      const result = await pegaPut(
        `/casetypes/${encodeURIComponent(parsed.caseTypeID)}/refresh`,
        body
      );
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown case type tool: ${toolName}`);
  }
}
