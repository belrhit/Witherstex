import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { toast } from 'sonner';
import { z } from 'zod';
import { CustomerDetails } from '@/types';

// Images
import productKevlar from '@/assets/product-kevlar.jpg';
import productNitrile from '@/assets/product-nitrile.jpg';
import productWelding from '@/assets/product-welding.jpg';
import productChemical from '@/assets/product-chemical.jpg';

const productImages: Record<string, string> = {
  '1': productNitrile,
  '2': productChemical,
  '3': productWelding,
  '4': productKevlar,
  '5': productNitrile,
  '6': productKevlar,
  '7': productChemical,
  '8': productWelding,
  '9': productKevlar,
  '10': productNitrile,
  '11': productWelding,
  '12': productChemical,
  '13': productNitrile,
};

const WHATSAPP_NUMBER = '212720736224'; // Morocco format

const customerSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Téléphone invalide'),
  company: z.string().optional(),
  address: z.string().min(5, 'Adresse requise'),
  city: z.string().min(2, 'Ville requise'),
  postalCode: z.string().min(5, 'Code postal requis'),
  country: z.string().min(2, 'Pays requis'),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useStore();
  const [formData, setFormData] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prices are now hidden, just show items for WhatsApp order

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    try {
      customerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cart.map(item => 
      `• ${item.product.name} x${item.quantity} colis (${item.product.pcsPerColis * item.quantity} pièces)`
    ).join('\n');

    const message = `🧤 *Nouvelle commande Witherstex*

*Client:*
${formData.firstName} ${formData.lastName}
${formData.company ? `Entreprise: ${formData.company}\n` : ''}Email: ${formData.email}
Tél: ${formData.phone}

*Adresse de livraison:*
${formData.address}
${formData.postalCode} ${formData.city}, ${formData.country}

*Articles commandés:*
${itemsList}

Merci de confirmer la disponibilité, le prix et le délai de livraison.`;

    return encodeURIComponent(message);
  };

  const handleSubmitToWhatsApp = () => {
    if (!validateForm()) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsAppMessage()}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Clear cart and redirect
    clearCart();
    toast.success('Redirection vers WhatsApp...');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <main className="py-16 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Votre panier est vide</h1>
        <button onClick={() => navigate('/catalogue')} className="btn-primary">
          Voir nos produits
        </button>
      </main>
    );
  }

  return (
    <main className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-heading text-3xl font-bold text-center mb-8">
            Finaliser votre commande
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="font-heading text-xl font-bold mb-4">
                    Vos informations
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Prénom *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.firstName ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nom *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.lastName ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.email ? 'border-destructive' : 'border-border'}`}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.phone ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Entreprise</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Adresse *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.address ? 'border-destructive' : 'border-border'}`}
                    />
                    {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Code postal *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.postalCode ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.postalCode && <p className="text-destructive text-sm mt-1">{errors.postalCode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Ville *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.city ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1">Pays *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-background ${errors.country ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.country && <p className="text-destructive text-sm mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </motion.div>

                {/* WhatsApp Submit */}
                <div className="mt-8 pt-6 border-t border-border">
                  <button 
                    onClick={handleSubmitToWhatsApp} 
                    className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Commander via WhatsApp
                  </button>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    Vous serez redirigé vers WhatsApp pour finaliser votre commande
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <h2 className="font-heading text-xl font-bold mb-4">
                  Récapitulatif
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const imageUrl = item.product.imageUrl || productImages[item.product.id] || productNitrile;
                    return (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-sand-light flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                          <p className="text-muted-foreground text-sm">Qté: {item.quantity} colis</p>
                          <p className="text-muted-foreground text-xs">{item.product.pcsPerColis * item.quantity} pièces</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Le prix sera confirmé par notre équipe via WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Checkout;
