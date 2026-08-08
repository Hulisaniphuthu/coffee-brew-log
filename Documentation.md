# Coffee Brew Log ☕️

A tiny full-stack app for logging every brew at your micro-roastery: create,
read, filter, edit, and delete brew entries.

## What it does

- **Create** a brew entry (coffee name, brew method, dose, water, brew time,
  rating, optional notes) and save it to the database
- **Read** all brews in a list/card view, newest first
- **Filter** the list by brew method (Pour Over, Espresso, AeroPress, French
  Press, Cold Brew, Moka Pot)
- **Edit** an existing brew
- **Delete** a brew, with a confirmation step

The page title always reads `Brews: {count}`, reflecting the number of
brews currently shown.

## Tech stack

| Layer     | Choice                                            |
|-----------|----------------------------------------------------|
| Front-end | React (Vite) + Tailwind CSS                        |
| Back-end  | Node.js + Express                                   |
| ORM / DB  | Sequelize + SQLite (file-based, zero setup)         |

> **Why SQLite over Postgres/MySQL for this project:** the brief allows any
> SQL database behind an ORM. SQLite keeps local setup to zero external
> services (no DB server to install or credentials to configure) while still
> going through a real ORM (Sequelize) with real validation, migrations-style
> `sync()`, and SQL underneath. Because Sequelize is dialect-agnostic, this
> can be pointed at Postgres/MySQL later by changing the `dialect` and
> connection config in `backend/src/config/database.js` and swapping the
> driver package — no model or controller code needs to change.

## Project structure

```
coffee-brew-log/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app entrypoint
│   │   ├── config/database.js     # Sequelize/SQLite connection (reads ENV)
│   │   ├── models/Brew.js         # Brew model + validation + method list
│   │   ├── controllers/           # Route handlers (CRUD + validation)
│   │   └── routes/                # /api/brews and /api/meta routers
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Top-level state + data flow
│   │   ├── api/brews.js           # Fetch wrapper for the JSON API
│   │   ├── components/            # Header, Toolbar, BrewList, BrewCard,
│   │   │                          #   BrewForm (create/edit), ConfirmDeleteModal
│   │   └── utils/roast.js         # Rating → roast-colour helper
│   ├── .env.example
│   └── package.json
├── Documentation.md
└── deployment.md
```

## API reference

Base path: `/api`

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| GET    | `/brews`             | List all brews (optional `?method=`)  |
| GET    | `/brews/:id`         | Get one brew                          |
| POST   | `/brews`             | Create a brew (all fields required except `notes`) |
| PUT    | `/brews/:id`         | Update a brew                         |
| DELETE | `/brews/:id`         | Delete a brew                         |
| GET    | `/meta/methods`      | List of valid brew methods            |
| GET    | `/health`            | Health check                          |

All required fields (`coffeeName`, `method`, `doseGrams`, `waterMl`,
`brewTimeSeconds`, `rating`) are validated **server-side** as well as in the
front-end form, so the API can't be tricked into saving an incomplete
record. Responses use standard status codes: `200` OK, `201` Created, `204`
No Content (delete), `400` Bad Request (validation), `404` Not Found, `500`
Server Error.

## Setup instructions

### Prerequisites

- Node.js 18+ and npm

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev        # starts on http://localhost:4000 (nodemon, auto-restart)
# or: npm start     # plain node, no auto-restart
```

The SQLite database file is created automatically on first run (see
`DATABASE_PATH` in `.env`). No manual migration step is needed.

### 2. Frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev         # starts on http://localhost:5173
```

Open `http://localhost:5173` in your browser. The front-end talks to the
API at the URL set in `frontend/.env` (`VITE_API_URL`).

### Running both at once

Two terminals (as above) is simplest for this project size. If you'd
rather use one command, a tool like `concurrently` can be added later.

## Environment variables

**backend/.env**

| Variable        | Description                              | Example                  |
|------------------|-------------------------------------------|---------------------------|
| `PORT`           | Port the Express server listens on        | `4000`                    |
| `DATABASE_PATH`  | Path to the SQLite file                    | `./data/brews.sqlite`     |
| `CLIENT_ORIGIN`  | Allowed CORS origin (the front-end URL)    | `http://localhost:5173`   |

**frontend/.env**

| Variable        | Description                  | Example                          |
|------------------|-------------------------------|------------------------------------|
| `VITE_API_URL`   | Base URL of the backend API   | `http://localhost:4000/api`       |

No secrets are hardcoded anywhere in the source — both `.env` files are
git-ignored, and `.env.example` files document what's needed to run the
project locally or in production.

## Design notes

The UI takes a "roastery spec sheet" approach: each brew is a card with a
roast-colour bar (derived from its rating, light → dark) down the left edge,
and brew stats (dose/water/time) set in a monospace face like a scale
readout. Fonts are Fraunces (display) + IBM Plex Sans (body) + IBM Plex Mono
(numbers), on a dark roasted-bean palette with a crema-gold accent.
