'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getCartCount } from '../lib/cart';

const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });

export default function Header() {
  const [count, setCount] = useState(() => {
    try {
      return getCartCount();
    } catch {
      return 0;
    }
  });
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onCartChange() {
      try {
        setCount(getCartCount());
      } catch {
        setCount(0);
      }
    }

    window.addEventListener('cart:changed', onCartChange);
    return () => window.removeEventListener('cart:changed', onCartChange);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f1eb]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="brand-mark flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black tracking-[0.14em] text-white">DRP</div>
              <div>
                <div className="text-lg font-black tracking-tight">drp.cl</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 md:flex">
              <Link href="/" className="rounded-full px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-white hover:text-neutral-900">Catálogo</Link>
              <Link href="/categorias" className="rounded-full px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-white hover:text-neutral-900">Categorías</Link>
            </nav>
          </div>

          <form onSubmit={handleSearch} className="hidden flex-1 justify-center md:flex">
            <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-2 shadow-sm">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white">Buscar</button>
            </div>
          </form>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm ring-1 ring-black/5 transition hover:bg-neutral-50"
            >
              Carrito
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#e8472f] px-1.5 text-xs font-bold text-white">{count}</span>
            </button>

            <a href="https://admin.drp.cl" className="hidden rounded-full border border-black/10 bg-white/80 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-white sm:inline-flex">Acceso Admin</a>
          </div>
        </div>
      </header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}