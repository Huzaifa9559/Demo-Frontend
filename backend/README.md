# Backend API

NestJS backend for MyFirstAntDesignProject with PostgreSQL, TypeORM, and JWT authentication.

## Prerequisites

- Node.js (LTS version)
- PostgreSQL 12+
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend` directory (copy from `.env.example`):
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=myfirstantdesignproject
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1h
PORT=3000
NODE_ENV=development
```

3. Create the PostgreSQL database:
```sql
CREATE DATABASE myfirstantdesignproject;
```

4. Run migrations:
```bash
npm run typeorm:migration:run
```

5. Seed the database:
```bash
npm run db:seed
```

## Running the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /auth/login` - Login (public)
- `GET /auth/me` - Get current user (protected)
- `POST /auth/logout` - Logout (protected)

### Projects

- `GET /projects` - List projects with filtering and pagination (protected)
- `GET /projects/:id` - Get project by ID (protected)
- `POST /projects` - Create project (admin only)
- `PATCH /projects/:id` - Update project (admin only)
- `DELETE /projects/:id` - Delete project (admin only)

## Default Users

- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

## Database Migrations

Generate a new migration:
```bash
npm run typeorm:migration:generate
```

Run migrations:
```bash
npm run typeorm:migration:run
```

Revert last migration:
```bash
npm run typeorm:migration:revert
```

## Project Structure

```
src/
├── auth/              # Authentication module
├── users/             # Users module
├── projects/          # Projects module
├── common/           # Shared utilities, guards, decorators, filters
├── config/           # Configuration
└── database/         # Database setup, migrations, seeding
```

