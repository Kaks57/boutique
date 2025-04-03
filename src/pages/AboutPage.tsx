
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative">
        <div className="bg-[url('https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=1026&auto=format&fit=crop')] bg-cover bg-center h-[50vh]">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4">Notre Histoire</h1>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <p className="lead text-xl text-center mb-8">
              Bienvenue chez Atelier Unique, où chaque pièce raconte une histoire et apporte une touche d'exclusivité à votre style.
            </p>
            
            <div className="my-12 relative">
              <div className="absolute left-0 top-0 w-20 h-1 bg-boutique-burgundy"></div>
            </div>
            
            <h2>La naissance d'une passion</h2>
            <p>
              Fondé en 2018 par Marie Lefèvre, Atelier Unique est né d'une passion pour les objets de caractère et les pièces uniques. Après une carrière dans la mode de luxe, Marie a décidé de créer un espace dédié aux créations artisanales et aux trésors chinés lors de ses voyages à travers le monde.
            </p>
            
            <h2>Notre philosophie</h2>
            <p>
              Nous croyons que les accessoires que nous portons et utilisons quotidiennement devraient être aussi uniques que nous. C'est pourquoi chaque article proposé dans notre boutique est soigneusement sélectionné pour son originalité, sa qualité et son histoire.
            </p>
            <p>
              Notre engagement envers l'artisanat authentique nous pousse à collaborer directement avec des artisans du monde entier, garantissant ainsi des pièces véritablement exclusives.
            </p>
            
            <h2>Une sélection minutieuse</h2>
            <p>
              Chaque sac, chaque paire de chaussures que nous proposons a été choisie avec soin. Nous privilégions les matériaux nobles, les finitions impeccables et les designs intemporels qui résistent aux tendances éphémères.
            </p>
            
            <figure className="my-12">
              <img
                src="https://images.unsplash.com/photo-1644329438453-9492ac028508?q=80&w=869&auto=format&fit=crop"
                alt="Artisan travaillant sur un sac en cuir"
                className="rounded-lg shadow-md w-full"
              />
              <figcaption className="text-center mt-2 text-gray-500">
                Un de nos artisans partenaires au travail
              </figcaption>
            </figure>
            
            <h2>Notre engagement</h2>
            <p>
              Au-delà de l'esthétique, nous nous engageons à promouvoir une mode plus responsable. En proposant des pièces uniques de haute qualité, nous encourageons une consommation plus réfléchie, opposée à la fast-fashion.
            </p>
            <p>
              Nous mettons également un point d'honneur à assurer des conditions de travail équitables pour tous les artisans avec lesquels nous collaborons.
            </p>
            
            <div className="my-12 text-center">
              <Link to="/products">
                <Button className="bg-boutique-burgundy hover:bg-boutique-burgundy/90 text-white px-8 py-6 text-lg">
                  Découvrir notre collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      
      
    </div>
  );
};

export default AboutPage;
