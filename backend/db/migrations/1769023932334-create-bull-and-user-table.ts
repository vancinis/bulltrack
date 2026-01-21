import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBullAndUserTable1769023932334 implements MigrationInterface {
    name = 'CreateBullAndUserTable1769023932334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bulls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ear_tag" character varying NOT NULL, "name" character varying NOT NULL, "breed" character varying NOT NULL, "coat_color" character varying NOT NULL, "origin" character varying NOT NULL, "usage" character varying NOT NULL, "age_months" integer NOT NULL, "featured_trait" character varying, "growth" integer NOT NULL DEFAULT '0', "calving_ease" integer NOT NULL DEFAULT '0', "reproduction" integer NOT NULL DEFAULT '0', "moderation" integer NOT NULL DEFAULT '0', "carcass" integer NOT NULL DEFAULT '0', "bull_score" numeric(5,2) NOT NULL DEFAULT '0', CONSTRAINT "UQ_49814234723cefb191e0e133cc9" UNIQUE ("ear_tag"), CONSTRAINT "PK_56c287dc3acb52e08e8bde0980f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying, "last_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorites" ("user_id" uuid NOT NULL, "bull_id" uuid NOT NULL, CONSTRAINT "PK_bf3d57eef62fb46094e7ec36bbc" PRIMARY KEY ("user_id", "bull_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5238ce0a21cc77dc16c8efe3d3" ON "user_favorites" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dbff4e75e4cd68555bf5ecb1a3" ON "user_favorites" ("bull_id") `);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_5238ce0a21cc77dc16c8efe3d36" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_dbff4e75e4cd68555bf5ecb1a3b" FOREIGN KEY ("bull_id") REFERENCES "bulls"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_dbff4e75e4cd68555bf5ecb1a3b"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_5238ce0a21cc77dc16c8efe3d36"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dbff4e75e4cd68555bf5ecb1a3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5238ce0a21cc77dc16c8efe3d3"`);
        await queryRunner.query(`DROP TABLE "user_favorites"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "bulls"`);
    }

}
