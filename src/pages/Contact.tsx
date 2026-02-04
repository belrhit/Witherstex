import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  const contactSchema = z.object({
    name: z.string().min(2, t('contact.form.errorName')),
    email: z.string().email(t('contact.form.errorEmail')),
    company: z.string().optional(),
    phone: z.string().optional(),
    subject: z.string().min(1, t('contact.form.errorSubject')),
    message: z.string().min(10, t('contact.form.errorMessage')),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t('contact.form.success'));
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: 'general',
        message: '',
      });
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address'),
      content: 'LOT 28, ZONE INDUSTRIELLE\nSETTAT, Maroc',
    },
    {
      icon: Phone,
      title: t('contact.info.phone'),
      content: '0695 32 30 14',
    },
    {
      icon: Mail,
      title: t('contact.info.email'),
      content: 'Witherstex.sarl@gmail.com',
    },
    {
      icon: Clock,
      title: t('contact.info.hours'),
      content: t('contact.info.hoursValue'),
    },
  ];

  return (
    <main className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
              <h2 className="font-heading text-2xl font-bold mb-6">
                {t('contact.form.title')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('contact.form.name')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background ${errors.name ? 'border-destructive' : 'border-border'}`}
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('contact.form.email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background ${errors.email ? 'border-destructive' : 'border-border'}`}
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('contact.form.company')}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                      placeholder={t('contact.form.companyPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('contact.form.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background"
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('contact.form.subject')} *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background ${errors.subject ? 'border-destructive' : 'border-border'}`}
                  >
                    <option value="general">{t('contact.form.subjectGeneral')}</option>
                    <option value="quote">{t('contact.form.subjectQuote')}</option>
                    <option value="order">{t('contact.form.subjectOrder')}</option>
                    <option value="technical">{t('contact.form.subjectTechnical')}</option>
                    <option value="partnership">{t('contact.form.subjectPartnership')}</option>
                  </select>
                  {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">{t('contact.form.message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg bg-background resize-none ${errors.message ? 'border-destructive' : 'border-border'}`}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto disabled:opacity-50"
                >
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-leather text-sand-light rounded-xl p-6">
              <h2 className="font-heading text-xl font-bold mb-6">
                {t('contact.info.title')}
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-sand-light/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sand-light">{info.title}</h3>
                      <p className="text-sand/70 text-sm whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted rounded-xl p-6">
              <h3 className="font-heading font-bold text-foreground mb-3">
                {t('contact.quote.title')}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t('contact.quote.description')}
              </p>
              <a
                href="tel:+212695323014"
                className="btn-secondary inline-block text-sm"
              >
                {t('contact.quote.cta')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
