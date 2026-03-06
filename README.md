# Pega DX API V1 MCP Server

An MCP (Model Context Protocol) server for the **Pega Traditional DX API V1** (`/prweb/api/v1/`).

Designed for Pega applications built on **section-based UIs** (UI-Kit / Theme Cosmos / Pega 8.3–8.6). For Constellation-based apps use the [V2 MCP](https://github.com/MarcoLooy/pega-dx-mcp) instead.

---

## Tools (20 total)

### Service (1)
| Tool | Description |
|------|-------------|
| `ping_pega_service` | Test connectivity and verify authentication |

### Cases (6)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_cases` | `GET /cases` | List all user's cases (max 500, V1-exclusive) |
| `create_case` | `POST /cases` | Create a new case |
| `get_case` | `GET /cases/{ID}` | Get case details |
| `update_case` | `PUT /cases/{ID}` | Update case fields via action |
| `delete_case` | `DELETE /cases/{ID}` | Delete a case (Create stage only) |
| `get_case_view` | `GET /cases/{ID}/views/{viewID}` | Get a specific case view/harness |

### Assignments (5)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_assignments` | `GET /assignments` | List user's worklist |
| `get_assignment` | `GET /assignments/{ID}` | Get assignment details |
| `get_assignment_action` | `GET /assignments/{ID}/actions/{actionID}` | Get flow action form metadata |
| `perform_assignment_action` | `PATCH /assignments/{ID}/actions/{actionID}` | Submit a flow action |
| `refresh_assignment_action` | `PUT /assignments/{ID}/actions/{actionID}/refresh` | Refresh form after field change |

### Case Types (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_case_types` | `GET /casetypes` | List available case types |
| `get_case_type` | `GET /casetypes/{ID}` | Get case type metadata |
| `refresh_case_type_view` | `PUT /casetypes/{ID}/refresh` | Refresh new-case form |

### Data Pages (2)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_data_page` | `GET /data/{dataViewID}` | Retrieve data page content |
| `post_data_page` | `POST /data/{dataViewID}` | Post params to data page |

### Attachments (3)
| Tool | Endpoint | Description |
|------|----------|-------------|
| `get_case_attachments` | `GET /cases/{ID}/attachments` | List case attachments |
| `add_case_attachment` | `POST /cases/{ID}/attachments` | Add file or URL attachment |
| `delete_case_attachment` | `DELETE /cases/{ID}/attachments/{attachmentID}` | Delete attachment |

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

## Claude Desktop / Cursor Config

Add to your `claude_desktop_config.json` (or equivalent):

```json
{
  "mcpServers": {
    "pega-dx-v1": {
      "command": "node",
      "args": ["/absolute/path/to/pega-dx-v1-mcp/dist/index.js"],
      "env": {
        "PEGA_BASE_URL": "https://your-server.pegacloud.net/prweb",
        "PEGA_USERNAME": "your_operator_id",
        "PEGA_PASSWORD": "your_password"
      }
    }
  }
}
```

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
| Pega version | 8.3+ | 8.7+ |
| UI target | Section-based | Constellation |
