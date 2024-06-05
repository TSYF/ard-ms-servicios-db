import { Matcher } from "@/utils";

export interface Service extends Record<string, unknown> {
    id: number,
    images: string[],
    name: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    isActive: boolean,
}

export const serviceMatcher: Matcher = {
    images: "object",
    name: "string",
    description: "string",
    minPrice: "number",
    maxPrice: "number",
    isActive: "boolean",
};