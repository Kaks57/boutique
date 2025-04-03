import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { productService, Product } from "@/services/productService";
import { authService } from "@/services/authService";
import AdminLogin from "@/components/AdminLogin";
import Layout from "@/components/Layout";

const AdminPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    available: true
  });
  
  const [editing, setEditing] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      loadProducts();
    }
  }, []);

  const loadProducts = () => {
    setProducts(productService.getProducts());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (id: string) => {
    const product = productService.getProductById(id);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category,
        available: product.available
      });
      setEditing(id);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      productService.deleteProduct(id);
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès.",
      });
      loadProducts();
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      available: true
    });
    setEditing(null);
  };
  
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    loadProducts();
  };
  
  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // If authenticated, show admin panel with Layout
  const adminContent = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Administration</h1>
        <Button variant="outline" onClick={handleLogout}>Se déconnecter</Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Form */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">
              {editing ? "Modifier un produit" : "Ajouter un nouveau produit"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom du produit</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">URL de l'image</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sacs">Sacs</SelectItem>
                      <SelectItem value="Chaussures">Chaussures</SelectItem>
                      <SelectItem value="Accessoires">Accessoires</SelectItem>
                      <SelectItem value="Bijoux">Bijoux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="available">Disponibilité</Label>
                  <Select 
                    value={formData.available ? "true" : "false"}
                    onValueChange={(value) => handleSelectChange("available", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Disponible</SelectItem>
                      <SelectItem value="false">Non disponible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1 bg-boutique-burgundy hover:bg-boutique-burgundy/90">
                    {editing ? "Mettre à jour" : "Ajouter"}
                  </Button>
                  {editing && (
                    <Button type="button" variant="outline" onClick={handleCancel}>
                      Annuler
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Products List */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Produits existants</h2>
          
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-gray-500">Aucun produit disponible.</p>
            ) : (
              products.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 border border-gray-100"
                >
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.price} € - {product.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleEdit(product.id)}
                    >
                      Modifier
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(product.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return <Layout>{adminContent}</Layout>;
  
  // This defines the handleSubmit function that I referenced above
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      if (editing) {
        productService.updateProduct(editing, {
          ...formData,
          price: Number(formData.price),
          available: Boolean(formData.available)
        });
        toast({
          title: "Produit mis à jour",
          description: "Le produit a été mis à jour avec succès.",
        });
        setEditing(null);
      } else {
        productService.addProduct({
          ...formData,
          price: Number(formData.price),
          available: Boolean(formData.available)
        });
        toast({
          title: "Produit ajouté",
          description: "Le nouveau produit a été ajouté avec succès.",
        });
      }
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        available: true
      });
      
      // Reload products
      loadProducts();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du traitement du formulaire.",
        variant: "destructive",
      });
    }
  }
};

export default AdminPage;
