import { Booking } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createBooking = async (bookingData: any): Promise<Booking> => {
    await delay(1000);
    return {
        ...bookingData,
        id: `bk-${Date.now()}`,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        createdAt: new Date().toISOString(),
    } as Booking;
};

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: 'b1',
        userId: 'u1',
        listingId: 't1',
        listingTitle: 'Sigiriya & Dambulla Day Tour',
        listingType: 'TOUR',
        listingImage: 'https://images.unsplash.com/photo-1588258524675-c63673c75cf7?auto=format&fit=crop&q=80&w=800',
        startDate: '2026-01-28',
        guests: 2,
        totalPrice: 17000,
        guidePrice: 5000,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        createdAt: '2026-01-20'
    },
    {
        id: 'b2',
        userId: 'u1',
        listingId: 'v1',
        listingTitle: 'Luxury Toyota Prado SUV',
        listingType: 'VEHICLE',
        listingImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
        startDate: '2026-02-05',
        endDate: '2026-02-07',
        totalPrice: 45000,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        createdAt: '2026-01-25'
    },
    {
        id: 'gb1',
        userId: 'u2',
        listingId: 't1',
        listingTitle: 'Sigiriya & Dambulla Day Tour',
        listingType: 'TOUR',
        listingImage: 'https://images.unsplash.com/photo-1588258524675-c63673c75cf7?auto=format&fit=crop&q=80&w=800',
        startDate: '2026-03-10',
        guests: 4,
        totalPrice: 25000,
        guidePrice: 8000,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        createdAt: '2026-02-15'
    },
    {
        id: 'gb2',
        userId: 'u3',
        listingId: 't2',
        listingTitle: 'Kandy City Tour',
        listingType: 'TOUR',
        listingImage: 'https://images.unsplash.com/photo-1588258524675-c63673c75cf7?auto=format&fit=crop&q=80&w=800',
        startDate: '2026-03-15',
        guests: 2,
        totalPrice: 12000,
        guidePrice: 4000,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        createdAt: '2026-02-16'
    }
];

export const getMyBookings = async (): Promise<Booking[]> => {
    await delay(800);
    return MOCK_BOOKINGS;
};

export const payBooking = async (id: string, method: 'CASH' | 'CARD'): Promise<Booking> => {
    await delay(1000);
    const booking = MOCK_BOOKINGS.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    booking.paymentMethod = method;
    if (method === 'CARD') {
        booking.paymentStatus = 'PAID';
        booking.status = 'CONFIRMED';
    } else {
        // Cash payment
        booking.status = 'CONFIRMED';
        // Payment status remains UNPAID or could be updated to a new status if we had one.
        // Keeping it UNPAID but booking is CONFIRMED as requested/inferred.
    }
    return booking;
};

export const cancelBooking = async (id: string): Promise<void> => {
    await delay(800);
    const booking = MOCK_BOOKINGS.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    booking.status = 'CANCELLED';

    // Mock Notification
    console.log(`Notification sent to Admin and Provider: Booking ${id} cancelled by user.`);
};

export const getGuideBookings = async (): Promise<Booking[]> => {
    await delay(800);
    // Return all bookings for now, in real app filter by guideId
    return MOCK_BOOKINGS.filter(b => b.listingType === 'TOUR');
};

export const respondToBooking = async (id: string, action: 'ACCEPT' | 'DECLINE'): Promise<Booking> => {
    await delay(1000);
    const booking = MOCK_BOOKINGS.find(b => b.id === id);
    if (!booking) throw new Error('Booking not found');

    if (action === 'ACCEPT') {
        booking.status = 'CONFIRMED';
    } else {
        booking.status = 'GUIDE_DECLINED';
        // Mock Notification to Guest
        console.log(`Notification sent to Guest: Guide declined booking ${id}. Please select another guide.`);
    }
    return booking;
};
