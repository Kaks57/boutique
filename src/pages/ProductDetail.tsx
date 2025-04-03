
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService, Product } from "@/services/productService";
import { cartService } from "@/services/cartService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const foundProduct = productService.getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      cartService.addToCart(product, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center">Chargement du produit...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
        <p className="text-lg text-gray-600 mb-8">Le produit que vous recherchez n'existe pas ou a été retiré.</p>
        <Button onClick={() => navigate("/products")}>Retourner aux produits</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        className="mb-6 text-gray-600 hover:text-boutique-burgundy"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>
        
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center mb-6">
            <span className="inline-block bg-boutique-cream text-boutique-burgundy px-2 py-1 rounded text-sm font-medium mr-2">
              {product.category}
            </span>
            <span className="text-sm text-gray-500">Pièce unique</span>
          </div>
          
          <p className="text-2xl font-bold text-boutique-burgundy mb-6">{product.price} €</p>
          
          <div className="prose max-w-none text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>
          
          {product.available ? (
            <>
              <div className="flex items-center mb-6">
                <span className="mr-4">Quantité:</span>
                <div className="flex items-center border rounded">
                  <button 
                    className="px-3 py-1 border-r"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 border-l"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <Button 
                className="w-full bg-boutique-burgundy hover:bg-boutique-burgundy/90 text-white py-6 text-lg"
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </Button>
            </>
          ) : (
            <Button disabled className="w-full bg-gray-300 text-gray-600 py-6 text-lg cursor-not-allowed">
              Produit non disponible
            </Button>
          )}
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Détails</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Pièce unique</li>
              <li>Produit authentifié</li>
              <li>Livraison sécurisée</li>
              <li>Retour sous 14 jours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
