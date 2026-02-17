import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Save } from 'lucide-react';

export const ContentSettings = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Content Settings</h2>

            <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Homepage Banner</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
                        <Input defaultValue="Experience Sri Lanka" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Subtitle</label>
                        <Input defaultValue="From pristine beaches to misty mountains" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                        <Input defaultValue="https://images.unsplash.com/photo-1586749326462-27bef8f28c2e?q=80&w=2070" />
                    </div>
                    <Button>
                        <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Commission Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stays (%)</label>
                        <Input type="number" defaultValue="10" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicles (%)</label>
                        <Input type="number" defaultValue="12" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tours (%)</label>
                        <Input type="number" defaultValue="15" />
                    </div>
                </div>
                <div className="mt-4">
                    <Button variant="outline">Update Rates</Button>
                </div>
            </Card>
        </div>
    );
};
