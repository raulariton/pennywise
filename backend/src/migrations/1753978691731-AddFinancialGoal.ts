import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFinancialGoal1753978691731 implements MigrationInterface {
    name = 'AddFinancialGoal1753978691731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "financial_goal" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "targetAmount" numeric(12,2) NOT NULL, "currentAmount" numeric(12,2) NOT NULL DEFAULT '0', "dueDate" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_cfb217b34dc76ba02b26a2573de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "financial_goal" ADD CONSTRAINT "FK_45c1fc4d35b6075d35c5bc12c6e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financial_goal" DROP CONSTRAINT "FK_45c1fc4d35b6075d35c5bc12c6e"`);
        await queryRunner.query(`DROP TABLE "financial_goal"`);
    }

}
