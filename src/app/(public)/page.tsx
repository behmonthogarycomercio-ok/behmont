import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import PromoStrip from '@/components/PromoStrip';
import BrandStrip from '@/components/BrandStrip';
import LocationSection from '@/components/LocationSection';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import {
  getCategories,
  getPromotions,
  getBrands,
  getFeaturedProducts,
  getSiteSettings,
} from '@/lib/data';

export const revalidate = 60; // ISR: refresca catálogo cada 60s (precio/stock de ML incluido)

export default async function HomePage() {
  const [settings, categories, heroPromos, stripPromos, brands, featured] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getPromotions('hero'),
    getPromotions('banner'),
    getBrands(),
    getFeaturedProducts(),
  ]);

  return (
    <main>
      <Hero promotions={heroPromos} />
      <TrustBadges />
      <CategoryGrid categories={categories} />
      <ProductGrid
        title="El mejor precio de contado"
        products={featured}
        whatsappNumber={settings.whatsappNumber}
      />
      <PromoStrip promotions={stripPromos} />
      <BrandStrip brands={brands} />
      <LocationSection
        address={settings.contactAddress}
        whatsappNumber={settings.whatsappNumber}
        businessHours={settings.businessHours}
      />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
