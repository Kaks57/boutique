
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartService } from "@/services/cartService";

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

const Navbar = ({ onCartClick, cartCount }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [count, setCount] = useState(cartCount);
  
  useEffect(() => {
    setCount(cartCount);
    
    // Set up interval to periodically check cart count (in case it changes from other components)
    const interval = setInterval(() => {
      setCount(cartService.getCartCount());
    }, 2000);
    
    return () => clearInterval(interval);
  }, [cartCount]);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Atelier Unique" className="h-40 w-auto" />
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-boutique-burgundy px-3 py-2 text-sm font-medium">
              Accueil
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-boutique-burgundy px-3 py-2 text-sm font-medium">
              Collections
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-boutique-burgundy px-3 py-2 text-sm font-medium">
              Notre Histoire
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-boutique-burgundy px-3 py-2 text-sm font-medium">
              Admin
            </Link>
          </div>

          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-700 relative"
              onClick={onCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-boutique-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Button>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-boutique-burgundy hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-boutique-burgundy"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white z-50 shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-boutique-burgundy hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-boutique-burgundy hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-boutique-burgundy hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Notre Histoire
            </Link>
            <Link
              to="/admin"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-boutique-burgundy hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
