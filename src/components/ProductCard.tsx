
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/services/productService";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group product-animation"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg">
        <div className="h-64 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <p className="text-lg font-bold text-boutique-burgundy">{product.price} €</p>
            <span className="text-xs font-medium bg-boutique-cream text-boutique-burgundy px-2 py-1 rounded">
              Pièce unique
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
