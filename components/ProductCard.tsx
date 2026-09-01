// components/ProductCard.tsx   (actualiza a la versión TSX que ya tenías)
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { addToCart } from '../lib/cart';
import type { Product } from '../lib/products';

const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }: { product: Product }) {
  const { name, slug, description, price, image_url, available } = product;
  const [adding, setAdding] = useState(false);

  function formatCLP(value: number) {
    try {
      return currencyFormatter.format(value);
    } catch {
      return `CLP ${value}`;
    }
  }

  async function handleQuickAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);

    try {
      addToCart(product, 1);
    } finally {
      window.setTimeout(() => setAdding(false), 400);
    }
  }

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-64 overflow-hidden bg-neutral-100">
        <Link href={`/product/${slug}`} className="block h-full">
          <Image
            src={image_url}
            alt={name}
            width={800}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">{name}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{description}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-neutral-900">{formatCLP(price)}</span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {available ? 'Disponible' : 'Agotado'}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={adding || !available}
            className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            {adding ? 'Añadiendo...' : available ? 'Añadir' : 'No disponible'}
          </button>

          <Link href={`/product/${slug}`} className="text-sm font-medium text-neutral-700 transition hover:text-neutral-900">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}