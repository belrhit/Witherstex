import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/types';

// Product images mapping
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

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  // Use custom uploaded image if available, otherwise fallback to static images
  const imageUrl = product.imageUrl || productImages[product.id] || productNitrile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/products/${product.slug}`} className="block product-card">
        {/* Image */}
        <div className="product-card-image">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 lg:p-5">
          {/* Badge */}
          {product.badge && (
            <span className="cert-badge mb-3">
              {product.badge}
            </span>
          )}

          {/* Name */}
          <h3 className="font-heading font-bold text-lg text-foreground mb-1">
            {product.name}
          </h3>

          {/* Category */}
          <p className="text-muted-foreground text-sm capitalize mb-3">
            {product.category === 'industrial' && 'Industriel'}
            {product.category === 'chemical' && 'Chimique'}
            {product.category === 'handling' && 'Manutention'}
            {product.category === 'thermal' && 'Thermique'}
            {product.category === 'precision' && 'Précision'}
          </p>

          {/* Pieces per colis */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {product.pcsPerColis} pcs/colis
            </span>
            {product.isB2B && (
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                B2B
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
