/**
 * System Administration tools for Pega Traditional DX API V1.
 *
 * Covers: Reports, Loggers, Nodes, Caches, Agents, Job Schedulers,
 *         Pools, Queue Processors, Requestors, PAL
 *
 * Reports:
 *  1.  get_classes                       — GET  /classes
 *  2.  get_databases                     — GET  /databases
 *  3.  get_tables                        — GET  /tables
 *  4.  get_node_module_version_report    — GET  /nodes/{nodeID}/reports/module_version
 *  5.  get_node_conclusion_report        — GET  /nodes/{nodeId}/reports/conclusion_report/types/{typeName}
 *  6.  get_node_log_usage_report         — GET  /nodes/{nodeId}/reports/log_usage
 *  7.  get_node_mru_report               — GET  /nodes/{nodeId}/reports/mru_report
 *  8.  get_node_property_reference_report — GET /nodes/{nodeId}/reports/property_reference
 * Loggers:
 *  9.  add_log_filter                    — POST   /log_appender/{appenderName}/filter
 *  10. remove_log_filter                 — DELETE /log_appender/{appenderName}/filter
 *  11. get_log_categories                — GET    /nodes/{nodeId}/log_categories
 *  12. reset_log_categories              — DELETE /nodes/{nodeId}/log_categories
 *  13. get_log_category                  — GET    /nodes/{nodeId}/log_categories/{category_name}
 *  14. set_log_level                     — PUT    /nodes/{nodeId}/log_categories/{category_name}
 * Nodes:
 *  15. get_nodes                         — GET  /nodes
 *  16. get_node_dataconfigs              — GET  /nodes/{nodeID}/dataconfigs
 *  17. get_node_datasources              — GET  /nodes/{nodeID}/datasources
 *  18. get_node_thread_dump              — GET  /nodes/{nodeID}/diagnostics/thread_dump
 *  19. get_node_purge_results            — GET  /nodes/{nodeID}/purgeresults
 *  20. get_node_search_status            — GET  /nodes/{nodeId}/search
 *  21. quiesce_node                      — POST /nodes/{nodeID}/quiesce
 *  22. get_node_prconfig                 — GET  /nodes/{nodeID}/settings/prconfig
 *  23. get_node_system_settings          — GET  /nodes/{nodeID}/settings/system
 *  24. unquiesce_node                    — POST /nodes/{nodeID}/unquiesce
 * Caches:
 *  25. get_rule_cache_summary            — GET  /nodes/{nodeID}/caches/rule
 *  26. clear_rule_cache                  — POST /nodes/{nodeID}/caches/rule/clear
 *  27. delete_rule_cache_instance        — DELETE /nodes/{nodeID}/caches/rule/instances/{ruleInsKey}
 *  28. get_rule_cache_type_details       — GET  /nodes/{nodeID}/caches/rule/rule_types/{ruleType}
 *  29. get_rule_cache_instances          — GET  /nodes/{nodeID}/caches/rule/rule_types/{ruleType}/instances
 *  30. get_declarative_page_cache        — GET  /nodes/{nodeID}/caches/declarative_page
 *  31. clear_declarative_page_cache      — POST /nodes/{nodeID}/caches/declarative_page/clear
 *  32. get_declarative_rule_cache        — GET  /nodes/{nodeID}/caches/declarative_rule
 *  33. clear_declarative_rule_cache      — POST /nodes/{nodeID}/caches/declarative_rule/clear
 *  34. clear_aba_cache                   — POST /nodes/{nodeID}/caches/aba/clear
 *  35. get_conclusion_cache              — GET  /nodes/{nodeID}/caches/conclusion
 *  36. clear_conclusion_cache            — POST /nodes/{nodeID}/caches/conclusion/clear
 *  37. reassemble_vtable_rule            — POST /nodes/all/caches/vtable/rule_types/{pxobjclass}/instances/{pxinsid}/reassemble
 *  38. reload_vtable_rule                — POST /nodes/all/caches/vtable/rule_types/{pxobjclass}/instances/{pxinsid}/reload
 * Agents:
 *  39. get_node_agents                   — GET    /nodes/{nodeID}/agents/
 *  40. get_node_agent                    — GET    /nodes/{nodeID}/agents/{agentID}
 *  41. start_node_agent                  — POST   /nodes/{nodeID}/agents/{agentID}
 *  42. restart_node_agent                — PUT    /nodes/{nodeID}/agents/{agentID}
 *  43. stop_node_agent                   — DELETE /nodes/{nodeID}/agents/{agentID}
 * Job Schedulers:
 *  44. get_node_job_schedulers           — GET    /nodes/{nodeID}/job_schedulers
 *  45. start_node_job_scheduler          — POST   /nodes/{nodeID}/job_schedulers/{jobID}
 *  46. stop_node_job_scheduler           — DELETE /nodes/{nodeID}/job_schedulers/{jobID}
 * Pools:
 *  47. clear_all_requestor_pools         — POST   /nodes/{nodeID}/pools/requestor/clear
 *  48. get_requestor_pools               — GET    /nodes/{nodeID}/pools/requestor/members
 *  49. clear_requestor_pool              — DELETE /nodes/{nodeID}/pools/requestor/members/{servicePackageName}
 * Queue Processors:
 *  50. get_node_queue_processors         — GET    /nodes/{nodeID}/queue_processors
 *  51. start_queue_processor             — POST   /nodes/{nodeID}/queue_processors/{queueID}
 *  52. stop_queue_processor              — DELETE /nodes/{nodeID}/queue_processors/{queueID}
 * Requestors:
 *  53. get_node_requestors               — GET    /nodes/{nodeID}/requestors
 *  54. get_node_requestor                — GET    /nodes/{nodeID}/requestors/{requestorID}
 *  55. stop_node_requestor               — DELETE /nodes/{nodeID}/requestors/{requestorID}
 *  56. interrupt_node_requestor          — PUT    /nodes/{nodeID}/requestors/{requestorID}/interrupt
 * PAL:
 *  57. get_pal_memory_allocation         — GET /nodes/{nodeId}/pal/memory_allocation
 *  58. set_pal_memory_allocation         — PUT /nodes/{nodeId}/pal/memory_allocation
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost, pegaPut, pegaDelete } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const sysadminToolDefinitions: Tool[] = [
  // ── Reports ───────────────────────────────────────────────────────────────
  {
    name: "get_classes",
    description: "Get the list of Pega class definitions in the system.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_databases",
    description: "Get the list of database connections configured in the Pega system.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_tables",
    description: "Get the list of database tables known to the Pega system.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_node_module_version_report",
    description: "Get the module version report for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_conclusion_report",
    description: "Get the conclusion cache report for a specific type on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
        typeName: { type: "string", description: "Name of the conclusion type." },
      },
      required: ["nodeId", "typeName"],
    },
  },
  {
    name: "get_node_log_usage_report",
    description: "Get the log usage report for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "get_node_mru_report",
    description: "Get the Most Recently Used (MRU) report for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "get_node_property_reference_report",
    description: "Get the property reference report for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },

  // ── Loggers ───────────────────────────────────────────────────────────────
  {
    name: "add_log_filter",
    description: "Add a requestor and thread filter to a log appender.",
    inputSchema: {
      type: "object",
      properties: {
        appenderName: { type: "string", description: "Name of the log appender." },
        body: { type: "object", description: "Filter configuration (requestor ID, thread pattern, etc.)." },
      },
      required: ["appenderName", "body"],
    },
  },
  {
    name: "remove_log_filter",
    description: "Remove a requestor and thread filter from a log appender.",
    inputSchema: {
      type: "object",
      properties: {
        appenderName: { type: "string", description: "Name of the log appender." },
      },
      required: ["appenderName"],
    },
  },
  {
    name: "get_log_categories",
    description: "Get all logging categories and their current levels for a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "reset_log_categories",
    description: "Reset all logging categories to their default levels for a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "get_log_category",
    description: "Get the logger details for a specific logging category on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
        categoryName: { type: "string", description: "Name of the logging category, e.g. 'com.pega.pegarules'." },
      },
      required: ["nodeId", "categoryName"],
    },
  },
  {
    name: "set_log_level",
    description: "Set the log level for a specific logging category on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
        categoryName: { type: "string", description: "Name of the logging category." },
        level: {
          type: "string",
          enum: ["OFF", "FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE", "ALL"],
          description: "Log level to set.",
        },
      },
      required: ["nodeId", "categoryName", "level"],
    },
  },

  // ── Nodes ─────────────────────────────────────────────────────────────────
  {
    name: "get_nodes",
    description: "Get the list of all node IDs in the Pega cluster.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_node_dataconfigs",
    description: "Get the database configuration settings for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_datasources",
    description: "Get the data source identity information for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_thread_dump",
    description: "Get a thread dump from a specific node for diagnostics.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_purge_results",
    description: "Get the results of the last purge operation on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_search_status",
    description: "Get the search node status for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "quiesce_node",
    description: "Place a node into a quiescent state, gracefully stopping it from accepting new work.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node to quiesce." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_prconfig",
    description: "Download the PRConfig file from a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_system_settings",
    description: "Get the system configuration settings for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "unquiesce_node",
    description: "Take a node out of a quiescent state, resuming normal operation.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node to unquiesce." },
      },
      required: ["nodeID"],
    },
  },

  // ── Caches ────────────────────────────────────────────────────────────────
  {
    name: "get_rule_cache_summary",
    description: "Get a summary of the rule cache for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "clear_rule_cache",
    description: "Clear the entire rule cache on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "delete_rule_cache_instance",
    description: "Delete a specific rule instance from the rule cache on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        ruleInsKey: { type: "string", description: "The pzInsKey of the rule instance to remove from cache." },
      },
      required: ["nodeID", "ruleInsKey"],
    },
  },
  {
    name: "get_rule_cache_type_details",
    description: "Get rule cache details for a specific rule type on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        ruleType: { type: "string", description: "The rule type class name, e.g. 'Rule-Obj-Activity'." },
      },
      required: ["nodeID", "ruleType"],
    },
  },
  {
    name: "get_rule_cache_instances",
    description: "Get the list of cached instances for a specific rule type on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        ruleType: { type: "string", description: "The rule type class name." },
      },
      required: ["nodeID", "ruleType"],
    },
  },
  {
    name: "get_declarative_page_cache",
    description: "Get the declarative page cache summary for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "clear_declarative_page_cache",
    description: "Clear the declarative page cache on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_declarative_rule_cache",
    description: "Get the declarative rule cache summary for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "clear_declarative_rule_cache",
    description: "Clear the declarative rule cache on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "clear_aba_cache",
    description: "Clear the ABA (Adaptive Business Analytics) cache on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_conclusion_cache",
    description: "Get the conclusion cache summary for a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "clear_conclusion_cache",
    description: "Clear the conclusion cache on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "reassemble_vtable_rule",
    description: "Perform a reassemble action on a specific rule in the VTable cache across all nodes.",
    inputSchema: {
      type: "object",
      properties: {
        pxobjclass: { type: "string", description: "The rule class (pxObjClass), e.g. 'Rule-Obj-Activity'." },
        pxinsid: { type: "string", description: "The rule instance ID (pxInsId)." },
      },
      required: ["pxobjclass", "pxinsid"],
    },
  },
  {
    name: "reload_vtable_rule",
    description: "Perform a reload action on a specific rule in the VTable cache across all nodes.",
    inputSchema: {
      type: "object",
      properties: {
        pxobjclass: { type: "string", description: "The rule class (pxObjClass), e.g. 'Rule-Obj-Activity'." },
        pxinsid: { type: "string", description: "The rule instance ID (pxInsId)." },
      },
      required: ["pxobjclass", "pxinsid"],
    },
  },

  // ── Agents ────────────────────────────────────────────────────────────────
  {
    name: "get_node_agents",
    description: "Fetch the list of agents running on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_agent",
    description: "Get details about a specific agent on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        agentID: { type: "string", description: "ID of the agent." },
      },
      required: ["nodeID", "agentID"],
    },
  },
  {
    name: "start_node_agent",
    description: "Start a specific agent on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        agentID: { type: "string", description: "ID of the agent to start." },
      },
      required: ["nodeID", "agentID"],
    },
  },
  {
    name: "restart_node_agent",
    description: "Restart a specific agent on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        agentID: { type: "string", description: "ID of the agent to restart." },
      },
      required: ["nodeID", "agentID"],
    },
  },
  {
    name: "stop_node_agent",
    description: "Stop a specific agent on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        agentID: { type: "string", description: "ID of the agent to stop." },
      },
      required: ["nodeID", "agentID"],
    },
  },

  // ── Job Schedulers ────────────────────────────────────────────────────────
  {
    name: "get_node_job_schedulers",
    description: "Fetch the list of job schedulers on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "start_node_job_scheduler",
    description: "Start a specific job scheduler on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        jobID: { type: "string", description: "ID of the job scheduler to start." },
      },
      required: ["nodeID", "jobID"],
    },
  },
  {
    name: "stop_node_job_scheduler",
    description: "Stop a specific job scheduler on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        jobID: { type: "string", description: "ID of the job scheduler to stop." },
      },
      required: ["nodeID", "jobID"],
    },
  },

  // ── Pools ─────────────────────────────────────────────────────────────────
  {
    name: "clear_all_requestor_pools",
    description: "Clear all requestor pools on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_requestor_pools",
    description: "Get the list of all requestor pool members on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "clear_requestor_pool",
    description: "Clear a specific requestor pool by service package name on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        servicePackageName: { type: "string", description: "Name of the service package whose pool to clear." },
      },
      required: ["nodeID", "servicePackageName"],
    },
  },

  // ── Queue Processors ──────────────────────────────────────────────────────
  {
    name: "get_node_queue_processors",
    description: "Get all queue processors on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "start_queue_processor",
    description: "Start a specific queue processor on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        queueID: { type: "string", description: "ID of the queue processor to start." },
      },
      required: ["nodeID", "queueID"],
    },
  },
  {
    name: "stop_queue_processor",
    description: "Stop a specific queue processor on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        queueID: { type: "string", description: "ID of the queue processor to stop." },
      },
      required: ["nodeID", "queueID"],
    },
  },

  // ── Requestors ────────────────────────────────────────────────────────────
  {
    name: "get_node_requestors",
    description: "Get the list of active requestors on a specific node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
      },
      required: ["nodeID"],
    },
  },
  {
    name: "get_node_requestor",
    description: "Get details about a specific requestor on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        requestorID: { type: "string", description: "ID of the requestor." },
      },
      required: ["nodeID", "requestorID"],
    },
  },
  {
    name: "stop_node_requestor",
    description: "Stop a specific requestor on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        requestorID: { type: "string", description: "ID of the requestor to stop." },
      },
      required: ["nodeID", "requestorID"],
    },
  },
  {
    name: "interrupt_node_requestor",
    description: "Interrupt a specific requestor on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeID: { type: "string", description: "ID of the node." },
        requestorID: { type: "string", description: "ID of the requestor to interrupt." },
      },
      required: ["nodeID", "requestorID"],
    },
  },

  // ── PAL ───────────────────────────────────────────────────────────────────
  {
    name: "get_pal_memory_allocation",
    description: "Check whether the requestor memory allocation PAL metric is enabled on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
      },
      required: ["nodeId"],
    },
  },
  {
    name: "set_pal_memory_allocation",
    description: "Enable or disable the requestor memory allocation PAL metric on a node.",
    inputSchema: {
      type: "object",
      properties: {
        nodeId: { type: "string", description: "ID of the node." },
        enabled: { type: "boolean", description: "Set to true to enable, false to disable." },
      },
      required: ["nodeId", "enabled"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleSysadminTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    // Reports
    case "get_classes": {
      const result = await pegaGet("/classes");
      return JSON.stringify(result, null, 2);
    }
    case "get_databases": {
      const result = await pegaGet("/databases");
      return JSON.stringify(result, null, 2);
    }
    case "get_tables": {
      const result = await pegaGet("/tables");
      return JSON.stringify(result, null, 2);
    }
    case "get_node_module_version_report": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/reports/module_version`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_conclusion_report": {
      const { nodeId, typeName } = z.object({ nodeId: z.string(), typeName: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/reports/conclusion_report/types/${encodeURIComponent(typeName)}`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_log_usage_report": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/reports/log_usage`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_mru_report": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/reports/mru_report`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_property_reference_report": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/reports/property_reference`);
      return JSON.stringify(result, null, 2);
    }

    // Loggers
    case "add_log_filter": {
      const { appenderName, body } = z.object({ appenderName: z.string(), body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost(`/log_appender/${encodeURIComponent(appenderName)}/filter`, body);
      return JSON.stringify(result, null, 2);
    }
    case "remove_log_filter": {
      const { appenderName } = z.object({ appenderName: z.string() }).parse(args);
      await pegaDelete(`/log_appender/${encodeURIComponent(appenderName)}/filter`);
      return `Log filter removed from appender ${appenderName}.`;
    }
    case "get_log_categories": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/log_categories`);
      return JSON.stringify(result, null, 2);
    }
    case "reset_log_categories": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeId)}/log_categories`);
      return `Log categories reset to defaults on node ${nodeId}.`;
    }
    case "get_log_category": {
      const { nodeId, categoryName } = z.object({ nodeId: z.string(), categoryName: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/log_categories/${encodeURIComponent(categoryName)}`);
      return JSON.stringify(result, null, 2);
    }
    case "set_log_level": {
      const { nodeId, categoryName, level } = z
        .object({ nodeId: z.string(), categoryName: z.string(), level: z.string() })
        .parse(args);
      const result = await pegaPut(
        `/nodes/${encodeURIComponent(nodeId)}/log_categories/${encodeURIComponent(categoryName)}`,
        { level }
      );
      return JSON.stringify(result, null, 2);
    }

    // Nodes
    case "get_nodes": {
      const result = await pegaGet("/nodes");
      return JSON.stringify(result, null, 2);
    }
    case "get_node_dataconfigs": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/dataconfigs`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_datasources": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/datasources`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_thread_dump": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/diagnostics/thread_dump`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_purge_results": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/purgeresults`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_search_status": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/search`);
      return JSON.stringify(result, null, 2);
    }
    case "quiesce_node": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/quiesce`, {});
      return JSON.stringify(result, null, 2);
    }
    case "get_node_prconfig": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/settings/prconfig`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_system_settings": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/settings/system`);
      return JSON.stringify(result, null, 2);
    }
    case "unquiesce_node": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/unquiesce`, {});
      return JSON.stringify(result, null, 2);
    }

    // Caches
    case "get_rule_cache_summary": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/caches/rule`);
      return JSON.stringify(result, null, 2);
    }
    case "clear_rule_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/caches/rule/clear`, {});
      return JSON.stringify(result, null, 2);
    }
    case "delete_rule_cache_instance": {
      const { nodeID, ruleInsKey } = z.object({ nodeID: z.string(), ruleInsKey: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeID)}/caches/rule/instances/${encodeURIComponent(ruleInsKey)}`);
      return `Rule cache instance ${ruleInsKey} deleted from node ${nodeID}.`;
    }
    case "get_rule_cache_type_details": {
      const { nodeID, ruleType } = z.object({ nodeID: z.string(), ruleType: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/caches/rule/rule_types/${encodeURIComponent(ruleType)}`);
      return JSON.stringify(result, null, 2);
    }
    case "get_rule_cache_instances": {
      const { nodeID, ruleType } = z.object({ nodeID: z.string(), ruleType: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/caches/rule/rule_types/${encodeURIComponent(ruleType)}/instances`);
      return JSON.stringify(result, null, 2);
    }
    case "get_declarative_page_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/caches/declarative_page`);
      return JSON.stringify(result, null, 2);
    }
    case "clear_declarative_page_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/caches/declarative_page/clear`, {});
      return JSON.stringify(result, null, 2);
    }
    case "get_declarative_rule_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/caches/declarative_rule`);
      return JSON.stringify(result, null, 2);
    }
    case "clear_declarative_rule_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/caches/declarative_rule/clear`, {});
      return JSON.stringify(result, null, 2);
    }
    case "clear_aba_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/caches/aba/clear`, {});
      return JSON.stringify(result, null, 2);
    }
    case "get_conclusion_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/caches/conclusion`);
      return JSON.stringify(result, null, 2);
    }
    case "clear_conclusion_cache": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/caches/conclusion/clear`, {});
      return JSON.stringify(result, null, 2);
    }
    case "reassemble_vtable_rule": {
      const { pxobjclass, pxinsid } = z.object({ pxobjclass: z.string(), pxinsid: z.string() }).parse(args);
      const result = await pegaPost(
        `/nodes/all/caches/vtable/rule_types/${encodeURIComponent(pxobjclass)}/instances/${encodeURIComponent(pxinsid)}/reassemble`,
        {}
      );
      return JSON.stringify(result, null, 2);
    }
    case "reload_vtable_rule": {
      const { pxobjclass, pxinsid } = z.object({ pxobjclass: z.string(), pxinsid: z.string() }).parse(args);
      const result = await pegaPost(
        `/nodes/all/caches/vtable/rule_types/${encodeURIComponent(pxobjclass)}/instances/${encodeURIComponent(pxinsid)}/reload`,
        {}
      );
      return JSON.stringify(result, null, 2);
    }

    // Agents
    case "get_node_agents": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/agents/`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_agent": {
      const { nodeID, agentID } = z.object({ nodeID: z.string(), agentID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/agents/${encodeURIComponent(agentID)}`);
      return JSON.stringify(result, null, 2);
    }
    case "start_node_agent": {
      const { nodeID, agentID } = z.object({ nodeID: z.string(), agentID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/agents/${encodeURIComponent(agentID)}`, {});
      return JSON.stringify(result, null, 2);
    }
    case "restart_node_agent": {
      const { nodeID, agentID } = z.object({ nodeID: z.string(), agentID: z.string() }).parse(args);
      const result = await pegaPut(`/nodes/${encodeURIComponent(nodeID)}/agents/${encodeURIComponent(agentID)}`, {});
      return JSON.stringify(result, null, 2);
    }
    case "stop_node_agent": {
      const { nodeID, agentID } = z.object({ nodeID: z.string(), agentID: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeID)}/agents/${encodeURIComponent(agentID)}`);
      return `Agent ${agentID} stopped on node ${nodeID}.`;
    }

    // Job Schedulers
    case "get_node_job_schedulers": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/job_schedulers`);
      return JSON.stringify(result, null, 2);
    }
    case "start_node_job_scheduler": {
      const { nodeID, jobID } = z.object({ nodeID: z.string(), jobID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/job_schedulers/${encodeURIComponent(jobID)}`, {});
      return JSON.stringify(result, null, 2);
    }
    case "stop_node_job_scheduler": {
      const { nodeID, jobID } = z.object({ nodeID: z.string(), jobID: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeID)}/job_schedulers/${encodeURIComponent(jobID)}`);
      return `Job scheduler ${jobID} stopped on node ${nodeID}.`;
    }

    // Pools
    case "clear_all_requestor_pools": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/pools/requestor/clear`, {});
      return JSON.stringify(result, null, 2);
    }
    case "get_requestor_pools": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/pools/requestor/members`);
      return JSON.stringify(result, null, 2);
    }
    case "clear_requestor_pool": {
      const { nodeID, servicePackageName } = z.object({ nodeID: z.string(), servicePackageName: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeID)}/pools/requestor/members/${encodeURIComponent(servicePackageName)}`);
      return `Requestor pool for ${servicePackageName} cleared on node ${nodeID}.`;
    }

    // Queue Processors
    case "get_node_queue_processors": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/queue_processors`);
      return JSON.stringify(result, null, 2);
    }
    case "start_queue_processor": {
      const { nodeID, queueID } = z.object({ nodeID: z.string(), queueID: z.string() }).parse(args);
      const result = await pegaPost(`/nodes/${encodeURIComponent(nodeID)}/queue_processors/${encodeURIComponent(queueID)}`, {});
      return JSON.stringify(result, null, 2);
    }
    case "stop_queue_processor": {
      const { nodeID, queueID } = z.object({ nodeID: z.string(), queueID: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeID)}/queue_processors/${encodeURIComponent(queueID)}`);
      return `Queue processor ${queueID} stopped on node ${nodeID}.`;
    }

    // Requestors
    case "get_node_requestors": {
      const { nodeID } = z.object({ nodeID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/requestors`);
      return JSON.stringify(result, null, 2);
    }
    case "get_node_requestor": {
      const { nodeID, requestorID } = z.object({ nodeID: z.string(), requestorID: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeID)}/requestors/${encodeURIComponent(requestorID)}`);
      return JSON.stringify(result, null, 2);
    }
    case "stop_node_requestor": {
      const { nodeID, requestorID } = z.object({ nodeID: z.string(), requestorID: z.string() }).parse(args);
      await pegaDelete(`/nodes/${encodeURIComponent(nodeID)}/requestors/${encodeURIComponent(requestorID)}`);
      return `Requestor ${requestorID} stopped on node ${nodeID}.`;
    }
    case "interrupt_node_requestor": {
      const { nodeID, requestorID } = z.object({ nodeID: z.string(), requestorID: z.string() }).parse(args);
      const result = await pegaPut(`/nodes/${encodeURIComponent(nodeID)}/requestors/${encodeURIComponent(requestorID)}/interrupt`, {});
      return JSON.stringify(result, null, 2);
    }

    // PAL
    case "get_pal_memory_allocation": {
      const { nodeId } = z.object({ nodeId: z.string() }).parse(args);
      const result = await pegaGet(`/nodes/${encodeURIComponent(nodeId)}/pal/memory_allocation`);
      return JSON.stringify(result, null, 2);
    }
    case "set_pal_memory_allocation": {
      const { nodeId, enabled } = z.object({ nodeId: z.string(), enabled: z.boolean() }).parse(args);
      const result = await pegaPut(`/nodes/${encodeURIComponent(nodeId)}/pal/memory_allocation`, { enabled });
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown sysadmin tool: ${toolName}`);
  }
}
