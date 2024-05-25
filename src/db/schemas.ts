import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const serviceModel = pgTable("service", {
    id: serial("id").primaryKey(),
    images: text("images").notNull(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
    price: integer("price").notNull(),
    isActive: boolean("isActive").notNull(),
    stock: integer("stock").notNull()
});