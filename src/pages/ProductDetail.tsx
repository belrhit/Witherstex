import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, MessageCircle } from 'lucide-react';
import { useProductBySlug } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

// Product images
import productKevlar from '@/assets/product-kevlar.jpg';
import productNitrile from '@/assets/product-nitrile.jpg';
import productWelding from '@/assets/product-welding.jpg';
import productChemical from '@/assets/product-chemical.jpg';
import heroImage from '@/assets/hero-industrial.jpg';

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

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProductBySlug(slug || '');

  if (isLoading) {
    return (
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-24 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <Skeleton className="aspect-[4/5] rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="py-16 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Produit non trouvé</h1>
        <Link to="/catalogue" className="btn-primary">
          Retour au catalogue
        </Link>
      </main>
    );
  }

  // Use custom uploaded image if available, otherwise fallback to static image
  const imageUrl = product.imageUrl || productImages[product.id] || productNitrile;

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par le produit "${product.name}". Pouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/212663400034?text=${message}`, '_blank');
  };

  const specLabels: Record<string, string> = {
    material: 'Matériau',
    coating: 'Revêtement',
    sizes: 'Tailles',
    thickness: 'Épaisseur',
    length: 'Longueur',
  };

  // Fields to exclude from display
  const excludedFields = ['certification', 'resistance'];

  return (
    <main className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </motion.div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-sand-light">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Badge */}
            {product.badge && (
              <span className="cert-badge">{product.badge}</span>
            )}

            {/* Title */}
            <div>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Chaque colis contient {product.pcsPerColis} pièces
              </p>
            </div>

            {/* Minimum Order Info */}
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <p className="text-sm font-medium text-foreground">
                📦 Quantité minimale de commande : <span className="text-petrol">10 colis</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Soit un minimum de {product.pcsPerColis * 10} pièces par commande
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleWhatsAppContact} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Commander via WhatsApp
              </button>
              <Link to="/contact" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Demander un devis
              </Link>
            </div>

            {/* Tech Specs */}
            <div className="pt-6 border-t border-border">
              <h2 className="font-heading font-bold text-xl mb-4">Spécifications Techniques</h2>
              <table className="specs-table w-full">
                <tbody>
                  {Object.entries(product.technicalSpecs)
                    .filter(([key]) => !excludedFields.includes(key))
                    .map(([key, value]) => (
                    <tr key={key}>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {specLabels[key] || key}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Full Width Context Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative rounded-xl overflow-hidden aspect-[21/9]">
            <img
              src={heroImage}
              alt="Gant en utilisation dans un environnement industriel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-anthracite/60 to-transparent" />
            <div className="absolute bottom-8 left-8 max-w-md">
              <h3 className="font-heading text-2xl font-bold text-sand-light mb-2">
                Conçu pour les professionnels
              </h3>
              <p className="text-sand/80">
                Nos gants sont testés dans les conditions les plus exigeantes pour garantir votre sécurité.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProductDetail;
