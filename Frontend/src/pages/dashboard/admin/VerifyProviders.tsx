import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Check, X } from 'lucide-react';

const PENDING_PROVIDERS = [
    { id: 'p1', name: 'Green Leaf Hotel', type: 'STAY', location: 'Ella', applied: '2 days ago' },
    { id: 'p2', name: 'Saman Taxis', type: 'VEHICLE', location: 'Kandy', applied: '5 days ago' },
    { id: 'p3', name: 'Spice Garden Tours', type: 'TOUR', location: 'Matale', applied: '1 week ago' },
];

export const VerifyProviders = () => {
    const [providers, setProviders] = useState(PENDING_PROVIDERS);

    const handleApprove = (id: string, name: string) => {
        // In a real app, API call here
        setProviders(prev => prev.filter(p => p.id !== id));
        // alert(`Approved access for ${name}`); // Removed alert for smoother UX, maybe add Toast later
    };

    const handleReject = (id: string, name: string) => {
        if (confirm(`Reject application for ${name}?`)) {
            setProviders(prev => prev.filter(p => p.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Verify Providers</h2>
                <Badge variant="warning">{providers.length} Pending</Badge>
            </div>

            {providers.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500">No pending provider applications.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {providers.map((provider) => (
                        <Card key={provider.id} className="p-6 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                    {provider.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{provider.name}</h3>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <Badge variant="default">{provider.type}</Badge>
                                        <span>• {provider.location}</span>
                                        <span>• Applied {provider.applied}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <Button variant="outline" size="sm">View Documents</Button>
                                <div className="flex space-x-2 border-l pl-3 ml-3 border-gray-200">
                                    <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApprove(provider.id, provider.name)}
                                    >
                                        <Check className="h-4 w-4 mr-1" /> Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                        onClick={() => handleReject(provider.id, provider.name)}
                                    >
                                        <X className="h-4 w-4 mr-1" /> Reject
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
