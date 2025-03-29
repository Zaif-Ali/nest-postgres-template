import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743113500038 implements MigrationInterface {
    name = 'Migration1743113500038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_e45ab0495d24a774bd49731b7a5"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_d72ea127f30e21753c9e229891e" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "PK_50cd9dfa07c894e9b245edffc51"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "rtId"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "userUserId"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "userUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "rtId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "PK_50cd9dfa07c894e9b245edffc51" PRIMARY KEY ("rtId")`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_d72ea127f30e21753c9e229891e"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_e45ab0495d24a774bd49731b7a5" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
