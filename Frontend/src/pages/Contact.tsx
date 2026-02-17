import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            {/* Hero Section */}
            <div className="bg-primary-900 text-white py-16 mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-primary-100 italic">We'd love to hear from you. Get in touch with our team.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 border-l-4 border-primary-600">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-50 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Visit Us</h4>
                                        <p className="text-gray-600 mt-1">
                                            123 Tourism Drive,<br />
                                            Colombo 03,<br />
                                            Sri Lanka
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-50 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Email Us</h4>
                                        <p className="text-gray-600 mt-1">hello@tripzio.com</p>
                                        <p className="text-gray-600">support@tripzio.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-primary-50 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Call Us</h4>
                                        <p className="text-gray-600 mt-1">+94 11 234 5678</p>
                                        <p className="text-gray-600">+94 77 123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Map Placeholder */}
                        <div className="h-64 rounded-xl overflow-hidden shadow-lg bg-gray-200 relative">
                            {/* Replace with actual map embed if needed */}
                            <img
                                src="https://images.unsplash.com/photo-1569668723429-9fb7e19bd65e?auto=format&fit=crop&q=80&w=1000"
                                alt="Map Location"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg font-semibold text-sm shadow">
                                    Find us on Google Maps
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button type="submit" size="lg" className="px-8">
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
