import { Service } from "@/types/Service";
import { ServiceModel } from "./schemas";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getService = async (db: NodePgDatabase<Record<string, never>>, serviceModel: ServiceModel, id: number): Promise<Service> => {
    let service: any = (await db
        .select()
        .from(serviceModel)
        .where(eq(serviceModel.id, +id)))[0];
    service.images = service.images.split(",");
    return <Service>service;
}