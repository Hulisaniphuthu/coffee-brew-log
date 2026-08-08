# Deployment

**Live URL:** https://coffee-brew-log-imtn.onrender.com

**Backend API:** https://coffee-brew-log-api-w4xb.onrender.com/api

Both services are deployed on [Render](https://render.com) (free tier).

## What's deployed

- **Backend** — Node/Express + Sequelize/SQLite, deployed as a Render **Web
  Service**, root directory `backend`, build command `npm install`, start
  command `npm start`.
- **Frontend** — React (Vite) + Tailwind, deployed as a Render **Static
  Site**, root directory `frontend`, build command
  `npm install && npm run build`, publish directory `dist`.

## Environment variables (as configured on Render)

**Backend (`coffee-brew-log-api`):**

| Key              | Value                                          |
|-------------------|-------------------------------------------------|
| `DATABASE_PATH`   | `./data/brews.sqlite`                            |
| `CLIENT_ORIGIN`   | `https://coffee-brew-log-imtn.onrender.com`      |

**Frontend (`coffee-brew-log`):**

| Key              | Value                                                    |
|-------------------|------------------------------------------------------------|
| `VITE_API_URL`    | `https://coffee-brew-log-api-w4xb.onrender.com/api`        |

## Issues hit during deployment (and how they were fixed)

### 1. `sqlite3` native binding failed to load — `ERR_DLOPEN_FAILED`

The first backend deploy built successfully but crashed on boot with:
