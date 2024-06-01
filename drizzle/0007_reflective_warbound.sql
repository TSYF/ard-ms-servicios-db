ALTER TABLE "service" RENAME COLUMN "price" TO "minPrice";--> statement-breakpoint
ALTER TABLE "service" ALTER COLUMN "minPrice" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "maxPrice" integer DEFAULT 0 NOT NULL;