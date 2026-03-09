# Pega DX API V1 MCP Server

An MCP (Model Context Protocol) server for the **Pega Traditional DX API V1** (`/prweb/api/v1/`).

Designed for Pega applications built on **section-based UIs** (UI-Kit / Theme Cosmos / Pega 8.3–8.6). For Constellation-based apps use the [V2 MCP](https://github.com/MarcoLooy/pega-dx-mcp) instead.

---

## Tools (135 total)

### Service (1)
| Tool | Description |
|------|-------------|
| `ping_pega_service` | Test connectivity and verify authentication |

### Cases (9)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_cases` | `GET /cases` | List all user's cases (max 500, V1-exclusive) |
| `create_case` | `POST /cases` | Create a new case |
| `get_case` | `GET /cases/{ID}` | Get case details |
| `update_case` | `PUT /cases/{ID}` | Update case fields via action |
| `delete_case` | `DELETE /cases/{ID}` | Delete a case (Create stage only) |
| `get_case_view` | `GET /cases/{ID}/views/{viewID}` | Get a specific case view/harness |
| `get_case_page` | `GET /cases/{ID}/pages/{pageID}` | Get an embedded page within a case |
| `get_case_action` | `GET /cases/{ID}/actions/{actionID}` | Get action form metadata for a case |
| `refresh_case_action` | `PUT /cases/{ID}/actions/{actionID}/refresh` | Refresh case action form after field change |

### Assignments (5)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_assignments` | `GET /assignments` | List user's worklist |
| `get_assignment` | `GET /assignments/{ID}` | Get assignment details |
| `get_assignment_action` | `GET /assignments/{ID}/actions/{actionID}` | Get flow action form metadata |
| `perform_assignment_action` | `POST /assignments/{ID}` | Submit a flow action |
| `refresh_assignment_action` | `PUT /assignments/{ID}/actions/{actionID}/refresh` | Refresh form after field change |

### Case Types (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_case_types` | `GET /casetypes` | List available case types |
| `get_case_type` | `GET /casetypes/{ID}` | Get case type metadata |
| `refresh_case_type_view` | `PUT /casetypes/{ID}/refresh` | Refresh new-case form |

### Data Pages (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_data_page` | `GET /data/{dataViewID}` | Retrieve data page content |
| `post_data_page` | `POST /data/{dataViewID}` | Post params to data page |
| `get_data_view_metadata` | `GET /data/{dataViewID}/metadata` | Get data page metadata |

### Attachments (7)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_case_attachments` | `GET /cases/{ID}/attachments` | List case attachments |
| `add_case_attachment` | `POST /cases/{ID}/attachments` | Add file or URL attachment to a case |
| `delete_case_attachment` | `DELETE /cases/{ID}/attachments/{attachmentID}` | Delete attachment from a case |
| `upload_attachment` | `POST /attachments/upload` | Upload a file as a temporary attachment |
| `get_case_attachment_categories` | `GET /cases/{ID}/attachment_categories` | Get attachment categories for a case |
| `get_attachment` | `GET /attachments/{attachmentID}` | Get attachment content and metadata |
| `delete_attachment` | `DELETE /attachments/{attachmentID}` | Delete an attachment by ID |

### Collaboration (11)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_documents` | `GET /documents` | List collaboration documents |
| `get_document` | `GET /documents/{ID}` | Get document details |
| `get_messages` | `GET /messages` | List user's messages |
| `create_message` | `POST /messages` | Create a new message |
| `get_notifications` | `GET /notifications` | List user's notifications |
| `create_notification` | `POST /notifications` | Create a new notification |
| `get_spaces` | `GET /spaces` | List collaboration spaces |
| `get_space` | `GET /spaces/{ID}` | Get space details |
| `join_space` | `PUT /spaces/{ID}/join` | Join a collaboration space |
| `leave_space` | `PUT /spaces/{ID}/leave` | Leave a collaboration space |
| `get_space_pins` | `GET /spaces/{ID}/pins` | Get pinned items in a space |

### DevOps — Applications (11)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_applications` | `GET /applications` | List applications |
| `get_application` | `GET /applications/{ID}` | Get application details |
| `get_application_quality_metrics` | `GET /applications/{ID}/quality_metrics` | Get quality metrics |
| `get_application_guardrail_metrics` | `GET /applications/{ID}/guardrail_metrics` | Get guardrail compliance metrics |
| `start_application_coverage` | `GET /applications/{ID}/start_application_coverage` | Start coverage tracking |
| `stop_application_coverage` | `GET /applications/{ID}/stop_application_coverage` | Stop coverage tracking |
| `get_rule_coverage_report` | `GET /applications/{ID}/rule_coverage_detailed_report/{rulecoverageId}` | Get detailed coverage report |
| `get_application_test_metrics` | `GET /applications/{ID}/test_metrics` | Get PegaUnit statistics |
| `get_application_security_tasks` | `GET /applications/{ID}/security_tasks` | Get security task status |
| `merge_test_coverage_reports` | `POST /applications/merged_testcoverage_reports` | Merge coverage reports |
| `get_test_metrics_for_rules` | `POST /applications/test_metrics_for_rules` | Get test metrics for specific rules |

### DevOps — PegaUnits & Scenario Tests (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `execute_pegaunits` | `POST /pegaunits/execute` | Run PegaUnit tests asynchronously |
| `get_pegaunit_results` | `GET /pegaunits/execute/{ID}/results` | Retrieve PegaUnit execution results |
| `execute_scenario_tests` | `POST /scenariotests/execute` | Run scenario tests |

### DevOps — Branches & Merges (6)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_branch_conflicts` | `GET /branches/{ID}/conflicts` | Get branch merge conflicts |
| `merge_branch` | `POST /branches/{ID}/merge` | Merge a branch |
| `get_branch_reviews` | `GET /branches/{ID}/reviews` | List branch code reviews |
| `create_branch_review` | `POST /branches/{ID}/reviews` | Create a branch review |
| `get_branch_summary` | `GET /branches/{ID}/summary` | Get branch summary |
| `get_merge_status` | `GET /merges/{ID}` | Get merge operation status |

### System Management — Reports (8)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_classes` | `GET /classes` | List Pega class definitions |
| `get_databases` | `GET /databases` | List database connections |
| `get_tables` | `GET /tables` | List database tables |
| `get_node_module_version_report` | `GET /nodes/{nodeID}/reports/module_version` | Get module version report |
| `get_node_conclusion_report` | `GET /nodes/{nodeId}/reports/conclusion_report/types/{typeName}` | Get conclusion cache report |
| `get_node_log_usage_report` | `GET /nodes/{nodeId}/reports/log_usage` | Get log usage report |
| `get_node_mru_report` | `GET /nodes/{nodeId}/reports/mru_report` | Get MRU report |
| `get_node_property_reference_report` | `GET /nodes/{nodeId}/reports/property_reference` | Get property reference report |

### System Management — Loggers (6)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `add_log_filter` | `POST /log_appender/{appenderName}/filter` | Add requestor/thread filter to log appender |
| `remove_log_filter` | `DELETE /log_appender/{appenderName}/filter` | Remove filter from log appender |
| `get_log_categories` | `GET /nodes/{nodeId}/log_categories` | Get all logging categories |
| `reset_log_categories` | `DELETE /nodes/{nodeId}/log_categories` | Reset logging categories to defaults |
| `get_log_category` | `GET /nodes/{nodeId}/log_categories/{category_name}` | Get specific category logger details |
| `set_log_level` | `PUT /nodes/{nodeId}/log_categories/{category_name}` | Set log level for a category |

### System Management — Nodes (10)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_nodes` | `GET /nodes` | List all node IDs in the cluster |
| `get_node_dataconfigs` | `GET /nodes/{nodeID}/dataconfigs` | Get database config settings |
| `get_node_datasources` | `GET /nodes/{nodeID}/datasources` | Get data source identity |
| `get_node_thread_dump` | `GET /nodes/{nodeID}/diagnostics/thread_dump` | Get thread dump |
| `get_node_purge_results` | `GET /nodes/{nodeID}/purgeresults` | Get last purge results |
| `get_node_search_status` | `GET /nodes/{nodeId}/search` | Get search node status |
| `quiesce_node` | `POST /nodes/{nodeID}/quiesce` | Place node into quiescent state |
| `get_node_prconfig` | `GET /nodes/{nodeID}/settings/prconfig` | Download PRConfig file |
| `get_node_system_settings` | `GET /nodes/{nodeID}/settings/system` | Get system configuration settings |
| `unquiesce_node` | `POST /nodes/{nodeID}/unquiesce` | Take node out of quiescent state |

### System Management — Caches (14)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_rule_cache_summary` | `GET /nodes/{nodeID}/caches/rule` | Get rule cache summary |
| `clear_rule_cache` | `POST /nodes/{nodeID}/caches/rule/clear` | Clear rule cache |
| `delete_rule_cache_instance` | `DELETE /nodes/{nodeID}/caches/rule/instances/{ruleInsKey}` | Remove rule instance from cache |
| `get_rule_cache_type_details` | `GET /nodes/{nodeID}/caches/rule/rule_types/{ruleType}` | Get rule cache details for a type |
| `get_rule_cache_instances` | `GET /nodes/{nodeID}/caches/rule/rule_types/{ruleType}/instances` | List cached instances of a rule type |
| `get_declarative_page_cache` | `GET /nodes/{nodeID}/caches/declarative_page` | Get declarative page cache summary |
| `clear_declarative_page_cache` | `POST /nodes/{nodeID}/caches/declarative_page/clear` | Clear declarative page cache |
| `get_declarative_rule_cache` | `GET /nodes/{nodeID}/caches/declarative_rule` | Get declarative rule cache summary |
| `clear_declarative_rule_cache` | `POST /nodes/{nodeID}/caches/declarative_rule/clear` | Clear declarative rule cache |
| `clear_aba_cache` | `POST /nodes/{nodeID}/caches/aba/clear` | Clear ABA cache |
| `get_conclusion_cache` | `GET /nodes/{nodeID}/caches/conclusion` | Get conclusion cache summary |
| `clear_conclusion_cache` | `POST /nodes/{nodeID}/caches/conclusion/clear` | Clear conclusion cache |
| `reassemble_vtable_rule` | `POST /nodes/all/caches/vtable/rule_types/{pxobjclass}/instances/{pxinsid}/reassemble` | Reassemble a rule across all nodes |
| `reload_vtable_rule` | `POST /nodes/all/caches/vtable/rule_types/{pxobjclass}/instances/{pxinsid}/reload` | Reload a rule across all nodes |

### System Management — Agents (5)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_node_agents` | `GET /nodes/{nodeID}/agents/` | List agents on a node |
| `get_node_agent` | `GET /nodes/{nodeID}/agents/{agentID}` | Get agent details |
| `start_node_agent` | `POST /nodes/{nodeID}/agents/{agentID}` | Start an agent |
| `restart_node_agent` | `PUT /nodes/{nodeID}/agents/{agentID}` | Restart an agent |
| `stop_node_agent` | `DELETE /nodes/{nodeID}/agents/{agentID}` | Stop an agent |

### System Management — Job Schedulers (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_node_job_schedulers` | `GET /nodes/{nodeID}/job_schedulers` | List job schedulers on a node |
| `start_node_job_scheduler` | `POST /nodes/{nodeID}/job_schedulers/{jobID}` | Start a job scheduler |
| `stop_node_job_scheduler` | `DELETE /nodes/{nodeID}/job_schedulers/{jobID}` | Stop a job scheduler |

### System Management — Pools (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `clear_all_requestor_pools` | `POST /nodes/{nodeID}/pools/requestor/clear` | Clear all requestor pools |
| `get_requestor_pools` | `GET /nodes/{nodeID}/pools/requestor/members` | List requestor pool members |
| `clear_requestor_pool` | `DELETE /nodes/{nodeID}/pools/requestor/members/{servicePackageName}` | Clear a specific requestor pool |

### System Management — Queue Processors (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_node_queue_processors` | `GET /nodes/{nodeID}/queue_processors` | List queue processors on a node |
| `start_queue_processor` | `POST /nodes/{nodeID}/queue_processors/{queueID}` | Start a queue processor |
| `stop_queue_processor` | `DELETE /nodes/{nodeID}/queue_processors/{queueID}` | Stop a queue processor |

### System Management — Requestors (4)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_node_requestors` | `GET /nodes/{nodeID}/requestors` | List active requestors on a node |
| `get_node_requestor` | `GET /nodes/{nodeID}/requestors/{requestorID}` | Get requestor details |
| `stop_node_requestor` | `DELETE /nodes/{nodeID}/requestors/{requestorID}` | Stop a requestor |
| `interrupt_node_requestor` | `PUT /nodes/{nodeID}/requestors/{requestorID}/interrupt` | Interrupt a requestor |

### System Management — PAL (2)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_pal_memory_allocation` | `GET /nodes/{nodeId}/pal/memory_allocation` | Check PAL memory allocation metric status |
| `set_pal_memory_allocation` | `PUT /nodes/{nodeId}/pal/memory_allocation` | Enable/disable PAL memory allocation metric |

### User Management (5)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `generate_otp` | `POST /authenticate/OTP/{sendMode}` | Generate and send OTP to user |
| `verify_otp` | `GET /authenticate/OTP/verify` | Verify OTP entered by user |
| `disable_users` | `POST /users/disable` | Terminate sessions and disable users |
| `enable_users` | `POST /users/enable` | Re-enable disabled users |
| `logout_users` | `POST /users/logout` | Terminate all sessions for users |

### Decision Strategy Management (4)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_dsm_services` | `GET /nodes/all/DSMServices` | List all DSM services across nodes |
| `get_dsm_service` | `GET /nodes/all/DSMServices/{serviceId}` | Get DSM service details |
| `get_dsm_nodes` | `GET /DSMServices/all/nodes` | List nodes running any DSM service |
| `get_node_details` | `GET /nodes/{nodeId}` | Get node details (DSM context) |

### Data Privacy (9)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `create_client_access_request` | `POST /client_access_requests` | Create GDPR data access request |
| `get_client_access_request` | `GET /client_access_requests/{requestID}` | Get access request status |
| `create_client_rectify_request` | `POST /client_rectify_requests` | Create GDPR data rectification request |
| `get_client_rectify_request` | `GET /client_rectify_requests/{requestID}` | Get rectification request status |
| `create_client_erase_request` | `POST /client_erase_requests` | Create GDPR right-to-erasure request |
| `get_client_erase_request` | `GET /client_erase_requests/{requestID}` | Get erasure request status |
| `get_data_privacy_metadata` | `GET /data_privacy_metadata` | Get client identifier field names |
| `get_client_usage_restrictions` | `GET /client_usage_restrictions` | Get data usage restrictions |
| `update_client_usage_restrictions` | `PUT /client_usage_restrictions` | Update data usage restrictions |

---

## Authentication

Uses **HTTP Basic Auth** — `Authorization: Basic base64(username:password)`.

Set these three environment variables:

```env
PEGA_BASE_URL=https://your-server.pegacloud.net/prweb
PEGA_USERNAME=your_operator_id
PEGA_PASSWORD=your_password
```

All three are **required** — the server will throw on startup if any are missing.

---

## Installation & Build

```bash
cd pega-dx-v1-mcp
npm install
npm run build
```

## Running in Claude Desktop

### Step 1 — Prerequisites

- [Node.js 18+](https://nodejs.org/) installed
- [Claude Desktop](https://claude.ai/download) installed
- A running Pega instance (8.3–8.6, section-based UI)

---

### Step 2 — Clone & Build

```bash
git clone https://github.com/alamaticz/Pega-DX-API-v1-MCP.git
cd Pega-DX-API-v1-MCP
npm install
npm run build
```

After the build, a `dist/index.js` file will be created. Note the **full absolute path** to this file — you'll need it in the next step.

- **Windows example:** `C:\Users\YourName\Pega-DX-API-v1-MCP\dist\index.js`
- **macOS / Linux example:** `/Users/yourname/Pega-DX-API-v1-MCP/dist/index.js`

---

### Step 3 — Edit Claude Desktop Config

Open the Claude Desktop configuration file in a text editor:

| OS | Config file location |
|----|----------------------|
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |
| **macOS** | `~/Library/Application Support/Claude/claude_desktop_config.json` |

If the file does not exist, create it.

Add the following (replace the `args` path and credentials with your own values):

**Windows:**
```json
{
  "mcpServers": {
    "pega-dx-v1": {
      "command": "node",
      "args": ["C:\\Users\\YourName\\Pega-DX-API-v1-MCP\\dist\\index.js"],
      "env": {
        "PEGA_BASE_URL": "https://your-server.pegacloud.net/prweb",
        "PEGA_USERNAME": "your_operator_id",
        "PEGA_PASSWORD": "your_password"
      }
    }
  }
}
```

**macOS / Linux:**
```json
{
  "mcpServers": {
    "pega-dx-v1": {
      "command": "node",
      "args": ["/Users/yourname/Pega-DX-API-v1-MCP/dist/index.js"],
      "env": {
        "PEGA_BASE_URL": "https://your-server.pegacloud.net/prweb",
        "PEGA_USERNAME": "your_operator_id",
        "PEGA_PASSWORD": "your_password"
      }
    }
  }
}
```

> **Note:** If you already have other MCP servers in the config, add the `"pega-dx-v1"` block inside the existing `"mcpServers"` object — do not create a second `"mcpServers"` key.

---

### Step 4 — Restart Claude Desktop

Fully quit and reopen Claude Desktop. The Pega MCP tools will appear in the tools panel (hammer icon).

---

### Step 5 — Verify Connection

In a new Claude conversation, ask:

> *"Ping my Pega service"*

Claude will call `ping_pega_service` and confirm connectivity. If it fails, double-check your `PEGA_BASE_URL`, credentials, and that your Pega server is reachable from your machine.

---

## Development (no build)

```bash
npm run dev
```

---

## V1 vs V2 Quick Reference

| Feature | V1 (This MCP) | V2 (MarcoLooy MCP) |
|---------|--------------|---------------------|
| `GET /cases` list | Yes (V1-exclusive) | No — use data views |
| Stage management | No | Yes |
| Followers / Tags | No | Yes |
| Participants | No | Yes |
| Screen flow nav | No | Yes |
| Bulk actions | No | Yes |
| Advanced data views | No | Yes |
| DevOps APIs | Yes | No |
| System management | Yes | No |
| Data privacy (GDPR) | Yes | No |
| Collaboration spaces | Yes | No |
| Pega version | 8.3+ | 8.7+ |
| UI target | Section-based | Constellation |
