import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResourcesTable1700000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "resource_type_enum" AS ENUM('document', 'link', 'file', 'video', 'image', 'other');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE "resource_status_enum" AS ENUM('active', 'archived');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create resources table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "resources" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" varchar NOT NULL,
        "description" text NULL,
        "type" "resource_type_enum" NOT NULL DEFAULT 'other',
        "category" varchar NULL,
        "url" varchar NOT NULL,
        "tags" text[] NOT NULL DEFAULT '{}',
        "status" "resource_status_enum" NOT NULL DEFAULT 'active',
        "author" varchar NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_resources" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "resources"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "resource_status_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "resource_type_enum"`);
  }
}

