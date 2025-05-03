
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, User, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mic className="h-6 w-6 text-primary" />
          <Link to="/" className="font-bold text-xl text-foreground">
            VerbalPilot
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              My Account
            </Button>
          </Link>
          <Link to="/interview/start">
            <Button size="sm" className="hidden md:flex">
              Start Interview
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              My Account
            </Link>
            <Link to="/interview/start">
              <Button className="w-full">
                Start Interview
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
