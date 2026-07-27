import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import TrustBadges from '@/components/TrustBadges';
import BenefitsCarousel from '@/components/BenefitsCarousel';
import CategoryMosaic from '@/components/CategoryMosaic';
import CategoryDiscountCarousel from '@/components/CategoryDiscountCarousel';
import CouponsSection from '@/components/CouponsSection';
import ThemedCollection from '@/components/ThemedCollection';
import BusinessSection from '@/components/BusinessSection';
import FlashOffers from '@/components/FlashOffers';
import ProductGrid from '@/components/ProductGrid';
import PaymentSection from '@/components/PaymentSection';
import WhatsAppSection from '@/components/WhatsAppSection';
import PromoStrip from '@/components/PromoStrip';
import FinancingPromosCarousel from '@/components/FinancingPromosCarousel';
import BrandStrip from '@/components/BrandStrip';
import LocationSection from '@/components/LocationSection';
import MercadoLibreBanner from '@/components/MercadoLibreBanner';
import ReviewsBanner from '@/components/ReviewsBanner';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import {
  getCategories,
  getPromotions,
  getBrands,
  getFeaturedProducts,
  getDiscountedProducts,
  getCategoriesWithDiscounts,
  getActiveCoupons,
  getProductsByNameKeywords,
  getProductsByCategory,
  getProductsBySku,
  getSiteSettings,
} from '@/lib/data';

const WINTER_KEYWORDS = ['calefactor', 'estufa', 'convector', 'caloventor', 'turboforzador', 'termotanque', 'calefon'];
const LAUNDRY_KEYWORDS = ['lavarropa', 'secarropa'];

export const revalidate = 60; // ISR: refresca catálogo cada 60s (precio/stock de ML incluido)

// Curada a mano para el carrusel de "Equipamos tu negocio".
const BUSINESS_SECTION_SKUS = [
  '400AS-B', 'HF-100', 'MLA3481742598', 'HF-150', '250ES-10', '300ES-12',
  'LF-470', 'LF-910', 'LF-1440', 'FC-400-105', 'FC-850-12', 'FC-1250-19',
];

export default async function HomePage() {
  const [settings, categories, heroPromos, stripPromos, financingPromos, brands, featured, discounted, categoriesWithDiscounts, coupons, laundryProducts, winterProducts, hogarCategory, businessProducts] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getPromotions('hero'),
    getPromotions('banner'),
    getPromotions('financiacion'),
    getBrands(),
    getFeaturedProducts(),
    getDiscountedProducts(),
    getCategoriesWithDiscounts(),
    getActiveCoupons(),
    getProductsByNameKeywords(LAUNDRY_KEYWORDS),
    getProductsByNameKeywords(WINTER_KEYWORDS),
    getProductsByCategory('hogar'),
    getProductsBySku(BUSINESS_SECTION_SKUS),
  ]);

  return (
    <main>
      <Hero promotions={heroPromos} />
      <ScrollReveal><BusinessSection products={businessProducts} /></ScrollReveal>
      <ScrollReveal><TrustBadges /></ScrollReveal>
      <ScrollReveal><BenefitsCarousel /></ScrollReveal>
      <ScrollReveal><CategoryMosaic categories={categories} /></ScrollReveal>
      <ScrollReveal>
        <CategoryDiscountCarousel categories={categoriesWithDiscounts} />
      </ScrollReveal>
      <ScrollReveal>
        <FlashOffers products={discounted} whatsappNumber={settings.whatsappNumber} />
      </ScrollReveal>
      <ScrollReveal>
        <ThemedCollection
          eyebrow="Temporada de invierno"
          title="Preparate para el frío"
          products={winterProducts}
          whatsappNumber={settings.whatsappNumber}
        />
      </ScrollReveal>
      <ScrollReveal>
        <CouponsSection coupons={coupons} whatsappNumber={settings.whatsappNumber} />
      </ScrollReveal>
      <ScrollReveal>
        <ProductGrid
          title="El mejor precio de contado"
          subtitle="Retirando por el local, con descuento en efectivo del 10% al 15% según el producto."
          products={featured}
          whatsappNumber={settings.whatsappNumber}
        />
      </ScrollReveal>
      <ScrollReveal>
        <ThemedCollection
          eyebrow="Seleccionados"
          title="Lavarropas y secarropas"
          products={laundryProducts}
          whatsappNumber={settings.whatsappNumber}
        />
      </ScrollReveal>
      <ScrollReveal><PaymentSection /></ScrollReveal>
      <ScrollReveal>
        <FinancingPromosCarousel promotions={financingPromos} whatsappNumber={settings.whatsappNumber} />
      </ScrollReveal>
      <ScrollReveal>
        <ThemedCollection
          eyebrow="Para tu casa"
          title="Todo para el hogar"
          products={hogarCategory.products}
          whatsappNumber={settings.whatsappNumber}
        />
      </ScrollReveal>
      <ScrollReveal><PromoStrip promotions={stripPromos} /></ScrollReveal>
      <ScrollReveal><WhatsAppSection whatsappNumber={settings.whatsappNumber} /></ScrollReveal>
      <ScrollReveal><BrandStrip brands={brands} /></ScrollReveal>
      <ScrollReveal>
        <LocationSection
          address={settings.contactAddress}
          whatsappNumber={settings.whatsappNumber}
          businessHours={settings.businessHours}
        />
      </ScrollReveal>
      <ScrollReveal><MercadoLibreBanner mlStoreUrl={settings.mlStoreUrl} /></ScrollReveal>
      <ScrollReveal><ReviewsBanner reviewUrl={settings.googleReviewUrl} /></ScrollReveal>
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
