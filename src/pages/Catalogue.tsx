import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

const Catalogue = () => {
  const { data: products, isLoading, error } = useProducts();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-destructive">Error loading products. Please try again later.</p>
        </div>
      </main>
    );
  }

  const productList = products || [];

  return (
    <main className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('catalogue.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('catalogue.subtitle')}
          </p>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-sm mb-6"
        >
          {productList.length} {productList.length !== 1 ? t('catalogue.results.plural') : t('catalogue.results')} {productList.length !== 1 ? t('catalogue.found.plural') : t('catalogue.found')}
        </motion.p>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {productList.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              {t('catalogue.empty')}
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Catalogue;
