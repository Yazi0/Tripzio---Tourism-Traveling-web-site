import React, { useState } from 'react';
import { Search, Calendar, MapPin, User, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSearch = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'stays' | 'vehicles' | 'tours'>('all');

    return (
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-4xl mx-auto -mt-24 relative z-20">
            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-100 mb-6 overflow-x-auto">
                {[
                    { id: 'all', label: 'All' },
                    { id: 'stays', label: 'Stays' },
                    { id: 'vehicles', label: 'Vehicles' },
                    { id: 'tours', label: 'Tours' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`pb-4 font-medium text-sm sm:text-base border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-primary-600 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-900 group-hover:border-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4 relative group">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Destination</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Dates</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all font-medium text-gray-900"
                        />
                    </div>
                </div>

                <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Travelers</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all font-medium text-gray-900 appearance-none cursor-pointer">
                            <option>1 Adult</option>
                            <option>2 Adults</option>
                            <option>2 Adults, 1 Child</option>
                            <option>4+ Travelers</option>
                        </select>
                    </div>
                </div>

                <div className="md:col-span-2 pt-5">
                    <Button className="w-full h-[48px] text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
