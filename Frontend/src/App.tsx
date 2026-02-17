import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Home } from './pages/Home';
import { DestinationsPage } from './pages/DestinationsPage';
import { ListingsPage } from './pages/listings/ListingsPage';
import { ListingDetail } from './pages/listings/ListingDetail';
import { GuestDashboard } from './pages/dashboard/GuestDashboard';
import { ProviderDashboard } from './pages/dashboard/ProviderDashboard';
import { GuideDashboard } from './pages/dashboard/GuideDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { CustomizeTourPage } from './pages/CustomizeTourPage';
import { HelpCenter } from './pages/support/HelpCenter';
import { Terms } from './pages/support/Terms';
import { Privacy } from './pages/support/Privacy';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { useAuthStore } from './stores/authStore';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode, roles?: string[] }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (!isAuthenticated || !user) return <Navigate to="/auth/login" />;
  if (roles && !roles.includes(user.role) && user.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Placeholder components for Dashboards






const Checkout = () => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-2xl font-bold mb-6">Checkout</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <Card className="p-6">
          <h2 className="font-bold text-lg mb-4">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="h-10 bg-gray-100 rounded"></div>
            <div className="col-span-2 h-10 bg-gray-100 rounded"></div>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-bold text-lg mb-4">Payment</h2>
          <div className="h-12 bg-gray-100 rounded mb-4"></div>
          <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold">Pay Now</button>
        </Card>
      </div>
      <div className="md:col-span-1">
        <Card className="p-4">
          <h3 className="font-bold mb-2">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>Rs 15,000</span></div>
            <div className="flex justify-between"><span>Tax</span><span>Rs 500</span></div>
            <div className="border-t pt-2 font-bold flex justify-between"><span>Total</span><span>Rs 15,500</span></div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/destinations" element={<DestinationsPage />} />

        <Route path="/vehicles" element={<ListingsPage type="VEHICLE" title="Rent a Vehicle" subtitle="Find the perfect ride for your journey" />} />
        <Route path="/vehicles/:id" element={<ListingDetail />} />

        <Route path="/stays" element={<ListingsPage type="STAY" title="Stays & Villas" subtitle="Relax in comfort" />} />
        <Route path="/stays/:id" element={<ListingDetail />} />

        <Route path="/tours" element={<ListingsPage type="TOUR" title="Tours & Experiences" subtitle="Explore the island" />} />
        <Route path="/tours/:id" element={<ListingDetail />} />

        <Route path="/search" element={<ListingsPage title="Search Results" />} />

        <Route path="/checkout/:type/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

        <Route path="/custom-tour" element={<CustomizeTourPage />} />

        {/* Support Routes */}
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/auth/login" element={<Navigate to="/" />} />
      <Route path="/auth/register" element={<Navigate to="/" />} />


      {/* Dashboard Routes */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Guest Routes - Redirect /me/reviews etc to GuestDashboard */}
        <Route path="me" element={<ProtectedRoute><GuestDashboard /></ProtectedRoute>} />
        <Route path="me/:tab" element={<ProtectedRoute><GuestDashboard /></ProtectedRoute>} />

        {/* Provider Routes */}
        <Route path="provider" element={<ProtectedRoute roles={['PROVIDER']}><ProviderDashboard /></ProtectedRoute>} />
        <Route path="provider/:tab" element={<ProtectedRoute roles={['PROVIDER']}><ProviderDashboard /></ProtectedRoute>} />

        {/* Guide Routes */}
        <Route path="guide" element={<ProtectedRoute roles={['GUIDE']}><GuideDashboard /></ProtectedRoute>} />
        <Route path="guide/:tab" element={<ProtectedRoute roles={['GUIDE']}><GuideDashboard /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="admin" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="admin/:tab" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
      </Route>

    </Routes>
  );
}

export default App;
