/**
 * Case tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. get_cases          — GET  /cases
 *  2. create_case        — POST /cases
 *  3. get_case           — GET  /cases/{ID}
 *  4. update_case        — PUT  /cases/{ID}
 *  5. delete_case        — DELETE /cases/{ID}
 *  6. get_case_view      — GET  /cases/{ID}/views/{viewID}
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost, pegaPut, pegaDelete } from "../client.js";
import { z } from "zod";

// ── Schema helpers ─────────────────────────────────────────────────────────

const PageInstructionSchema = z.object({
  instruction: z.enum(["UPDATE", "REPLACE", "DELETE", "APPEND", "INSERT", "MOVE"]),
  target: z.string(),
  content: z.record(z.unknown()).optional(),
});

// ── Tool definitions ────────────────────────────────────────────────────────

export const caseToolDefinitions: Tool[] = [
  {
    name: "get_cases",
    description:
      "Get all cases created by the authenticated user. Returns up to 500 cases ordered oldest to newest. This endpoint is exclusive to DX API V1 — V2 uses Data Views instead. Requires the pxGetCases privilege.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "create_case",
    description:
      "Create a new Pega case of the specified case type. Returns the new case ID, status, and initial stage/assignment information.",
    inputSchema: {
      type: "object",
      properties: {
        caseTypeID: {
          type: "string",
          description:
            "The class/ID of the case type to create, e.g. 'MYORG-MYAPP-WORK-ORDER'.",
        },
        content: {
          type: "object",
          description:
            "Key-value pairs of case fields to set at creation time.",
        },
        parentCaseID: {
          type: "string",
          description: "Optional parent case ID if creating a child case.",
        },
        pageInstructions: {
          type: "array",
          description: "Optional page instructions for embedded page lists.",
          items: { type: "object" },
        },
      },
      required: ["caseTypeID"],
    },
  },
  {
    name: "get_case",
    description:
      "Get detailed information about a specific Pega case including its content, stage, status, and available actions.",
    inputSchema: {
      type: "object",
      properties: {
        caseID: {
          type: "string",
          description:
            "Full case handle, e.g. 'MYORG-MYAPP-WORK T-1001'. Include spaces and special characters.",
        },
      },
      required: ["caseID"],
    },
  },
  {
    name: "update_case",
    description:
      "Update a Pega case by performing a case-wide action (defaults to pyUpdateCaseDetails). Use this to modify case field values.",
    inputSchema: {
      type: "object",
      properties: {
        caseID: {
          type: "string",
          description: "Full case handle, e.g. 'MYORG-MYAPP-WORK T-1001'.",
        },
        content: {
          type: "object",
          description: "Case field values to update.",
        },
        actionID: {
          type: "string",
          description:
            "Flow action ID to execute. Defaults to 'pyUpdateCaseDetails'.",
        },
        eTag: {
          type: "string",
          description:
            "Optional eTag (If-Match) value from a previous get_case call for optimistic locking.",
        },
        pageInstructions: {
          type: "array",
          description: "Optional page instructions for embedded pages.",
          items: { type: "object" },
        },
      },
      required: ["caseID", "content"],
    },
  },
  {
    name: "delete_case",
    description:
      "Delete a Pega case. Only cases in the Create stage can be deleted.",
    inputSchema: {
      type: "object",
      properties: {
        caseID: {
          type: "string",
          description: "Full case handle, e.g. 'MYORG-MYAPP-WORK T-1001'.",
        },
      },
      required: ["caseID"],
    },
  },
  {
    name: "get_case_view",
    description:
      "Get the metadata and field values for a specific named view within a case. Useful for reading specific harness/section data.",
    inputSchema: {
      type: "object",
      properties: {
        caseID: {
          type: "string",
          description: "Full case handle, e.g. 'MYORG-MYAPP-WORK T-1001'.",
        },
        viewID: {
          type: "string",
          description:
            "Name of the view/harness to retrieve, e.g. 'pyDetails', 'pySummary'.",
        },
      },
      required: ["caseID", "viewID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleCaseTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_cases": {
      const result = await pegaGet("/cases");
      return JSON.stringify(result, null, 2);
    }

    case "create_case": {
      const parsed = z
        .object({
          caseTypeID: z.string(),
          content: z.record(z.unknown()).optional(),
          parentCaseID: z.string().optional(),
          pageInstructions: z.array(PageInstructionSchema).optional(),
        })
        .parse(args);

      const body: Record<string, unknown> = {
        caseTypeID: parsed.caseTypeID,
      };
      if (parsed.content) body.content = parsed.content;
      if (parsed.parentCaseID) body.parentCaseID = parsed.parentCaseID;
      if (parsed.pageInstructions)
        body.pageInstructions = parsed.pageInstructions;

      const result = await pegaPost("/cases", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_case": {
      const { caseID } = z.object({ caseID: z.string() }).parse(args);
      const result = await pegaGet(`/cases/${encodeURIComponent(caseID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "update_case": {
      const parsed = z
        .object({
          caseID: z.string(),
          content: z.record(z.unknown()),
          actionID: z.string().optional(),
          eTag: z.string().optional(),
          pageInstructions: z.array(PageInstructionSchema).optional(),
        })
        .parse(args);

      const body: Record<string, unknown> = { content: parsed.content };
      if (parsed.pageInstructions)
        body.pageInstructions = parsed.pageInstructions;

      const actionID = parsed.actionID ?? "pyUpdateCaseDetails";
      const path = `/cases/${encodeURIComponent(parsed.caseID)}?actionID=${actionID}`;
      const result = await pegaPut(path, body, parsed.eTag);
      return JSON.stringify(result, null, 2);
    }

    case "delete_case": {
      const { caseID } = z.object({ caseID: z.string() }).parse(args);
      await pegaDelete(`/cases/${encodeURIComponent(caseID)}`);
      return `Case ${caseID} deleted successfully.`;
    }

    case "get_case_view": {
      const parsed = z
        .object({ caseID: z.string(), viewID: z.string() })
        .parse(args);
      const result = await pegaGet(
        `/cases/${encodeURIComponent(parsed.caseID)}/views/${encodeURIComponent(parsed.viewID)}`
      );
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown case tool: ${toolName}`);
  }
}
