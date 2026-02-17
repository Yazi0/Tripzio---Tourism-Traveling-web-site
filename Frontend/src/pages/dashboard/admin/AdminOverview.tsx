import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';

export const AdminOverview = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Admin Overview</h2>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <h3 className="text-2xl font-bold mt-1">1,204</h3>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Users className="h-5 w-5" />
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Providers</p>
                            <h3 className="text-2xl font-bold mt-1">3</h3>
                        </div>
                        <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                            <UserCheck className="h-5 w-5" />
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Bookings</p>
                            <h3 className="text-2xl font-bold mt-1">12</h3>
                        </div>
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                            <Calendar className="h-5 w-5" />
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <h3 className="text-2xl font-bold mt-1">Rs 12.5M</h3>
                        </div>
                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                            <DollarSign className="h-5 w-5" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6">
                    <h3 className="text-lg font-bold mb-4">Urgent Actions</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <div>
                                <h4 className="font-medium text-yellow-900">New Provider Application</h4>
                                <p className="text-sm text-yellow-700">Green Leaf Hotel requests verification.</p>
                            </div>
                            <Button size="sm" variant="outline">Review</Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                            <div>
                                <h4 className="font-medium text-red-900">Reported Listing</h4>
                                <p className="text-sm text-red-700">Safari Jeep #204 flagged for pricing.</p>
                            </div>
                            <Button size="sm" variant="outline">Resolve</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
