// lib/cart.js
const KEY = 'drp_cart_v1';

export function getCart() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent('cart:changed'));
}

export function clearCart() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent('cart:changed'));
}

export function addToCart(product, quantity = 1) {
  const items = getCart();
  const id = product.id ?? product.slug;
  const found = items.find((i) => i.id === id);
  const imageUrl = product.image_url ?? product.img ?? '';

  if (found) found.quantity = (found.quantity || 1) + quantity;
  else items.push({ id, slug: product.slug, name: product.name, price: product.price, image_url: imageUrl, quantity });
  saveCart(items);
}

export function removeFromCart(id) {
  const items = getCart().filter((i) => i.id !== id);
  saveCart(items);
}

export function updateQuantity(id, qty) {
  const items = getCart();
  const it = items.find((i) => i.id === id);
  if (it) { it.quantity = qty; saveCart(items); }
}

export function getCartCount() {
  return getCart().reduce((s, i) => s + (i.quantity || 1), 0);
}

export function getCartTotal() {
  return getCart().reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
}