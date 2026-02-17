import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Card } from '../../components/ui/Card';
import { Calendar, DollarSign, MapPin, Star, User, Clock, CheckCircle, Briefcase } from 'lucide-react';
import { Booking } from '../../types';

import { getGuideBookings, respondToBooking } from '../../api/bookings';
import { getListingById } from '../../api/listings';
import { Listing } from '../../types';

export const GuideDashboard = () => {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState('overview');
    const [availability, setAvailability] = useState(true);
    const [bookings, setBookings] = useState<Booking[]>([]);

    // Modal State
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await getGuideBookings();
            setBookings(data);
        };
        fetchBookings();
    }, []);

    const handleAction = async (id: string, action: 'ACCEPT' | 'DECLINE') => {
        try {
            const updatedBooking = await respondToBooking(id, action);
            setBookings(prev => prev.map(b => b.id === id ? updatedBooking : b));
            alert(action === 'ACCEPT' ? 'Tour Accepted!' : 'Tour Declined');
        } catch (error) {
            console.error(error);
            alert('Failed to update booking');
        }
    };

    const handleViewItinerary = async (booking: Booking) => {
        setSelectedBooking(booking);
        const listing = await getListingById(booking.listingId);
        if (listing) {
            setSelectedListing(listing);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
        setSelectedListing(null);
    };

    const StatCard = ({ icon: Icon, label, value, color }: any) => (
        <Card className="p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </Card>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-12 relative">
            {/* Itinerary Modal */}
            {isModalOpen && selectedBooking && selectedListing && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Tour Itinerary & Details</h2>
                                <p className="text-sm text-gray-500">Booking ID: {selectedBooking.id}</p>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <CheckCircle className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Guest Details */}
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    Guest Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-blue-600 mb-1">Guest Name</p>
                                        <p className="font-semibold text-gray-900">John Doe (Mock)</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 mb-1">Contact Number</p>
                                        <p className="font-semibold text-gray-900">+94 77 123 4567</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 mb-1">Group Size</p>
                                        <p className="font-semibold text-gray-900">{selectedBooking.guests} Pax</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-600 mb-1">Dates</p>
                                        <p className="font-semibold text-gray-900">{selectedBooking.startDate} {selectedBooking.endDate && `- ${selectedBooking.endDate}`}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tour Details */}
                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                                    Tour Details: {selectedListing.title}
                                </h3>

                                {selectedListing.type === 'TOUR' && (
                                    <div className="space-y-4">
                                        <div className="pl-4 border-l-2 border-primary-200 space-y-6">
                                            {(selectedListing as any).itinerary?.map((item: string, index: number) => (
                                                <div key={index} className="relative">
                                                    <span className="absolute -left-[21px] top-0 h-4 w-4 rounded-full bg-primary-500 border-2 border-white"></span>
                                                    <h4 className="font-bold text-gray-900 mb-1">Day {index + 1}</h4>
                                                    <p className="text-gray-600">{item}</p>
                                                </div>
                                            ))}
                                            {(!(selectedListing as any).itinerary || (selectedListing as any).itinerary.length === 0) && (
                                                <p className="text-gray-500 italic">No itinerary details available.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button onClick={closeModal} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}`}
                                alt="Profile"
                                className="h-20 w-20 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                    <span className="font-medium text-gray-900 mr-1">4.9</span>
                                    <span className="mr-3">(128 Reviews)</span>
                                    <Badge variant="success" className={availability ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                        {availability ? 'Available Now' : 'Off Duty'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setAvailability(!availability)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${availability
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                        >
                            {availability ? 'Go Offline' : 'Go Online'}
                        </button>
                    </div>

                    <div className="mt-8 flex space-x-8 border-b border-gray-100">
                        {['overview', 'tours', 'earnings', 'calendar'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
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
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard icon={Briefcase} label="Total Tours" value="45" color="bg-blue-500" />
                            <StatCard icon={Clock} label="Hours Guided" value="320" color="bg-purple-500" />
                            <StatCard icon={DollarSign} label="Earnings (Feb)" value="Rs 125,000" color="bg-green-500" />
                            <StatCard icon={Star} label="Rating" value="4.9" color="bg-yellow-500" />
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Tours</h2>
                            <div className="space-y-4">
                                {bookings.map(booking => (
                                    <Card key={booking.id} className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <div className="h-16 w-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                    <img src={booking.listingImage} alt={booking.listingTitle} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{booking.listingTitle}</h3>
                                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                                        <Calendar className="h-4 w-4 mr-1" />
                                                        {booking.startDate}
                                                        <span className="mx-2">•</span>
                                                        <User className="h-4 w-4 mr-1" />
                                                        {booking.guests} Guests
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant={booking.status === 'CONFIRMED' ? 'success' : booking.status === 'GUIDE_DECLINED' ? 'danger' : 'warning'}>
                                                {booking.status === 'GUIDE_DECLINED' ? 'DECLINED' : booking.status}
                                            </Badge>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3 items-center">
                                            <div className="mr-auto text-sm">
                                                <span className="text-gray-500">Your Fee: </span>
                                                <span className="font-bold text-green-600">Rs {booking.guidePrice ? booking.guidePrice.toLocaleString() : 'N/A'}</span>
                                            </div>
                                            {booking.status === 'PENDING' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(booking.id, 'ACCEPT')}
                                                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(booking.id, 'DECLINE')}
                                                        className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50"
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => handleViewItinerary(booking)}
                                                className="text-sm font-medium text-gray-500 hover:text-gray-900 ml-3"
                                            >
                                                View Itinerary
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'earnings' && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                        <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Earnings Dashboard</h2>
                        <p className="text-gray-500 mt-2">Detailed earnings breakdown coming soon.</p>
                        <p className="text-lg font-bold text-green-600 mt-4">Current Balance: Rs 45,000</p>
                    </div>
                )}

                {activeTab === 'tours' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">My Tours</h2>
                        {bookings.map(booking => (
                            <Card key={booking.id} className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex gap-4">
                                        <div className="h-24 w-32 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                            <img src={booking.listingImage} alt={booking.listingTitle} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{booking.listingTitle}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Booking ID: {booking.id}</p>
                                            <div className="flex gap-4 text-sm text-gray-600">
                                                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {booking.startDate}</span>
                                                <span className="flex items-center"><User className="h-4 w-4 mr-1" /> {booking.guests} Guests</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'GUIDE_DECLINED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {booking.status === 'GUIDE_DECLINED' ? 'DECLINED' : booking.status}
                                        </span>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 mb-1">Your Fee</p>
                                            <span className="font-bold text-lg text-green-600">Rs {booking.guidePrice ? booking.guidePrice.toLocaleString() : 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                    <button
                                        onClick={() => handleViewItinerary(booking)}
                                        className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                    >
                                        View Full Itinerary
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


const Badge = ({ children, variant, className }: any) => (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${variant === 'success' ? 'bg-green-100 text-green-800' :
        variant === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'} ${className}`}>
        {children}
    </span>
);
