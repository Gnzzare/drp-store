import ProductClient from '../../../components/ProductClient';
import { getProductBySlug } from '../../../lib/products';

export default async function ProductPage({ params }) {
  const { slug } = params;
  const product = getProductBySlug(slug);

  if (!product) {
    return <div className="p-8">Producto no encontrado</div>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-96 bg-gray-100 relative overflow-hidden">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold">{product.name}</h1>
          <p className="text-neutral-600 mt-3">{product.description}</p>

          <div className="mt-4 text-2xl font-semibold">
            {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(product.price)}
          </div>

          <ProductClient product={product} />
        </div>
      </div>
    </main>
  );
}