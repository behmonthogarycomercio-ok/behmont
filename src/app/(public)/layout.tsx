import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { getCategories, getSiteSettings } from '@/lib/data';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <>
      <PromoBar />
      <Navbar categories={categories} />
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
