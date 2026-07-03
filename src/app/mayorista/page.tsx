import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MayoristaForm from '@/components/MayoristaForm';
import { getCategories, getSiteSettings } from '@/lib/data';

export default async function MayoristaPage() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <>
      <Navbar categories={categories} />
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-steel-950 mb-2">
          Compras al por mayor
        </h1>
        <p className="text-steel-500 text-sm mb-8">
          ¿Tenés un negocio y necesitás volumen? Contanos qué buscás y te armamos una propuesta
          a medida, con precios y condiciones especiales para mayoristas.
        </p>
        <MayoristaForm />
      </main>
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
