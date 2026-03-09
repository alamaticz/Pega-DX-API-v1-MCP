/**
 * User Management tools for Pega Traditional DX API V1.
 *
 * OTP:
 *  1. generate_otp  — POST /authenticate/OTP/{sendMode}
 *  2. verify_otp    — GET  /authenticate/OTP/verify
 * Users:
 *  3. disable_users — POST /users/disable
 *  4. enable_users  — POST /users/enable
 *  5. logout_users  — POST /users/logout
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const userToolDefinitions: Tool[] = [
  {
    name: "generate_otp",
    description:
      "Generate a One-Time Password (OTP) and send it to the user via the specified send mode (e.g. email, SMS).",
    inputSchema: {
      type: "object",
      properties: {
        sendMode: {
          type: "string",
          description: "The channel to send the OTP through, e.g. 'email' or 'sms'.",
        },
        body: {
          type: "object",
          description: "Optional request body with additional parameters (e.g. userID, destination).",
        },
      },
      required: ["sendMode"],
    },
  },
  {
    name: "verify_otp",
    description: "Verify a One-Time Password (OTP) entered by the user.",
    inputSchema: {
      type: "object",
      properties: {
        otp: {
          type: "string",
          description: "The OTP value to verify.",
        },
        userID: {
          type: "string",
          description: "Optional user ID associated with the OTP request.",
        },
      },
      required: ["otp"],
    },
  },
  {
    name: "disable_users",
    description:
      "Terminate and disable all existing sessions across all nodes for a given set of users. Disabled users cannot log in until re-enabled.",
    inputSchema: {
      type: "object",
      properties: {
        users: {
          type: "array",
          items: { type: "string" },
          description: "List of user IDs (operator IDs) to disable.",
        },
      },
      required: ["users"],
    },
  },
  {
    name: "enable_users",
    description: "Re-enable a set of previously disabled Pega users, allowing them to log in again.",
    inputSchema: {
      type: "object",
      properties: {
        users: {
          type: "array",
          items: { type: "string" },
          description: "List of user IDs (operator IDs) to enable.",
        },
      },
      required: ["users"],
    },
  },
  {
    name: "logout_users",
    description:
      "Terminate all existing sessions across all nodes in the cluster for a given set of users. Users remain enabled and can log back in.",
    inputSchema: {
      type: "object",
      properties: {
        users: {
          type: "array",
          items: { type: "string" },
          description: "List of user IDs (operator IDs) to log out.",
        },
      },
      required: ["users"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleUserTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "generate_otp": {
      const { sendMode, body } = z
        .object({ sendMode: z.string(), body: z.record(z.unknown()).optional() })
        .parse(args);
      const result = await pegaPost(
        `/authenticate/OTP/${encodeURIComponent(sendMode)}`,
        body ?? {}
      );
      return JSON.stringify(result, null, 2);
    }

    case "verify_otp": {
      const { otp, userID } = z
        .object({ otp: z.string(), userID: z.string().optional() })
        .parse(args);
      const params: Record<string, string> = { otp };
      if (userID) params.userID = userID;
      const result = await pegaGet("/authenticate/OTP/verify", params);
      return JSON.stringify(result, null, 2);
    }

    case "disable_users": {
      const { users } = z.object({ users: z.array(z.string()) }).parse(args);
      const result = await pegaPost("/users/disable", { users });
      return JSON.stringify(result, null, 2);
    }

    case "enable_users": {
      const { users } = z.object({ users: z.array(z.string()) }).parse(args);
      const result = await pegaPost("/users/enable", { users });
      return JSON.stringify(result, null, 2);
    }

    case "logout_users": {
      const { users } = z.object({ users: z.array(z.string()) }).parse(args);
      const result = await pegaPost("/users/logout", { users });
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown user tool: ${toolName}`);
  }
}
