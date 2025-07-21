import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * NOTE: Automatically generated migration. How I did it:
 * 1. `npm install ts-node --save-dev`
 * 2. Add `"typeorm": "ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js"` to `scripts` in package.json
 *  (for typeorm to recognize TypeScript files and path mappings)
 * 3. `npm run typeorm --  migration:generate src/migrations/<migration name> -d <dataSource path>`
 *
 * To run this migration (and any other migrations present in `src/migrations`):
 * `npm run typeorm migration:run -- -d src/config/database.ts`
 *
 * To revert this migration:
 * `npm run typeorm migration:revert -- -d src/config/database.ts`
 */

export class CategoryUUIDAutomaticallyGenerated1753015986107 implements MigrationInterface {
    name = 'CategoryUUIDAutomaticallyGenerated1753015986107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_16690857e79d09979df6f88c0c2"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "REL_16690857e79d09979df6f88c0c"`);
        await queryRunner.query(`ALTER TABLE "entries" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_16690857e79d09979df6f88c0c2" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98"`);
        await queryRunner.query(`ALTER TABLE "entries" DROP CONSTRAINT "FK_16690857e79d09979df6f88c0c2"`);
        await queryRunner.query(`ALTER TABLE "entries" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "REL_16690857e79d09979df6f88c0c" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_e186b0c87ddac0718d1f6783f98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "entries" ADD CONSTRAINT "FK_16690857e79d09979df6f88c0c2" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
