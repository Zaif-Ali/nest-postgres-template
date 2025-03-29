import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743111683063 implements MigrationInterface {
    name = 'Migration1743111683063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("rtId" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "agentId" uuid, "userUserId" uuid, CONSTRAINT "UQ_c31d0a2f38e6e99110df62ab0af" UNIQUE ("token"), CONSTRAINT "REL_0805a4516998c85716eb58af4b" UNIQUE ("agentId"), CONSTRAINT "PK_50cd9dfa07c894e9b245edffc51" PRIMARY KEY ("rtId"))`);
        await queryRunner.query(`COMMENT ON TABLE "refresh_token" IS 'RefreshToken'`);
        await queryRunner.query(`CREATE TABLE "agent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "os" character varying NOT NULL, "browser" character varying NOT NULL, "deviceType" character varying, "ipAddress" character varying, CONSTRAINT "PK_1000e989398c5d4ed585cf9a46f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'vendor', 'consumer')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'consumer'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastActivityAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_0805a4516998c85716eb58af4b1" FOREIGN KEY ("agentId") REFERENCES "agent"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD CONSTRAINT "FK_e45ab0495d24a774bd49731b7a5" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_e45ab0495d24a774bd49731b7a5"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_0805a4516998c85716eb58af4b1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastActivityAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "agent"`);
        await queryRunner.query(`COMMENT ON TABLE "refresh_token" IS NULL`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
