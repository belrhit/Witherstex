import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import factoryBlur from '@/assets/factory-blur.jpg';
import heroImage from '@/assets/hero-industrial.jpg';

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      title: t('about.value.quality.title'),
      description: t('about.value.quality.desc'),
    },
    {
      title: t('about.value.innovation.title'),
      description: t('about.value.innovation.desc'),
    },
    {
      title: t('about.value.service.title'),
      description: t('about.value.service.desc'),
    },
    {
      title: t('about.value.reliability.title'),
      description: t('about.value.reliability.desc'),
    },
  ];

  const products = [
    t('about.products.cotton'),
    t('about.products.u3'),
    t('about.products.nitrile'),
    t('about.products.pureCotton'),
    t('about.products.cutResistant'),
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Manufacturing workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-anthracite/70" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-sand-light mb-4">
              {t('about.hero.title')}
            </h1>
            <p className="text-sand/90 text-lg">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={factoryBlur}
                  alt="Manufacturing facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-petrol text-accent-foreground p-6 rounded-lg">
                <span className="font-heading text-lg font-bold block">{t('about.story.badge')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h3 className="font-heading text-xl font-bold text-leather mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-leather">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '5', label: t('about.stats.products') },
              { number: '3', label: t('about.stats.sizes') },
              { number: '7', label: t('about.stats.colors') },
              { number: '100%', label: t('about.stats.industry') },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="font-heading text-4xl lg:text-5xl font-bold text-sand-light block mb-2">
                  {stat.number}
                </span>
                <span className="text-sand/80 text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
              {t('about.products.title')}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {products.map((product) => (
                <span
                  key={product}
                  className="px-6 py-3 bg-muted text-foreground font-heading font-bold rounded-lg"
                >
                  {product}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
