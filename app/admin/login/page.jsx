'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleMagicLink(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setMsg(error.message);
    else {
      setMsg('Revisa tu correo para iniciar sesión (link mágico).');
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">Admin — Iniciar sesión</h1>
      <form onSubmit={handleMagicLink} className="mt-4">
        <input type="email" value={email} placeholder="email@ejemplo.com" onChange={(e)=>setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
        <div className="mt-3">
          <button className="px-4 py-2 bg-neutral-900 text-white rounded" disabled={loading}>{loading ? 'Enviando...' : 'Enviar link'}</button>
        </div>
        {msg && <p className="mt-3 text-sm text-neutral-600">{msg}</p>}
      </form>
    </main>
  );
}