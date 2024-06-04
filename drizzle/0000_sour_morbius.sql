CREATE TABLE IF NOT EXISTS "ar"."service" (
	"id" serial PRIMARY KEY NOT NULL,
	"images" text NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"minPrice" integer DEFAULT 0 NOT NULL,
	"maxPrice" integer DEFAULT 0 NOT NULL,
	"isActive" boolean NOT NULL
);
