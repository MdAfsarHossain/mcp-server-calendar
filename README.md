# 📅 Afsar's Google Calendar MCP Server

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Model Context Protocol](https://img.shields.io/badge/MCP-SDK%20v1.29-6B46C1?style=for-the-badge)](https://modelcontextprotocol.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

A lightweight **Model Context Protocol (MCP)** server built with Node.js that enables AI assistants (such as Claude Desktop, Cursor, Antigravity, or Goose) to query Google Calendar events for any specific date using standard I/O (stdio).

---

## ✨ Features

- 🛠️ **MCP Stdio Transport**: Easy integration into any AI client supporting the Model Context Protocol.
- 📆 **Date-based Event Retrieval**: Fetch scheduled meetings and events for any specific date via Google Calendar API v3.
- ⚡ **Fast & Simple Auth**: Uses standard Google Calendar API key authentication.
- 🔒 **Input Validation**: Employs `zod` schema validation for safe date handling.

---

## 📋 Prerequisites

Before running or connecting to the server, ensure you have:

1. **Node.js**: v18.0.0 or higher installed.
2. **Google Public API Key**: A Google Cloud Console project with the **Google Calendar API** enabled and an active API key (`GOOGLE_PUBLIC_API_KEY`).
3. **Calendar ID**: A Google Calendar ID (e.g. `your_email@gmail.com` or a public group calendar ID). *Note: The calendar must be public or accessible for API key reading.*

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/MdAfsarHossain/mcp-server-calendar.git
cd mcp-server-calendar
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Fill in your Google Calendar API credentials in `.env`:

```env
GOOGLE_PUBLIC_API_KEY="YOUR_GOOGLE_PUBLIC_API_KEY"
CALENDAR_ID="YOUR_CALENDAR_ID"
```

### 3. Run the Server

```bash
npm start
```

---

## 🛠️ MCP Tool Reference

### `getMyCalendarDataByDate`

Fetches events/meetings scheduled on a specific date.

- **Parameters**:
  | Field | Type | Description | Required |
  |-------|------|-------------|----------|
  | `date` | `string` | A valid date string (e.g., `YYYY-MM-DD`, `2026-07-26`) | Yes |

- **Example Output**:
  ```json
  {
    "meetings": [
      "Team Sync at 2026-07-26T10:00:00Z",
      "Project Review at 2026-07-26T14:30:00Z"
    ]
  }
  ```

---

## 🔌 MCP Client Integration

Add this configuration to your MCP client setup (e.g., `claude_desktop_config.json` or Antigravity / Cursor MCP config):

```json
{
  "mcpServers": {
    "myCalendarData": {
      "command": "node",
      "args": [
        "/absolute/path/to/mcp-server-calendar/server.js"
      ],
      "env": {
        "GOOGLE_PUBLIC_API_KEY": "YOUR_GOOGLE_PUBLIC_API_KEY",
        "CALENDAR_ID": "YOUR_CALENDAR_ID"
      }
    }
  }
}
```

---

## 📁 Repository Structure

```
mcp-server-calendar/
├── .env.example       # Example environment variables
├── .gitignore         # Ignored files and folders
├── package.json       # Node.js dependencies and scripts
├── server.js          # MCP server initialization & Google Calendar tool definition
└── README.md          # Project documentation
```

---

## 📄 License

This project is licensed under the [ISC License](package.json).