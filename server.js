import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google } from "googleapis";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();


// Create the MCP server
const server = new McpServer({
    name: "Afsar's Calendar",
    version: "1.0.0",
})

async function getMyCalendarDataByDate(date) {
    const calendar = google.calendar({
        version: "v3",
        auth: process.env.GOOGLE_PUBLIC_API_KEY
    });

    // Calculate the start and end of the given date (UTC)
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(date);
    // end.setUTCHours(23, 59, 59, 999);
    end.setUTCDate(end.getUTCDate() + 1);

    try {
        const res = await calendar.events.list({
            calendarId: process.env.CALENDAR_ID,
            timeMin: start.toISOString(),
            timeMax: end.toISOString(),
            maxResult: 10,
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = res.data.items || [];
        const meetings = events.map((event) => {
            const start = event.start.dateTime || event.start.date

            return `${event.summary} at ${start}`
        })

        if (meetings.length > 0) {
            return {
                meetings
            }
        } else {
            return {
                meetings: [`No meetings scheduled on ${date}`]
            }
        }

    } catch (error) {
        return {
            error: error.message
        }
    }
}

// Register the tool to MCP
server.tool(
    "getMyCalendarDataByDate",
    {
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format. Please provide a valid date string.",
        })
    },
    async ({ date }) => {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(await getMyCalendarDataByDate(date))
                }
            ]
        }
    }
)

// Set transport
async function init() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

// call the initialization
init();