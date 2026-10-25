# AGENTS.md

Guidance for AI assistants working in this repo. State of the repo as of 2026-10-25.

## Project

Wyrmhoard is a fantasy / tabletop-RPG e-shop (dice, books, minis, accessories), built by Alex as a year-long school project. Inventory and branding are fictional. Planned scope: product catalogue with category filter, product detail page, cart, registration/login with roles (customer, editor, admin), and an admin interface. There are no real payments: checkout creates a test order.

## Rules for assistants (read first)

1. **This is graded school work. Don't hand over full solutions.** Ask what Alex has tried, point at the problem, show the shape of the code. Give full code only after he has shown a real attempt or hit a specific wall. Tooling, config and docs chores can just be done.
2. **AI use must be logged, and undisclosed AI use is graded 5.** The log is `ai-journal.md`. At the end of any session where you helped (explained, reviewed, debugged or wrote anything), draft one entry for it, and remind Alex once if he forgets. Draft only: he adds it himself or confirms before you write it. Never backdate or invent sessions; if you reconstruct one from commit dates, say so.
   - One bullet per entry, starting with the date as `yyyy-mm-dd` (`yyyy-mm-dd to yyyy-mm-dd` for a span).
   - Say what the assistant did (explained, reviewed, showed the shape, wrote code, and which file or feature) and what Alex did himself. Don't claim more or less than what happened.
   - First-person wording he can paste as-is ("Used Claude to ..."). Keep it short and specific, and flag anything you are unsure of.
3. Be honest when you are unsure or haven't verified something. Say so instead of guessing.
4. Keep answers short and take one step at a time. Explain jargon plainly. Alex knows some Rust and Python and basic JS/TS, so analogies to those work.
5. Python tooling is **uv only. Never use pip.**
6. **Never build SQL with f-strings** (SQL injection). Use SQLModel/SQLAlchemy expressions.

## Stack

- Frontend: React 19 + Vite + TypeScript + Tailwind v4. React Router is planned (declarative mode, not framework mode) but not installed yet.
- Backend: FastAPI + SQLModel, in `backend/`.
- Database: SQLite for now (`backend/database.db`, git-ignored). PostgreSQL before deployment (changed from MySQL on 2026-10-25).
- Developed on a CachyOS PC and a MacBook, same repo on both.

## Commands

Frontend, from the repo root:

- `npm install` once, then `npm run dev` (Vite, http://localhost:5173)
- `npm run build` (runs `tsc -b` then `vite build`) and `npm run lint`
- Formatting is Prettier (`.prettierrc`, with the Tailwind class-sorting plugin); `.editorconfig` sets 2 spaces and LF.

Backend, from `backend/`:

- `uv sync` on a new machine, `uv add <package>` to add a dependency
- `uv run fastapi dev main.py` (http://127.0.0.1:8000)
- `uv run python populate.py` reseeds the database with categories and products. It uses `drop_all`/`create_all`, so it is safe while the server runs.

There are no automated tests yet.

## Layout

```
src/
  App.tsx                      page: owns products, categories and filters state
  fetch.ts                     fetchCategories(), fetchProducts(filters)
  types.ts                     Category, Product
  main.tsx, style.css          entry point; Tailwind theme (yellow / dark grey / cream palette)
  components/
    general/                   Header, Footer, Toggle
    products/                  ItemCard
    sidebar/                   FilterSidebar (collapsible "Category" panel with Toggles)
backend/
  main.py                      models, DB setup, routes
  populate.py                  seed script
ai-journal.md                  AI-use log (see rules)
database-diagram.drawio        ER diagram (drawn, only partly built)
```

## Current state

**Backend (`backend/main.py`)**

- Table models `Categories` and `Products` (`Products.category_id` is a foreign key to `categories.id`, with a `Relationship` both ways). Table names are the class names lowercased.
- Plain response models `CategoriesResponse` and `ProductsResponse`; a product is returned with its category nested.
- `GET /products` returns all products. `?category=Dice&category=Books` (repeated parameter, matched by category name) returns only those categories.
- `GET /categories` returns all categories. `GET /products/{id}` does not exist yet (the old mock is commented out).
- CORS allows `http://localhost:5173`. `check_same_thread` is SQLite-only. Tables are created in an `@app.on_event("startup")` hook (deprecated in FastAPI in favour of lifespan; not changed yet).
- Database routes are plain `def`, not `async def`.

**Frontend**

- The shop page loads categories once and products whenever the filter changes.
- Category filtering works end to end. `filters` (an array of selected category names) lives in `App` and is the single source of truth; an empty array means show everything. `FilterSidebar` and `Toggle` are controlled components, and each toggle's `checked` is derived from `filters`.
- Styling uses a Tailwind theme with custom colors and the Jacquard 12 / VT323 fonts. The look is a dark, dithered, fantasy-terminal style.

**Database design.** The ER diagram has Users, Category, Product, DeliveryMethod, PaymentMethod, Orders and OrderItem. Only Category and Product exist in code. Decisions already made in the diagram: `PasswordHash` (never plain text), unique `Email`, a `Role`, order `Status` and `CreatedAt`, a `UnitPrice` snapshot on `OrderItem`, `Archived` and `ImageURL` on items, and the table named `Orders` (`Order` is a reserved word).

## Conventions and gotchas

- Never delete `database.db` while the server runs; the server keeps using the deleted file. Reseed with `populate.py` or restart the server.
- Seed order matters: commit categories before inserting products (foreign key).
- `drop_all` only drops tables the current models know about, so stale tables from older models can linger.
- `Session` is the class, `session` is the open session. `Depends` comes from `fastapi`. `SessionDep` is defined at module level.
- `ForeignKey` takes a string `"table.column"`; relationships are not columns and only appear in JSON if a response model includes them.
- A virtualenv is not portable. Rebuild with `uv sync` on each machine. VS Code's Pylance paths in `.vscode/settings.json` point into `backend/.venv` and include the Python version, so update them if uv changes it.
- CORS origins must match exactly what Vite prints (`localhost` and `127.0.0.1` are different origins).
- A `useEffect` needs a dependency array. `[]` runs once, and `[filters]` reruns when filters change. Dev mode with `<StrictMode>` renders twice and fetches twice on mount; that is expected.
- Type-only imports must use `import type` (`verbatimModuleSyntax` is on).
- macOS is case-insensitive and Linux is not. Rename tracked files with `git mv`, and keep file name casing identical to the import.
- If TypeScript shows ghost errors after renames, delete `node_modules/.tmp` and restart the TS server.
- Don't run the backend from an assistant sandbox against Alex's `.venv`; it belongs to his machine.

## Planned work, roughly in order

1. Finish filter polish (types for the setter props, error handling in `fetch.ts`).
2. Product detail page: React Router, `/products/:id`, a `GET /products/{id}` route with 404 handling.
3. Cart: add/remove, quantities, total, kept in localStorage.
4. Tailwind styling pass: logo, layout, product images.
5. Users, roles and auth, only if ahead of schedule.
6. Switch to PostgreSQL (`uv add "psycopg[binary]"`, change the URL, drop `check_same_thread`), then deployment. A static host needs a fallback to `index.html` for React Router.

## Checkpoints

Each checkpoint needs a video of the current state and a `.txt` with what is done and the plan. Submit by the Friday before the Sunday deadline. At each checkpoint, draft a short rollup of all AI help since the previous one for the documentation and the `.txt`.

| Checkpoint | Submit by | Deadline |
|---|---|---|
| 1 | Fri 2026-11-06 | Sun 2026-11-08 |
| 2 | Fri 2027-01-15 | Sun 2027-01-17 |
| 3 | Fri 2027-03-26 | Sun 2027-03-28 |
| Final + defense | Fri 2027-05-28 | Sun 2027-05-30 |
