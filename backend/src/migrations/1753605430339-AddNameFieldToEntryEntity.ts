import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameFieldToEntryEntity1753605430339 implements MigrationInterface {
    name = 'AddNameFieldToEntryEntity1753605430339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        // Add password column with a default value first, then remove the default
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        // Fix for entries table - add with default first, then remove default
        await queryRunner.query(`ALTER TABLE "entries" ADD "name" character varying NOT NULL DEFAULT 'Unnamed Entry'`);
        await queryRunner.query(`ALTER TABLE "entries" ALTER COLUMN "name" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98"`);
        // Keep users.id as uuid - don't change to SERIAL
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        // No need to change users.id type in rollback either
        await queryRunner.query(`ALTER TABLE "entries" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
