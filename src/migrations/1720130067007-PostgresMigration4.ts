import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigration41720130067007 implements MigrationInterface {
  name = 'PostgresMigration41720130067007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT false`
    );
  }
}
