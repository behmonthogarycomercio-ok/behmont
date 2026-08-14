import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PickupDiscountBanner from '@/components/PickupDiscountBanner';
import FlashOfferBar from '@/components/FlashOfferBar';
import { getCategories, getSiteSettings, getBombOffer } from '@/lib/data';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, categories, bombOffer] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getBombOffer(),
  ]);

  return (
    <>
      {bombOffer && <FlashOfferBar product={bombOffer} />}
      <PickupDiscountBanner />
      <Navbar categories={categories} />
      {children}
      <Footer
        whatsappNumber={settings.whatsappNumber}
        whatsappNumber2={settings.whatsappNumber2}
        contactEmail={settings.contactEmail}
        contactAddress={settings.contactAddress}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        mlStoreUrl={settings.mlStoreUrl}
      />
    </>
  );
}
