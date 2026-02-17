import { VehicleListing } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Reusing VehicleListing type but adapting for rental context
const vehicles: VehicleListing[] = [
    {
        id: 'v-1',
        type: 'VEHICLE',
        title: 'Unregistered Toyota Axio',
        description: 'Comfortable sedan for small groups',
        location: 'Colombo',
        price: 6000,
        rating: 4.5,
        reviewsCount: 12,
        images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        vehicleType: 'Car',
        seats: 4,
        driverIncluded: true,
        transmission: 'Automatic',
        airConditioned: true
    },
    {
        id: 'v-2',
        type: 'VEHICLE',
        title: 'Toyota KDH High Roof',
        description: 'Spacious van for family trips',
        location: 'Kandy',
        price: 12000,
        rating: 4.8,
        reviewsCount: 25,
        images: ['https://images.unsplash.com/photo-1552161743-4b8c0678cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        vehicleType: 'Van',
        seats: 9,
        driverIncluded: true,
        transmission: 'Automatic',
        airConditioned: true
    },
    {
        id: 'v-3',
        type: 'VEHICLE',
        title: 'Luxury Bus',
        description: 'For large tour groups',
        location: 'Colombo',
        price: 25000,
        rating: 4.6,
        reviewsCount: 8,
        images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        vehicleType: 'Bus',
        seats: 25,
        driverIncluded: true,
        transmission: 'Manual',
        airConditioned: true
    }
];

export const getAvailableVehicles = async (guestCount?: number): Promise<VehicleListing[]> => {
    await delay(500);
    if (guestCount) {
        return vehicles.filter(v => v.seats >= guestCount);
    }
    return vehicles;
};
