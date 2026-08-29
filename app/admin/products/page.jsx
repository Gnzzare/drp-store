'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data || []);
    setLoading(false);
  }

  useEffect(()=>{ load(); }, []);

  async function handleDelete(id) {
    if (!confirm('Eliminar producto?')) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) load();
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Productos (Admin)</h1>
        <Link href="/admin/products/new" className="px-3 py-2 bg-neutral-900 text-white rounded">Crear producto</Link>
      </div>

      {loading ? <p className="mt-4">Cargando...</p> : (
        <ul className="mt-6 space-y-4">
          {products.map(p => (
            <li key={p.id} className="bg-white p-4 rounded shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-neutral-600">{p.slug} • {p.price} CLP</div>
              </div>
              <div className="flex gap-2">
                <Link href={`/product/${p.slug}`} className="px-2 py-1 border rounded text-sm">Ver</Link>
                <Link href={`/admin/products/${p.id}`} className="px-2 py-1 border rounded text-sm">Editar</Link>
                <button onClick={()=>handleDelete(p.id)} className="px-2 py-1 text-sm text-red-600">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}