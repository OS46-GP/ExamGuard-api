# ExamGuard AI — Backend

NestJS API for AI-powered exam proctoring and generation.

---

## Module Layout

| Module | Path | Responsibility |
|--------|------|----------------|
| **AuthModule** | `src/auth/` | JWT + local strategies, role guard (`@Roles`), `POST /auth/login`, `POST /auth/register` (working) |
| **UsersModule** | `src/users/` | User CRUD (name, email, passwordHash, role) |
| **ExamModule** | `src/exam/` | Exam + Question schemas, CRUD endpoints, `ExamGenerationService` stub |
| **ProctoringModule** | `src/proctoring/` | `IntegrityEvent` schema, WebSocket gateway (`/proctoring`), `CoordinatorService` stub |
| **RagModule** | `src/rag/` | `ChromaDbService` placeholder, `POST /materials/upload` stub |
| **Common** | `src/common/` | `RolesGuard`, `@Roles` decorator, global exception filter |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose

### 1. Start MongoDB

```bash
docker compose up -d
```

### 2. Confirm Mongo is healthy

```bash
docker compose ps
```

You should see `examguard-mongo` with status `Up` and `(healthy)`.

### 3. Install & run

```bash
# copy env (defaults work with docker-compose.yml)
cp .env.example .env

# install dependencies
npm install

# start (dev mode with watch)
npm run start:dev
```

### Manual Mongo access

```bash
# with mongosh (install separately)
mongosh "mongodb://admin:admin@localhost:27017/examguard?authSource=admin"

# or use any GUI (Compass, TablePlus, etc.) with the same connection string
```

### Tear down (including data)

```bash
docker compose down -v
```

The `-v` flag removes the named volume so the database is fully reset. Omit `-v` to keep data between restarts.

---

## Endpoints (prefix: `/api`)

| Endpoint | Auth | Roles |
|----------|------|-------|
| `POST /auth/register` | — | — |
| `POST /auth/login` | — | — |
| `GET /users/:id` | JWT | — |
| `PATCH /users/:id` | JWT | admin |
| `GET /exams` | JWT | — |
| `POST /exams` | JWT | professor |
| `GET /exams/:id` | JWT | — |
| `PATCH /exams/:id` | JWT | professor |
| `DELETE /exams/:id` | JWT | professor |
| `POST /exams/generate/:materialId` | JWT | professor |
| `GET /exams/:examId/questions` | JWT | — |
| `POST /exams/:examId/questions` | JWT | professor |
| `POST /materials/upload` | JWT | — |

WebSocket namespace `/proctoring` — event: `'proctoring-event'`.
