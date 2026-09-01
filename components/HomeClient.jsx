// components/HomeClient.jsx
'use client';
import { useState } from 'react';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import { addToCart, getCartCount } from '../lib/cart';

/**
 * @param {{ initialProducts?: import('../lib/products').Product[] }} props
 */
export default function HomeClient(props) {
  const { initialProducts = [] } = props;
  const A = '#E8472F';
  const CATS = ['Todo', 'Polerones', 'Poleras', 'Pantalones', 'Accesorios'];
  const [cat, setCat] = useState('Todo');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(typeof window !== 'undefined' ? getCartCount() : 0);

  function handleQuickAdd(product) {
    addToCart(product, 1);
    setCartOpen(true);
    setTimeout(() => {
      setCartOpen(false);
      setCartCount(getCartCount());
    }, 2400);
  }

  const PRODUCTS = initialProducts;
  const visible = cat === 'Todo' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);

  return (
    <div className="min-h-full overflow-x-hidden bg-[#f6f1eb] text-neutral-900">
      <section className="relative overflow-hidden bg-[#111111]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,71,47,0.35),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-16">
          <div className="flex items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white/80">Nueva temporada</span>
              <h1 className="mt-6 max-w-xl text-4xl font-black leading-none tracking-[-0.06em] text-white md:text-6xl">
                Streetwear <span className="italic text-[#ff7d5c]">sin filtros.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base text-white/70 md:text-lg">
                Prendas premium para crear looks diarios con actitud, funcionalidad y una estética minimalista.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="premium-button"
                >
                  Comprar ahora
                </button>
                <button
                  onClick={() => setCartOpen(true)}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Ver carrito
                </button>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-white/80">
                <div>
                  <div className="text-2xl font-black text-white">+120</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60">drop</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">24h</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60">envío</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">4.9</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-white/60">rating</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center pb-4">
            <div className="soft-card relative w-full max-w-md overflow-hidden rounded-[2rem] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="overflow-hidden rounded-[1.5rem] bg-neutral-200">
                <img
                  src={initialProducts[0]?.image_url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900&auto=format&fit=crop&q=80'}
                  alt="Producto destacado"
                  className="h-[440px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-8 right-8 rounded-[1.4rem] border border-black/5 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8472f]">Featured</div>
                    <div className="mt-1 text-lg font-black">{initialProducts[0]?.name || 'Poleron Essential'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">desde</div>
                    <div className="text-xl font-black">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(initialProducts[0]?.price || 24990)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e8472f]">La Vitrina</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] md:text-5xl">Catálogo</h2>
          </div>
          <p className="text-sm text-neutral-500">{visible.length} productos disponibles</p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === c ? 'bg-[#111111] text-white' : 'border border-black/10 bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((p) => (
            <div key={p.id} className="flex flex-col gap-3">
              <ProductCard product={{ ...p, image_url: p.image_url ?? p.img, img: p.img ?? p.image_url }} />
              <div className="flex gap-2">
                <button onClick={() => handleQuickAdd(p)} className="flex-1 rounded-full bg-[#e8472f] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d73d2b]">Añadir</button>
                <a href={`/product/${p.slug}`} className="flex-1 rounded-full border border-black/10 bg-white px-3 py-2.5 text-center text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100">Ver</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}