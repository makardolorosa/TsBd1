import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostgresMigration1716844488242 implements MigrationInterface {
  name = 'PostgresMigration1716844488242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "PostScr" character varying(200) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "PostScr"`);
  }
}
