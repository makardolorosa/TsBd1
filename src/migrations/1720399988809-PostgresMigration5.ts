import { MigrationInterface, QueryRunner } from "typeorm";

export class PostgresMigration51720399988809 implements MigrationInterface {
    name = 'PostgresMigration51720399988809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
