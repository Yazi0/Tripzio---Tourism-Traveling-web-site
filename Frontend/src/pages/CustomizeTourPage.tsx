import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Plus, MapPin, X, Car, CheckCircle } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Destinations
const DESTINATIONS = [
    { id: 1, name: 'Colombo', lat: 6.9271, lng: 79.8612, type: 'City' },
    { id: 2, name: 'Kandy', lat: 7.2906, lng: 80.6337, type: 'Culture' },
    { id: 3, name: 'Sigiriya', lat: 7.9570, lng: 80.7603, type: 'Heritage' },
    { id: 4, name: 'Ella', lat: 6.8667, lng: 81.0466, type: 'Nature' },
    { id: 5, name: 'Galle', lat: 6.0535, lng: 80.2210, type: 'Beach' },
    { id: 6, name: 'Mirissa', lat: 5.9482, lng: 80.4716, type: 'Beach' },
    { id: 7, name: 'Nuwara Eliya', lat: 6.9497, lng: 80.7891, type: 'Nature' },
    { id: 8, name: 'Yala', lat: 6.3860, lng: 81.4246, type: 'Wildlife' },
];

const VEHICLES = [
    { id: 'v1', name: 'Sedan (Toyota Prius)', capacity: '3 Pax', pricePerKm: 120 },
    { id: 'v2', name: 'SUV (Toyota Prado)', capacity: '4 Pax', pricePerKm: 180 },
    { id: 'v3', name: 'Mini Van (Toyota Hiace)', capacity: '8 Pax', pricePerKm: 150 },
    { id: 'v4', name: 'Luxury Coach', capacity: '20 Pax', pricePerKm: 250 },
];

export const CustomizeTourPage = () => {
    const [selectedDestinations, setSelectedDestinations] = useState<typeof DESTINATIONS>([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [tourName, setTourName] = useState('');
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleDestination = (dest: typeof DESTINATIONS[0]) => {
        if (selectedDestinations.find(d => d.id === dest.id)) {
            setSelectedDestinations(prev => prev.filter(d => d.id !== dest.id));
        } else {
            setSelectedDestinations(prev => [...prev, dest]);
        }
    };

    const handleBookTour = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending notification to Admin
        console.log('Notification sent to Admin:', {
            tour: tourName,
            destinations: selectedDestinations.map(d => d.name),
            vehicle: selectedVehicle,
            status: 'PENDING_APPROVAL'
        });

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            // navigate to dashboard or reset
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Customize Your Dream Tour</h1>
                    <p className="mt-2 text-gray-600">Select destinations, choose your ride, and let us handle the rest.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Map & Selection Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-1 overflow-hidden h-[500px] relative z-0">
                            <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={false} className="h-full w-full rounded-lg z-0">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {DESTINATIONS.map((dest) => (
                                    <Marker
                                        key={dest.id}
                                        position={[dest.lat, dest.lng]}
                                        eventHandlers={{
                                            click: () => toggleDestination(dest),
                                        }}
                                        opacity={selectedDestinations.find(d => d.id === dest.id) ? 1.0 : 0.6}
                                    >
                                        <Popup>
                                            <div className="text-center">
                                                <h3 className="font-bold">{dest.name}</h3>
                                                <p className="text-xs text-gray-500">{dest.type}</p>
                                                <Button
                                                    size="sm"
                                                    className="mt-2 text-xs h-6 px-2"
                                                    onClick={() => toggleDestination(dest)}
                                                >
                                                    {selectedDestinations.find(d => d.id === dest.id) ? 'Remove' : 'Add'}
                                                </Button>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </Card>

                        {/* Selected Destinations List */}
                        <Card className="p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <MapPin className="h-5 w-5 mr-2 text-primary-600" />
                                Selected Destinations ({selectedDestinations.length})
                            </h3>
                            {selectedDestinations.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">Click on map markers to add destinations to your route.</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {selectedDestinations.map((dest, index) => (
                                        <div key={dest.id} className="flex items-center bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium">
                                            <span className="mr-2 w-5 h-5 rounded-full bg-primary-200 flex items-center justify-center text-xs">{index + 1}</span>
                                            {dest.name}
                                            <button
                                                onClick={() => toggleDestination(dest)}
                                                className="ml-2 text-primary-400 hover:text-primary-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Booking Form */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Plan Details</h2>

                            {showSuccess ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-pulse">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-green-900">Request Sent!</h3>
                                    <p className="text-green-700 mt-2 text-sm">Our admin team has received your custom tour request. We will contact you shortly with a quote.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBookTour} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tour Name (Optional)</label>
                                        <Input
                                            placeholder="e.g., Summer Family Trip"
                                            value={tourName}
                                            onChange={(e) => setTourName(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Vehicle</label>
                                        <div className="space-y-3">
                                            {VEHICLES.map((v) => (
                                                <div
                                                    key={v.id}
                                                    onClick={() => setSelectedVehicle(v.id)}
                                                    className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedVehicle === v.id
                                                            ? 'border-primary-600 bg-primary-50 ring-1 ring-primary-600'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-medium text-gray-900">{v.name}</span>
                                                        <Car className={`h-5 w-5 ${selectedVehicle === v.id ? 'text-primary-600' : 'text-gray-400'}`} />
                                                    </div>
                                                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                        <span>{v.capacity}</span>
                                                        <span>Rs {v.pricePerKm}/km</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">Destinations</span>
                                            <span className="font-medium">{selectedDestinations.length}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mb-4">
                                            <span className="text-gray-600">Vehicle</span>
                                            <span className="font-medium">
                                                {VEHICLES.find(v => v.id === selectedVehicle)?.name || 'Not selected'}
                                            </span>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={selectedDestinations.length === 0 || !selectedVehicle}
                                        >
                                            Request Quote & Book
                                        </Button>
                                        <p className="text-xs text-gray-400 text-center mt-3">
                                            Admin will review your route and vehicle choice to provide a final price.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
