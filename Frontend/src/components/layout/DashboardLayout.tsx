import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LayoutDashboard, Calendar, List, DollarSign, LogOut, Home, UserCheck, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

export const DashboardLayout = () => {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    if (!user) {
        return null; // Wrapper should handle redirect
    }

    const guestLinks = [
        { name: 'Profile', href: '/me', icon: LayoutDashboard },
        { name: 'My Bookings', href: '/me/bookings', icon: Calendar },
        { name: 'Reviews', href: '/me/reviews', icon: List },
    ];

    const providerLinks = [
        { name: 'Overview', href: '/provider', icon: LayoutDashboard },
        { name: 'My Listings', href: '/provider/listings', icon: List },
        { name: 'Bookings', href: '/provider/bookings', icon: Calendar },
        { name: 'Calendar', href: '/provider/calendar', icon: Calendar },
        { name: 'Payouts', href: '/provider/payouts', icon: DollarSign },
    ];

    const adminLinks = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Verify Providers', href: '/admin/providers', icon: UserCheck },
        { name: 'All Listings', href: '/admin/listings', icon: List },
        { name: 'Platform Bookings', href: '/admin/bookings', icon: Calendar },
        { name: 'Payments', href: '/admin/payments', icon: DollarSign },
        { name: 'Content Settings', href: '/admin/content', icon: Settings },
    ];

    const guideLinks = [
        { name: 'Overview', href: '/guide', icon: LayoutDashboard },
        { name: 'My Tours', href: '/guide/tours', icon: List },
        { name: 'Earnings', href: '/guide/earnings', icon: DollarSign },
        { name: 'Availability', href: '/guide/calendar', icon: Calendar },
    ];

    const links = user.role === 'ADMIN' ? adminLinks :
        user.role === 'PROVIDER' ? providerLinks :
            user.role === 'GUIDE' ? guideLinks :
                guestLinks;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center space-x-2 text-primary-600 font-bold text-xl hover:text-primary-700 transition-colors">
                        <Home className="h-5 w-5" />
                        <span>Tripzio</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                    <nav className="px-4 space-y-1">
                        {links.map((link) => {
                            const isActive = location.pathname === link.href || location.pathname.startsWith(`${link.href}/`);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={cn(
                                        'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                                        isActive
                                            ? 'bg-primary-50 text-primary-700 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    )}
                                >
                                    <link.icon className={cn("mr-3 h-5 w-5 flex-shrink-0 transition-colors", isActive ? "text-primary-700" : "text-gray-400")} />
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center px-2 mb-4">
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                            alt=""
                            className="h-9 w-9 rounded-full bg-white border border-gray-200"
                        />
                        <div className="ml-3 min-w-0">
                            <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{user.role.toLowerCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 md:pl-64 transition-all duration-300">
                <header className="bg-white shadow-sm md:hidden h-16 flex items-center px-4 justify-between sticky top-0 z-20">
                    <Link to="/" className="font-bold text-lg text-primary-600">Tripzio</Link>
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                            alt=""
                            className="h-8 w-8 rounded-full bg-gray-200"
                        />
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
