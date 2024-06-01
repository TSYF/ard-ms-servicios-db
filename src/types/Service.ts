import { Matcher } from "@/utils";

export interface Service {
    id: number,
    images: string[],
    name: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    isActive: boolean,
}

export const serviceMatcher: Matcher = {
    images: "string",
    name: "object",
    description: "string",
    minPrice: "number",
    maxPrice: "number",
    isActive: "boolean",
};