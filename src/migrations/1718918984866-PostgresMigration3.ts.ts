import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigration31718918984866 implements MigrationInterface {
  name = 'PostgresMigration31718918984866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "height"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(200) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(200) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "height" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastName" character varying(200) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "firstName" character varying(200) NOT NULL`
    );
  }
}
