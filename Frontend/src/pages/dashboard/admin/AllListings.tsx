import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Search, Filter, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { MOCK_LISTINGS } from '../../../mocks/listings';

export const AllListings = () => {
    const [listings, setListings] = useState(MOCK_LISTINGS);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: string, title: string) => {
        if (confirm(`Are you sure you want to delete "${title}"?`)) {
            setListings(prev => prev.filter(l => l.id !== id));
        }
    };

    const filteredListings = listings.filter(l =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">All Listings</h2>
                <div className="flex space-x-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search listings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                    <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4 font-medium">Listing</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium">Location</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Rating</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredListings.length > 0 ? (
                                filteredListings.map((listing) => (
                                    <tr key={listing.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img src={listing.images[0]} alt="" className="h-10 w-10 rounded object-cover mr-3" />
                                                <span className="font-medium text-gray-900">{listing.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><Badge variant="default">{listing.type}</Badge></td>
                                        <td className="px-6 py-4 text-gray-600">{listing.location}</td>
                                        <td className="px-6 py-4 font-medium">Rs {listing.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-gray-600">{listing.rating} ⭐</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button className="text-gray-400 hover:text-blue-600" title="Edit">
                                                    <Edit className="h-5 w-5" />
                                                </button>
                                                <button
                                                    className="text-gray-400 hover:text-red-600"
                                                    title="Delete"
                                                    onClick={() => handleDelete(listing.id, listing.title)}
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No listings found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
