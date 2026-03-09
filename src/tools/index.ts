/**
 * Central registry — exports all tool definitions and the unified dispatcher.
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";

import {
  caseToolDefinitions,
  handleCaseTool,
} from "./cases.js";
import {
  assignmentToolDefinitions,
  handleAssignmentTool,
} from "./assignments.js";
import {
  caseTypeToolDefinitions,
  handleCaseTypeTool,
} from "./casetypes.js";
import {
  dataToolDefinitions,
  handleDataTool,
} from "./data.js";
import {
  attachmentToolDefinitions,
  handleAttachmentTool,
} from "./attachments.js";
import {
  serviceToolDefinitions,
  handleServiceTool,
} from "./service.js";
import {
  collaborationToolDefinitions,
  handleCollaborationTool,
} from "./collaboration.js";
import {
  devopsToolDefinitions,
  handleDevopsTool,
} from "./devops.js";
import {
  sysadminToolDefinitions,
  handleSysadminTool,
} from "./sysadmin.js";
import {
  userToolDefinitions,
  handleUserTool,
} from "./users.js";
import {
  dsmToolDefinitions,
  handleDsmTool,
} from "./dsm.js";
import {
  privacyToolDefinitions,
  handlePrivacyTool,
} from "./privacy.js";

// ── All tool definitions (used by MCP list-tools handler) ──────────────────

export const allTools: Tool[] = [
  ...serviceToolDefinitions,          //  1 tool
  ...caseToolDefinitions,             //  9 tools
  ...assignmentToolDefinitions,       //  5 tools
  ...caseTypeToolDefinitions,         //  3 tools
  ...dataToolDefinitions,             //  3 tools
  ...attachmentToolDefinitions,       //  7 tools
  ...collaborationToolDefinitions,    // 11 tools
  ...devopsToolDefinitions,           // 20 tools
  ...sysadminToolDefinitions,         // 58 tools
  ...userToolDefinitions,             //  5 tools
  ...dsmToolDefinitions,              //  4 tools
  ...privacyToolDefinitions,          //  9 tools
];

// ── Router: dispatch call-tool requests to the right module ───────────────

const caseToolNames = new Set(caseToolDefinitions.map((t) => t.name));
const assignmentToolNames = new Set(assignmentToolDefinitions.map((t) => t.name));
const caseTypeToolNames = new Set(caseTypeToolDefinitions.map((t) => t.name));
const dataToolNames = new Set(dataToolDefinitions.map((t) => t.name));
const attachmentToolNames = new Set(attachmentToolDefinitions.map((t) => t.name));
const serviceToolNames = new Set(serviceToolDefinitions.map((t) => t.name));
const collaborationToolNames = new Set(collaborationToolDefinitions.map((t) => t.name));
const devopsToolNames = new Set(devopsToolDefinitions.map((t) => t.name));
const sysadminToolNames = new Set(sysadminToolDefinitions.map((t) => t.name));
const userToolNames = new Set(userToolDefinitions.map((t) => t.name));
const dsmToolNames = new Set(dsmToolDefinitions.map((t) => t.name));
const privacyToolNames = new Set(privacyToolDefinitions.map((t) => t.name));

export async function dispatchTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  if (serviceToolNames.has(toolName))       return handleServiceTool(toolName, args);
  if (caseToolNames.has(toolName))          return handleCaseTool(toolName, args);
  if (assignmentToolNames.has(toolName))    return handleAssignmentTool(toolName, args);
  if (caseTypeToolNames.has(toolName))      return handleCaseTypeTool(toolName, args);
  if (dataToolNames.has(toolName))          return handleDataTool(toolName, args);
  if (attachmentToolNames.has(toolName))    return handleAttachmentTool(toolName, args);
  if (collaborationToolNames.has(toolName)) return handleCollaborationTool(toolName, args);
  if (devopsToolNames.has(toolName))        return handleDevopsTool(toolName, args);
  if (sysadminToolNames.has(toolName))      return handleSysadminTool(toolName, args);
  if (userToolNames.has(toolName))          return handleUserTool(toolName, args);
  if (dsmToolNames.has(toolName))           return handleDsmTool(toolName, args);
  if (privacyToolNames.has(toolName))       return handlePrivacyTool(toolName, args);

  throw new Error(`Tool not found: "${toolName}"`);
}
