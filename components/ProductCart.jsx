// components/ProductCard.jsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { addToCart } from '../lib/cart';

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);

  function clp(n) { return '$' + n.toLocaleString('es-CL'); }

  async function handleQuickAdd(e) {
    e?.preventDefault();
    setAdding(true);
    try {
      addToCart(product, 1);
      // small ui feedback
    } finally {
      setTimeout(() => setAdding(false), 300);
    }
  }

  return (
    <article className="card-wrap group bg-white rounded-md overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden mb-3.5">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(150deg,#1a5c1e 0%,#2e7d32 40%,#3a9040 70%,#1a5c1e 100%)' }} />
          <img src={product.img} alt={product.name} className="card-img object-cover w-full h-full" />
          {product.tag && <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-xs font-bold text-white" style={{ background: '#E8472F' }}>{product.tag}</span>}
          <button onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); handleQuickAdd(); }} className="add-btn absolute bottom-0 inset-x-0">
            <div className="w-full text-white font-bold uppercase py-3" style={{ background: '#E8472F' }}>{adding ? 'Añadiendo...' : '+ Agregar'}</div>
          </button>
        </div>

        <div className="px-1 pb-3">
          <p className="text-[10px] text-[#8a8480] tracking-[0.1em] uppercase mb-0.5">{product.cat} · {product.color}</p>
          <h3 className="font-bold text-[1.05rem] uppercase mb-1">{product.name}</h3>
          <p className="font-black text-xl tracking-tight">{clp(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}