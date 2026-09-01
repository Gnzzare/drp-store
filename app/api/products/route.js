// app/api/products/route.js
import { supabaseAdmin } from '../../../lib/supabaseServer';

export async function GET(request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const category = url.searchParams.get('category') || '';
  const limit = Number(url.searchParams.get('limit') || 50);

  // Si no hay supabaseAdmin configurado, devolvemos seed local (lib/products.js)
  if (!supabaseAdmin) {
    const { getAllProducts } = await import('../../../lib/products');
    const seed = getAllProducts();
    // client-side search filter
    let res = seed;
    if (q) res = res.filter(p => (p.name + ' ' + p.description).toLowerCase().includes(q.toLowerCase()));
    if (category) res = res.filter(p => p.categories && p.categories.includes(category));
    return new Response(JSON.stringify(res.slice(0, limit)), { status: 200 });
  }

  try {
    // Simple select with text search (basic)
    let query = supabaseAdmin.from('products').select('*, product_images(*)').order('created_at', { ascending: false }).limit(limit);

    if (q) {
      // Postgres fulltext could be used; here we use ilike
      query = query.ilike('title', `%${q}%`);
    }

    const { data, error } = await query;
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data || []), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}