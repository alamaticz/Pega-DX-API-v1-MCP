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

// ── All tool definitions (used by MCP list-tools handler) ──────────────────

export const allTools: Tool[] = [
  ...serviceToolDefinitions,      // 1  tool
  ...caseToolDefinitions,         // 6  tools
  ...assignmentToolDefinitions,   // 5  tools
  ...caseTypeToolDefinitions,     // 3  tools
  ...dataToolDefinitions,         // 2  tools
  ...attachmentToolDefinitions,   // 3  tools
];

// ── Router: dispatch call-tool requests to the right module ───────────────

const caseToolNames = new Set(caseToolDefinitions.map((t) => t.name));
const assignmentToolNames = new Set(assignmentToolDefinitions.map((t) => t.name));
const caseTypeToolNames = new Set(caseTypeToolDefinitions.map((t) => t.name));
const dataToolNames = new Set(dataToolDefinitions.map((t) => t.name));
const attachmentToolNames = new Set(attachmentToolDefinitions.map((t) => t.name));
const serviceToolNames = new Set(serviceToolDefinitions.map((t) => t.name));

export async function dispatchTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  if (serviceToolNames.has(toolName))    return handleServiceTool(toolName, args);
  if (caseToolNames.has(toolName))       return handleCaseTool(toolName, args);
  if (assignmentToolNames.has(toolName)) return handleAssignmentTool(toolName, args);
  if (caseTypeToolNames.has(toolName))   return handleCaseTypeTool(toolName, args);
  if (dataToolNames.has(toolName))       return handleDataTool(toolName, args);
  if (attachmentToolNames.has(toolName)) return handleAttachmentTool(toolName, args);

  throw new Error(`Tool not found: "${toolName}"`);
}
