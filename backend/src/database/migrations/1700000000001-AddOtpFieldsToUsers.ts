import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOtpFieldsToUsers1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "otp" varchar NULL,
      ADD COLUMN IF NOT EXISTS "otpExpiry" TIMESTAMP NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "otp",
      DROP COLUMN IF EXISTS "otpExpiry";
    `);
  }
}

