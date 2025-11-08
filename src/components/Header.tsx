import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">KisanConnect</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link to="/farmer" className="text-sm font-medium text-foreground/80 hover:text-farmer transition-colors">
            For Farmers
          </Link>
          <Link to="/vendor" className="text-sm font-medium text-foreground/80 hover:text-vendor transition-colors">
            For Vendors
          </Link>
          <Link to="/buyer" className="text-sm font-medium text-foreground/80 hover:text-buyer transition-colors">
            For Buyers
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
