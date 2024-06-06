import { Service } from "./types/Service";

export function matches(body: RequestBody, rules: Matcher) {
    // All keys of rules must be present, so we use that to check our body
    for (let attribute in rules) {
        // The type of value must be same as our rule
        // Not present would mean 'undefined'
        if (typeof body[attribute] !== rules[attribute]) {
            // We invalidate body as soon as we find our first invalid attribute
            return false;
        }
    }

    // All checked out, request body is OK
    return true;
}

export interface Matcher {
    [key: string]: string
}

export interface RequestBody {
    [key: string]: unknown
}

export function parseService(service: Record<string, unknown>): Service {
    const parsedService: Record<string, unknown> = service;
    parsedService.images = (<string>service.images).split(","); 
    const images = <string[]>parsedService.images;
    if (images.length === 1 && images[0] === "") {
        images.pop();
    }
    return <Service>parsedService;
}