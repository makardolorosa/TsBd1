import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigration41720129807841 implements MigrationInterface {
  name = 'PostgresMigration41720129807841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "age" TO "isActive"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isActive" boolean DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isActive" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "isActive" TO "age"`
    );
  }
}
