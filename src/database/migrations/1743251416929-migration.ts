import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743251416929 implements MigrationInterface {
    name = 'Migration1743251416929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "tokenId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "tokenId"`);
    }

}
