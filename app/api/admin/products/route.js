// app/api/admin/products/route.js
import { supabaseAdmin } from '../../../../lib/supabaseServer';

export async function GET(request) {
  // lista productos (simple, paginado opcional)
  const { data, error } = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  // crear producto (body JSON)
  try {
    const body = await request.json();
    const payload = {
      title: body.title,
      slug: body.slug,
      description: body.description || null,
      price: body.price,
      cost: body.cost || null,
      sku: body.sku || null,
      available: body.available ?? true,
      stock: body.stock ?? 0,
      seo_title: body.seo_title || null,
      seo_description: body.seo_description || null,
      created_by: body.created_by || null
    };
    const { data, error } = await supabaseAdmin.from('products').insert(payload).select().single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    // manejar categorías y images fuera (client puede insertar product_images y product_categories)
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body.id) return new Response(JSON.stringify({ error: 'missing id' }), { status: 400 });
    const { data, error } = await supabaseAdmin.from('products').update(body).eq('id', body.id).select().single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'missing id param' }), { status: 400 });
    const { data, error } = await supabaseAdmin.from('products').delete().eq('id', id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}