// components/CartDrawer.jsx
'use client';
import { useEffect, useState } from 'react';
import { getCart, updateQuantity, removeFromCart, getCartTotal } from '../lib/cart';

export default function CartDrawer({ open, onClose }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
    function onChange() { setItems(getCart()); }
    window.addEventListener('cart:changed', onChange);
    return () => window.removeEventListener('cart:changed', onChange);
  }, [open]);

  const total = getCartTotal();

  return (
    <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`} style={{ zIndex: 60 }}>
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">Tu carrito</h3>
        <button onClick={onClose} className="text-sm px-2 py-1">Cerrar</button>
      </div>

      <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 160px)' }}>
        {items.length === 0 && <p className="text-sm text-neutral-600">Carrito vacío</p>}
        {items.map(it => (
          <div key={it.id} className="flex items-center gap-3 py-3 border-b">
            <div className="w-16 h-16 bg-gray-100">
              <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-neutral-600">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(it.price)}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <input type="number" min="1" value={it.quantity || 1} onChange={(e) => updateQuantity(it.id, Math.max(1, Number(e.target.value || 1)))} className="w-20 border rounded px-2 py-1" />
              <button onClick={() => removeFromCart(it.id)} className="text-sm text-red-600">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div>Total</div>
          <div className="font-semibold">{new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(total)}</div>
        </div>
        <div className="flex gap-2">
          <a href="/cart" className="flex-1 text-center px-4 py-2 border rounded">Ver carrito</a>
          <button className="flex-1 px-4 py-2 bg-[#0d0d0d] text-white rounded" onClick={() => window.location.href = '/checkout'}>Pagar</button>
        </div>
      </div>
    </div>
  );
}