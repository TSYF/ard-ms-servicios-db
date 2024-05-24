import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar, integer, boolean, bigint } from "drizzle-orm/pg-core";

export const categoryModel = pgTable("category", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull()
});

export const productModel = pgTable("product", {
    id: serial("id").primaryKey(),
    images: text("images").notNull(),
    name: varchar("name").notNull(),
    description: varchar("description").notNull(),
    price: integer("price").notNull(),
    isActive: boolean("isActive").notNull(),
    stock: integer("stock").notNull(),
    categoryId: integer("categoryId").notNull().references(() => categoryModel.id)
});