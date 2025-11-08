import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  Search, 
  Filter,
  TrendingUp,
  Package,
  Clock,
  Sparkles,
  AlertCircle,
  Calendar,
  X,
  Check,
} from "lucide-react";
import FarmerPageShell from "./FarmerPageShell";

const vendors = [
  {
    id: "VND-2201",
    name: "Sai Krishi Seeds",
    rating: 4.8,
    distance: "2.5 km",
    verified: true,
    tags: ["Seeds", "Fertilisers"],
    summary: "Certified hybrid seeds and soil nutrients with home delivery.",
  },
  {
    id: "VND-2202",
    name: "Green Shield Agro",
    rating: 4.6,
    distance: "5.1 km",
    verified: true,
    tags: ["Pesticides", "Advisory"],
    summary: "Govt approved pesticides with field consultation support.",
  },
  {
    id: "VND-2203",
    name: "FarmTools Hub",
    rating: 4.3,
    distance: "8.4 km",
    verified: false,
    tags: ["Implements", "Rentals"],
    summary: "Implements for rent, drip kits, and on-call repairs.",
  },
];

// Product data for each vendor
const vendorProducts: Record<string, Array<{
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: string;
  description: string;
  category: string;
}>> = {
  "VND-2201": [
    {
      id: "PRD-001",
      name: "Hybrid Tomato Seeds",
      price: 450,
      unit: "per packet (100g)",
      stock: "In Stock",
      description: "High-yield hybrid tomato seeds with 95% germination rate",
      category: "Seeds"
    },
    {
      id: "PRD-002",
      name: "Urea Fertilizer",
      price: 850,
      unit: "per bag (50kg)",
      stock: "In Stock",
      description: "Premium quality urea fertilizer for nitrogen enrichment",
      category: "Fertilisers"
    },
    {
      id: "PRD-003",
      name: "DAP Fertilizer",
      price: 1200,
      unit: "per bag (50kg)",
      stock: "In Stock",
      description: "Di-Ammonium Phosphate for phosphorus and nitrogen",
      category: "Fertilisers"
    },
    {
      id: "PRD-004",
      name: "Organic Compost",
      price: 350,
      unit: "per bag (25kg)",
      stock: "In Stock",
      description: "100% organic compost for soil health improvement",
      category: "Fertilisers"
    },
    {
      id: "PRD-005",
      name: "Wheat Seeds (Premium)",
      price: 2800,
      unit: "per quintal",
      stock: "Limited Stock",
      description: "Certified premium wheat seeds with high yield potential",
      category: "Seeds"
    },
  ],
  "VND-2202": [
    {
      id: "PRD-006",
      name: "Neem Oil Pesticide",
      price: 450,
      unit: "per liter",
      stock: "In Stock",
      description: "Organic neem oil pesticide for pest control",
      category: "Pesticides"
    },
    {
      id: "PRD-007",
      name: "Insecticide Spray",
      price: 380,
      unit: "per bottle (500ml)",
      stock: "In Stock",
      description: "Effective insecticide for crop protection",
      category: "Pesticides"
    },
    {
      id: "PRD-008",
      name: "Fungicide Solution",
      price: 520,
      unit: "per liter",
      stock: "In Stock",
      description: "Broad-spectrum fungicide for disease prevention",
      category: "Pesticides"
    },
    {
      id: "PRD-009",
      name: "Herbicide (Weed Control)",
      price: 650,
      unit: "per liter",
      stock: "In Stock",
      description: "Selective herbicide for weed management",
      category: "Pesticides"
    },
    {
      id: "PRD-010",
      name: "Field Consultation Service",
      price: 1500,
      unit: "per visit",
      stock: "Available",
      description: "Expert field consultation for crop management",
      category: "Advisory"
    },
  ],
  "VND-2203": [
    {
      id: "PRD-011",
      name: "Drip Irrigation Kit",
      price: 15000,
      unit: "per set (1 acre)",
      stock: "In Stock",
      description: "Complete drip irrigation system with installation support",
      category: "Tools & Rentals"
    },
    {
      id: "PRD-012",
      name: "Tractor Rental (Daily)",
      price: 2500,
      unit: "per day",
      stock: "Available",
      description: "Tractor rental with driver for field operations",
      category: "Tools & Rentals"
    },
    {
      id: "PRD-013",
      name: "Plough Rental",
      price: 800,
      unit: "per day",
      stock: "Available",
      description: "Heavy-duty plough for soil preparation",
      category: "Tools & Rentals"
    },
    {
      id: "PRD-014",
      name: "Harvester Rental",
      price: 5000,
      unit: "per day",
      stock: "Available",
      description: "Combine harvester for efficient crop harvesting",
      category: "Tools & Rentals"
    },
    {
      id: "PRD-015",
      name: "Repair Service",
      price: 500,
      unit: "per call",
      stock: "Available",
      description: "On-call repair service for farm equipment",
      category: "Tools & Rentals"
    },
  ],
};

// Recent orders data
const recentOrders = [
  {
    id: "ORD-001",
    vendor: "Sai Krishi Seeds",
    product: "Urea Fertilizer (50kg)",
    quantity: 10,
    total: 8500,
    date: "3 days ago",
    status: "delivered",
  },
  {
    id: "ORD-002",
    vendor: "Green Shield Agro",
    product: "Pesticide Spray",
    quantity: 5,
    total: 2250,
    date: "1 week ago",
    status: "delivered",
  },
  {
    id: "ORD-003",
    vendor: "FarmTools Hub",
    product: "Drip Irrigation Kit",
    quantity: 1,
    total: 15000,
    date: "2 weeks ago",
    status: "delivered",
  },
];

// AI Recommendations
const aiRecommendations = [
  {
    product: "DAP Fertilizer",
    reason: "Based on your soil analysis showing phosphorus deficiency",
    confidence: 92,
    vendor: "Sai Krishi Seeds",
    estimatedPrice: "₹1,200/bag",
  },
  {
    product: "Organic Compost",
    reason: "Recommended for improving soil health after recent harvest",
    confidence: 85,
    vendor: "Green Shield Agro",
    estimatedPrice: "₹350/bag",
  },
];

const FarmerVendorHub = () => {
  const [requestedVendors, setRequestedVendors] = useState<Set<string>>(new Set());
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const handleRequestContact = (vendorId: string) => {
    setRequestedVendors(prev => new Set(prev).add(vendorId));
    // Show success message or notification
    setTimeout(() => {
      // You can add a toast notification here
    }, 100);
  };

  const handleViewProducts = (vendorId: string) => {
    setSelectedVendor(vendorId);
    setIsProductDialogOpen(true);
  };

  const getVendorProducts = (vendorId: string) => {
    return vendorProducts[vendorId] || [];
  };

  const getVendorName = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId)?.name || "Vendor";
  };

  return (
    <FarmerPageShell
      title="Vendor Hub"
      description="Discover trusted input suppliers nearby. Verified badges, ratings, and contact approvals keep procurement transparent and safe."
      badge="Vendors"
    >
      <div className="grid gap-8 xl:grid-cols-[1.4fr,1fr]">
        <Card className="border-border bg-white/90 p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Find vendors (Stub)</h2>
              <p className="text-sm text-muted-foreground">
                Search and filter across inputs, services, and verified government partners.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Search className="h-4 w-4" />
                Smart search
              </Button>
              <Button variant="outline" className="inline-flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input placeholder="Search by crop, product, vendor name..." />
            <Tabs defaultValue="all" className="md:col-span-2">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  All
                </TabsTrigger>
                <TabsTrigger value="seed" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Seeds
                </TabsTrigger>
                <TabsTrigger value="fertiliser" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Fertilisers
                </TabsTrigger>
                <TabsTrigger value="tools" className="data-[state=active]:bg-farmer data-[state=active]:text-white">
                  Tools & Rentals
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <ScrollArea className="h-[360px] pr-4">
                  <div className="space-y-4">
                    {vendors.map((vendor) => (
                      <Card key={vendor.id} className="border-border bg-white/95 p-5 shadow-sm">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-12 w-12 border border-farmer/20 bg-farmer/10 text-farmer">
                              <AvatarFallback>{vendor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg font-semibold text-foreground">{vendor.name}</h3>
                                <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                                  <Star className="mr-1 h-4 w-4 text-amber-600" />
                                  {vendor.rating}
                                </Badge>
                                {vendor.verified ? (
                                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                                    <ShieldCheck className="mr-1 h-4 w-4 text-emerald-600" />
                                    Govt Verified
                                  </Badge>
                                ) : null}
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">{vendor.summary}</p>
                              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                <Badge variant="outline" className="border-farmer/30 text-farmer">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {vendor.distance}
                                </Badge>
                                {vendor.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="border-foreground/20 text-foreground">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="inline-flex items-center gap-2"
                              onClick={() => handleViewProducts(vendor.id)}
                            >
                              <ShoppingBag className="h-4 w-4" />
                              View Products
                            </Button>
                            <Button 
                              className={`${
                                requestedVendors.has(vendor.id) 
                                  ? "bg-emerald-600 hover:bg-emerald-700" 
                                  : "bg-farmer hover:bg-farmer/90"
                              }`}
                              size="sm"
                              onClick={() => handleRequestContact(vendor.id)}
                              disabled={requestedVendors.has(vendor.id)}
                            >
                              {requestedVendors.has(vendor.id) ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Request Sent
                                </>
                              ) : (
                                "Request Contact"
                              )}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="seed" className="text-sm text-muted-foreground">
                Seed vendor filter stub.
              </TabsContent>
              <TabsContent value="fertiliser" className="text-sm text-muted-foreground">
                Fertiliser vendor filter stub.
              </TabsContent>
              <TabsContent value="tools" className="text-sm text-muted-foreground">
                Tools & rentals vendor filter stub.
              </TabsContent>
            </Tabs>
          </div>
        </Card>
        <div className="space-y-6">
          {/* AI-Powered Recommendations */}
          <Card className="border-farmer/30 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-farmer/10 p-2">
                <Sparkles className="h-5 w-5 text-farmer" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="rounded-lg border border-farmer/20 bg-white/80 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{rec.product}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{rec.vendor}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {rec.confidence}% match
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    <AlertCircle className="inline h-3 w-3 mr-1" />
                    {rec.reason}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{rec.estimatedPrice}</span>
                    <Button size="sm" className="bg-farmer hover:bg-farmer/90">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="rounded-lg bg-muted/30 p-3 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-farmer" />
                Recommendations updated based on your soil analysis and crop cycle
              </p>
            </div>
          </Card>

          {/* Recent Orders */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-farmer" />
                <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
              </div>
              <Badge variant="outline">3 orders</Badge>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="rounded-lg border border-border bg-muted/20 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.vendor}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {order.date}
                    </span>
                    <span className="font-semibold text-foreground">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </Card>

          {/* Purchase Analytics */}
          <Card className="border-border bg-white/90 p-6 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-farmer" />
              <h3 className="text-lg font-semibold text-foreground">Purchase Analytics</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Total Spent (This Month)</span>
                  <span className="font-bold text-foreground">₹25,750</span>
                </div>
                <Progress value={65} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">65% of monthly budget</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Top Categories</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fertilizers</span>
                    <span className="font-semibold text-foreground">₹15,500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pesticides</span>
                    <span className="font-semibold text-foreground">₹6,250</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tools</span>
                    <span className="font-semibold text-foreground">₹4,000</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="rounded-lg bg-blue-50 p-3 text-sm">
                <p className="flex items-center gap-2 text-blue-700">
                  <Clock className="h-4 w-4" />
                  Best time to buy: Early morning (6-9 AM) for better deals
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Products Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-farmer" />
              Products - {selectedVendor && getVendorName(selectedVendor)}
            </DialogTitle>
            <DialogDescription>
              Browse available products from this vendor
            </DialogDescription>
          </DialogHeader>
          
          {selectedVendor && (
            <div className="space-y-4 mt-4">
              {getVendorProducts(selectedVendor).length > 0 ? (
                <div className="grid gap-4">
                  {getVendorProducts(selectedVendor).map((product) => (
                    <Card key={product.id} className="border-border bg-white/95 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-foreground text-lg">{product.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                            </div>
                            <Badge className={`ml-2 ${
                              product.stock === "In Stock" || product.stock === "Available" 
                                ? "bg-emerald-100 text-emerald-700" 
                                : "bg-amber-100 text-amber-700"
                            }`}>
                              {product.stock}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <div>
                              <span className="text-2xl font-bold text-farmer">₹{product.price.toLocaleString()}</span>
                              <span className="text-sm text-muted-foreground ml-1">{product.unit}</span>
                            </div>
                            <Badge variant="outline" className="border-farmer/30 text-farmer">
                              {product.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 md:flex-col">
                          <Button 
                            className="bg-farmer hover:bg-farmer/90"
                            size="sm"
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline"
                            size="sm"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No products available from this vendor</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </FarmerPageShell>
  );
};

export default FarmerVendorHub;

