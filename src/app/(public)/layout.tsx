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
      <Navbar categories={categories} contactPhone={settings.contactPhone} whatsappNumber={settings.whatsappNumber} />
      {children}
      <Footer
        whatsappNumber={settings.whatsappNumber}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={settings.contactAddress}
        instagramUrl={settings.instagramUrl}
        facebookUrl={settings.facebookUrl}
        mlStoreUrl={settings.mlStoreUrl}
      />
    </>
  );
}
