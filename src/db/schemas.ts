import { pgSchema } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { $schema } from '.';

export const serviceModel = $schema.table("service", {
    id: serial("id").primaryKey(),
    images: text("images").notNull(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
    minPrice: integer("minPrice").notNull().default(0),
    maxPrice: integer("maxPrice").notNull().default(0),
    isActive: boolean("isActive").notNull(),
});

export type ServiceModel = typeof serviceModel;