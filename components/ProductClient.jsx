'use client';
import { useEffect, useState } from 'react';
import { addToCart } from '../lib/cart';

export default function ProductClient({ product }) {
  const [qty, setQty] = useState(1);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadVariants() {
      try {
        const res = await fetch(`/api/admin/product-variants?product_id=${product.id}`);
        if (res.ok) {
          const data = await res.json();
          setVariants(data || []);
          if (data && data.length) setSelectedVariant(data[0]);
        }
      } catch (err) { /* ignore */ }
    }
    loadVariants();
  }, [product.id]);

  async function handleAddToCart() {
    addToCart({
      ...product,
      id: selectedVariant?.id || product.id,
      name: product.name + (selectedVariant?.metadata?.color ? ` — ${selectedVariant.metadata.color}` : '')
    }, qty);
    // give feedback
    alert('Añadido al carrito');
  }

  async function handleBuySingle() {
    setLoading(true);
    try {
      const amount = (selectedVariant?.price ?? product.price) * qty;
      const orderId = `order_${Date.now()}`;
      const res = await fetch('/api/checkout/flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          orderId,
          description: `${product.name}${selectedVariant ? ' / ' + JSON.stringify(selectedVariant.metadata) : ''}`,
          returnUrl: window.location.origin + '/payments/success'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout error');
      // data should contain checkout url or token
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        // fallback: open returned url from data
        window.location.href = data.url || '/';
      }
    } catch (err) {
      alert('Error al crear pago: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      {variants.length > 0 && (
        <div className="mb-3">
          <label className="text-sm font-medium">Selecciona variante</label>
          <div className="mt-2 flex gap-2">
            {variants.map(v => (
              <button key={v.id} onClick={() => setSelectedVariant(v)} className={`border px-3 py-1 rounded ${selectedVariant?.id === v.id ? 'bg-neutral-900 text-white' : ''}`}>
                {v.metadata?.color ? `${v.metadata.color} ${v.metadata.size ?? ''}` : (v.sku || 'Var')}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} className="w-20 border rounded px-2 py-1" />
        <button onClick={handleAddToCart} className="px-4 py-2 bg-neutral-900 text-white rounded">Añadir al carrito</button>
        <button onClick={handleBuySingle} className="px-4 py-2 border rounded" disabled={loading}>{loading ? 'Procesando...' : 'Pagar esta prenda'}</button>
      </div>
    </div>
  );
}