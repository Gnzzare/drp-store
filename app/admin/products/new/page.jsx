'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../lib/supabaseClient';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload(file) {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data: publicData, error: publicError } = await supabase.storage
      .from('product-images')
      .getPublicUrl(uploadData.path);

    if (publicError) throw publicError;
    return publicData.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let image_url = null;
      if (file) {
        image_url = await handleUpload(file);
      }

      const body = {
        title: title.trim(),
        slug: slug.trim() || String(title).toLowerCase().replace(/\s+/g, '-'),
        price: Number(price) || 0,
        image_url
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Error creando producto');
      }

      // redirigir a lista de productos admin
      router.push('/admin/products');
    } catch (err) {
      console.error('Crear producto failed:', err);
      alert('Error: ' + (err.message || 'No se pudo crear el producto'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Crear producto</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="slug (opcional)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] ?? null)} />
        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-neutral-900 text-white rounded">
            {loading ? 'Guardando...' : 'Crear'}
          </button>
        </div>
      </form>
    </main>
  );
}