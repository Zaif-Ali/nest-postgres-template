import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743018953123 implements MigrationInterface {
    name = 'Migration1743018953123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

}
