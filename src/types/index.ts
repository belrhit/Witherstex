export interface TechnicalSpecs {
  material: string;
  coating: string;
  sizes: string;
  certification: string;
  resistance: string;
  thickness?: string;
  length?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'industrial' | 'chemical' | 'handling' | 'thermal' | 'precision';
  images: string[];
  imageUrl?: string; // Custom uploaded image URL from storage
  technicalSpecs: TechnicalSpecs;
  pcsPerColis: number; // Number of pieces per package
  isB2B: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  customerDetails: CustomerDetails;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}
