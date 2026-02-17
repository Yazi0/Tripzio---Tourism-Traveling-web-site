import { Guide } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const guides: Guide[] = [
    {
        id: 'g-1',
        name: 'Sampath Perera',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        feePerDay: 5000,
        languages: ['English', 'Sinhala'],
        rating: 4.8,
        experience: '5 Years'
    },
    {
        id: 'g-2',
        name: 'Nimali Fernando',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        feePerDay: 4500,
        languages: ['English', 'German', 'Sinhala'],
        rating: 4.9,
        experience: '3 Years'
    },
    {
        id: 'g-3',
        name: 'Kumar Sangakkara',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        feePerDay: 6000,
        languages: ['English', 'Tamil', 'Sinhala'],
        rating: 4.7,
        experience: '8 Years'
    }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getAvailableGuides = async (startDate?: string, endDate?: string): Promise<Guide[]> => {
    await delay(500);
    // Mock logic: In a real app, we check if guide is booked during these dates.
    // For now, we return all guides but logging the dates to simulate usage.
    if (startDate && endDate) {
        console.log(`Checking guide availability for ${startDate} to ${endDate}`);
    }
    return guides;
};

export const getGuideById = async (id: string): Promise<Guide | undefined> => {
    await delay(300);
    return guides.find(g => g.id === id);
};
