import Hero from '@/components/Hero';
import ScrollReveal from '@/components/ScrollReveal';
import TrustBadges from '@/components/TrustBadges';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedCategories from '@/components/FeaturedCategories';
import BusinessSection from '@/components/BusinessSection';
import FlashOffers from '@/components/FlashOffers';
import ProductGrid from '@/components/ProductGrid';
import PaymentSection from '@/components/PaymentSection';
import WhatsAppSection from '@/components/WhatsAppSection';
import PromoStrip from '@/components/PromoStrip';
import BrandStrip from '@/components/BrandStrip';
import LocationSection from '@/components/LocationSection';
import ReviewsBanner from '@/components/ReviewsBanner';
import WhatsAppFloatButton from '@/components/WhatsAppFloatButton';
import {
  getCategories,
  getPromotions,
  getBrands,
  getTopBrands,
  getFeaturedProducts,
  getDiscountedProducts,
  getSiteSettings,
} from '@/lib/data';

export const revalidate = 60; // ISR: refresca catálogo cada 60s (precio/stock de ML incluido)

export default async function HomePage() {
  const [settings, categories, heroPromos, stripPromos, brands, topBrands, featured, discounted] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getPromotions('hero'),
    getPromotions('banner'),
    getBrands(),
    getTopBrands(),
    getFeaturedProducts(),
    getDiscountedProducts(),
  ]);

  return (
    <main>
      <Hero promotions={heroPromos} />
      <ScrollReveal><TrustBadges /></ScrollReveal>
      <ScrollReveal><CategoryGrid categories={categories} /></ScrollReveal>
      <ScrollReveal><FeaturedCategories categories={categories} /></ScrollReveal>
      <ScrollReveal><BusinessSection /></ScrollReveal>
      <ScrollReveal>
        <FlashOffers products={discounted} whatsappNumber={settings.whatsappNumber} />
      </ScrollReveal>
      <ScrollReveal>
        <ProductGrid
          title="El mejor precio de contado"
          products={featured}
          whatsappNumber={settings.whatsappNumber}
        />
      </ScrollReveal>
      <ScrollReveal><PaymentSection /></ScrollReveal>
      <ScrollReveal><PromoStrip promotions={stripPromos} /></ScrollReveal>
      <ScrollReveal><WhatsAppSection whatsappNumber={settings.whatsappNumber} /></ScrollReveal>
      <ScrollReveal><BrandStrip brands={brands} topBrands={topBrands} /></ScrollReveal>
      <ScrollReveal>
        <LocationSection
          address={settings.contactAddress}
          whatsappNumber={settings.whatsappNumber}
          businessHours={settings.businessHours}
        />
      </ScrollReveal>
      <ScrollReveal><ReviewsBanner reviewUrl={settings.googleReviewUrl} /></ScrollReveal>
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
