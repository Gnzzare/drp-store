'use client';
import { useEffect, useState } from 'react';
import { getCart, updateQuantity, removeFromCart, getCartTotal, clearCart } from '../../lib/cart';
import Link from 'next/link';
import Image from 'next/image';

function formatCLP(value) {
  try {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
  } catch {
    return `CLP ${value}`;
  }
}

export default function CartPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
    function onChange() {
      setItems(getCart());
    }
    window.addEventListener('cart:changed', onChange);
    return () => window.removeEventListener('cart:changed', onChange);
  }, []);

  const total = getCartTotal();

  if (!items.length) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Tu carrito</h1>
        <p className="mt-4">Tu carrito está vacío. <Link href="/">Volver al catálogo</Link></p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Tu carrito</h1>

      <ul className="mt-6 space-y-4">
        {items.map(it => (
          <li key={it.slug} className="flex items-center gap-4 bg-white p-4 rounded shadow-sm">
            <div className="w-24 h-24 relative bg-gray-100">
              <Image src={it.image_url} alt={it.name} fill style={{ objectFit: 'cover' }} />
            </div>

            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-neutral-600">{formatCLP(it.price)}</div>
            </div>

            <div className="flex items-center gap-2">
              <input type="number" min="1" value={it.quantity || 1} onChange={(e) => updateQuantity(it.slug, Math.max(1, Number(e.target.value || 1)))} className="w-20 border rounded px-2 py-1" />
              <button onClick={() => removeFromCart(it.slug)} className="text-sm text-red-600">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">Total: {formatCLP(total)}</div>
        <div className="flex items-center gap-3">
          <button onClick={() => { clearCart(); }} className="px-4 py-2 border rounded">Vaciar carrito</button>
          <button className="px-4 py-2 bg-neutral-900 text-white rounded">Pagar (simulado)</button>
        </div>
      </div>
    </main>
  );
}