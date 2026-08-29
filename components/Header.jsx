// components/Header.jsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCartCount } from '../lib/cart';

export default function Header() {
  const [count, setCount] = useState(() => {
    try { return getCartCount(); } catch { return 0; }
  });
  const [query, setQuery] = useState('');

  useEffect(() => {
    function onCartChange() {
      try { setCount(getCartCount()); } catch { setCount(0); }
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
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-bold">DRP</div>
              <span className="font-semibold text-lg">drp.cl</span>
            </Link>

            <Link href="/" className="text-sm px-3 py-2 rounded hover:bg-neutral-100">Catálogo</Link>
            <Link href="/categorias" className="text-sm px-3 py-2 rounded hover:bg-neutral-100">Categorías</Link>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="border rounded-md px-3 py-1 w-64 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            />
            <button type="submit" className="px-3 py-1 bg-neutral-900 text-white rounded-md">Buscar</button>
          </form>

          <nav className="flex items-center gap-4">
            <Link href="/cart" className="relative inline-flex items-center px-3 py-2 text-sm text-neutral-700 hover:underline">
              Carrito
              <span className="ml-2 inline-flex items-center justify-center bg-neutral-100 text-neutral-800 rounded-full px-2 py-0.5 text-xs">
                {count}
              </span>
            </Link>

            {/* Admin ya no está en la barra principal. Se gestionará en admin.drp.cl */}
            <a href="https://admin.drp.cl" className="text-sm text-neutral-700 hover:underline hidden sm:inline">Acceso Admin</a>
          </nav>
        </div>
      </div>
    </header>
  );
}