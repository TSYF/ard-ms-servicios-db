export interface Service extends Record<string, unknown> {
    id: number,
    images: string[],
    name: string,
    description: string,
    minPrice: number,
    maxPrice: number,
    isActive: boolean,
}