import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order } from '@/types';

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Admin
  isAdminAuthenticated: boolean;
  adminLogin: (code: string) => boolean;
  adminLogout: () => void;

  // Cart drawer
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'ProGrip Industriel',
    slug: 'progrip-industriel',
    description: 'Gant de travail polyvalent avec revêtement nitrile pour une adhérence optimale. Idéal pour la manutention générale et les travaux industriels légers.',
    category: 'industrial',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Polyester tricoté',
      coating: 'Nitrile micro-mousse',
      sizes: '8, 9, 10',
      certification: 'EN388:4131X',
      resistance: 'Abrasion niveau 4'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN388'
  },
  {
    id: '2',
    name: 'ChemGuard Pro',
    slug: 'chemguard-pro',
    description: 'Protection chimique haute performance contre les acides, bases et solvants. Manchette allongée pour une protection complète de l\'avant-bras.',
    category: 'chemical',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Butyle/Néoprène',
      coating: 'Non doublé',
      sizes: '8, 9, 10',
      certification: 'EN374-1:2016 Type A',
      resistance: 'Classe 6 perméation',
      length: '35 cm'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN374'
  },
  {
    id: '3',
    name: 'HeatMaster 500',
    slug: 'heatmaster-500',
    description: 'Gant anti-chaleur pour soudure et travaux à haute température. Cuir croûte de bovin renforcé avec doublure isolante.',
    category: 'thermal',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Cuir croûte bovin',
      coating: 'Doublure coton',
      sizes: '8, 9, 10',
      certification: 'EN407:412X4X',
      resistance: 'Contact 250°C',
      length: '35 cm'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN407'
  },
  {
    id: '4',
    name: 'CutShield Kevlar',
    slug: 'cutshield-kevlar',
    description: 'Protection anti-coupure niveau 5 en fibres Kevlar®. Parfait pour la manipulation de tôles, verre et matériaux tranchants.',
    category: 'industrial',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Kevlar® DuPont',
      coating: 'Polyuréthane paume',
      sizes: '8, 9, 10',
      certification: 'EN388:4X44E',
      resistance: 'Coupure niveau E'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN388'
  },
  {
    id: '5',
    name: 'FlexiGrip Precision',
    slug: 'flexigrip-precision',
    description: 'Gant de précision ultra-fin pour travaux minutieux. Excellente sensibilité tactile tout en conservant une bonne protection.',
    category: 'precision',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Nylon 13 gauge',
      coating: 'Polyuréthane',
      sizes: '8, 9, 10',
      certification: 'EN388:3131X',
      resistance: 'Dextérité optimale',
      thickness: '0.6 mm'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN388'
  },
  {
    id: '6',
    name: 'LogiGrip Handler',
    slug: 'logigrip-handler',
    description: 'Gant de manutention avec grip renforcé. Conçu pour le travail en entrepôt et la manipulation de colis.',
    category: 'handling',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Polycoton',
      coating: 'Points PVC',
      sizes: '8, 9, 10',
      certification: 'EN388:2121X',
      resistance: 'Grip amélioré'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN388'
  },
  {
    id: '7',
    name: 'SolvexGuard',
    slug: 'solvexguard',
    description: 'Protection contre les solvants organiques et huiles minérales. Résistance mécanique élevée combinée à une protection chimique.',
    category: 'chemical',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Nitrile floqué',
      coating: 'Surface texturée',
      sizes: '8, 9, 10',
      certification: 'EN374-1:2016 Type B',
      resistance: 'Hydrocarbures',
      length: '33 cm'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN374'
  },
  {
    id: '8',
    name: 'ArcPro Welder',
    slug: 'arcpro-welder',
    description: 'Gant de soudeur professionnel en cuir pleine fleur. Protection optimale contre les projections et rayonnements.',
    category: 'thermal',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Cuir pleine fleur',
      coating: 'Fil Kevlar®',
      sizes: '8, 9, 10',
      certification: 'EN12477 Type A',
      resistance: 'Soudure MIG/MAG',
      length: '40 cm'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN12477'
  },
  {
    id: '9',
    name: 'CryoProtect -40',
    slug: 'cryoprotect-40',
    description: 'Gant grand froid pour chambres froides et manipulation de produits surgelés. Isolation thermique exceptionnelle.',
    category: 'thermal',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Tricot acrylique',
      coating: 'Latex rugueux',
      sizes: '8, 9, 10',
      certification: 'EN511:X2X',
      resistance: 'Froid contact -40°C'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN511'
  },
  {
    id: '10',
    name: 'MicroTouch ESD',
    slug: 'microtouch-esd',
    description: 'Gant antistatique pour l\'électronique et les salles blanches. Dissipe les charges électrostatiques en toute sécurité.',
    category: 'precision',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Carbone/Nylon',
      coating: 'Polyuréthane bout de doigts',
      sizes: '8, 9, 10',
      certification: 'EN16350',
      resistance: '< 10^6 Ohms'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'ESD'
  },
  {
    id: '11',
    name: 'ImpactMax',
    slug: 'impactmax',
    description: 'Gant anti-impact avec protections dorsales TPR. Idéal pour les travaux de forage, BTP et industries lourdes.',
    category: 'industrial',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Spandex/Synthétique',
      coating: 'Paume silicone',
      sizes: '8, 9, 10',
      certification: 'EN388:4544EP',
      resistance: 'Impact niveau 2'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN388'
  },
  {
    id: '12',
    name: 'BioChem Disposable',
    slug: 'biochem-disposable',
    description: 'Gant jetable nitrile sans poudre. Usage unique pour manipulation de produits biologiques et chimiques légers.',
    category: 'chemical',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Nitrile',
      coating: 'Sans poudre',
      sizes: '8, 9, 10',
      certification: 'EN374-5',
      resistance: 'Micro-organismes',
      thickness: '0.12 mm'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN374'
  },
  {
    id: '13',
    name: 'OmniGrip Universal',
    slug: 'omnigrip-universal',
    description: 'Gant polyvalent tout usage pour la manutention légère. Excellent rapport qualité-prix pour les besoins quotidiens.',
    category: 'handling',
    images: ['/placeholder.svg'],
    technicalSpecs: {
      material: 'Polycoton',
      coating: 'Latex crêpé',
      sizes: '8, 9, 10',
      certification: 'EN388:2142X',
      resistance: 'Usage général'
    },
    pcsPerColis: 30,
    isB2B: true,
    badge: 'EN388'
  }
];

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerDetails: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@entreprise.fr',
      phone: '01 23 45 67 89',
      company: 'Métallurgie Dupont SARL',
      address: '15 Rue de l\'Industrie',
      city: 'Lyon',
      postalCode: '69003',
      country: 'France'
    },
    items: [
      { product: initialProducts[0], quantity: 50 },
      { product: initialProducts[3], quantity: 25 }
    ],
    total: 0,
    status: 'confirmed',
    date: '2024-01-15'
  },
  {
    id: 'ORD-002',
    customerDetails: {
      firstName: 'Marie',
      lastName: 'Laurent',
      email: 'marie.laurent@chimie.fr',
      phone: '04 56 78 90 12',
      company: 'ChimLab Industries',
      address: '8 Avenue des Sciences',
      city: 'Grenoble',
      postalCode: '38000',
      country: 'France'
    },
    items: [
      { product: initialProducts[1], quantity: 100 },
      { product: initialProducts[6], quantity: 50 }
    ],
    total: 0,
    status: 'pending',
    date: '2024-01-18'
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            cart: get().cart.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Products
      products: initialProducts,
      addProduct: (product) => {
        set({ products: [...get().products, product] });
      },
      updateProduct: (productId, updates) => {
        set({
          products: get().products.map(p =>
            p.id === productId ? { ...p, ...updates } : p
          )
        });
      },
      deleteProduct: (productId) => {
        set({ products: get().products.filter(p => p.id !== productId) });
      },

      // Orders
      orders: mockOrders,
      addOrder: (order) => {
        set({ orders: [...get().orders, order] });
      },
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(o =>
            o.id === orderId ? { ...o, status } : o
          )
        });
      },

      // Admin
      isAdminAuthenticated: false,
      adminLogin: (code) => {
        if (code === 'admin123') {
          set({ isAdminAuthenticated: true });
          return true;
        }
        return false;
      },
      adminLogout: () => set({ isAdminAuthenticated: false }),

      // Cart drawer
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open })
    }),
    {
      name: 'witherstex-store',
      partialize: (state) => ({
        cart: state.cart,
        products: state.products,
        orders: state.orders,
        isAdminAuthenticated: state.isAdminAuthenticated
      })
    }
  )
);
