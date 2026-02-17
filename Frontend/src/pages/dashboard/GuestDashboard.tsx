import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { User, Calendar, MapPin, Mail, Phone, Camera, LogOut, CheckCircle, Clock } from 'lucide-react';
import { Booking, BookingStatus } from '../../types';

import { getMyBookings, payBooking, cancelBooking } from '../../api/bookings';

export const GuestDashboard = () => {
    const { user, updateUser } = useAuthStore();
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    // Default to 'bookings' if no tab provided
    const textTab = tab || 'bookings';
    const activeTab = ['bookings', 'profile', 'reviews'].includes(textTab) ? textTab : 'bookings';

    const setActiveTab = (newTab: string) => {
        navigate(`/me/${newTab}`);
    };

    // State
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
        bio: user?.bio || '',
    });

    const [selectedBookingForPayment, setSelectedBookingForPayment] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await getMyBookings();
            setBookings(data);
        };
        fetchBookings();
    }, []);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);
    };

    const handlePay = async (method: 'CASH' | 'CARD') => {
        if (!selectedBookingForPayment) return;

        try {
            const updatedBooking = await payBooking(selectedBookingForPayment, method);
            setBookings(prev => prev.map(b => b.id === selectedBookingForPayment ? updatedBooking : b));
            setSelectedBookingForPayment(null);
            alert(`Payment Method: ${method}. Booking Confirmed!`);
        } catch (error) {
            console.error(error);
            alert('Failed to process payment');
        }
    };

    const handleCancel = async (id: string) => {
        if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
            try {
                await cancelBooking(id);
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
                alert('Booking cancelled. Notification sent to Admin and Provider.');
            } catch (error) {
                console.error(error);
                alert('Failed to cancel booking');
            }
        }
    };

    const StatusBadge = ({ status }: { status: BookingStatus }) => {
        const styles = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            CONFIRMED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800',
            COMPLETED: 'bg-blue-100 text-blue-800',
            GUIDE_DECLINED: 'bg-orange-100 text-orange-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12 relative">
            {/* Payment Modal */}
            {selectedBookingForPayment && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                        <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
                        <p className="text-gray-500 mb-6">Choose how you would like to pay for your booking.</p>

                        <div className="space-y-3">
                            <button
                                onClick={() => handlePay('CARD')}
                                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                            >
                                <span className="font-semibold text-gray-700 group-hover:text-primary-700">Pay with Card</span>
                                <span className="text-sm text-gray-500">Secure Online Payment</span>
                            </button>

                            <button
                                onClick={() => handlePay('CASH')}
                                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all group"
                            >
                                <span className="font-semibold text-gray-700 group-hover:text-primary-700">Cash on Arrival</span>
                                <span className="text-sm text-gray-500">Pay when you meet</span>
                            </button>
                        </div>

                        <button
                            onClick={() => setSelectedBookingForPayment(null)}
                            className="mt-6 w-full py-2 text-gray-500 hover:text-gray-700 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Header / Profile Summary */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                                alt="Profile"
                                className="h-24 w-24 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-primary-600 p-2 rounded-full text-white shadow-sm hover:bg-primary-700 transition-colors">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                            <p className="text-gray-500">{user?.email}</p>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <MapPin className="h-4 w-4 mr-1" />
                                <div className="flex items-center">
                                    {isEditing ? (
                                        <div className="flex items-center space-x-2">
                                            <span className="text-gray-400">Editing...</span>
                                        </div>
                                    ) : (
                                        <span>{user?.address || 'Sri Lanka'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mt-8 flex space-x-8 border-b border-gray-100">
                        {['bookings', 'profile', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`pb-4 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Bookings View */}
                {activeTab === 'bookings' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
                        {bookings.filter(b => b.status !== 'CANCELLED').length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                                <p className="text-gray-500">No active bookings found.</p>
                            </div>
                        ) : (
                            bookings.filter(b => b.status !== 'CANCELLED').map((booking) => (
                                <Card key={booking.id} className="p-6 transition-all hover:shadow-md border-l-4 border-l-transparent hover:border-l-primary-500">
                                    {booking.status === 'GUIDE_DECLINED' && (
                                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex justify-between items-center text-sm border border-red-100">
                                            <div className="flex items-center">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                <span>The guide for this tour is unavailable. Please select another guide or vehicle.</span>
                                            </div>
                                            <Button size="sm" variant="outline" className="bg-white border-red-200 text-red-700 hover:bg-red-50" onClick={() => navigate(`/checkout/${booking.listingType}/${booking.listingId}`)}>
                                                Try Another Guide
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="h-32 w-full md:w-48 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                            <img src={booking.listingImage} alt={booking.listingTitle} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-1">{booking.listingType}</div>
                                                    <h3 className="text-lg font-bold text-gray-900">{booking.listingTitle}</h3>
                                                </div>
                                                <StatusBadge status={booking.status} />
                                            </div>

                                            <div className="flex gap-6 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                                    {booking.startDate} {booking.endDate ? `- ${booking.endDate}` : ''}
                                                </div>
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 mr-2 text-gray-400" />
                                                    {booking.guests} Guests
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                                <div className="font-bold text-gray-900">
                                                    Total: Rs {booking.totalPrice.toLocaleString()}
                                                </div>
                                                <div className="space-x-3">
                                                    <Button variant="outline" size="sm" onClick={() => navigate(`/checkout/${booking.listingType}/${booking.listingId}`)}>View Details</Button>
                                                    {booking.status === 'PENDING' && (
                                                        <>
                                                            <Button size="sm" onClick={() => setSelectedBookingForPayment(booking.id)} className="bg-green-600 hover:bg-green-700">Pay Now</Button>
                                                            <Button size="sm" variant="outline" onClick={() => handleCancel(booking.id)} className="text-red-600 border-red-200 hover:bg-red-50">Cancel</Button>
                                                        </>
                                                    )}
                                                    {booking.status === 'CONFIRMED' && (
                                                        <Button size="sm" variant="outline" onClick={() => handleCancel(booking.id)} className="text-red-600 border-red-200 hover:bg-red-50">Cancel Booking</Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {/* Profile View */}
                {activeTab === 'profile' && (
                    <div className="max-w-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                            {!isEditing ? (
                                <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            ) : (
                                <div className="space-x-2">
                                    <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                                </div>
                            )}
                        </div>

                        <Card className="p-8">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <Input
                                            value={user?.email}
                                            disabled={true}
                                            className="bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-10"
                                                placeholder="+94 7X XXX XXXX"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <Input
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-10"
                                                placeholder="City, Country"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        className="w-full min-h-[100px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="Tell us a bit about yourself..."
                                    />
                                </div>
                            </form>
                        </Card>
                    </div>
                )}

                {/* Reviews View */}
                {activeTab === 'reviews' && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                            <CheckCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                        <p className="text-gray-500 mt-2">Past reviews from your trips will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
