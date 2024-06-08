import { db } from "./db";
import { serviceModel } from "./db/schemas";
import { getService } from "./db/utils";
import { Service } from "./types/Service";
import { envs } from '@/config/env'

const { IMAGES_ENDPOINT } = envs

export function parseService(service: Record<string, unknown>): Service {
    const parsedService: Record<string, unknown> = service;
    parsedService.images = (<string>service.images).split(","); 
    const images = <string[]>parsedService.images;
    if (images.length === 1 && images[0] === "") {
        images.pop();
    }
    return <Service>parsedService;
}

export async function uploadImages(images: string[]): Promise<string[]> {
    return await fetch(IMAGES_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fileList: images
        })
    }).then(res => res.json())
}

export async function updateImages(id: number, images: string[]): Promise<string[]> {
    const dbService = await getService(db, serviceModel, id);
    const service   = parseService(dbService);
    
    const imageMap: Record<string, string> = {};

    service.images.forEach((uri, index) => {
        imageMap[uri] = images[index]
    });

    return await fetch(IMAGES_ENDPOINT, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(imageMap)
    }).then(res => res.json())
}