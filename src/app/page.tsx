import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import PromoStrip from '@/components/PromoStrip';
import BrandStrip from '@/components/BrandStrip';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
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
    <>
      <Navbar categories={categories} />
      <main>
        <Hero promotions={heroPromos} />
        <CategoryGrid categories={categories} />
        <ProductGrid
          title="El mejor precio de contado"
          products={featured}
          whatsappNumber={settings.whatsappNumber}
        />
        <PromoStrip promotions={stripPromos} />
        <BrandStrip brands={brands} />
        <LocationSection address={settings.contactAddress} whatsappNumber={settings.whatsappNumber} />
      </main>
      <Footer
        whatsappNumber={settings.whatsappNumber}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={settings.contactAddress}
        instagramUrl={settings.instagramUrl}
        mlStoreUrl={settings.mlStoreUrl}
      />
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </>
  );
}
