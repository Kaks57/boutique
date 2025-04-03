
import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import { cartService } from "@/services/cartService";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onCartClick={openCart} cartCount={cartService.getCartCount()} />
      <main className="flex-grow">
        {children}
      </main>
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
      <Footer />
    </div>
  );
};

export default Layout;
