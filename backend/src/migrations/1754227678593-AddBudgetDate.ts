import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBudgetDate1754227678593 implements MigrationInterface {
  name = 'AddBudgetDate1754227678593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_27e688ddf1ff3893b43065899f9"`,
    );
    await queryRunner.query(`ALTER TABLE "budgets" ADD "month" date NOT NULL`);

    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_27e688ddf1ff3893b43065899f9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_27e688ddf1ff3893b43065899f9"`,
    );
    await queryRunner.query(`ALTER TABLE "budgets" ADD "month" date NOT NULL`);

    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_27e688ddf1ff3893b43065899f9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
