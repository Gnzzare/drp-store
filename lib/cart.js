// Utilidades de carrito (localStorage + eventos para UI reactiva)
const STORAGE_KEY = 'tienda_ropa_cart_v1';

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  // emitir evento para que Header y páginas reaccionen
  window.dispatchEvent(new Event('cart:changed'));
}

export function getCart() {
  return read();
}

export function getCartCount() {
  const items = read();
  return items.reduce((sum, it) => sum + (it.quantity || 1), 0);
}

export function addToCart(product, qty = 1) {
  const items = read();
  const idx = items.findIndex(i => i.slug === product.slug);
  if (idx === -1) {
    items.push({ ...product, quantity: qty });
  } else {
    items[idx].quantity = (items[idx].quantity || 1) + qty;
  }
  write(items);
}

export function updateQuantity(slug, quantity) {
  const items = read();
  const idx = items.findIndex(i => i.slug === slug);
  if (idx !== -1) {
    if (quantity <= 0) {
      items.splice(idx, 1);
    } else {
      items[idx].quantity = quantity;
    }
    write(items);
  }
}

export function removeFromCart(slug) {
  const items = read().filter(i => i.slug !== slug);
  write(items);
}

export function clearCart() {
  write([]);
}

export function getCartTotal() {
  const items = read();
  return items.reduce((sum, it) => sum + (it.price * (it.quantity || 1)), 0);
}