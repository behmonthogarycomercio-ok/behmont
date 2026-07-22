export type Category = {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  sort_order: number;
  active: boolean;
};

export type Brand = {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  brand_id: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  images: string[];
  specs: ProductSpec[];
  active: boolean;
  featured: boolean;
  ml_item_id: string | null;
  ml_permalink: string | null;
  category?: Category | null;
  brand?: Brand | null;
};

export type Promotion = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  cta_text: string | null;
  cta_link: string | null;
  placement: 'hero' | 'banner' | 'strip' | 'financiacion';
  sort_order: number;
  active: boolean;
};

export type Discount = {
  id: string;
  label: string;
  percent: number;
  category_id: string | null;
  product_id: string | null;
  active: boolean;
};

export type WhatsAppOrderItem = {
  sku: string;
  name: string;
  qty: number;
  price: number;
};
