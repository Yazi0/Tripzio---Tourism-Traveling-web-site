import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { User, Calendar, MapPin, CheckCircle } from 'lucide-react';

// Mock Bookings Data for Admin
const EX_BOOKINGS = [
    { id: 'ab1', items: 'Sigiriya Tour', provider: 'Spice Garden Tours', user: 'John Doe', total: 17000, status: 'CONFIRMED', date: '2026-01-20', details: 'Full day tour including entrance fees and lunch.', paymentId: 'PAY-123456', guests: 2 },
    { id: 'ab2', items: 'Villa Kandy', provider: 'Green Leaf Hotel', user: 'Jane Smith', total: 45000, status: 'PENDING', date: '2026-01-22', details: '3 nights stay, full board basis.', paymentId: 'PAY-PENDING', guests: 4 },
    { id: 'ab3', items: 'Toyota Prius', provider: 'Saman Taxis', user: 'Mike Ross', total: 8500, status: 'COMPLETED', date: '2026-01-15', details: 'Airport drop-off from Kandy.', paymentId: 'PAY-789012', guests: 3 },
];

export const PlatformBookings = () => {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenDetails = (booking: any) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleCloseDetails = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedBooking(null), 300); // Clear after animation
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Platform Bookings</h2>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Booking ID</th>
                                <th className="px-6 py-4 font-medium">Service</th>
                                <th className="px-6 py-4 font-medium">Provider</th>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {EX_BOOKINGS.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-500">#{booking.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{booking.items}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.provider}</td>
                                    <td className="px-6 py-4 text-gray-600">{booking.user}</td>
                                    <td className="px-6 py-4 font-medium">Rs {booking.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={booking.status === 'CONFIRMED' ? 'success' : booking.status === 'PENDING' ? 'warning' : 'info'}>
                                            {booking.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenDetails(booking)}>Details</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseDetails}
                title="Booking Details"
                footer={
                    <Button onClick={handleCloseDetails}>Close</Button>
                }
            >
                {selectedBooking && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Booking Reference</p>
                                <p className="text-xl font-bold text-gray-900">#{selectedBooking.id}</p>
                            </div>
                            <Badge variant={selectedBooking.status === 'CONFIRMED' ? 'success' : selectedBooking.status === 'PENDING' ? 'warning' : 'info'} className="text-sm">
                                {selectedBooking.status}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Service Information</h4>
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">{selectedBooking.items}</p>
                                        <p className="text-sm text-gray-500">{selectedBooking.details}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Customer & Provider</h4>
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Customer</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.user}</p>
                                        <p className="text-xs text-gray-500">{selectedBooking.guests} Guests</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Provider</p>
                                        <p className="font-medium text-gray-900">{selectedBooking.provider}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-bold text-gray-900 mb-4">Payment Summary</h4>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Total Amount</span>
                                <span className="font-bold text-lg">Rs {selectedBooking.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Transaction ID</span>
                                <span className="font-mono">{selectedBooking.paymentId}</span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
