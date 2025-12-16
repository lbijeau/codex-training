# Exercise 5: Function Calling Exploration

Goal: Understand how to expose your helper scripts as functions and how Codex uses them to reason about structured data.

## Part A: Identify the helpers you already need
1. List three operations you frequently ask Codex to do where it would help to have a structured helper (e.g., read a file, list TODOs, run tests).
2. For each operation, sketch the input parameters and the shape of the response.
3. Record these designs in `codex_helpers/functions.json` in the following form:
   ```json
   {
     "name": "your_helper",
     "description": "What it does",
     "parameters": { ... }
   }
   ```

## Part B: Implement one helper
1. Choose one helper from Part A and implement it as a function in `codex_helpers/`. A simple example:
   ```python
   def list_todos(paths: list[str]) -> dict:
       todos = []
       for path in paths:
           with open(path) as f:
               for num, line in enumerate(f, 1):
                   if "TODO" in line:
                       todos.append({"path": path, "line": num, "text": line.strip()})
       return {"todos": todos}
   ```
2. Write tests or a script (`helpers/test_helper.py`) to ensure the helper returns structured data.
3. Register it in `functions.json` with accurate parameter types.

## Part C: Use the function in a session
1. Start a Codex session with the prompt template for analysis:
   - System: “You are Codex, expert at interpreting helper outputs.”
   - User: “Please gather all TODO comments from the backend service.”
   - Register the helper you implemented via the `functions` array.
2. When Codex issues the `function_call`, run your helper, capture the JSON, and feed it back as a `function` message.
3. Ask Codex to summarize the helper output and suggest the next three actions.
4. Evaluate the result:
   - Was the helper schema clear?
   - Did Codex call the helper with the right arguments?
   - Did returning structured JSON keep the reasoning precise?

## Reflection
- What helper would you add next?
- Where do you need tighter validation or sanitization before exposing a helper?
- How can you document the helper catalog so teammates reuse the same schema?
