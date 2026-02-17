import { MOCK_LISTINGS } from '../mocks/listings';
import { Listing, ListingType } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ListingFilters {
    categories?: string[];
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}

export const getListings = async (type?: ListingType, search?: string, filters?: ListingFilters): Promise<Listing[]> => {
    await delay(600);
    let results = MOCK_LISTINGS;

    if (type) {
        results = results.filter((l) => l.type === type);
    }

    if (search) {
        const q = search.toLowerCase();
        results = results.filter(l =>
            l.title.toLowerCase().includes(q) ||
            l.location.toLowerCase().includes(q)
        );
    }

    if (filters) {
        if (filters.categories && filters.categories.length > 0) {
            results = results.filter(l => {
                if (l.type === 'VEHICLE') {
                    return filters.categories?.includes((l as any).vehicleType);
                }
                if (l.type === 'STAY') {
                    return filters.categories?.includes((l as any).stayType);
                }
                if (l.type === 'TOUR') {
                    return filters.categories?.includes((l as any).tourType);
                }
                return true;
            });
        }

        if (filters.minPrice !== undefined) {
            results = results.filter(l => l.price >= filters.minPrice!);
        }

        if (filters.maxPrice !== undefined) {
            results = results.filter(l => l.price <= filters.maxPrice!);
        }

        if (filters.rating !== undefined) {
            results = results.filter(l => l.rating >= filters.rating!);
        }
    }

    return results;
};

export const getListingById = async (id: string): Promise<Listing | undefined> => {
    await delay(400);
    return MOCK_LISTINGS.find((l) => l.id === id);
};

export const getFeaturedListings = async (): Promise<Listing[]> => {
    await delay(500);
    return MOCK_LISTINGS.filter((l) => l.featured);
};
