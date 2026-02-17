import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getListingById } from '../../api/listings';
import { getAvailableGuides } from '../../api/guides';
import { getAvailableVehicles } from '../../api/vehicles';
import { Guide, VehicleListing } from '../../types';
import { Star, MapPin, Check, Share2, Heart, ArrowLeft, Loader2, User, Car, Info, X } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useAuthStore } from '../../stores/authStore';

export const ListingDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    // Booking Wizard State
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1); // 1: Guide, 2: Vehicle, 3: Summary
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleListing | null>(null);
    const [needsGuide, setNeedsGuide] = useState<boolean | null>(null);

    // Filtering State
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [guests, setGuests] = useState<number>(1);

    const { data: listing, isLoading } = useQuery({
        queryKey: ['listing', id],
        queryFn: () => getListingById(id!),
        enabled: !!id,
    });

    const { data: guides } = useQuery({
        queryKey: ['guides', startDate, endDate],
        queryFn: () => getAvailableGuides(startDate, endDate),
        enabled: isBookingModalOpen && listing?.type === 'TOUR',
    });

    const { data: vehicles } = useQuery({
        queryKey: ['vehicles', guests],
        queryFn: () => getAvailableVehicles(guests),
        enabled: isBookingModalOpen && listing?.type === 'TOUR',
    });

    const handleBookClick = () => {
        if (!isAuthenticated) {
            navigate('/auth/login', { state: { from: `/checkout/${listing?.type}/${listing?.id}` } });
            return;
        }

        if (listing?.type === 'TOUR') {
            if (!startDate || !endDate) {
                alert('Please select travel dates first');
                return;
            }
            setIsBookingModalOpen(true);
            setBookingStep(1);
        } else {
            navigate(`/checkout/${listing?.type}/${listing?.id}`);
        }
    };

    const handleGuideSelection = (guide: Guide | null) => {
        setSelectedGuide(guide);
        setNeedsGuide(!!guide);
        setBookingStep(2);
    };

    const handleVehicleSelection = (vehicle: VehicleListing) => {
        setSelectedVehicle(vehicle);
        setBookingStep(3);
    };

    const confirmBooking = () => {
        // Navigate to checkout with extra state
        navigate(`/checkout/${listing?.type}/${listing?.id}`, {
            state: {
                guide: selectedGuide,
                vehicle: selectedVehicle,
                isTourBooking: true
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Listing not found</h2>
                <Link to="/">
                    <Button className="mt-4">Go Home</Button>
                </Link>
            </div>
        );
    }

    // Modal Content
    const renderBookingModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Book Your Tour</h2>
                        <p className="text-gray-500 text-sm">
                            {startDate} to {endDate} • {guests} Guests • Step {bookingStep} of 3
                        </p>
                    </div>
                    <button onClick={() => setIsBookingModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                    {/* Step 1: Guide Selection */}
                    {bookingStep === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-4">Do you need a tour guide?</h3>
                            <div className="bg-blue-50 p-4 rounded-xl flex items-start space-x-3 text-blue-800 text-sm mb-6">
                                <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <p>A tour guide enhances your experience with local knowledge and language support. Their fee is added to your total.</p>
                            </div>

                            <div className="flex justify-center space-x-4 mb-8">
                                <Button
                                    variant="outline"
                                    onClick={() => handleGuideSelection(null)}
                                    className="px-8 py-4 h-auto flex flex-col items-center space-y-2 hover:bg-gray-50"
                                >
                                    <span className="font-bold text-lg">No Guide</span>
                                    <span className="text-xs text-gray-500">I'll explore on my own</span>
                                </Button>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 mb-4">Available Guides</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {guides?.map((guide) => (
                                        <div
                                            key={guide.id}
                                            onClick={() => handleGuideSelection(guide)}
                                            className="border rounded-xl p-4 cursor-pointer hover:border-primary-500 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex items-center space-x-4 mb-3">
                                                <img src={guide.image} alt={guide.name} className="w-16 h-16 rounded-full object-cover" />
                                                <div>
                                                    <h5 className="font-bold text-gray-900 group-hover:text-primary-600">{guide.name}</h5>
                                                    <div className="flex items-center text-xs text-yellow-500 font-medium">
                                                        <Star className="w-3 h-3 fill-current mr-1" /> {guide.rating}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex justify-between">
                                                    <span>Experience:</span>
                                                    <span className="font-medium">{guide.experience}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>fee:</span>
                                                    <span className="font-medium text-green-600">Rs {guide.feePerDay.toLocaleString()}/tour</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {guide.languages.map(lang => (
                                                        <span key={lang} className="bg-gray-100 px-2 py-0.5 rounded text-[10px]">{lang}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Vehicle Selection */}
                    {bookingStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-4">Select your transport</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {vehicles?.map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        onClick={() => handleVehicleSelection(vehicle)}
                                        className="border rounded-xl overflow-hidden cursor-pointer hover:border-primary-500 hover:shadow-md transition-all group"
                                    >
                                        <div className="h-40 bg-gray-200 relative">
                                            <img src={vehicle.images[0]} alt={vehicle.title} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-900">
                                                {vehicle.vehicleType}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-gray-900 group-hover:text-primary-600">{vehicle.title}</h4>
                                                <Badge variant="outline">{vehicle.seats} Seats</Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{vehicle.description}</p>
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                <div className="text-xs text-gray-500">
                                                    {vehicle.airConditioned ? 'AC' : 'Non-AC'} • {vehicle.driverIncluded ? 'Driver Inc.' : 'Self Drive'}
                                                </div>
                                                <div className="font-bold text-lg text-primary-600">
                                                    Rs {vehicle.price.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Summary */}
                    {bookingStep === 3 && selectedVehicle && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                                {listing.type !== 'TOUR' && (
                                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{listing.title}</h4>
                                            <span className="text-sm text-gray-500">Base Price</span>
                                        </div>
                                        <span className="font-medium">Rs {listing.price.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        {selectedGuide ? (
                                            <>
                                                <img src={selectedGuide.image} alt={selectedGuide.name} className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{selectedGuide.name}</h4>
                                                    <span className="text-sm text-gray-500">Tour Guide</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <h4 className="font-bold text-gray-900">No Guide Selected</h4>
                                            </div>
                                        )}
                                    </div>
                                    <span className="font-medium">
                                        {selectedGuide ? `Rs ${selectedGuide.feePerDay.toLocaleString()}` : '-'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                    <div className="flex items-center space-x-3">
                                        <img src={selectedVehicle.images[0]} alt={selectedVehicle.title} className="w-12 h-10 rounded object-cover" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{selectedVehicle.title}</h4>
                                            <span className="text-sm text-gray-500">Transport ({selectedVehicle.seats} seats)</span>
                                        </div>
                                    </div>
                                    <span className="font-medium">Rs {selectedVehicle.price.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="font-bold text-lg text-gray-900">Total Estimate</span>
                                    <span className="font-bold text-2xl text-primary-600">
                                        Rs {(
                                            (listing.type === 'TOUR' ? 0 : listing.price) +
                                            (selectedGuide?.feePerDay || 0) +
                                            selectedVehicle.price
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <Button variant="outline" className="flex-1" onClick={() => setBookingStep(2)}>
                                    Back
                                </Button>
                                <Button className="flex-1 py-3 text-lg" onClick={confirmBooking}>
                                    Confirm & Pay
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-16">
            {isBookingModalOpen && renderBookingModal()}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
                            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-red-500 transition-colors shadow-sm">
                                    <Heart className="h-5 w-5" />
                                </button>
                                <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:text-blue-500 transition-colors shadow-sm">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="default" className="mb-2 uppercase tracking-wide text-[10px]">{listing.type}</Badge>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                                    <div className="flex items-center text-gray-500">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {listing.location}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg">
                                        <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                                        <span className="font-bold text-gray-900 text-lg">{listing.rating}</span>
                                        <span className="text-gray-500 text-sm ml-1">({listing.reviewsCount} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6 border-gray-100" />

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">About this option</h3>
                                <p className="text-gray-600 leading-relaxed">{listing.description}</p>
                            </div>

                            {/* Amenities/Details */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {(listing as any).amenities?.map((am: string) => (
                                        <div key={am} className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {am}
                                        </div>
                                    ))}
                                    {(listing as any).vehicleType && (
                                        <div className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {(listing as any).vehicleType}
                                        </div>
                                    )}
                                    {(listing as any).seats && (
                                        <div className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {(listing as any).seats} Seats
                                        </div>
                                    )}
                                    {(listing as any).driverIncluded && (
                                        <div className="flex items-center text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> Driver Included
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Panel */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            {listing.type !== 'TOUR' && (
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <span className="text-3xl font-bold text-gray-900">Rs {listing.price.toLocaleString()}</span>
                                        <span className="text-gray-500 ml-1">
                                            {listing.type === 'STAY' ? '/night' : listing.type === 'VEHICLE' ? '/day' : '/person'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-md p-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Dates</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="date"
                                            className="w-full text-sm outline-none"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            placeholder="Start"
                                        />
                                        <span className="text-gray-400">→</span>
                                        <input
                                            type="date"
                                            className="w-full text-sm outline-none"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            placeholder="End"
                                        />
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-md p-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Guests</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-full text-sm font-medium outline-none"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                    />
                                </div>

                                <Button size="lg" className="w-full mt-4" onClick={handleBookClick}>
                                    {listing.type === 'TOUR' ? 'Configure Tour' : 'Book Now'}
                                </Button>
                                <p className="text-center text-xs text-gray-500 mt-2">You won't be charged yet</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
