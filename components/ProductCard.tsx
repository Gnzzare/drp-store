import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '../lib/products';

type ProductCardProps = {
  product?: Product;
} & Partial<Product>;

export default function ProductCard(props: ProductCardProps) {
  // Soporta: <ProductCard product={p} /> y <ProductCard {...p} />
  const product: Product = (props.product as Product) ?? (props as Product);

  const { name = '', slug = '', description = '', price = 0, image_url = '/images/placeholder.svg', available = true } = product;

  function formatCLP(value: number) {
    try {
      return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
    } catch {
      return `CLP ${value}`;
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden group">
      <Link href={`/product/${slug}`} className="block">
        <div className="w-full h-64 bg-gray-100 relative">
          {/* Si usas next/image y el dominio Supabase, asegúrate de configurar next.config.js */}
          <Image src={image_url} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>

        <div className="p-4">
          <h2 className="font-medium text-lg">{name}</h2>
          <p className="text-sm text-neutral-500 mt-1 line-clamp-2">{description}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold">{formatCLP(price)}</span>
            <span className={`text-xs px-2 py-1 rounded ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {available ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}