import ProductCard from '../components/ProductCard';
import { getAllProducts, type Product } from '../lib/products';
import { supabaseAdmin } from '../lib/supabaseServer';

async function fetchProducts(): Promise<Product[]> {
  // Fallback local si no hay key de service role
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !supabaseAdmin) {
    return getAllProducts();
  }

  try {
    const res = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false }).limit(50);
    // @ts-ignore - res may be typed as any in runtime; Normaliza o fallback
    const data = (res as any).data;
    const error = (res as any).error;
    if (error || !data) return getAllProducts();

    // Normaliza
    return data.map((p: any) => ({
      id: p.id ?? String(p.slug ?? p.title ?? ''),
      name: p.title ?? p.name ?? '',
      slug: p.slug ?? (p.title ? String(p.title).toLowerCase().replace(/\s+/g, '-') : ''),
      description: p.description ?? '',
      price: Number(p.price ?? 0),
      image_url: p.image_url ?? '/images/placeholder.svg',
      available: typeof p.available === 'boolean' ? p.available : true,
      created_at: p.created_at,
      categories: p.categories ?? []
    }));
  } catch {
    return getAllProducts();
  }
}

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <>
      <section className="bg-white rounded-lg p-8 shadow-sm mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold">Catálogo Premium — drp.cl</h1>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            Descubre nuestra colección de ropa de calidad: poleras, chaquetas, pantalones y accesorios.
            Compra segura, envíos rápidos y devoluciones fáciles.
          </p>

          <div className="mt-8">
            <a href="/cart" className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg shadow hover:opacity-95">
              Ir al Carrito
            </a>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Catálogo</h2>
            <p className="text-sm text-neutral-600">Explora nuestras categorías y ofertas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id ?? p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}