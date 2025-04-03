
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
}

// This is a local storage implementation. In a real application, you would use a database.
class ProductService {
  private STORAGE_KEY = 'atelier_unique_products';
  
  getProducts(): Product[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initial sample data
    const initialProducts: Product[] = [
      {
        id: "1",
        name: "Sac à main en cuir italien",
        description: "Un sac à main élégant en cuir italien véritable, parfait pour toutes les occasions. Pièce unique fabriquée par un artisan de Florence.",
        price: 450,
        image: "https://images.unsplash.com/photo-1584917865442-de89df41a097?q=80&w=1035&auto=format&fit=crop",
        category: "Sacs",
        available: true
      },
      {
        id: "2",
        name: "Escarpins en daim bleu marine",
        description: "Escarpins élégants en daim bleu marine avec un talon de 8 cm. Design exclusif, disponible uniquement chez nous.",
        price: 280,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1160&auto=format&fit=crop",
        category: "Chaussures",
        available: true
      },
      {
        id: "3",
        name: "Sac bandoulière vintage",
        description: "Un sac bandoulière vintage en cuir patiné, avec des finitions en laiton. Une pièce unique avec beaucoup d'histoire.",
        price: 320,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=876&auto=format&fit=crop",
        category: "Sacs",
        available: true
      },
      {
        id: "4",
        name: "Bottines en cuir noir",
        description: "Bottines élégantes en cuir noir avec des détails en métal doré. Confortables et stylées pour toutes les saisons.",
        price: 390,
        image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=735&auto=format&fit=crop",
        category: "Chaussures",
        available: true
      }
    ];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  }
  
  getProductById(id: string): Product | undefined {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  }
  
  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    
    products.push(newProduct);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  }
  
  updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) return undefined;
    
    products[index] = { ...products[index], ...updates };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    return products[index];
  }
  
  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
}

export const productService = new ProductService();
