ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN IF EXISTS "categoryId";
DROP TABLE "category";--> statement-breakpoint