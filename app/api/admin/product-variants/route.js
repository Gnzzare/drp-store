// app/api/admin/product-variants/route.js
import { supabaseAdmin } from '../../../../lib/supabaseServer';

export async function GET(request) {
  const url = new URL(request.url);
  const product_id = url.searchParams.get('product_id');
  if (!product_id) return new Response(JSON.stringify({ error: 'missing product_id' }), { status: 400 });

  const { data, error } = await supabaseAdmin.from('product_variants').select('*').eq('product_id', product_id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { product_id, sku, price, stock, metadata } = body;
    const payload = { product_id, sku: sku || null, price: price || 0, stock: stock || 0, metadata: metadata || {} };
    const { data, error } = await supabaseAdmin.from('product_variants').insert(payload).select().single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    if (!body.id) return new Response(JSON.stringify({ error: 'missing id' }), { status: 400 });
    const { data, error } = await supabaseAdmin.from('product_variants').update(body).eq('id', body.id).select().single();
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
    if (!id) return new Response(JSON.stringify({ error: 'missing id' }), { status: 400 });
    const { data, error } = await supabaseAdmin.from('product_variants').delete().eq('id', id);
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}