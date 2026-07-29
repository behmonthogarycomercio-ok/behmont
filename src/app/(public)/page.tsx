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

function daysUntil(date: Date): number {
  const now = new Date();
  return Math.ceil((date.getTime() - now.getTime()) / 86400000);
}

function faltanLabel(daysLeft: number): string {
  return daysLeft === 0 ? 'Es hoy' : `Faltan ${daysLeft} día${daysLeft === 1 ? '' : 's'}`;
}

// Segundo domingo de agosto (Día del Niño en Argentina).
function childrensDayDate(year: number): Date {
  const aug1 = new Date(year, 7, 1);
  const firstSunday = 1 + ((7 - aug1.getDay()) % 7);
  return new Date(year, 7, firstSunday + 7);
}

// Ganchos de temporada: cada uno con su fecha, categoria de productos y banner
// propio. Se agregan nuevas fechas alegoricas ahi mismo -- la seccion elige
// sola cual mostrar (la mas cercana dentro de su ventana), sin tocar el resto
// del home. Solo se agregan fechas que ya tienen banner/foto real cargada.
type SeasonalHook = {
  key: string;
  eyebrowPrefix: string;
  title: string;
  categorySlug: string;
  promoImage: string;
  getDate: (year: number) => Date;
  windowDays: number;
};

const SEASONAL_HOOKS: SeasonalHook[] = [
  {
    key: 'dia-del-nino',
    eyebrowPrefix: 'Día del Niño',
    title: 'Regalos para los más chicos',
    categorySlug: 'bebes-ninos',
    promoImage: '/images/promo-6-cuotas-ninos.webp',
    getDate: childrensDayDate,
    windowDays: 30,
  },
];

function getActiveSeasonalHook(): { hook: SeasonalHook; label: string } | null {
  const now = new Date();
  const candidates = [now.getFullYear(), now.getFullYear() + 1].flatMap((year) =>
    SEASONAL_HOOKS.map((hook) => ({ hook, date: hook.getDate(year) }))
  );
  let best: { hook: SeasonalHook; date: Date; daysLeft: number } | null = null;
  for (const { hook, date } of candidates) {
    const daysLeft = daysUntil(date);
    if (daysLeft < 0 || daysLeft > hook.windowDays) continue;
    if (!best || daysLeft < best.daysLeft) best = { hook, date, daysLeft };
  }
  if (!best) return null;
  return { hook: best.hook, label: faltanLabel(best.daysLeft) };
}

export const revalidate = 60; // ISR: refresca catálogo cada 60s (precio/stock de ML incluido)

// Curada a mano para el carrusel de "Equipamos tu negocio".
const BUSINESS_SECTION_SKUS = [
  '400AS-B', 'HF-100', 'MLA3481742598', 'HF-150', '250ES-10', '300ES-12',
  'LF-470', 'LF-910', 'LF-1440', 'FC-400-105', 'FC-850-12', 'FC-1250-19',
];

export default async function HomePage() {
  const seasonal = getActiveSeasonalHook();

  const [settings, categories, heroPromos, stripPromos, financingPromos, brands, featured, discounted, categoriesWithDiscounts, coupons, laundryProducts, winterProducts, hogarCategory, seasonalCategory, businessProducts] = await Promise.all([
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
    seasonal ? getProductsByCategory(seasonal.hook.categorySlug) : Promise.resolve(null),
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
        <CouponsSection coupons={coupons} whatsappNumber={settings.whatsappNumber} />
      </ScrollReveal>
      {seasonal && (
        <ScrollReveal>
          <ThemedCollection
            eyebrow={`${seasonal.hook.eyebrowPrefix} · ${seasonal.label}`}
            title={seasonal.hook.title}
            products={seasonalCategory?.products ?? []}
            whatsappNumber={settings.whatsappNumber}
            promoImage={seasonal.hook.promoImage}
          />
        </ScrollReveal>
      )}
      <ScrollReveal>
        <ThemedCollection
          eyebrow="Seleccionados"
          title="Lavarropas y secarropas"
          products={laundryProducts}
          whatsappNumber={settings.whatsappNumber}
          promoImage="/images/promo-6-cuotas-lavarropas.webp"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ThemedCollection
          eyebrow="Temporada de invierno"
          title="Preparate para el frío"
          products={winterProducts}
          whatsappNumber={settings.whatsappNumber}
          promoImage="/images/promo-6-cuotas-calefaccion.webp"
        />
      </ScrollReveal>
      <ScrollReveal>
        <ThemedCollection
          eyebrow="Para tu casa"
          title="Todo para el hogar"
          products={hogarCategory.products}
          whatsappNumber={settings.whatsappNumber}
          promoImage="/images/promo-6-cuotas-hogar.webp"
        />
      </ScrollReveal>
      <ScrollReveal><MercadoLibreBanner mlStoreUrl={settings.mlStoreUrl} /></ScrollReveal>
      <ScrollReveal>
        <ProductGrid
          title="El mejor precio de contado"
          subtitle="Retirando por el local, con descuento en efectivo del 10% al 15% según el producto."
          products={featured}
          whatsappNumber={settings.whatsappNumber}
        />
      </ScrollReveal>
      <ScrollReveal><ReviewsBanner reviewUrl={settings.googleReviewUrl} /></ScrollReveal>
      <ScrollReveal><PromoStrip promotions={stripPromos} /></ScrollReveal>
      <ScrollReveal>
        <FinancingPromosCarousel promotions={financingPromos} whatsappNumber={settings.whatsappNumber} />
      </ScrollReveal>
      <ScrollReveal><WhatsAppSection whatsappNumber={settings.whatsappNumber} /></ScrollReveal>
      <ScrollReveal><BrandStrip brands={brands} /></ScrollReveal>
      <ScrollReveal>
        <LocationSection
          address={settings.contactAddress}
          whatsappNumber={settings.whatsappNumber}
          businessHours={settings.businessHours}
        />
      </ScrollReveal>
      <ScrollReveal><PaymentSection /></ScrollReveal>
      <WhatsAppFloatButton whatsappNumber={settings.whatsappNumber} />
    </main>
  );
}
