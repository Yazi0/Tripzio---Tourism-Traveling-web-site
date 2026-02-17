import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export const HeroSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div className="bg-gradient-to-t from-primary-900/60 to-white/10 backdrop-blur-md p-4 md:p-6 max-w-3xl mx-auto -mt-10 relative z-20 rounded-2xl border border-white/20">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full shadow-xl rounded-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search destinations, tours, or activities..."
                        className="w-full pl-12 pr-4 py-4 bg-white/90 border-2 border-primary-600 rounded-xl focus:ring-4 focus:ring-primary-100 focus:outline-none transition-all font-medium text-gray-900 placeholder:text-gray-500 text-lg shadow-sm backdrop-blur-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full md:w-auto px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-primary-600 bg-primary-600 hover:bg-primary-700">
                    Search
                </Button>
            </form>
        </div>
    );
};
