// components/ProductClient.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addToCart } from '../lib/cart';

export default function ProductClient({ product }) {
  const [qty, setQty] = useState(1);
  const router = useRouter();

  function increment() { setQty((q) => Math.max(1, q + 1)); }
  function decrement() { setQty((q) => Math.max(1, q - 1)); }

  async function handleAdd() {
    // addToCart guarda en localStorage y dispara evento
    addToCart(product, qty);
    // redirige al carrito para feedback inmediato
    router.push('/cart');
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded">
          <button onClick={decrement} className="px-3 py-1">−</button>
          <input
            type="number"
            value={qty}
            min="1"
            onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
            className="w-16 text-center"
          />
          <button onClick={increment} className="px-3 py-1">+</button>
        </div>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-neutral-900 text-white rounded-md shadow hover:opacity-95"
        >
          Añadir al carrito
        </button>
      </div>

      <div className="mt-3 text-sm text-neutral-600">
        {product.available ? 'Disponible' : 'Agotado'}
      </div>
    </div>
  );
}