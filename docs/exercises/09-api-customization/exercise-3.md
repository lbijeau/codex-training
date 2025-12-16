# Exercise 3: Configure MCP Servers

## Objective

Learn to extend Codex capabilities by configuring and using MCP (Model Context Protocol) servers.

## Background

MCP servers connect Codex to external tools and services—databases, APIs, browsers, and more. They add new tools that Codex can use just like built-in ones.

## Part A: Understand MCP Architecture

**Task**: Map out how MCP servers extend Codex.

1. Study the MCP architecture:
   ```
   ┌─────────────────────────────────────────────────────────┐
   │                        Codex                            │
   └─────────────────────────┬───────────────────────────────┘
                             │ MCP Protocol
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
   │  GitHub MCP   │ │ Postgres MCP  │ │  Custom MCP   │
   └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
           │                 │                 │
           ▼                 ▼                 ▼
   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
   │  GitHub API   │ │   Database    │ │ Your Service  │
   └───────────────┘ └───────────────┘ └───────────────┘
   ```

2. List common MCP servers and their tools:
   | MCP Server | Tools Provided | Use Case |
   |------------|----------------|----------|
   | server-github | Issues, PRs, repos | GitHub integration |
   | server-postgres | Query, schema | Database access |
   | server-filesystem | Extended read/write | File access beyond project |
   | server-puppeteer | Navigate, screenshot | Browser automation |
   | server-slack | Send, read messages | Team communication |

3. Identify which servers would benefit your workflow

## Part B: Configure a GitHub MCP Server

**Task**: Set up the GitHub MCP server for PR and issue management.

1. Ensure GitHub CLI is authenticated:
   ```bash
   gh auth status
   # If not authenticated:
   gh auth login
   ```

2. Create MCP configuration:
   ```toml
   # ~/.codex/config.toml

   [mcp_servers.github]
   command = "npx"
   args = ["-y", "@modelcontextprotocol/server-github"]
   env_vars = ["GITHUB_TOKEN"]
   startup_timeout_sec = 20
   ```

3. Set up the environment variable:
   ```bash
   # Get a personal access token from GitHub Settings > Developer settings
   export GITHUB_TOKEN="ghp_your_token_here"

   # Or add to your shell profile
   echo 'export GITHUB_TOKEN="ghp_your_token_here"' >> ~/.zshrc
   ```

4. Test the configuration:
   ```
   You: "List my open pull requests using the GitHub MCP"

   Codex should use the github MCP to query your PRs.
   ```

## Part C: Configure a Database MCP Server

**Task**: Set up database access through MCP.

1. Configure PostgreSQL MCP:
   ```toml
   # ~/.codex/config.toml

   [mcp_servers.postgres]
   command = "npx"
   args = ["-y", "@modelcontextprotocol/server-postgres"]
   env_vars = ["DATABASE_URL"]
   startup_timeout_sec = 20
   ```

2. Set the database URL:
   ```bash
   # For local development
   export DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

   # Use read-only credentials for safety
   export DATABASE_URL="postgresql://readonly:password@localhost:5432/mydb"
   ```

3. Create a read-only database user (recommended):
   ```sql
   -- In PostgreSQL
   CREATE USER codex_readonly WITH PASSWORD 'secure_password';
   GRANT CONNECT ON DATABASE mydb TO codex_readonly;
   GRANT USAGE ON SCHEMA public TO codex_readonly;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO codex_readonly;
   ```

4. Test database queries:
   ```
   You: "Show me the schema of the users table"

   Codex should query the database and show you the table structure.
   ```

## Part D: Create a Custom MCP Server

**Task**: Build a simple custom MCP server for team-specific tools.

1. Set up the project:
   ```bash
   mkdir my-company-mcp
   cd my-company-mcp
   npm init -y
   npm install @modelcontextprotocol/sdk
   ```

2. Create the server:
   ```typescript
   // src/index.ts
   import { Server } from "@modelcontextprotocol/sdk/server/index.js";
   import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

   const server = new Server(
     {
       name: "my-company-tools",
       version: "1.0.0",
     },
     {
       capabilities: {
         tools: {},
       },
     }
   );

   // Define available tools
   server.setRequestHandler("tools/list", async () => ({
     tools: [
       {
         name: "lookup_config",
         description: "Look up configuration value by key",
         inputSchema: {
           type: "object",
           properties: {
             key: {
               type: "string",
               description: "Configuration key to look up",
             },
           },
           required: ["key"],
         },
       },
       {
         name: "get_feature_flags",
         description: "Get current feature flag settings",
         inputSchema: {
           type: "object",
           properties: {
             environment: {
               type: "string",
               enum: ["development", "staging", "production"],
               description: "Environment to check",
             },
           },
         },
       },
     ],
   }));

   // Handle tool calls
   server.setRequestHandler("tools/call", async (request) => {
     const { name, arguments: args } = request.params;

     if (name === "lookup_config") {
       // Simulated config lookup
       const configs: Record<string, string> = {
         api_url: "https://api.example.com",
         timeout: "30000",
         max_retries: "3",
       };

       const value = configs[args.key as string] || "Not found";
       return {
         content: [{ type: "text", text: value }],
       };
     }

     if (name === "get_feature_flags") {
       // Simulated feature flags
       const flags = {
         development: { darkMode: true, newCheckout: true, beta: true },
         staging: { darkMode: true, newCheckout: true, beta: false },
         production: { darkMode: true, newCheckout: false, beta: false },
       };

       const env = (args.environment as string) || "development";
       return {
         content: [
           {
             type: "text",
             text: JSON.stringify(flags[env as keyof typeof flags], null, 2),
           },
         ],
       };
     }

     return {
       content: [{ type: "text", text: `Unknown tool: ${name}` }],
       isError: true,
     };
   });

   // Start the server
   async function main() {
     const transport = new StdioServerTransport();
     await server.connect(transport);
   }

   main().catch(console.error);
   ```

3. Configure TypeScript:
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "NodeNext",
       "moduleResolution": "NodeNext",
       "outDir": "./dist",
       "strict": true,
       "esModuleInterop": true
     },
     "include": ["src/**/*"]
   }
   ```

4. Build and register:
   ```bash
   # Build
   npx tsc

   # Add to config.toml
   cat >> ~/.codex/config.toml << 'EOF'

   [mcp_servers.my-company]
   command = "node"
   args = ["dist/index.js"]
   cwd = "/path/to/my-company-mcp"
   startup_timeout_sec = 10
   EOF
   ```

5. Test the custom server:
   ```
   You: "What's the api_url configuration?"

   Codex should use your custom MCP to look up the value.
   ```

---

## Hints

<details>
<summary>Hint 1: Debugging MCP servers</summary>

Test your MCP server standalone:
```bash
# Run the server manually
node dist/index.js

# Send a test request (in another terminal)
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | node dist/index.js
```

Add logging:
```typescript
server.setRequestHandler("tools/call", async (request) => {
  console.error("Tool call:", JSON.stringify(request.params));
  // ... rest of handler
});
```
</details>

<details>
<summary>Hint 2: Security best practices</summary>

- Use read-only database credentials
- Store secrets in environment variables
- Limit MCP server permissions
- Audit MCP tool usage

```toml
[mcp_servers.postgres]
# Only pass through specific env vars
env_vars = ["DATABASE_URL"]
# Don't pass: DATABASE_ADMIN_URL, AWS_SECRET_KEY, etc.
```
</details>

<details>
<summary>Hint 3: Common issues</summary>

**Server won't start:**
- Check the command path
- Verify dependencies are installed
- Look for startup errors in logs

**Tools not appearing:**
- Verify `tools/list` handler returns correct format
- Check for JSON syntax errors
- Restart Codex after config changes
</details>

---

## Solution Discussion

<details>
<summary>Click to reveal solution discussion</summary>

### Complete MCP Configuration

```toml
# ~/.codex/config.toml

[mcp_servers.github]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
env_vars = ["GITHUB_TOKEN"]
startup_timeout_sec = 20

[mcp_servers.postgres]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-postgres"]
env_vars = ["DATABASE_URL"]
startup_timeout_sec = 20

[mcp_servers.filesystem]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/data"]
startup_timeout_sec = 10

[mcp_servers.my-company]
command = "node"
args = ["dist/index.js"]
cwd = "/home/user/my-company-mcp"
startup_timeout_sec = 10
```

### MCP Server Patterns

**Database MCP Best Practices:**
```typescript
// Always use parameterized queries
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "query") {
    const query = request.params.arguments.query;

    // Validate query is SELECT only
    if (!query.trim().toUpperCase().startsWith("SELECT")) {
      return {
        content: [{ type: "text", text: "Only SELECT queries allowed" }],
        isError: true
      };
    }

    // Execute query...
  }
});
```

**Custom Tool Pattern:**
```typescript
interface Tool {
  name: string;
  description: string;
  inputSchema: object;
  handler: (args: unknown) => Promise<string>;
}

const tools: Tool[] = [
  {
    name: "my_tool",
    description: "Does something useful",
    inputSchema: { type: "object", properties: {...} },
    handler: async (args) => {
      // Implementation
      return "result";
    }
  }
];

server.setRequestHandler("tools/list", async () => ({
  tools: tools.map(t => ({
    name: t.name,
    description: t.description,
    inputSchema: t.inputSchema
  }))
}));

server.setRequestHandler("tools/call", async (request) => {
  const tool = tools.find(t => t.name === request.params.name);
  if (!tool) {
    return { content: [{ type: "text", text: "Unknown tool" }], isError: true };
  }

  const result = await tool.handler(request.params.arguments);
  return { content: [{ type: "text", text: result }] };
});
```

### Key Insight

MCP servers transform Codex from a coding assistant into an integrated development platform. Each server adds new capabilities:
- **GitHub MCP**: Full repository management
- **Database MCP**: Direct data access
- **Custom MCP**: Team-specific integrations

### MCP Pattern

```
1. Identify needed capability
   ↓
2. Check if official server exists
   ↓
3. If not, build custom server
   ↓
4. Configure with appropriate permissions
   ↓
5. Test thoroughly before production use
```

</details>

---

## Reflection Questions

1. Which MCP servers would add the most value to your workflow?
2. What custom tools would help your team?
3. How do you balance capability with security?

---

**Next**: [Exercise 4: Build Session Automation Scripts](exercise-4.md)
