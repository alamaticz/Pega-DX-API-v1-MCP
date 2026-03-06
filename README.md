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
| Pega version | 8.3+ | 8.7+ |
| UI target | Section-based | Constellation |
