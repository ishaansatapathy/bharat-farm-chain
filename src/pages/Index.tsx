import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortalCard from "@/components/PortalCard";
import { Button } from "@/components/ui/button";
import { Sprout, Store, ShoppingCart, Shield, Smartphone, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-[var(--gradient-earth)] py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Blockchain-Protected & DPIN Verified</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              One Platform. Three Users.
              <span className="block text-primary mt-2">One Trusted Farming Ecosystem.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              KisanConnect brings together farmers, vendors, and buyers in a transparent, 
              AI-powered marketplace built on trust, traceability, and fair pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Portal Cards Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Choose Your Portal</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you grow, supply, or buy — we have the right platform for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <PortalCard
              title="Farmer Portal"
              description="Grow better crops, get AI-powered insights, and sell at fair prices"
              features={[
                "AI Soil Health & Crop Diagnosis",
                "Direct crop listings to buyers",
                "Access verified vendors",
                "Government scheme discovery",
                "Blockchain-protected identity"
              ]}
              icon={Sprout}
              to="/farmer"
              colorClass="text-farmer"
            />

            <PortalCard
              title="Vendor Portal"
              description="Connect with thousands of verified farmers and grow your business"
              features={[
                "List seeds, fertilizers & tools",
                "Buy crops directly from farmers",
                "AI-driven product recommendations",
                "Build verified vendor profile",
                "Offline-friendly with DPIN"
              ]}
              icon={Store}
              to="/vendor"
              colorClass="text-vendor"
            />

            <PortalCard
              title="Buyer Portal"
              description="Source fresh, verified crops directly from trusted farmers"
              features={[
                "Discover verified crops nearby",
                "Real-time chat & negotiation",
                "Secure contact reveal system",
                "Flexible payment options",
                "Full blockchain traceability"
              ]}
              icon={ShoppingCart}
              to="/buyer"
              colorClass="text-buyer"
            />
          </div>
        </div>
      </section>

      {/* AI CHATBOT SECTION - HERO PLACEMENT TEST */}
      <div style={{backgroundColor: 'orange', color: 'white', fontSize: '40px', padding: '30px', border: '10px solid red', textAlign: 'center'}}>
        🚨 AI CHATBOT SECTION - HERO PLACEMENT 🚨
      </div>
      <section style={{display: 'block !important', visibility: 'visible !important'}} className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 style={{color: 'red', fontSize: '50px', backgroundColor: 'yellow'}}>🤖 AI FARMING ASSISTANT - HERO POSITION</h2>
          <p>This is a test to see if the AI chatbot section is visible when placed after the hero section</p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why KisanConnect?</h2>
            <p className="text-xl text-muted-foreground">Built for India's Agricultural Future</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Blockchain Trust</h3>
              <p className="text-muted-foreground">
                Every user and transaction is verified with secure blockchain hashing
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10">
                <Smartphone className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Works Offline</h3>
              <p className="text-muted-foreground">
                DPIN support and SMS fallback ensure reliability even in low network areas
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Fair Pricing</h3>
              <p className="text-muted-foreground">
                Transparent market rates and direct connections eliminate middlemen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI CHATBOT SECTION START - DEBUG MARKER */}
      <div style={{display: 'block !important', visibility: 'visible !important', position: 'relative !important', zIndex: '9999 !important'}} className="text-center bg-red-500 text-white text-4xl font-bold p-8">
        🔍 AI CHATBOT SECTION SHOULD BE VISIBLE HERE 🔍
        <br />
        <span className="text-2xl">If you see this, the section is rendering!</span>
      </div>
      
      {/* ULTRA SIMPLE TEST */}
      <div style={{backgroundColor: 'yellow', color: 'red', fontSize: '30px', padding: '20px', border: '5px solid black'}}>
        ULTRA SIMPLE TEST - CAN YOU SEE THIS?
      </div>
      <section style={{display: 'block !important', visibility: 'visible !important', position: 'relative !important'}} className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">🤖 AI Assistant</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-red-600 bg-yellow-200 p-4">🤖 AI FARMING ASSISTANT - DEBUG VISIBLE</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get instant answers about crop selection, weather conditions, market prices, and farming best practices
              </p>
            </div>

            <div className="bg-card rounded-2xl shadow-xl border p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">How can I help you today?</h3>
                    <p className="text-muted-foreground">
                      Ask me anything about farming - from crop recommendations to pest control, 
                      weather forecasts to market insights. I'm here to help 24/7!
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <span className="text-sm text-muted-foreground">"What crops should I plant this season?"</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <span className="text-sm text-muted-foreground">"When is the best time to harvest wheat?"</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <span className="text-sm text-muted-foreground">"What's the current market price for tomatoes?"</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <span className="text-sm text-muted-foreground">"How do I treat fungal infections in my crops?"</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full">
                    Chat with AI Assistant
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">🤖</span>
                      </div>
                      <div>
                        <p className="font-medium">KisanConnect AI</p>
                        <p className="text-xs text-muted-foreground">Always online</p>
                      </div>
                    </div>
                    
                    <div className="bg-background rounded-lg p-4 border">
                      <p className="text-sm text-muted-foreground mb-2">Hello! I'm your AI farming assistant. I can help you with:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Crop selection and planting guidance</li>
                        <li>• Weather and climate insights</li>
                        <li>• Pest and disease management</li>
                        <li>• Market price information</li>
                        <li>• Government scheme details</li>
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-background rounded-lg px-3 py-2 border">
                        <p className="text-xs text-muted-foreground">Type your message...</p>
                      </div>
                      <Button size="sm" className="px-4">Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Transform Indian Agriculture?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of farmers, vendors, and buyers already using KisanConnect
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 mt-4">
              Start Your Journey Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
