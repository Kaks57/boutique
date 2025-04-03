
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { authService } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [adminCode, setAdminCode] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authService.login(adminCode)) {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue dans l'interface d'administration",
      });
      onLoginSuccess();
    } else {
      toast({
        title: "Échec de la connexion",
        description: "Code d'administration incorrect",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="rounded-full bg-boutique-burgundy/10 p-3 mb-4">
          <Lock className="h-6 w-6 text-boutique-burgundy" />
        </div>
        <h2 className="text-2xl font-bold">Administration</h2>
        <p className="text-gray-500 mt-2 text-center">
          Entrez votre code d'administrateur pour accéder à cette page
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Code administrateur"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-boutique-burgundy hover:bg-boutique-burgundy/90"
        >
          Se connecter
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
