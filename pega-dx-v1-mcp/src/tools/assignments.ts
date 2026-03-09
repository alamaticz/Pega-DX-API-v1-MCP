/**
 * Assignment tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. get_assignments           — GET   /assignments
 *  2. get_assignment            — GET   /assignments/{ID}
 *  3. get_assignment_action     — GET   /assignments/{ID}/actions/{actionID}
 *  4. perform_assignment_action — PATCH /assignments/{ID}/actions/{actionID}
 *  5. refresh_assignment_action — PUT   /assignments/{ID}/actions/{actionID}/refresh
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPatch, pegaPut } from "../client.js";
import { z } from "zod";

const PageInstructionSchema = z.object({
  instruction: z.enum(["UPDATE", "REPLACE", "DELETE", "APPEND", "INSERT", "MOVE"]),
  target: z.string(),
  content: z.record(z.unknown()).optional(),
});

// ── Tool definitions ────────────────────────────────────────────────────────

export const assignmentToolDefinitions: Tool[] = [
  {
    name: "get_assignments",
    description:
      "Get a list of all assignments (work items / tasks) in the current user's worklist. Returns assignment IDs, names, case references, and urgency.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_assignment",
    description:
      "Get detailed information about a specific assignment including its instructions, available flow actions, and UI metadata.",
    inputSchema: {
      type: "object",
      properties: {
        assignmentID: {
          type: "string",
          description:
            "Full assignment handle, e.g. 'ASSIGN-WORKLIST MYORG-MYAPP-WORK T-1001!REVIEW_FLOW'.",
        },
      },
      required: ["assignmentID"],
    },
  },
  {
    name: "get_assignment_action",
    description:
      "Get the form metadata and field details for a specific flow action on an assignment. Returns View structure, fields, and layout information.",
    inputSchema: {
      type: "object",
      properties: {
        assignmentID: {
          type: "string",
          description:
            "Full assignment handle, e.g. 'ASSIGN-WORKLIST MYORG-MYAPP-WORK T-1001!REVIEW_FLOW'.",
        },
        actionID: {
          type: "string",
          description:
            "Flow action ID, e.g. 'pyApproval', 'pyReject', 'Submit'. IDs typically have no spaces.",
        },
      },
      required: ["assignmentID", "actionID"],
    },
  },
  {
    name: "perform_assignment_action",
    description:
      "Submit a flow action on an assignment, updating case data and advancing the workflow. This is the primary way to complete a work step in Pega.",
    inputSchema: {
      type: "object",
      properties: {
        assignmentID: {
          type: "string",
          description:
            "Full assignment handle, e.g. 'ASSIGN-WORKLIST MYORG-MYAPP-WORK T-1001!REVIEW_FLOW'.",
        },
        actionID: {
          type: "string",
          description: "Flow action ID to perform, e.g. 'pyApproval'.",
        },
        content: {
          type: "object",
          description:
            "Field values to set when submitting the action. Must match fields in the action's view.",
        },
        eTag: {
          type: "string",
          description: "Optional eTag for optimistic locking (If-Match header).",
        },
        pageInstructions: {
          type: "array",
          description: "Optional page instructions for embedded page operations.",
          items: { type: "object" },
        },
      },
      required: ["assignmentID", "actionID"],
    },
  },
  {
    name: "refresh_assignment_action",
    description:
      "Refresh the form view of an assignment action after a field value change. Executes configured Data Transforms and returns updated field values. Used to implement dynamic form refresh behaviour.",
    inputSchema: {
      type: "object",
      properties: {
        assignmentID: {
          type: "string",
          description: "Full assignment handle.",
        },
        actionID: {
          type: "string",
          description: "Flow action ID to refresh.",
        },
        content: {
          type: "object",
          description: "Current field values to include in the refresh context.",
        },
        pageInstructions: {
          type: "array",
          description: "Optional page instructions.",
          items: { type: "object" },
        },
      },
      required: ["assignmentID", "actionID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleAssignmentTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_assignments": {
      const result = await pegaGet("/assignments");
      return JSON.stringify(result, null, 2);
    }

    case "get_assignment": {
      const { assignmentID } = z
        .object({ assignmentID: z.string() })
        .parse(args);
      const result = await pegaGet(
        `/assignments/${encodeURIComponent(assignmentID)}`
      );
      return JSON.stringify(result, null, 2);
    }

    case "get_assignment_action": {
      const parsed = z
        .object({ assignmentID: z.string(), actionID: z.string() })
        .parse(args);
      const result = await pegaGet(
        `/assignments/${encodeURIComponent(parsed.assignmentID)}/actions/${encodeURIComponent(parsed.actionID)}`
      );
      return JSON.stringify(result, null, 2);
    }

    case "perform_assignment_action": {
      const parsed = z
        .object({
          assignmentID: z.string(),
          actionID: z.string(),
          content: z.record(z.unknown()).optional(),
          eTag: z.string().optional(),
          pageInstructions: z.array(PageInstructionSchema).optional(),
        })
        .parse(args);

      const body: Record<string, unknown> = {};
      if (parsed.content) body.content = parsed.content;
      if (parsed.pageInstructions)
        body.pageInstructions = parsed.pageInstructions;

      const result = await pegaPatch(
        `/assignments/${encodeURIComponent(parsed.assignmentID)}/actions/${encodeURIComponent(parsed.actionID)}`,
        body,
        parsed.eTag
      );
      return JSON.stringify(result, null, 2);
    }

    case "refresh_assignment_action": {
      const parsed = z
        .object({
          assignmentID: z.string(),
          actionID: z.string(),
          content: z.record(z.unknown()).optional(),
          pageInstructions: z.array(PageInstructionSchema).optional(),
        })
        .parse(args);

      const body: Record<string, unknown> = {};
      if (parsed.content) body.content = parsed.content;
      if (parsed.pageInstructions)
        body.pageInstructions = parsed.pageInstructions;

      const result = await pegaPut(
        `/assignments/${encodeURIComponent(parsed.assignmentID)}/actions/${encodeURIComponent(parsed.actionID)}/refresh`,
        body
      );
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown assignment tool: ${toolName}`);
  }
}
