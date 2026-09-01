import { supabaseAdmin } from '../../../../lib/supabaseServer';
import ProductEditor from '../../../../components/admin/ProductEditor';

export default async function ProductEdit({ params }) {
  const id = params.id;

  if (!supabaseAdmin) {
    return <div className="p-8">Admin requires server setup</div>;
  }

  const { data } = await supabaseAdmin.from('products').select('*').eq('id', id).single();

  if (!data) return <div className="p-8">Producto no encontrado</div>;

  return <ProductEditor product={data} />;
}