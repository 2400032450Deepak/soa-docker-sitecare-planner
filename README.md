# SiteCare Planner

A website maintenance plan manager built with React, Spring Boot, PostgreSQL, and Docker.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + Vite + Axios, served by nginx |
| Backend | Java, Spring Boot, PostgreSQL |
| Containers | Docker, Docker Compose |
| CI/CD | GitHub Actions |

## How to Run

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8081/WebsiteMaintenancePlan/DisplayAll

## Stop

```bash
docker compose down
```
