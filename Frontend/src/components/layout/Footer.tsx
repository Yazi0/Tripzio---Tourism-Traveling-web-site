import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Services</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/vehicles" className="text-base text-gray-400 hover:text-white transition-colors">Vehicles</Link></li>
                            <li><Link to="/stays" className="text-base text-gray-400 hover:text-white transition-colors">Stays</Link></li>
                            <li><Link to="/tours" className="text-base text-gray-400 hover:text-white transition-colors">Tours</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/help" className="text-base text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link to="/terms" className="text-base text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-base text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/about" className="text-base text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-base text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/careers" className="text-base text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">About Tripzio</h3>
                        <p className="mt-4 text-base text-gray-400">
                            Experience the best of Sri Lanka with our curated marketplace. From luxury villas to authentic street food, find everything you need for an unforgettable journey.
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t border-slate-800 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; 2024 Tripzio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
