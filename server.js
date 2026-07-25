import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";


// Create the MCP server
const server = new McpServer({
    name: "Afsar's Calendar",
    version: "1.0.0",
})

// Set transfort
async function init() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

// call the initialization
init();