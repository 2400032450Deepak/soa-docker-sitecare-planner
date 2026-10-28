# SiteCare Planner

Full-stack website maintenance plan manager, containerized with Docker Compose.

| Layer | Tech |
|---|---|
| Frontend | React (JSX) + Vite + Axios, served by nginx |
| Backend | Java, Spring Boot, validation, Swagger UI |
| Database | PostgreSQL |
| Containers | Docker, Docker Compose |
| CI/CD | GitHub Actions -> Docker Hub |

## Run everything

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8081/WebsiteMaintenancePlan/DisplayAll
- Swagger UI: http://localhost:8081/swagger-ui.html

Stop with `docker compose down` (add `-v` to also delete the database volume).

## GitHub Actions secrets

Add these in the repo under Settings > Secrets and variables > Actions:

- `DOCKERHUB_USERNAME`: your Docker Hub username
- `DOCKERHUB_TOKEN`: a Docker Hub access token (Account settings > Security)

Every push to `main` builds and pushes `sitecare-backend` and `sitecare-frontend`.
