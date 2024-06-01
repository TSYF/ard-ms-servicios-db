import { Matcher } from "@/utils";

export interface Service {
    id: number,
    images: string,
    name: string,
    description: string,
    price: number,
    isActive: boolean,
}

export const serviceMatcher: Matcher = {
    images: "string",
    name: "string",
    description: "string",
    price: "number",
    isActive: "boolean",
};