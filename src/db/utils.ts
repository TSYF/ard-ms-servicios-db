import { Service } from "@/types/Service";
import { ServiceModel } from "./schemas";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getService = async (db: NodePgDatabase<Record<string, never>>, serviceModel: ServiceModel, id: number): Promise<Record<string, unknown>> => {
    let service: Record<string, unknown> = (await db
        .select()
        .from(serviceModel)
        .where(eq(serviceModel.id, +id)))[0];
    return service;
}