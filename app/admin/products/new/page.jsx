'use client';
import { useState } from 'react';
import { supabase } from '../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpload(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('product-images').upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    // public URL:
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace('/','').includes('http') ? process.env.NEXT_PUBLIC_SUPABASE_URL : process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;
    // simpler: use from public URL pattern
    return `/storage/v1/object/public/product-images/${data.path}`;
  }

  async function handleUpload(file) {
  const fileName = `${Date.now()}-${file.name}`;
  // sube archivo al bucket 'product-images'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  // obtiene la URL pública completa
  const { data: publicData } = supabase.storage
    .from('product-images')
    .getPublicUrl(uploadData.path);

  // publicData.publicUrl será: https://<tu-proyecto>.supabase.co/storage/v1/object/public/product-images/<path>
  return publicData.publicUrl;
}

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Crear producto</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="w-full border px-3 py-2 rounded" placeholder="slug" value={slug} onChange={e=>setSlug(e.target.value)} required />
        <input type="number" className="w-full border px-3 py-2 rounded" placeholder="price" value={price} onChange={e=>setPrice(e.target.value)} required />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-neutral-900 text-white rounded">{loading ? 'Guardando...' : 'Crear'}</button>
        </div>
      </form>
    </main>
  );
}