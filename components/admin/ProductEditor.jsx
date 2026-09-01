'use client';
import { useEffect, useState } from 'react';

export default function ProductEditor({ product }) {
  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({ sku: '', price: '', stock: '', metadata: { color: '', size: '' } });

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/admin/product-variants?product_id=${product.id}`);
      const data = await res.json();
      setVariants(data || []);
    }
    load();
  }, [product.id]);

  async function addVariant() {
    const payload = {
      product_id: product.id,
      sku: newVariant.sku,
      price: Number(newVariant.price || 0),
      stock: Number(newVariant.stock || 0),
      metadata: { color: newVariant.metadata.color, size: newVariant.metadata.size }
    };
    const res = await fetch('/api/admin/product-variants', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    if (res.ok) {
      const created = await res.json();
      setVariants(v => [created, ...v]);
      setNewVariant({ sku:'', price:'', stock:'', metadata:{ color:'', size:'' } });
    } else {
      alert('Error creando variante');
    }
  }

  async function deleteVariant(id) {
    if (!confirm('Eliminar variante?')) return;
    const res = await fetch(`/api/admin/product-variants?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setVariants(v => v.filter(x => x.id !== id));
    } else alert('Error al eliminar');
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Editar producto: {product.title || product.name}</h2>

      <div className="mb-6">
        <h3 className="font-medium">Agregar variante</h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input placeholder="SKU" value={newVariant.sku} onChange={(e)=>setNewVariant({...newVariant, sku: e.target.value})} className="border px-2 py-1" />
          <input placeholder="Precio" value={newVariant.price} onChange={(e)=>setNewVariant({...newVariant, price: e.target.value})} className="border px-2 py-1" />
          <input placeholder="Stock" value={newVariant.stock} onChange={(e)=>setNewVariant({...newVariant, stock: e.target.value})} className="border px-2 py-1" />
          <input placeholder="Color" value={newVariant.metadata.color} onChange={(e)=>setNewVariant({...newVariant, metadata: {...newVariant.metadata, color: e.target.value}})} className="border px-2 py-1" />
          <input placeholder="Talla" value={newVariant.metadata.size} onChange={(e)=>setNewVariant({...newVariant, metadata: {...newVariant.metadata, size: e.target.value}})} className="border px-2 py-1" />
          <button onClick={addVariant} className="px-3 py-1 bg-neutral-900 text-white rounded">Agregar</button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Variantes existentes</h3>
        <ul className="space-y-2">
          {variants.map(v => (
            <li key={v.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{v.sku || (v.metadata?.color ?? '') + ' ' + (v.metadata?.size ?? '')}</div>
                <div className="text-sm text-neutral-600">Precio: {v.price} • Stock: {v.stock}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>deleteVariant(v.id)} className="text-sm text-red-600">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}