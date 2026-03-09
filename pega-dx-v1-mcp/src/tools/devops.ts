/**
 * DevOps tools for Pega Traditional DX API V1.
 *
 * Tools:
 *  Applications:
 *   1.  get_applications                — GET  /applications
 *   2.  get_application                 — GET  /applications/{ID}
 *   3.  get_application_quality_metrics — GET  /applications/{ID}/quality_metrics
 *   4.  get_application_guardrail_metrics — GET /applications/{ID}/guardrail_metrics
 *   5.  start_application_coverage      — GET  /applications/{ID}/start_application_coverage
 *   6.  stop_application_coverage       — GET  /applications/{ID}/stop_application_coverage
 *   7.  get_rule_coverage_report        — GET  /applications/{ID}/rule_coverage_detailed_report/{rulecoverageId}
 *   8.  get_application_test_metrics    — GET  /applications/{ID}/test_metrics
 *   9.  get_application_security_tasks  — GET  /applications/{ID}/security_tasks
 *   10. merge_test_coverage_reports     — POST /applications/merged_testcoverage_reports
 *   11. get_test_metrics_for_rules      — POST /applications/test_metrics_for_rules
 *  PegaUnits:
 *   12. execute_pegaunits               — POST /pegaunits/execute
 *   13. get_pegaunit_results            — GET  /pegaunits/execute/{ID}/results
 *  Scenario Tests:
 *   14. execute_scenario_tests          — POST /scenariotests/execute
 *  Branches:
 *   15. get_branch_conflicts            — GET  /branches/{ID}/conflicts
 *   16. merge_branch                    — POST /branches/{ID}/merge
 *   17. get_branch_reviews              — GET  /branches/{ID}/reviews
 *   18. create_branch_review            — POST /branches/{ID}/reviews
 *   19. get_branch_summary              — GET  /branches/{ID}/summary
 *  Merges:
 *   20. get_merge_status                — GET  /merges/{ID}
 */

import { type Tool } from "@modelcontextprotocol/sdk/types.js";
import { pegaGet, pegaPost } from "../client.js";
import { z } from "zod";

// ── Tool definitions ────────────────────────────────────────────────────────

export const devopsToolDefinitions: Tool[] = [
  // Applications
  {
    name: "get_applications",
    description: "Get the list of Pega applications available in the environment.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_application",
    description: "Get details about a specific Pega application by its ID.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application to retrieve.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "get_application_quality_metrics",
    description: "Get quality metrics for a specific Pega application, including guardrail compliance scores and code quality indicators.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "get_application_guardrail_metrics",
    description: "Get guardrail metrics for a specific Pega application, showing compliance with Pega best practice guardrails.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "start_application_coverage",
    description: "Start tracking application coverage for a specific Pega application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application to start coverage tracking for.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "stop_application_coverage",
    description: "Stop tracking application coverage for a specific Pega application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application to stop coverage tracking for.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "get_rule_coverage_report",
    description: "Get a detailed rule coverage report for a specific coverage run of a Pega application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application.",
        },
        rulecoverageId: {
          type: "string",
          description: "ID of the rule coverage run to retrieve the report for.",
        },
      },
      required: ["applicationID", "rulecoverageId"],
    },
  },
  {
    name: "get_application_test_metrics",
    description: "Get PegaUnit test statistics for a specific application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "get_application_security_tasks",
    description: "Get the security tasks status for a specific Pega application.",
    inputSchema: {
      type: "object",
      properties: {
        applicationID: {
          type: "string",
          description: "ID of the application.",
        },
      },
      required: ["applicationID"],
    },
  },
  {
    name: "merge_test_coverage_reports",
    description: "Merge multiple test coverage reports into a single combined report.",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body containing the coverage report IDs to merge.",
        },
      },
      required: ["body"],
    },
  },
  {
    name: "get_test_metrics_for_rules",
    description: "Get test metrics for a specific set of rules in a Pega application.",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body containing the rule identifiers to get metrics for.",
        },
      },
      required: ["body"],
    },
  },

  // PegaUnits
  {
    name: "execute_pegaunits",
    description: "Initiate asynchronous execution of PegaUnit tests. Returns an execution ID that can be used to poll for results.",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body specifying which PegaUnit tests to execute (application, rulesets, test classes, etc.).",
        },
      },
      required: ["body"],
    },
  },
  {
    name: "get_pegaunit_results",
    description: "Retrieve the execution results of a PegaUnit test run by its execution ID.",
    inputSchema: {
      type: "object",
      properties: {
        executionID: {
          type: "string",
          description: "Execution ID returned from execute_pegaunits.",
        },
      },
      required: ["executionID"],
    },
  },

  // Scenario Tests
  {
    name: "execute_scenario_tests",
    description: "Initiate execution of scenario tests (Pega Robot Manager / scenario test runner).",
    inputSchema: {
      type: "object",
      properties: {
        body: {
          type: "object",
          description: "Request body specifying which scenario tests to execute.",
        },
      },
      required: ["body"],
    },
  },

  // Branches
  {
    name: "get_branch_conflicts",
    description: "Get the list of merge conflicts for a specific development branch.",
    inputSchema: {
      type: "object",
      properties: {
        branchID: {
          type: "string",
          description: "ID of the branch to check for conflicts.",
        },
      },
      required: ["branchID"],
    },
  },
  {
    name: "merge_branch",
    description: "Merge a development branch into the target ruleset.",
    inputSchema: {
      type: "object",
      properties: {
        branchID: {
          type: "string",
          description: "ID of the branch to merge.",
        },
        body: {
          type: "object",
          description: "Optional merge options (conflict resolution strategy, etc.).",
        },
      },
      required: ["branchID"],
    },
  },
  {
    name: "get_branch_reviews",
    description: "Get the list of code reviews for a specific development branch.",
    inputSchema: {
      type: "object",
      properties: {
        branchID: {
          type: "string",
          description: "ID of the branch to get reviews for.",
        },
      },
      required: ["branchID"],
    },
  },
  {
    name: "create_branch_review",
    description: "Create a new code review for a specific development branch.",
    inputSchema: {
      type: "object",
      properties: {
        branchID: {
          type: "string",
          description: "ID of the branch to create a review for.",
        },
        body: {
          type: "object",
          description: "Review details (reviewers, comments, etc.).",
        },
      },
      required: ["branchID", "body"],
    },
  },
  {
    name: "get_branch_summary",
    description: "Get a summary of a specific development branch including changed rules, status, and statistics.",
    inputSchema: {
      type: "object",
      properties: {
        branchID: {
          type: "string",
          description: "ID of the branch to get the summary for.",
        },
      },
      required: ["branchID"],
    },
  },

  // Merges
  {
    name: "get_merge_status",
    description: "Get the status of a branch merge operation by its merge ID.",
    inputSchema: {
      type: "object",
      properties: {
        mergeID: {
          type: "string",
          description: "ID of the merge operation to check status for.",
        },
      },
      required: ["mergeID"],
    },
  },
];

// ── Tool handlers ───────────────────────────────────────────────────────────

export async function handleDevopsTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<string> {
  switch (toolName) {
    case "get_applications": {
      const result = await pegaGet("/applications");
      return JSON.stringify(result, null, 2);
    }

    case "get_application": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}`);
      return JSON.stringify(result, null, 2);
    }

    case "get_application_quality_metrics": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}/quality_metrics`);
      return JSON.stringify(result, null, 2);
    }

    case "get_application_guardrail_metrics": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}/guardrail_metrics`);
      return JSON.stringify(result, null, 2);
    }

    case "start_application_coverage": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}/start_application_coverage`);
      return JSON.stringify(result, null, 2);
    }

    case "stop_application_coverage": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}/stop_application_coverage`);
      return JSON.stringify(result, null, 2);
    }

    case "get_rule_coverage_report": {
      const parsed = z
        .object({ applicationID: z.string(), rulecoverageId: z.string() })
        .parse(args);
      const result = await pegaGet(
        `/applications/${encodeURIComponent(parsed.applicationID)}/rule_coverage_detailed_report/${encodeURIComponent(parsed.rulecoverageId)}`
      );
      return JSON.stringify(result, null, 2);
    }

    case "get_application_test_metrics": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}/test_metrics`);
      return JSON.stringify(result, null, 2);
    }

    case "get_application_security_tasks": {
      const { applicationID } = z.object({ applicationID: z.string() }).parse(args);
      const result = await pegaGet(`/applications/${encodeURIComponent(applicationID)}/security_tasks`);
      return JSON.stringify(result, null, 2);
    }

    case "merge_test_coverage_reports": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/applications/merged_testcoverage_reports", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_test_metrics_for_rules": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/applications/test_metrics_for_rules", body);
      return JSON.stringify(result, null, 2);
    }

    case "execute_pegaunits": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/pegaunits/execute", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_pegaunit_results": {
      const { executionID } = z.object({ executionID: z.string() }).parse(args);
      const result = await pegaGet(`/pegaunits/execute/${encodeURIComponent(executionID)}/results`);
      return JSON.stringify(result, null, 2);
    }

    case "execute_scenario_tests": {
      const { body } = z.object({ body: z.record(z.unknown()) }).parse(args);
      const result = await pegaPost("/scenariotests/execute", body);
      return JSON.stringify(result, null, 2);
    }

    case "get_branch_conflicts": {
      const { branchID } = z.object({ branchID: z.string() }).parse(args);
      const result = await pegaGet(`/branches/${encodeURIComponent(branchID)}/conflicts`);
      return JSON.stringify(result, null, 2);
    }

    case "merge_branch": {
      const parsed = z
        .object({ branchID: z.string(), body: z.record(z.unknown()).optional() })
        .parse(args);
      const result = await pegaPost(
        `/branches/${encodeURIComponent(parsed.branchID)}/merge`,
        parsed.body ?? {}
      );
      return JSON.stringify(result, null, 2);
    }

    case "get_branch_reviews": {
      const { branchID } = z.object({ branchID: z.string() }).parse(args);
      const result = await pegaGet(`/branches/${encodeURIComponent(branchID)}/reviews`);
      return JSON.stringify(result, null, 2);
    }

    case "create_branch_review": {
      const parsed = z
        .object({ branchID: z.string(), body: z.record(z.unknown()) })
        .parse(args);
      const result = await pegaPost(
        `/branches/${encodeURIComponent(parsed.branchID)}/reviews`,
        parsed.body
      );
      return JSON.stringify(result, null, 2);
    }

    case "get_branch_summary": {
      const { branchID } = z.object({ branchID: z.string() }).parse(args);
      const result = await pegaGet(`/branches/${encodeURIComponent(branchID)}/summary`);
      return JSON.stringify(result, null, 2);
    }

    case "get_merge_status": {
      const { mergeID } = z.object({ mergeID: z.string() }).parse(args);
      const result = await pegaGet(`/merges/${encodeURIComponent(mergeID)}`);
      return JSON.stringify(result, null, 2);
    }

    default:
      throw new Error(`Unknown devops tool: ${toolName}`);
  }
}
