import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigration21718658030378 implements MigrationInterface {
  name = 'PostgresMigration21718658030378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "age" integer NOT NULL, "height" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "PostScr"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "PostScr" character varying(200) NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
