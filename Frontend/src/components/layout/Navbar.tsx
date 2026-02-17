import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Menu, X, User as UserIcon, Map, Calendar, Car, Search, Home, Users, Phone } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(''); // Optional: clear after search? Maybe keep it?
            // User UX: usually keep it if valid, but we are navigating away.
            // If we clear it, the user sees empty box on new page (if navbar is persistent and not re-mounted).
            // Actually Navbar is persistent in AppLayout usually?
            // Navbar is inside AppLayout? No, App.tsx has `<Route element={<AppLayout />}>`.
            // AppLayout probably renders Navbar.
            // If specific page `ListingsPage` shows the search term in ITS input, that's fine.
            // But the navbar input might want to be cleared or synced.
            // Let's clear it for now to avoid confusion if it doesn't match the page content.
            setSearchTerm('');
        }
    };

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Destinations', href: '/destinations', icon: Map },
        { name: 'Vehicles', href: '/vehicles', icon: Car },
        { name: 'Stays', href: '/stays', icon: Calendar },
        { name: 'Tours', href: '/tours', icon: Map },
        { name: 'About', href: '/about', icon: Users },
        { name: 'Contact', href: '/contact', icon: Phone },
    ];

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary-600">Tripzio</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={cn(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-primary-600 bg-primary-50"
                                            : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-64 transition-all"
                            />
                        </form>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-100 shadow-xl z-40">
                    <div className="p-4 space-y-4">
                        {/* Mobile Search */}
                        <form onSubmit={(e) => { handleSearchSubmit(e); setIsOpen(false); }} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search destinations, tours..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base transition-all"
                            />
                        </form>

                        <div className="space-y-1">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={cn(
                                            "flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary-50 text-primary-700 shadow-sm"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className={cn(
                                            "flex items-center justify-center h-10 w-10 rounded-lg mr-3 transition-colors",
                                            isActive ? "bg-primary-100 text-primary-600" : "bg-gray-100 text-gray-500"
                                        )}>
                                            <link.icon className="h-5 w-5" />
                                        </div>
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
