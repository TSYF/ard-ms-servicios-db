import { Service } from "./types/Service";

export function parseService(service: Record<string, unknown>): Service {
    const parsedService: Record<string, unknown> = service;
    parsedService.images = (<string>service.images).split(","); 
    const images = <string[]>parsedService.images;
    if (images.length === 1 && images[0] === "") {
        images.pop();
    }
    return <Service>parsedService;
}