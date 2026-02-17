import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UserCheck, List, Calendar, DollarSign, Settings } from 'lucide-react';

// Import Admin Sub-components
import { AdminOverview } from './admin/AdminOverview';
import { VerifyProviders } from './admin/VerifyProviders';
import { AllListings } from './admin/AllListings';
import { PlatformBookings } from './admin/PlatformBookings';
import { AdminPayments } from './admin/AdminPayments';
import { ContentSettings } from './admin/ContentSettings';

export const AdminDashboard = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const textTab = tab || 'overview';
    const activeTab = ['overview', 'providers', 'listings', 'bookings', 'payments', 'content'].includes(textTab) ? textTab : 'overview';

    const setActiveTab = (newTab: string) => {
        navigate(`/admin/${newTab}`);
    };

    // Tabs configuration to map UI labels/icons to IDs
    const TABS = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'providers', label: 'Verify Providers', icon: UserCheck },
        { id: 'listings', label: 'All Listings', icon: List },
        { id: 'bookings', label: 'Platform Bookings', icon: Calendar },
        { id: 'payments', label: 'Payments', icon: DollarSign },
        { id: 'content', label: 'Content Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Admin Header / Tab Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 border-b border-gray-100 md:border-none">
                        <h1 className="text-xl font-bold text-gray-900">Admin Control Panel</h1>
                    </div>

                    <div className="flex space-x-1 overflow-x-auto -mb-px pb-1 md:pb-0 hide-scrollbar">
                        {TABS.map((tabItem) => (
                            <button
                                key={tabItem.id}
                                onClick={() => setActiveTab(tabItem.id)}
                                className={`group inline-flex items-center py-4 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tabItem.id
                                        ? 'border-primary-600 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tabItem.icon className={`mr-2 h-4 w-4 ${activeTab === tabItem.id ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                {tabItem.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && <AdminOverview />}
                {activeTab === 'providers' && <VerifyProviders />}
                {activeTab === 'listings' && <AllListings />}
                {activeTab === 'bookings' && <PlatformBookings />}
                {activeTab === 'payments' && <AdminPayments />}
                {activeTab === 'content' && <ContentSettings />}
            </div>
        </div>
    );
};
