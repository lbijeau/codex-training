# Jupyter-Oriented Lab

Goal: Show how to pair Codex with Jupyter notebooks for data exploration or quick utilities. Codex does not run inside Jupyter; use it alongside the notebook for code generation, refactors, or test scaffolding.

Prerequisites:
- Python venv activated; `pip install jupyter pytest` (or `pip install -r requirements.txt` if present).
- A notebook file `notebooks/lab.ipynb` with at least one cell that loads data or prints text.

Workflow outline:
1) Open the notebook: `jupyter notebook notebooks/lab.ipynb` (or VS Code notebook UI).
2) In a separate terminal, run Codex in the same repo root.
3) Ask Codex to generate or refactor helper code, then paste the result into a notebook cell.

Exercise steps:
- **Step 1: Inspect context**  
  Run: `codex "list csv or data files and propose a function to load and summarize them in pandas"`  
  Approve reads only.

- **Step 2: Generate a helper function**  
  Run: `codex exec "write a pandas helper in notebooks/helpers.py with load_csv(path) and summarize(df) that returns row count and column stats"`  
  Approve the write; review the diff.  
  Paste the helper into a notebook cell or import it.

- **Step 3: Use it in Jupyter**  
  In the notebook, call `from notebooks.helpers import load_csv, summarize` and run against a sample file.  
  Verify output in the cell. If no data exists, create a tiny CSV first.

- **Step 4: Add a quick test**  
  Ask: `codex exec "add tests/test_helpers.py with a fixture small CSV and assertions for summarize()"`  
  Run `pytest tests/test_helpers.py -q` to ensure green.

- **Step 5: Safety check**  
  Confirm Codex never touched notebook metadata unexpectedly; keep approvals on for any notebook writes.

Facilitator notes:
- Remind learners Codex cannot see live notebook variables; describe state explicitly.
- Encourage deterministic sample data to keep tests stable.
- If time is short, skip pytest and just run the helper in a cell.
