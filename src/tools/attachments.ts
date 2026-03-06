/**
 * Attachment tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. get_case_attachments   — GET    /cases/{ID}/attachments
 *  2. add_case_attachment    — POST   /cases/{ID}/attachments
 *  3. delete_case_attachment — DELETE /cases/{ID}/attachments/{attachmentID}
 *
 * Note: V1 attachment handling differs from V2. In V1, file content is
 * base64-encoded and sent directly in the POST body. V2 uses a two-step
 * upload-then-link pattern via a temp attachment endpoint.
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost, pegaDelete } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const attachmentToolDefinitions: Tool[] = [
  {
    name: "get_case_attachments",
    description:
      "Get all attachments associated with a specific Pega case, including file metadata, URLs, and attachment categories.",
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
    name: "add_case_attachment",
    description:
      "Add a file attachment or URL link to a Pega case. For file attachments, provide the base64-encoded file content. For URL attachments, provide the URL.",
    inputSchema: {
      type: "object",
      properties: {
        caseID: {
          type: "string",
          description: "Full case handle, e.g. 'MYORG-MYAPP-WORK T-1001'.",
        },
        attachments: {
          type: "array",
          description: "One or more attachments to add.",
          items: {
            type: "object",
            properties: {
              type: {
                type: "string",
                enum: ["File", "URL"],
                description: "Attachment type.",
              },
              category: {
                type: "string",
                description:
                  "Attachment category as configured in Pega, e.g. 'File'.",
              },
              name: {
                type: "string",
                description: "Display name for the attachment.",
              },
              fileContent: {
                type: "string",
                description:
                  "Base64-encoded file content (required for File type).",
              },
              fileName: {
                type: "string",
                description: "Original filename with extension, e.g. 'report.pdf'.",
              },
              mimeType: {
                type: "string",
                description: "MIME type, e.g. 'application/pdf'.",
              },
              url: {
                type: "string",
                description: "URL to link (required for URL type).",
              },
            },
            required: ["type", "category"],
          },
        },
      },
      required: ["caseID", "attachments"],
    },
  },
  {
    name: "delete_case_attachment",
    description:
      "Delete a specific attachment from a Pega case. The user must have delete privileges for the attachment category.",
    inputSchema: {
      type: "object",
      properties: {
        caseID: {
          type: "string",
          description: "Full case handle, e.g. 'MYORG-MYAPP-WORK T-1001'.",
        },
        attachmentID: {
          type: "string",
          description:
            "Attachment ID returned from get_case_attachments, e.g. 'LINK-ATTACHMENT MYORG-MYAPP-WORK T-1001!20240101T120000.000 GMT'.",
        },
      },
      required: ["caseID", "attachmentID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

const AttachmentItemSchema = z.object({
  type: z.enum(["File", "URL"]),
  category: z.string(),
  name: z.string().optional(),
  fileContent: z.string().optional(),
  fileName: z.string().optional(),
  mimeType: z.string().optional(),
  url: z.string().optional(),
});

export async function handleAttachmentTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_case_attachments": {
      const { caseID } = z.object({ caseID: z.string() }).parse(args);
      const result = await pegaGet(
        `/cases/${encodeURIComponent(caseID)}/attachments`
      );
      return JSON.stringify(result, null, 2);
    }

    case "add_case_attachment": {
      const parsed = z
        .object({
          caseID: z.string(),
          attachments: z.array(AttachmentItemSchema),
        })
        .parse(args);

      const result = await pegaPost(
        `/cases/${encodeURIComponent(parsed.caseID)}/attachments`,
        { attachments: parsed.attachments }
      );
      return JSON.stringify(result, null, 2);
    }

    case "delete_case_attachment": {
      const parsed = z
        .object({ caseID: z.string(), attachmentID: z.string() })
        .parse(args);

      await pegaDelete(
        `/cases/${encodeURIComponent(parsed.caseID)}/attachments/${encodeURIComponent(parsed.attachmentID)}`
      );
      return `Attachment ${parsed.attachmentID} deleted from case ${parsed.caseID}.`;
    }

    default:
      throw new Error(`Unknown attachment tool: ${toolName}`);
  }
}
