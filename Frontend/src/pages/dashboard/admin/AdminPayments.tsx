import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Download, DollarSign, TrendingUp } from 'lucide-react';

export const AdminPayments = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Payments & Payouts</h2>
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-green-50 border-green-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full text-green-600 mr-4">
                            <DollarSign className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-800">Total Revenue (Platform)</p>
                            <h3 className="text-2xl font-bold text-green-900">Rs 12,500,000</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 bg-blue-50 border-blue-100">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600 mr-4">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-800">Pending Payouts</p>
                            <h3 className="text-2xl font-bold text-blue-900">Rs 450,000</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Booking #10{i}2</p>
                                    <p className="text-xs text-gray-500">2 mins ago</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-green-600">+Rs 15,000</p>
                                <p className="text-xs text-gray-500">Commission: Rs 1,500</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
