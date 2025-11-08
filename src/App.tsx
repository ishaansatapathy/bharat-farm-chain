import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Farmer from "./pages/Farmer";
import Vendor from "./pages/Vendor";
import Buyer from "./pages/Buyer";
import FarmAcademy from "./pages/FarmAcademy";
import NotFound from "./pages/NotFound";
import FarmerLogin from "./pages/farmer/Login";
import FarmerCreateListing from "./pages/farmer/CreateListing";
import FarmerMyListings from "./pages/farmer/MyListings";
import FarmerBuyerConnect from "./pages/farmer/BuyerRequests";
import FarmerSoilAnalysis from "./pages/farmer/SoilAnalysis";
import FarmerGovernmentSchemes from "./pages/farmer/GovernmentSchemes";
import FarmerCommunityExchange from "./pages/farmer/CommunityExchange";
import FarmerVendorHub from "./pages/farmer/VendorHub";
import FarmerProfile from "./pages/farmer/Profile";
import FarmerPayments from "./pages/farmer/Payments";
import VendorLogin from "./pages/vendor/Login";
import VendorDashboard from "./pages/vendor/Dashboard";
import BuyerLogin from "./pages/buyer/Login";
import BuyerDashboard from "./pages/buyer/Dashboard";
import BuyerCheckout from "./pages/buyer/Checkout";
import ExpertQA from "./pages/ExpertQA";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farm-academy" element={<FarmAcademy />} />
          <Route path="/farm-academy/expert-qa" element={<ExpertQA />} />
          <Route path="/farmer" element={<Navigate to="/farmer/login" replace />} />
          <Route path="/farmer/login" element={<FarmerLogin />} />
          <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><Farmer /></ProtectedRoute>} />
          <Route path="/farmer/create-listing" element={<ProtectedRoute role="farmer"><FarmerCreateListing /></ProtectedRoute>} />
          <Route path="/farmer/my-listings" element={<ProtectedRoute role="farmer"><FarmerMyListings /></ProtectedRoute>} />
          <Route path="/farmer/buyer-connect" element={<ProtectedRoute role="farmer"><FarmerBuyerConnect /></ProtectedRoute>} />
          <Route path="/farmer/soil-analysis" element={<ProtectedRoute role="farmer"><FarmerSoilAnalysis /></ProtectedRoute>} />
          <Route path="/farmer/government-schemes" element={<ProtectedRoute role="farmer"><FarmerGovernmentSchemes /></ProtectedRoute>} />
          <Route path="/farmer/community-exchange" element={<ProtectedRoute role="farmer"><FarmerCommunityExchange /></ProtectedRoute>} />
          <Route path="/farmer/vendor-hub" element={<ProtectedRoute role="farmer"><FarmerVendorHub /></ProtectedRoute>} />
          <Route path="/farmer/profile" element={<ProtectedRoute role="farmer"><FarmerProfile /></ProtectedRoute>} />
          <Route path="/farmer/payments" element={<ProtectedRoute role="farmer"><FarmerPayments /></ProtectedRoute>} />
          <Route path="/vendor" element={<Navigate to="/vendor/login" replace />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/dashboard" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
          <Route path="/buyer" element={<Navigate to="/buyer/login" replace />} />
          <Route path="/buyer/login" element={<BuyerLogin />} />
          <Route path="/buyer/dashboard" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/buyer/checkout" element={<ProtectedRoute role="buyer"><BuyerCheckout /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
