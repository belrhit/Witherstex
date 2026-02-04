import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en' | 'zh';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
    zh: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.home': { fr: 'Accueil', en: 'Home', zh: '首页' },
  'nav.about': { fr: 'À Propos', en: 'About', zh: '关于我们' },
  'nav.products': { fr: 'Produits', en: 'Products', zh: '产品' },
  'nav.contact': { fr: 'Contact', en: 'Contact', zh: '联系我们' },
  
  // Hero
  'hero.title': { 
    fr: 'Fabrication de gants techniques pour l\'industrie', 
    en: 'Technical Gloves Manufacturing for Industry',
    zh: '工业技术手套制造'
  },
  'hero.subtitle': { 
    fr: 'Protection et performance au service des professionnels. Gants polyester, coton et revêtement nitrile pour tous vos besoins industriels.',
    en: 'Protection and performance for professionals. Polyester, cotton and nitrile coated gloves for all your industrial needs.',
    zh: '为专业人士提供保护和性能。聚酯、棉和丁腈涂层手套，满足您所有的工业需求。'
  },
  'hero.cta.products': { fr: 'Découvrir nos produits', en: 'Discover our products', zh: '发现我们的产品' },
  'hero.cta.contact': { fr: 'Nous contacter', en: 'Contact us', zh: '联系我们' },

  // Video Section
  'video.title': { fr: 'Qualité & Excellence', en: 'Quality & Excellence', zh: '质量与卓越' },
  'video.description': { 
    fr: 'Notre processus de fabrication garantit des gants de haute qualité, conçus pour résister aux environnements industriels les plus exigeants. Chaque paire est fabriquée avec des matériaux premium : polyester, nitrile et coton.',
    en: 'Our manufacturing process ensures high-quality gloves, designed to withstand the most demanding industrial environments. Each pair is made with premium materials: polyester, nitrile and cotton.',
    zh: '我们的制造工艺确保高品质手套，专为应对最苛刻的工业环境而设计。每双手套均采用优质材料制成：聚酯、丁腈和棉。'
  },

  // Image Section
  'image.title': { fr: 'Polyvalence & Confort', en: 'Versatility & Comfort', zh: '多功能与舒适' },
  'image.description': { 
    fr: 'Nos gants s\'adaptent à tous les secteurs : agriculture, industrie, manutention et bien plus. Disponibles en tailles 8, 9 et 10, et en plusieurs couleurs : blanc, noir, bleu, rouge, orange, gris et vert.',
    en: 'Our gloves adapt to all sectors: agriculture, industry, handling and more. Available in sizes 8, 9 and 10, and in multiple colors: white, black, blue, red, orange, gray and green.',
    zh: '我们的手套适用于所有行业：农业、工业、搬运等。提供8、9、10号尺码，多种颜色可选：白色、黑色、蓝色、红色、橙色、灰色和绿色。'
  },

  // Category Section
  'category.title': { fr: 'Notre Spécialité', en: 'Our Specialty', zh: '我们的专长' },
  'category.subtitle': { 
    fr: 'Spécialisés dans la fabrication de gants et textiles techniques pour l\'industrie',
    en: 'Specialized in manufacturing technical gloves and textiles for industry',
    zh: '专业生产工业用技术手套和纺织品'
  },
  'category.description': { 
    fr: 'Nous fabriquons une gamme complète de gants techniques : Fil de coton, U3, revêtement nitrile, coton pur et anti-coupure avec revêtement nitrile. Chaque produit est conçu pour offrir protection et durabilité dans les environnements de travail exigeants.',
    en: 'We manufacture a complete range of technical gloves: Cotton thread, U3, nitrile coating, pure cotton and cut-resistant with nitrile coating. Each product is designed to provide protection and durability in demanding work environments.',
    zh: '我们生产全系列技术手套：棉线、U3、丁腈涂层、纯棉和带丁腈涂层的防割手套。每款产品均旨在为苛刻的工作环境提供保护和耐用性。'
  },
  'category.cta': { fr: 'Voir tous nos produits', en: 'View all products', zh: '查看所有产品' },

  // Why Choose Us
  'why.title': { fr: 'Pourquoi Witherstex ?', en: 'Why Witherstex?', zh: '为什么选择Witherstex？' },
  'why.subtitle': { 
    fr: 'L\'excellence au service de votre sécurité',
    en: 'Excellence in service of your safety',
    zh: '卓越服务，保障您的安全'
  },
  'why.quality.title': { fr: 'Qualité Certifiée', en: 'Certified Quality', zh: '认证质量' },
  'why.quality.desc': { 
    fr: 'Tous nos produits respectent les normes de qualité les plus strictes pour garantir votre protection.',
    en: 'All our products meet the strictest quality standards to ensure your protection.',
    zh: '我们所有产品均符合最严格的质量标准，确保您的安全。'
  },
  'why.expertise.title': { fr: 'Expertise Technique', en: 'Technical Expertise', zh: '技术专长' },
  'why.expertise.desc': { 
    fr: 'Une équipe d\'experts dédiée à la conception de solutions de protection adaptées à vos besoins.',
    en: 'A team of experts dedicated to designing protection solutions tailored to your needs.',
    zh: '专业团队致力于设计满足您需求的防护解决方案。'
  },
  'why.custom.title': { fr: 'Sur Mesure B2B', en: 'Custom B2B Solutions', zh: 'B2B定制方案' },
  'why.custom.desc': { 
    fr: 'Solutions personnalisées pour les besoins spécifiques de votre industrie.',
    en: 'Customized solutions for the specific needs of your industry.',
    zh: '为您行业的特定需求提供定制解决方案。'
  },
  'why.cta': { fr: 'En savoir plus', en: 'Learn more', zh: '了解更多' },

  // CTA Section
  'cta.title': { fr: 'Besoin d\'une solution sur mesure ?', en: 'Need a custom solution?', zh: '需要定制解决方案？' },
  'cta.description': { 
    fr: 'Notre équipe est à votre disposition pour répondre à vos besoins spécifiques.',
    en: 'Our team is at your disposal to meet your specific needs.',
    zh: '我们的团队随时为您提供服务，满足您的特定需求。'
  },
  'cta.button': { fr: 'Contactez-nous', en: 'Contact us', zh: '联系我们' },

  // Footer
  'footer.description': { 
    fr: 'Fabricant de gants techniques de haute qualité pour les professionnels de l\'industrie.',
    en: 'Manufacturer of high-quality technical gloves for industry professionals.',
    zh: '为工业专业人士生产高品质技术手套。'
  },
  'footer.nav': { fr: 'Navigation', en: 'Navigation', zh: '导航' },
  'footer.products.title': { fr: 'Produits', en: 'Products', zh: '产品' },
  'footer.products.cotton': { fr: 'Fil de Coton', en: 'Cotton Thread', zh: '棉线' },
  'footer.products.nitrile': { fr: 'Revêtement Nitrile', en: 'Nitrile Coating', zh: '丁腈涂层' },
  'footer.products.cut': { fr: 'Anti-coupure', en: 'Cut Resistant', zh: '防割' },
  'footer.products.u3': { fr: 'Gants U3', en: 'U3 Gloves', zh: 'U3手套' },
  'footer.products.cotton2': { fr: 'Gants Coton', en: 'Cotton Gloves', zh: '棉手套' },
  'footer.contact': { fr: 'Contact', en: 'Contact', zh: '联系方式' },
  'footer.rights': { fr: 'Tous droits réservés.', en: 'All rights reserved.', zh: '版权所有。' },
  'footer.legal': { fr: 'Mentions légales', en: 'Legal', zh: '法律声明' },
  'footer.terms': { fr: 'CGV', en: 'Terms', zh: '条款' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy', zh: '隐私' },

  // Catalogue Page
  'catalogue.title': { fr: 'Notre Catalogue', en: 'Our Catalogue', zh: '我们的目录' },
  'catalogue.subtitle': { 
    fr: 'Découvrez notre gamme complète de gants techniques pour tous les environnements professionnels',
    en: 'Discover our complete range of technical gloves for all professional environments',
    zh: '发现我们全系列技术手套，适用于所有专业环境'
  },
  'catalogue.results': { fr: 'produit', en: 'product', zh: '产品' },
  'catalogue.results.plural': { fr: 'produits', en: 'products', zh: '产品' },
  'catalogue.found': { fr: 'trouvé', en: 'found', zh: '找到' },
  'catalogue.found.plural': { fr: 'trouvés', en: 'found', zh: '找到' },
  'catalogue.empty': { fr: 'Aucun produit disponible', en: 'No products available', zh: '暂无产品' },

  // About Page
  'about.hero.title': { fr: 'À Propos de Witherstex', en: 'About Witherstex', zh: '关于Witherstex' },
  'about.hero.subtitle': { 
    fr: 'Fabricant spécialisé de gants techniques et textiles pour l\'industrie.',
    en: 'Specialized manufacturer of technical gloves and textiles for industry.',
    zh: '专业生产工业用技术手套和纺织品。'
  },
  'about.story.title': { fr: 'Notre Mission', en: 'Our Mission', zh: '我们的使命' },
  'about.story.p1': { 
    fr: 'Witherstex est une entreprise spécialisée dans la fabrication de gants techniques et textiles pour le secteur industriel. Basée à Casablanca, au Maroc, nous nous engageons à fournir des solutions de protection de haute qualité.',
    en: 'Witherstex is a company specialized in manufacturing technical gloves and textiles for the industrial sector. Based in Casablanca, Morocco, we are committed to providing high-quality protection solutions.',
    zh: 'Witherstex是一家专业生产工业用技术手套和纺织品的公司。我们位于摩洛哥卡萨布兰卡，致力于提供高品质的防护解决方案。'
  },
  'about.story.p2': { 
    fr: 'Notre gamme de produits comprend : fil de coton, gants U3, revêtement nitrile, gants en coton pur et gants anti-coupure avec revêtement nitrile. Chaque produit est conçu pour répondre aux exigences les plus strictes de l\'industrie.',
    en: 'Our product range includes: cotton thread, U3 gloves, nitrile coating, pure cotton gloves and cut-resistant gloves with nitrile coating. Each product is designed to meet the strictest industry requirements.',
    zh: '我们的产品系列包括：棉线、U3手套、丁腈涂层、纯棉手套和带丁腈涂层的防割手套。每款产品均旨在满足最严格的行业要求。'
  },
  'about.story.p3': { 
    fr: 'Disponibles en tailles 8, 9 et 10, nos gants sont fabriqués à partir de polyester et nitrile de qualité supérieure, offrant une protection optimale et un confort durable pour tous les environnements de travail.',
    en: 'Available in sizes 8, 9 and 10, our gloves are made from premium polyester and nitrile, offering optimal protection and lasting comfort for all work environments.',
    zh: '提供8、9、10号尺码，我们的手套采用优质聚酯和丁腈制成，为所有工作环境提供最佳保护和持久舒适。'
  },
  'about.story.badge': { fr: 'Qualité garantie', en: 'Quality guaranteed', zh: '质量保证' },
  'about.values.title': { fr: 'Nos Valeurs', en: 'Our Values', zh: '我们的价值观' },
  'about.values.subtitle': { 
    fr: 'Des principes qui guident chaque décision et chaque produit',
    en: 'Principles that guide every decision and every product',
    zh: '指导每个决策和每个产品的原则'
  },
  'about.value.quality.title': { fr: 'Qualité', en: 'Quality', zh: '质量' },
  'about.value.quality.desc': { 
    fr: 'Nous ne faisons aucun compromis sur la qualité de nos matériaux et de notre fabrication.',
    en: 'We make no compromises on the quality of our materials and manufacturing.',
    zh: '我们对材料和制造质量绝不妥协。'
  },
  'about.value.innovation.title': { fr: 'Innovation', en: 'Innovation', zh: '创新' },
  'about.value.innovation.desc': { 
    fr: 'Recherche constante de nouvelles solutions pour améliorer la protection.',
    en: 'Constant search for new solutions to improve protection.',
    zh: '不断寻求新解决方案以提升防护效果。'
  },
  'about.value.service.title': { fr: 'Service', en: 'Service', zh: '服务' },
  'about.value.service.desc': { 
    fr: 'Accompagnement personnalisé pour chaque client professionnel.',
    en: 'Personalized support for every professional client.',
    zh: '为每位专业客户提供个性化支持。'
  },
  'about.value.reliability.title': { fr: 'Fiabilité', en: 'Reliability', zh: '可靠性' },
  'about.value.reliability.desc': { 
    fr: 'Des produits testés et approuvés pour les environnements les plus exigeants.',
    en: 'Products tested and approved for the most demanding environments.',
    zh: '产品经过测试和认证，适用于最苛刻的环境。'
  },
  'about.stats.products': { fr: 'Types de produits', en: 'Product types', zh: '产品类型' },
  'about.stats.sizes': { fr: 'Tailles disponibles', en: 'Available sizes', zh: '可用尺码' },
  'about.stats.colors': { fr: 'Couleurs', en: 'Colors', zh: '颜色' },
  'about.stats.industry': { fr: 'Usage industriel', en: 'Industrial use', zh: '工业用途' },
  'about.products.title': { fr: 'Nos Produits', en: 'Our Products', zh: '我们的产品' },
  'about.products.cotton': { fr: 'Fil de Coton', en: 'Cotton Thread', zh: '棉线' },
  'about.products.u3': { fr: 'Gants U3', en: 'U3 Gloves', zh: 'U3手套' },
  'about.products.nitrile': { fr: 'Revêtement Nitrile', en: 'Nitrile Coating', zh: '丁腈涂层' },
  'about.products.pureCotton': { fr: 'Coton Pur', en: 'Pure Cotton', zh: '纯棉' },
  'about.products.cutResistant': { fr: 'Anti-coupure Nitrile', en: 'Nitrile Cut-Resistant', zh: '丁腈防割' },

  // Admin Dashboard
  'admin.title': { fr: 'Witherstex Admin', en: 'Witherstex Admin', zh: 'Witherstex 管理' },
  'admin.logout': { fr: 'Déconnexion', en: 'Logout', zh: '退出登录' },
  'admin.products': { fr: 'Produits', en: 'Products', zh: '产品' },
  'admin.addProduct': { fr: 'Ajouter un produit', en: 'Add product', zh: '添加产品' },
  'admin.editProduct': { fr: 'Modifier le produit', en: 'Edit product', zh: '编辑产品' },
  'admin.newProduct': { fr: 'Nouveau produit', en: 'New product', zh: '新产品' },
  'admin.backToList': { fr: 'Retour à la liste', en: 'Back to list', zh: '返回列表' },
  'admin.productImage': { fr: 'Image du produit', en: 'Product image', zh: '产品图片' },
  'admin.upload': { fr: 'Télécharger', en: 'Upload', zh: '上传' },
  'admin.imageFormats': { fr: 'Formats acceptés: JPG, PNG, WebP. Max 5MB.', en: 'Accepted formats: JPG, PNG, WebP. Max 5MB.', zh: '支持格式：JPG、PNG、WebP。最大5MB。' },
  'admin.name': { fr: 'Nom', en: 'Name', zh: '名称' },
  'admin.slug': { fr: 'Slug', en: 'Slug', zh: '链接别名' },
  'admin.slugPlaceholder': { fr: 'auto-généré si vide', en: 'auto-generated if empty', zh: '留空则自动生成' },
  'admin.pricePerPackage': { fr: 'Prix par colis (MAD)', en: 'Price per package (MAD)', zh: '每包价格 (MAD)' },
  'admin.pcsPerColis': { fr: 'Pièces par colis', en: 'Pieces per package', zh: '每包件数' },
  'admin.minOrder': { fr: 'Min: 10 colis', en: 'Min: 10 packages', zh: '最低：10包' },
  'admin.category': { fr: 'Catégorie', en: 'Category', zh: '类别' },
  'admin.categoryIndustrial': { fr: 'Industriel', en: 'Industrial', zh: '工业' },
  'admin.categoryChemical': { fr: 'Chimique', en: 'Chemical', zh: '化学' },
  'admin.categoryHandling': { fr: 'Manutention', en: 'Handling', zh: '搬运' },
  'admin.categoryThermal': { fr: 'Thermique', en: 'Thermal', zh: '热防护' },
  'admin.categoryPrecision': { fr: 'Précision', en: 'Precision', zh: '精密' },
  'admin.availableSizes': { fr: 'Tailles disponibles', en: 'Available sizes', zh: '可用尺码' },
  'admin.sizesPlaceholder': { fr: 'ex: 8, 9, 10', en: 'e.g.: 8, 9, 10', zh: '例如：8, 9, 10' },
  'admin.material': { fr: 'Matière / Composition', en: 'Material / Composition', zh: '材料/成分' },
  'admin.materialPlaceholder': { fr: 'ex: Polyester, Nitrile, Coton', en: 'e.g.: Polyester, Nitrile, Cotton', zh: '例如：聚酯、丁腈、棉' },
  'admin.description': { fr: 'Description', en: 'Description', zh: '描述' },
  'admin.orderNote': { fr: 'Quantité minimale de commande: 10 colis (chaque colis contient 30 pièces)', en: 'Minimum order quantity: 10 packages (each package contains 30 pieces)', zh: '最低订购量：10包（每包30件）' },
  'admin.save': { fr: 'Enregistrer', en: 'Save', zh: '保存' },
  'admin.add': { fr: 'Ajouter', en: 'Add', zh: '添加' },
  'admin.saving': { fr: 'Enregistrement...', en: 'Saving...', zh: '保存中...' },
  'admin.cancel': { fr: 'Annuler', en: 'Cancel', zh: '取消' },
  'admin.image': { fr: 'Image', en: 'Image', zh: '图片' },
  'admin.price': { fr: 'Prix', en: 'Price', zh: '价格' },
  'admin.actions': { fr: 'Actions', en: 'Actions', zh: '操作' },
  'admin.edit': { fr: 'Modifier', en: 'Edit', zh: '编辑' },
  'admin.delete': { fr: 'Supprimer', en: 'Delete', zh: '删除' },
  'admin.deleteConfirm': { fr: 'Êtes-vous sûr de vouloir supprimer ce produit ?', en: 'Are you sure you want to delete this product?', zh: '确定要删除此产品吗？' },
  
  // Admin Auth
  'admin.auth.title': { fr: 'Administration', en: 'Administration', zh: '管理系统' },
  'admin.auth.subtitle': { fr: 'Witherstex - Espace Réservé', en: 'Witherstex - Restricted Area', zh: 'Witherstex - 授权区域' },
  'admin.auth.email': { fr: 'Email', en: 'Email', zh: '电子邮箱' },
  'admin.auth.password': { fr: 'Mot de passe', en: 'Password', zh: '密码' },
  'admin.auth.login': { fr: 'Connexion', en: 'Login', zh: '登录' },
  'admin.auth.signup': { fr: 'Créer un compte', en: 'Create account', zh: '创建账户' },
  'admin.auth.hasAccount': { fr: 'Déjà un compte ? Connectez-vous', en: 'Already have an account? Log in', zh: '已有账户？登录' },
  'admin.auth.noAccount': { fr: 'Pas de compte ? Inscrivez-vous', en: 'No account? Sign up', zh: '没有账户？注册' },
  'admin.auth.accessDenied': { fr: 'Accès refusé', en: 'Access denied', zh: '访问被拒绝' },
  'admin.auth.noPermission': { fr: 'Votre compte n\'a pas les droits d\'administration.', en: 'Your account does not have admin privileges.', zh: '您的账户没有管理员权限。' },
  'admin.auth.loggedAs': { fr: 'Connecté en tant que:', en: 'Logged in as:', zh: '当前登录：' },

  // Contact Page
  'contact.title': { fr: 'Contactez-nous', en: 'Contact Us', zh: '联系我们' },
  'contact.subtitle': { 
    fr: 'Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets.',
    en: 'Our team is at your disposal to answer all your questions and support you in your projects.',
    zh: '我们的团队随时为您解答所有问题并支持您的项目。'
  },
  'contact.form.title': { fr: 'Envoyez-nous un message', en: 'Send us a message', zh: '给我们留言' },
  'contact.form.name': { fr: 'Nom complet', en: 'Full name', zh: '姓名' },
  'contact.form.namePlaceholder': { fr: 'Jean Dupont', en: 'John Doe', zh: '张三' },
  'contact.form.email': { fr: 'Email', en: 'Email', zh: '电子邮箱' },
  'contact.form.emailPlaceholder': { fr: 'jean@entreprise.fr', en: 'john@company.com', zh: 'zhang@company.com' },
  'contact.form.company': { fr: 'Entreprise', en: 'Company', zh: '公司' },
  'contact.form.companyPlaceholder': { fr: 'Votre entreprise', en: 'Your company', zh: '您的公司' },
  'contact.form.phone': { fr: 'Téléphone', en: 'Phone', zh: '电话' },
  'contact.form.phonePlaceholder': { fr: '01 23 45 67 89', en: '+1 234 567 890', zh: '123 4567 8901' },
  'contact.form.subject': { fr: 'Sujet', en: 'Subject', zh: '主题' },
  'contact.form.subjectGeneral': { fr: 'Renseignement général', en: 'General inquiry', zh: '一般咨询' },
  'contact.form.subjectQuote': { fr: 'Demande de devis', en: 'Quote request', zh: '报价请求' },
  'contact.form.subjectOrder': { fr: 'Suivi de commande', en: 'Order tracking', zh: '订单跟踪' },
  'contact.form.subjectTechnical': { fr: 'Question technique', en: 'Technical question', zh: '技术问题' },
  'contact.form.subjectPartnership': { fr: 'Partenariat', en: 'Partnership', zh: '合作伙伴' },
  'contact.form.message': { fr: 'Message', en: 'Message', zh: '留言' },
  'contact.form.messagePlaceholder': { fr: 'Décrivez votre demande...', en: 'Describe your request...', zh: '请描述您的需求...' },
  'contact.form.submit': { fr: 'Envoyer le message', en: 'Send message', zh: '发送消息' },
  'contact.form.submitting': { fr: 'Envoi en cours...', en: 'Sending...', zh: '发送中...' },
  'contact.form.success': { fr: 'Message envoyé avec succès !', en: 'Message sent successfully!', zh: '消息发送成功！' },
  'contact.form.errorName': { fr: 'Nom requis', en: 'Name required', zh: '请填写姓名' },
  'contact.form.errorEmail': { fr: 'Email invalide', en: 'Invalid email', zh: '邮箱格式无效' },
  'contact.form.errorSubject': { fr: 'Sujet requis', en: 'Subject required', zh: '请选择主题' },
  'contact.form.errorMessage': { fr: 'Message trop court', en: 'Message too short', zh: '留言内容太短' },
  'contact.info.title': { fr: 'Informations de contact', en: 'Contact Information', zh: '联系信息' },
  'contact.info.address': { fr: 'Adresse', en: 'Address', zh: '地址' },
  'contact.info.phone': { fr: 'Téléphone', en: 'Phone', zh: '电话' },
  'contact.info.email': { fr: 'Email', en: 'Email', zh: '电子邮箱' },
  'contact.info.hours': { fr: 'Horaires', en: 'Hours', zh: '营业时间' },
  'contact.info.hoursValue': { fr: 'Lun-Ven: 8h30 - 17h30', en: 'Mon-Fri: 8:30 AM - 5:30 PM', zh: '周一至周五：8:30 - 17:30' },
  'contact.quote.title': { fr: 'Besoin d\'un devis rapide ?', en: 'Need a quick quote?', zh: '需要快速报价？' },
  'contact.quote.description': { 
    fr: 'Pour les commandes B2B de plus de 100 unités, contactez directement notre service commercial.',
    en: 'For B2B orders of more than 100 units, contact our sales team directly.',
    zh: '如需100件以上的B2B订单，请直接联系我们的销售团队。'
  },
  'contact.quote.cta': { fr: 'Appeler maintenant', en: 'Call now', zh: '立即拨打' },
  
  // Toast messages
  'toast.accountCreated': { fr: 'Compte créé! Vérifiez votre email pour confirmer.', en: 'Account created! Check your email to confirm.', zh: '账户已创建！请检查邮箱进行确认。' },
  'toast.loginSuccess': { fr: 'Connexion réussie', en: 'Login successful', zh: '登录成功' },
  'toast.logoutSuccess': { fr: 'Déconnexion réussie', en: 'Logout successful', zh: '退出成功' },
  'toast.imageUploaded': { fr: 'Image téléchargée avec succès', en: 'Image uploaded successfully', zh: '图片上传成功' },
  'toast.fillRequired': { fr: 'Veuillez remplir tous les champs requis', en: 'Please fill in all required fields', zh: '请填写所有必填字段' },
  'toast.selectImage': { fr: 'Veuillez sélectionner une image', en: 'Please select an image', zh: '请选择图片' },
  'toast.imageTooLarge': { fr: 'L\'image ne doit pas dépasser 5MB', en: 'Image must not exceed 5MB', zh: '图片不能超过5MB' },
  'toast.uploadError': { fr: 'Erreur lors du téléchargement de l\'image', en: 'Error uploading image', zh: '图片上传失败' },
  'toast.error': { fr: 'Une erreur est survenue', en: 'An error occurred', zh: '发生错误' },
  'toast.emailUsed': { fr: 'Cet email est déjà utilisé. Essayez de vous connecter.', en: 'This email is already in use. Try logging in.', zh: '此邮箱已被使用，请尝试登录。' },
  'toast.invalidCredentials': { fr: 'Email ou mot de passe incorrect.', en: 'Invalid email or password.', zh: '邮箱或密码错误。' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  cycleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  const cycleLanguage = () => {
    const languages: Language[] = ['fr', 'en', 'zh'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, cycleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
