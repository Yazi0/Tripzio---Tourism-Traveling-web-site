import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Plus, LayoutDashboard, List, Calendar, DollarSign, TrendingUp, Users, Star, Edit, Trash2, Check, X as XIcon, MapPin, Image as ImageIcon } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { MOCK_LISTINGS } from '../../mocks/listings';

// Mock Provider Data
const MOCK_STATS = [
    { label: 'Total Revenue', value: 'Rs 450,000', change: '+12%', icon: DollarSign, color: 'text-green-600 bg-green-100' },
    { label: 'Total Bookings', value: '48', change: '+5%', icon: Calendar, color: 'text-blue-600 bg-blue-100' },
    { label: 'Active Listings', value: '12', change: '0%', icon: List, color: 'text-purple-600 bg-purple-100' },
    { label: 'Average Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-yellow-600 bg-yellow-100' },
];

const MOCK_PROVIDER_BOOKINGS = [
    { id: 'pb1', guest: 'John Doe', item: 'Luxury Toyota Prado', date: 'Feb 12 - 15, 2026', total: 45000, status: 'PENDING' },
    { id: 'pb2', guest: 'Sarah Smith', item: 'Sigiriya Tour', date: 'Jan 28, 2026', total: 17000, status: 'CONFIRMED' },
    { id: 'pb3', guest: 'Mike Johnson', item: 'Villa Stay', date: 'Mar 01 - 05, 2026', total: 120000, status: 'COMPLETED' },
];

export const ProviderDashboard = () => {
    const { user } = useAuthStore();
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const textTab = tab || 'overview';
    const activeTab = ['overview', 'listings', 'bookings'].includes(textTab) ? textTab : 'overview';

    // Local State
    const [listings, setListings] = useState(MOCK_LISTINGS);
    const [bookings, setBookings] = useState(MOCK_PROVIDER_BOOKINGS);
    const [activeModal, setActiveModal] = useState<'none' | 'new-listing' | 'calendar' | 'promotion' | 'support'>('none');

    const setActiveTab = (newTab: string) => {
        navigate(`/provider/${newTab}`);
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles: Record<string, string> = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            CONFIRMED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800',
            COMPLETED: 'bg-blue-100 text-blue-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    // Actions
    const handleApproveBooking = (id: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'CONFIRMED' } : b));
    };

    const handleDeclineBooking = (id: string) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
    };

    const handleDeleteListing = (id: string) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            setListings(prev => prev.filter(l => l.id !== id));
        }
    };

    const closeModal = () => setActiveModal('none');

    const handleCreateListing = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Listing Created Successfully! (Mock)');
        closeModal();
    };

    const handleUpdateCalendar = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Calendar Updated Successfully! (Mock)');
        closeModal();
    };

    const handleCreatePromotion = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Promotion Created Successfully! (Mock)');
        closeModal();
    };

    const handleContactSupport = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Support request sent! We will contact you shortly. (Mock)');
        closeModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <LayoutDashboard className="h-6 w-6 text-primary-600 mr-2" />
                            <h1 className="text-xl font-bold text-gray-900">Provider Portal</h1>
                        </div>
                        <div className="flex space-x-4">
                            <Button onClick={() => setActiveModal('new-listing')}>
                                <Plus className="h-4 w-4 mr-2" /> New Listing
                            </Button>
                        </div>
                    </div>

                    <div className="flex space-x-8 -mb-px">
                        {[
                            { id: 'overview', label: 'Overview', icon: TrendingUp },
                            { id: 'listings', label: 'My Listings', icon: List },
                            { id: 'bookings', label: 'Bookings', icon: Calendar },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className={`mr-2 h-4 w-4 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {MOCK_STATS.map((stat) => (
                                <Card key={stat.label} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`p-3 rounded-xl ${stat.color}`}>
                                            <stat.icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center text-sm">
                                        <span className="text-green-600 font-medium">{stat.change}</span>
                                        <span className="text-gray-500 ml-2">from last month</span>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Recent Activity / Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <Card className="h-full">
                                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
                                        <Button variant="ghost" size="sm" onClick={() => setActiveTab('bookings')}>View All</Button>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {bookings.slice(0, 3).map((booking) => (
                                            <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center space-x-4">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                        {booking.guest.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{booking.guest}</p>
                                                        <p className="text-xs text-gray-500">{booking.item}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-medium text-gray-900">Rs {booking.total.toLocaleString()}</p>
                                                    <p className="text-xs text-gray-500">{booking.date}</p>
                                                </div>
                                                <StatusBadge status={booking.status} />
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card className="p-6 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                                    <h3 className="text-lg font-bold mb-2">Pro Tips</h3>
                                    <p className="text-primary-100 text-sm mb-4">Complete your profile and add high-quality photos to increase bookings by up to 40%.</p>
                                    <Button variant="secondary" size="sm" className="w-full">Improve Listing</Button>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('calendar')}>
                                            <Calendar className="mr-2 h-4 w-4" /> Update Calendar
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('promotion')}>
                                            <TrendingUp className="mr-2 h-4 w-4" /> Create Promotion
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start" onClick={() => setActiveModal('support')}>
                                            <Users className="mr-2 h-4 w-4" /> Contact Support
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {/* Listings Tab */}
                {activeTab === 'listings' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
                            <Button onClick={() => setActiveModal('new-listing')}>
                                <Plus className="h-4 w-4 mr-2" /> Add New
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.slice(0, 5).map((listing) => (
                                <Card key={listing.id} className="group overflow-hidden">
                                    <div className="relative h-48">
                                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2">
                                            <Badge variant={listing.featured ? 'warning' : 'default'}>
                                                {listing.featured ? 'Featured' : 'Active'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Badge variant="default" className="mb-1">{listing.type}</Badge>
                                                <h3 className="font-bold text-gray-900 line-clamp-1">{listing.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                                            <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-400" /> {listing.rating}</span>
                                            <span className="flex items-center"><DollarSign className="h-4 w-4 mr-1" /> {listing.price.toLocaleString()}</span>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <Button variant="outline" size="sm" onClick={() => alert(`Edit ${listing.title}`)}>
                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200" onClick={() => handleDeleteListing(listing.id)}>
                                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <Card>
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Manage Bookings</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Guest</th>
                                        <th className="px-6 py-4 font-medium">Item</th>
                                        <th className="px-6 py-4 font-medium">Dates</th>
                                        <th className="px-6 py-4 font-medium">Total</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{booking.guest}</td>
                                            <td className="px-6 py-4 text-gray-600">{booking.item}</td>
                                            <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                                            <td className="px-6 py-4 font-medium text-gray-900">Rs {booking.total.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={booking.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {booking.status === 'PENDING' ? (
                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            onClick={() => handleApproveBooking(booking.id)}
                                                            className="p-1 rounded-full text-green-600 hover:bg-green-50"
                                                            title="Approve"
                                                        >
                                                            <Check className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeclineBooking(booking.id)}
                                                            className="p-1 rounded-full text-red-600 hover:bg-red-50"
                                                            title="Decline"
                                                        >
                                                            <XIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Button variant="ghost" size="sm">Details</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}
            </div>

            {/* Modals */}

            {/* New Listing Modal */}
            <Modal
                isOpen={activeModal === 'new-listing'}
                onClose={closeModal}
                title="Create New Listing"
            >
                <form onSubmit={handleCreateListing} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                            <Select options={[
                                { label: 'Vehicle', value: 'VEHICLE' },
                                { label: 'Tour Package', value: 'TOUR' },
                                { label: 'Accommodation', value: 'STAY' },
                                { label: 'Activity', value: 'ACTIVITY' },
                            ]} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (per day/pax)</label>
                            <Input type="number" placeholder="0.00" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Listing Title</label>
                        <Input placeholder="e.g., Luxury Hilltop Villa" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input className="pl-10" placeholder="City or Region" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 cursor-pointer transition-colors">
                            <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Click to upload images</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                        <Button type="submit">Create Listing</Button>
                    </div>
                </form>
            </Modal>

            {/* Update Calendar Modal */}
            <Modal
                isOpen={activeModal === 'calendar'}
                onClose={closeModal}
                title="Update Availability"
            >
                <form onSubmit={handleUpdateCalendar} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Listing</label>
                        <Select options={listings.map(l => ({ label: l.title, value: l.id }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <Input type="date" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <Input type="date" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <Select options={[
                            { label: 'Blocked / Unavailable', value: 'blocked' },
                            { label: 'Available', value: 'available' },
                        ]} />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                        <Button type="submit">Update Calendar</Button>
                    </div>
                </form>
            </Modal>

            {/* Create Promotion Modal */}
            <Modal
                isOpen={activeModal === 'promotion'}
                onClose={closeModal}
                title="Create Promotion"
            >
                <form onSubmit={handleCreatePromotion} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Listing</label>
                        <Select options={[
                            { label: 'All Listings', value: 'all' },
                            ...listings.map(l => ({ label: l.title, value: l.id }))
                        ]} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                            <Select options={[
                                { label: 'Percentage (%)', value: 'percent' },
                                { label: 'Fixed Amount (Rs)', value: 'fixed' },
                            ]} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                            <Input type="number" placeholder="10" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code (Optional)</label>
                        <Input placeholder="e.g., SUMMER2026" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                        <Input type="date" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                        <Button type="submit">Create Promo</Button>
                    </div>
                </form>
            </Modal>

            {/* Contact Support Modal */}
            <Modal
                isOpen={activeModal === 'support'}
                onClose={closeModal}
                title="Contact Support"
            >
                <form onSubmit={handleContactSupport} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <Input placeholder="How can we help?" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            className="w-full min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Describe your issue..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="button" variant="ghost" onClick={closeModal} className="mr-2">Cancel</Button>
                        <Button type="submit">Send Message</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
