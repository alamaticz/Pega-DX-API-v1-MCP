/**
 * Attachment tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1. get_case_attachments          — GET    /cases/{ID}/attachments
 *  2. add_case_attachment           — POST   /cases/{ID}/attachments
 *  3. delete_case_attachment        — DELETE /cases/{ID}/attachments/{attachmentID}
 *  4. upload_attachment             — POST   /attachments/upload
 *  5. get_case_attachment_categories — GET   /cases/{ID}/attachment_categories
 *  6. get_attachment                — GET    /attachments/{attachmentID}
 *  7. delete_attachment             — DELETE /attachments/{attachmentID}
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
  {
    name: "upload_attachment",
    description:
      "Upload a file to Pega as a temporary attachment that can later be linked to a case via add_case_attachment. Returns an upload ID to reference in subsequent calls.",
    inputSchema: {
      type: "object",
      properties: {
        fileContent: {
          type: "string",
          description: "Base64-encoded file content.",
        },
        fileName: {
          type: "string",
          description: "Original filename with extension, e.g. 'report.pdf'.",
        },
        mimeType: {
          type: "string",
          description: "MIME type of the file, e.g. 'application/pdf'.",
        },
      },
      required: ["fileContent", "fileName"],
    },
  },
  {
    name: "get_case_attachment_categories",
    description:
      "Get the list of attachment categories applicable to a specific Pega case. Returns category names and metadata used when adding attachments.",
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
    name: "get_attachment",
    description:
      "Get the content and metadata of a specific attachment by its attachment ID.",
    inputSchema: {
      type: "object",
      properties: {
        attachmentID: {
          type: "string",
          description:
            "Attachment ID, e.g. 'LINK-ATTACHMENT MYORG-MYAPP-WORK T-1001!20240101T120000.000 GMT'.",
        },
      },
      required: ["attachmentID"],
    },
  },
  {
    name: "delete_attachment",
    description:
      "Delete a specific attachment by its attachment ID. This uses the direct /attachments/{ID} endpoint. The user must have delete privileges for the attachment category.",
    inputSchema: {
      type: "object",
      properties: {
        attachmentID: {
          type: "string",
          description:
            "Attachment ID to delete, e.g. 'LINK-ATTACHMENT MYORG-MYAPP-WORK T-1001!20240101T120000.000 GMT'.",
        },
      },
      required: ["attachmentID"],
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

    case "upload_attachment": {
      const parsed = z
        .object({
          fileContent: z.string(),
          fileName: z.string(),
          mimeType: z.string().optional(),
        })
        .parse(args);

      const result = await pegaPost("/attachments/upload", {
        fileContent: parsed.fileContent,
        fileName: parsed.fileName,
        ...(parsed.mimeType ? { mimeType: parsed.mimeType } : {}),
      });
      return JSON.stringify(result, null, 2);
    }

    case "get_case_attachment_categories": {
      const { caseID } = z.object({ caseID: z.string() }).parse(args);
      const result = await pegaGet(
        `/cases/${encodeURIComponent(caseID)}/attachment_categories`
      );
      return JSON.stringify(result, null, 2);
    }

    case "get_attachment": {
      const { attachmentID } = z.object({ attachmentID: z.string() }).parse(args);
      const result = await pegaGet(
        `/attachments/${encodeURIComponent(attachmentID)}`
      );
      return JSON.stringify(result, null, 2);
    }

    case "delete_attachment": {
      const { attachmentID } = z.object({ attachmentID: z.string() }).parse(args);
      await pegaDelete(`/attachments/${encodeURIComponent(attachmentID)}`);
      return `Attachment ${attachmentID} deleted successfully.`;
    }

    default:
      throw new Error(`Unknown attachment tool: ${toolName}`);
  }
}
