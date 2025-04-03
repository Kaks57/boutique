
import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cartService, CartItem } from '@/services/cartService';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    if (isOpen) {
      setCartItems(cartService.getCartItems());
    }
  }, [isOpen]);
  
  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cartService.updateQuantity(id, quantity);
    setCartItems([...updatedCart]);
  };
  
  const removeItem = (id: string) => {
    const updatedCart = cartService.removeFromCart(id);
    setCartItems([...updatedCart]);
  };
  
  const clearCart = () => {
    const updatedCart = cartService.clearCart();
    setCartItems(updatedCart);
  };
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full md:w-96 h-full shadow-lg animate-slide-in-right overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Votre panier</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow p-6">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-6">Votre panier est vide</p>
            <Button onClick={onClose}>Continuer vos achats</Button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-boutique-burgundy font-semibold">{item.price} €</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 h-7 w-7" 
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">{total.toFixed(2)} €</span>
              </div>
              <Button className="w-full bg-boutique-burgundy hover:bg-boutique-burgundy/90 mb-2">
                Passer la commande
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Vider le panier
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
