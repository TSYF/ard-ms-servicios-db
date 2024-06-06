import { Service } from "@/types/Service";
import { ServiceModel } from "./schemas";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

export const getService = async (db: NodePgDatabase<Record<string, never>>, serviceModel: ServiceModel, id: number): Promise<Service> => {
    let service: Record<string, unknown> = (await db
        .select()
        .from(serviceModel)
        .where(eq(serviceModel.id, +id)))[0];
    service.images = (<string>service.images).split(",");
    const images = <string[]>service.images;
    if (images.length === 1 && images[0] === "") {
        images.pop();
    }
    return <Service>service;
}