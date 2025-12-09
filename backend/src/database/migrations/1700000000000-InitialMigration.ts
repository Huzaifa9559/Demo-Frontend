import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "user_role_enum" AS ENUM('admin', 'user');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "project_status_enum" AS ENUM('In Progress', 'On Hold', 'Completed', 'Blocked');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "name" varchar NOT NULL,
        "role" "user_role_enum" NOT NULL DEFAULT 'user',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Create projects table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "projectCode" varchar NOT NULL UNIQUE,
        "name" varchar NOT NULL,
        "owner" varchar NOT NULL,
        "status" "project_status_enum" NOT NULL DEFAULT 'In Progress',
        "dueDate" date NOT NULL,
        "tickets" int NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "projects"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "project_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "user_role_enum"`);
  }
}

