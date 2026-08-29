// app/api/payments/flow/create/route.js
// Plantilla servidor para crear sesión de pago con Flow.
// Usamos fetch global (no node-fetch) — Next.js/Node 18+ lo soporta en runtime server.

export async function POST(request) {
  try {
    const body = await request.json();
    // body: { amount, orderId, description, returnUrl }
    const FLOW_API_URL = process.env.FLOW_API_URL; // ejemplo: https://api.flow.cl/v1
    const MERCHANT_ID = process.env.FLOW_MERCHANT_ID;
    const FLOW_API_KEY = process.env.FLOW_API_KEY;

    if (!FLOW_API_URL || !MERCHANT_ID || !FLOW_API_KEY) {
      return new Response(JSON.stringify({ error: 'Flow credentials not configured' }), { status: 500 });
    }

    // Construye el payload según la API real de Flow (ajusta los campos según su doc)
    const payload = {
      merchant_id: MERCHANT_ID,
      amount: body.amount,
      order_id: body.orderId,
      description: body.description,
      return_url: body.returnUrl || process.env.NEXT_PUBLIC_FLOW_RETURN_URL
    };

    const res = await fetch(`${FLOW_API_URL}/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FLOW_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      // devuelve el error tal cual viene del proveedor
      return new Response(JSON.stringify({ error: data }), { status: res.status });
    }

    // data debe contener url de checkout o token, devolverlo al cliente
    return new Response(JSON.stringify(data), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}