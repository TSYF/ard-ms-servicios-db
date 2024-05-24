import { Matcher } from "@/utils";

export interface Product {
    id: number,
    images: string,
    name: string,
    description: string,
    price: number,
    isActive: boolean,
    stock: number,
    categoryId: number
}

export const productMatcher: Matcher = {
    images: "string",
    name: "string",
    description: "string",
    price: "number",
    isActive: "boolean",
    stock: "number",
    categoryId: "number"
};