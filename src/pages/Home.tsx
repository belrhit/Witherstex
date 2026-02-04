import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Images
import heroImage from '@/assets/hero-industrial.jpg';
import factoryBlur from '@/assets/factory-blur.jpg';
import gardenGloves from '@/assets/garden-gloves.jpg';
import specialtyGloves from '@/assets/specialty-gloves.jpg';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('why.quality.title'),
      description: t('why.quality.desc'),
    },
    {
      title: t('why.expertise.title'),
      description: t('why.expertise.desc'),
    },
    {
      title: t('why.custom.title'),
      description: t('why.custom.desc'),
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Industrial worker with protective gloves"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-sand-light leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-sand/90 text-lg md:text-xl mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalogue" className="btn-hero">
                {t('hero.cta.products')}
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-hero-outline">
                {t('hero.cta.contact')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-sand-light/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-sand-light rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('video.title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('video.description')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-lg overflow-hidden shadow-2xl"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full aspect-video object-cover"
              >
                <source src="/videos/factory-production.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-16 lg:py-24 bg-sand-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-lg overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <img
                src={gardenGloves}
                alt="Gloves in use"
                className="w-full aspect-video object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('image.title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('image.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Section - Replaced */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('category.title')}
              </h2>
              <p className="text-petrol font-semibold text-lg mb-6">
                {t('category.subtitle')}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t('category.description')}
              </p>
              <Link to="/catalogue" className="btn-primary inline-flex items-center">
                {t('category.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                  src={specialtyGloves}
                  alt="Gants de protection Witherstex"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-anthracite/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Parallax Section */}
      <section
        className="parallax-section py-20 lg:py-32"
        style={{ backgroundImage: `url(${factoryBlur})` }}
      >
        <div className="parallax-overlay" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-sand-light mb-4">
              {t('why.title')}
            </h2>
            <p className="text-sand/80 max-w-2xl mx-auto">
              {t('why.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <h3 className="font-heading text-xl font-bold text-sand-light mb-3">
                  {feature.title}
                </h3>
                <p className="text-sand/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/a-propos" className="btn-hero-outline">
              {t('why.cta')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-leather">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-sand-light mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-sand/80 mb-8 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <Link to="/contact" className="btn-hero-outline">
              {t('cta.button')}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
