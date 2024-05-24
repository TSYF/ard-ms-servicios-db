import { Matcher } from "@/utils";

export interface Category {
    id: number,
    name: string
};

export const categoryMatcher: Matcher = {
    name: "string",
};