# Parallel vs Sequential Execution Example

This example demonstrates the difference between parallel and sequential tool execution.

## Scenario

You need to read 3 configuration files to understand a project's setup.

## Sequential Approach (Slow)

```
Message 1: "Read config/database.json"
→ Codex reads file
→ Returns content

Message 2: "Read config/api.json"
→ Codex reads file
→ Returns content

Message 3: "Read config/cache.json"
→ Codex reads file
→ Returns content

Total: 3 round-trips, 3 Codex responses
```

## Parallel Approach (Fast)

```
Message 1: "Read these files in parallel:
- config/database.json
- config/api.json
- config/cache.json"

→ Codex reads all 3 files simultaneously
→ Returns all content in one response

Total: 1 round-trip, 1 Codex response
```

## Try It Yourself

### Setup

Create test files:

```bash
mkdir -p practice/scratch/config
cd practice/scratch/config

echo '{"host": "localhost", "port": 5432}' > database.json
echo '{"port": 3000, "timeout": 5000}' > api.json
echo '{"provider": "redis", "ttl": 300}' > cache.json
```

### Exercise 1: Sequential

Ask Codex:
```
"Read config/database.json"
```

Wait for response, then:
```
"Read config/api.json"
```

Wait for response, then:
```
"Read config/cache.json"
```

Count: How many messages total?

### Exercise 2: Parallel

Ask Codex:
```
"Read these files in parallel:
- practice/scratch/config/database.json
- practice/scratch/config/api.json
- practice/scratch/config/cache.json"
```

Count: How many messages total?

### Compare

- **Sequential**: 6 messages (3 requests + 3 responses)
- **Parallel**: 2 messages (1 request + 1 response)
- **Speedup**: 3x faster

## Key Takeaway

**Always ask**: "Can these operations run simultaneously?"

If yes → **Request in parallel**
If no (dependent) → Sequential is necessary

## Related Pattern

See: [docs/patterns/speed/parallel-execution.md](../../docs/patterns/speed/parallel-execution.md)
