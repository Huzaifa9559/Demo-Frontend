# Backend Structure

## Folder Structure

```
backend/
├── src/
│   ├── app.module.ts                    # Root module
│   ├── main.ts                          # Application entry point
│   ├── config/                          # Configuration module
│   │   ├── config.module.ts
│   │   ├── database.config.ts
│   │   └── jwt.config.ts
│   ├── database/                        # Database setup
│   │   ├── database.module.ts
│   │   ├── data-source.ts               # TypeORM CLI data source
│   │   ├── migrations/                  # Database migrations
│   │   │   └── 1700000000000-InitialMigration.ts
│   │   └── seed.ts                      # Database seeding script
│   ├── common/                          # Shared utilities
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── public.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── middlewares/
│   │   │   └── logging.middleware.ts
│   │   └── utils/
│   │       └── response.util.ts
│   ├── auth/                            # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── dto/
│   │       └── login.dto.ts
│   ├── users/                           # Users module
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   └── projects/                        # Projects module
│       ├── projects.module.ts
│       ├── projects.controller.ts
│       ├── projects.service.ts
│       ├── entities/
│       │   └── project.entity.ts
│       ├── dto/
│       │   ├── create-project.dto.ts
│       │   ├── update-project.dto.ts
│       │   └── query-projects.dto.ts
│       └── seed/
│           └── projects.seed.ts
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example
```

## Key Files

### Entities

**User Entity** (`src/users/entities/user.entity.ts`)
- Fields: id (uuid), email (unique), password (hashed), name, role (enum), timestamps

**Project Entity** (`src/projects/entities/project.entity.ts`)
- Fields: id (uuid), projectCode (unique), name, owner, status (enum), dueDate, tickets, timestamps

### DTOs

**LoginDto** - email, password
**CreateProjectDto** - projectCode, name, owner, status, dueDate, tickets
**UpdateProjectDto** - Partial of CreateProjectDto
**QueryProjectsDto** - search, status, range, page, take, sortBy, sortOrder

### Services

**AuthService** - Handles login, JWT generation, user validation
**UsersService** - User CRUD operations
**ProjectsService** - Project CRUD with filtering, pagination, sorting

### Guards & Decorators

- `JwtAuthGuard` - Validates JWT tokens
- `RolesGuard` - Enforces role-based access
- `@CurrentUser()` - Injects current user from JWT
- `@Roles(...)` - Specifies required roles
- `@Public()` - Marks routes as public

### Response Format

All responses follow this structure:
```typescript
{
  success: boolean;
  error: { message: string; details?: string } | null;
  data: T | null;
}
```

## Example Requests & Responses

### POST /auth/login

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "error": null,
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin"
    },
    "token": "jwt-token-here"
  }
}
```

### GET /auth/me

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "error": null,
  "data": {
    "user": {
      "id": "uuid",
      "email": "admin@example.com",
      "name": "Admin User",
      "role": "admin"
    }
  }
}
```

### GET /projects

**Query Parameters:**
- `search` (optional): Search in name, projectCode, owner
- `status` (optional): all | active | hold | completed | blocked
- `range` (optional): week | month | quarter
- `page` (optional, default: 1): Page number
- `take` (optional, default: 10): Items per page
- `sortBy` (optional, default: dueDate): dueDate | createdAt | projectCode
- `sortOrder` (optional, default: asc): asc | desc

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "error": null,
  "data": {
    "data": [
      {
        "key": "uuid",
        "projectCode": "PRJ-204",
        "name": "Customer portal redesign initiative for premium users",
        "owner": "Jane Cooper",
        "status": "In Progress",
        "dueDate": "Jan 24, 2026",
        "tickets": 42
      }
    ],
    "meta": {
      "page": 1,
      "take": 10,
      "totalItems": 12,
      "totalPages": 2,
      "hasPreviousPage": false,
      "hasNextPage": true
    }
  }
}
```

### POST /projects (Admin only)

**Request:**
```json
{
  "projectCode": "PRJ-205",
  "name": "New Project",
  "owner": "John Doe",
  "status": "In Progress",
  "dueDate": "2026-12-31",
  "tickets": 0
}
```

**Response (200):**
```json
{
  "success": true,
  "error": null,
  "data": {
    "key": "uuid",
    "projectCode": "PRJ-205",
    "name": "New Project",
    "owner": "John Doe",
    "status": "In Progress",
    "dueDate": "Dec 31, 2026",
    "tickets": 0
  }
}
```

### PATCH /projects/:id (Admin only)

**Request:**
```json
{
  "status": "Completed",
  "tickets": 100
}
```

**Response (200):**
```json
{
  "success": true,
  "error": null,
  "data": {
    "key": "uuid",
    "projectCode": "PRJ-205",
    "name": "New Project",
    "owner": "John Doe",
    "status": "Completed",
    "dueDate": "Dec 31, 2026",
    "tickets": 100
  }
}
```

### DELETE /projects/:id (Admin only)

**Response (204):**
No content

## Error Responses

**401 Unauthorized:**
```json
{
  "success": false,
  "error": {
    "message": "Invalid email or password. Please check your credentials and try again.",
    "details": null
  },
  "data": null
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": {
    "message": "Project not found",
    "details": null
  },
  "data": null
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": {
    "message": "Forbidden resource",
    "details": null
  },
  "data": null
}
```

