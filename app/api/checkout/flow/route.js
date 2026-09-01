// app/api/checkout/flow/route.js
export async function POST(request) {
  try {
    const body = await request.json(); // { amount, orderId, description, returnUrl }
    const FLOW_API_URL = process.env.FLOW_API_URL;
    const FLOW_MERCHANT_ID = process.env.FLOW_MERCHANT_ID;
    const FLOW_API_KEY = process.env.FLOW_API_KEY;

    if (!FLOW_API_URL || !FLOW_MERCHANT_ID || !FLOW_API_KEY) {
      return new Response(JSON.stringify({ error: 'Flow credentials missing' }), { status: 500 });
    }

    // Construye payload según la API de Flow (esto es plantilla — ajusta según doc de Flow)
    const payload = {
      merchant_id: FLOW_MERCHANT_ID,
      amount: body.amount,
      order_id: body.orderId,
      description: body.description,
      return_url: body.returnUrl || process.env.NEXT_PUBLIC_FLOW_RETURN_URL
    };

    const res = await fetch(`${FLOW_API_URL}/payments/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${FLOW_API_KEY}` },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) return new Response(JSON.stringify({ error: data }), { status: res.status });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}