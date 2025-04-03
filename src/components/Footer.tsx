
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-boutique-cream text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Atelier Unique</h3>
            <p className="text-sm">
              Découvrez des pièces uniques et exclusives, soigneusement sélectionnées pour leur qualité et originalité.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-boutique-burgundy">Accueil</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-boutique-burgundy">Collections</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-boutique-burgundy">Notre Histoire</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-boutique-burgundy">Admin</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p>17 Rue de la Mode</p>
              <p>75001 Paris, France</p>
              <p>contact@atelierunique.com</p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-gray-700 hover:text-boutique-burgundy">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-boutique-burgundy">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-boutique-burgundy">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Atelier Unique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
