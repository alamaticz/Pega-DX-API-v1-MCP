/**
 * Collaboration tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  1.  get_documents      — GET  /documents
 *  2.  get_document       — GET  /documents/{ID}
 *  3.  get_messages       — GET  /messages
 *  4.  create_message     — POST /messages
 *  5.  get_notifications  — GET  /notifications
 *  6.  create_notification — POST /notifications
 *  7.  get_spaces         — GET  /spaces
 *  8.  get_space          — GET  /spaces/{ID}
 *  9.  join_space         — PUT  /spaces/{ID}/join
 *  10. leave_space        — PUT  /spaces/{ID}/leave
 *  11. get_space_pins     — GET  /spaces/{ID}/pins
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost, pegaPut } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const collaborationToolDefinitions: Tool[] = [
  {
    name: "get_documents",
    description: "Get the list of documents available to the authenticated user in the Pega collaboration hub.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_document",
    description: "Get detailed information about a specific document by its ID.",
    inputSchema: {
      type: "object",
      properties: {
        documentID: {
          type: "string",
          description: "ID of the document to retrieve.",
        },
      },
      required: ["documentID"],
    },
  },
  {
    name: "get_messages",
    description: "Get the list of messages for the authenticated user from the Pega collaboration hub.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "create_message",
    description: "Create a new message in the Pega collaboration hub.",
    inputSchema: {
      type: "object",
      properties: {
        message: {
          type: "object",
          description: "Message object containing the message details (body, recipients, etc.).",
        },
      },
      required: ["message"],
    },
  },
  {
    name: "get_notifications",
    description: "Get the list of notifications for the authenticated user.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "create_notification",
    description: "Create a new notification in Pega.",
    inputSchema: {
      type: "object",
      properties: {
        notification: {
          type: "object",
          description: "Notification object containing the notification details (message, recipients, etc.).",
        },
      },
      required: ["notification"],
    },
  },
  {
    name: "get_spaces",
    description: "Get the list of collaboration spaces available to the authenticated user.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_space",
    description: "Get details of a specific collaboration space by its ID.",
    inputSchema: {
      type: "object",
      properties: {
        spaceID: {
          type: "string",
          description: "ID of the space to retrieve.",
        },
      },
      required: ["spaceID"],
    },
  },
  {
    name: "join_space",
    description: "Join a specific collaboration space as the authenticated user.",
    inputSchema: {
      type: "object",
      properties: {
        spaceID: {
          type: "string",
          description: "ID of the space to join.",
        },
      },
      required: ["spaceID"],
    },
  },
  {
    name: "leave_space",
    description: "Leave a specific collaboration space as the authenticated user.",
    inputSchema: {
      type: "object",
      properties: {
        spaceID: {
          type: "string",
          description: "ID of the space to leave.",
        },
      },
      required: ["spaceID"],
    },
  },
  {
    name: "get_space_pins",
    description: "Get the list of pinned items for a specific collaboration space.",
    inputSchema: {
      type: "object",
      properties: {
        spaceID: {
          type: "string",
          description: "ID of the space to get pins for.",
        },
      },
      required: ["spaceID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleCollaborationTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_documents": {
      const result = await pegaGet("/documents");
      return JSON.stringify(result, null, 2);
    }

    case "get_document": {
      const { documentID } = z.object({ documentID: z.string() }).parse(args);
      const result = await pegaGet(`/documents/${encodeURIComponent(documentID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "get_messages": {
      const result = await pegaGet("/messages");
      return JSON.stringify(result, null, 2);
    }

    case "create_message": {
      const { message } = z
        .object({ message: z.record(z.unknown()) })
        .parse(args);
      const result = await pegaPost("/messages", message);
      return JSON.stringify(result, null, 2);
    }

    case "get_notifications": {
      const result = await pegaGet("/notifications");
      return JSON.stringify(result, null, 2);
    }

    case "create_notification": {
      const { notification } = z
        .object({ notification: z.record(z.unknown()) })
        .parse(args);
      const result = await pegaPost("/notifications", notification);
      return JSON.stringify(result, null, 2);
    }

    case "get_spaces": {
      const result = await pegaGet("/spaces");
      return JSON.stringify(result, null, 2);
    }

    case "get_space": {
      const { spaceID } = z.object({ spaceID: z.string() }).parse(args);
      const result = await pegaGet(`/spaces/${encodeURIComponent(spaceID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "join_space": {
      const { spaceID } = z.object({ spaceID: z.string() }).parse(args);
      const result = await pegaPut(`/spaces/${encodeURIComponent(spaceID)}/join`, {});
      return JSON.stringify(result, null, 2);
    }

    case "leave_space": {
      const { spaceID } = z.object({ spaceID: z.string() }).parse(args);
      const result = await pegaPut(`/spaces/${encodeURIComponent(spaceID)}/leave`, {});
      return JSON.stringify(result, null, 2);
    }

    case "get_space_pins": {
      const { spaceID } = z.object({ spaceID: z.string() }).parse(args);
      const result = await pegaGet(`/spaces/${encodeURIComponent(spaceID)}/pins`);
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown collaboration tool: ${toolName}`);
  }
}
