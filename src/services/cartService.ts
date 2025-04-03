
import { Product } from "./productService";
import { toast } from "sonner";

export interface CartItem extends Product {
  quantity: number;
}

class CartService {
  private STORAGE_KEY = 'atelier_unique_cart';
  
  getCartItems(): CartItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  }
  
  addToCart(product: Product, quantity: number = 1): CartItem[] {
    const cart = this.getCartItems();
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
      toast.success(`Quantité mise à jour (${cart[existingItemIndex].quantity})`);
    } else {
      const newItem: CartItem = { ...product, quantity };
      cart.push(newItem);
      toast.success(`${product.name} ajouté au panier`);
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    return cart;
  }
  
  updateQuantity(id: string, quantity: number): CartItem[] {
    const cart = this.getCartItems();
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        return this.removeFromCart(id);
      }
      cart[itemIndex].quantity = quantity;
      toast.success(`Quantité mise à jour`);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    }
    
    return cart;
  }
  
  removeFromCart(id: string): CartItem[] {
    const cart = this.getCartItems();
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedCart));
    toast.success(`Produit retiré du panier`);
    return updatedCart;
  }
  
  clearCart(): CartItem[] {
    localStorage.removeItem(this.STORAGE_KEY);
    toast.success(`Panier vidé`);
    return [];
  }
  
  getCartTotal(): number {
    const cart = this.getCartItems();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  getCartCount(): number {
    const cart = this.getCartItems();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}

export const cartService = new CartService();
