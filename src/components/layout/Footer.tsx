import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-anthracite text-sand-light">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-heading font-bold text-2xl tracking-tight text-sand-light block mb-4">
              WITHERSTEX
            </span>
            <p className="text-sand/80 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sand-light mb-4">
              {t('footer.nav')}
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/catalogue', label: t('nav.products') },
                { href: '/a-propos', label: t('nav.about') },
                { href: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sand/70 hover:text-sand-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-sand-light mb-4">
              {t('footer.products.title')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/catalogue"
                  className="text-sand/70 hover:text-sand-light transition-colors text-sm"
                >
                  {t('footer.products.cotton')}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="text-sand/70 hover:text-sand-light transition-colors text-sm"
                >
                  {t('footer.products.nitrile')}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="text-sand/70 hover:text-sand-light transition-colors text-sm"
                >
                  {t('footer.products.cut')}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="text-sand/70 hover:text-sand-light transition-colors text-sm"
                >
                  {t('footer.products.u3')}
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogue"
                  className="text-sand/70 hover:text-sand-light transition-colors text-sm"
                >
                  {t('footer.products.cotton2')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sand-light mb-4">
              {t('footer.contact')}
            </h4>
            <address className="not-italic text-sand/70 text-sm space-y-2">
              <p>Casablanca, Maroc</p>
              <p className="pt-2">
                <a href="https://wa.me/212720736224" className="hover:text-sand-light transition-colors">
                  +212 720 736 224
                </a>
              </p>
              <p>
                <a href="mailto:contact@witherstex.com" className="hover:text-sand-light transition-colors">
                  contact@witherstex.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-anthracite-light">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sand/60 text-sm">
              © {new Date().getFullYear()} Witherstex. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sand/60 hover:text-sand-light text-sm transition-colors">
                {t('footer.legal')}
              </a>
              <a href="#" className="text-sand/60 hover:text-sand-light text-sm transition-colors">
                {t('footer.terms')}
              </a>
              <a href="#" className="text-sand/60 hover:text-sand-light text-sm transition-colors">
                {t('footer.privacy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
