export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  img?: string;
  available: boolean;
  cat?: string;
  tag?: string | null;
  color?: string;
};

export const productsSeed: Product[] = [
  {
    id: '1',
    name: 'Poleron Essential OS',
    slug: 'poleron-essential-os',
    description: 'Polerón premium de algodón con corte sobrio y acabado premium.',
    price: 24990,
    image_url: 'https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Polerones',
    tag: 'Nuevo',
    color: 'Negro',
  },
  {
    id: '2',
    name: 'Tee Heavyweight Blanca',
    slug: 'tee-heavyweight-blanca',
    description: 'Polera pesada, suave al tacto y lista para uso diario.',
    price: 14990,
    image_url: 'https://images.unsplash.com/photo-1581655353466-d5ad6765dd37?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1581655353466-d5ad6765dd37?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Poleras',
    tag: null,
    color: 'Blanco',
  },
  {
    id: '3',
    name: 'Poleron Zip Gris Melt',
    slug: 'poleron-zip-gris-melt',
    description: 'Polerón con cierre tipo zip y silueta relajada.',
    price: 29990,
    image_url: 'https://images.unsplash.com/photo-1636923611438-8fd1e53ed06c?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1636923611438-8fd1e53ed06c?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Polerones',
    tag: 'Drop',
    color: 'Gris',
  },
  {
    id: '4',
    name: 'Tee Logo Drop Negro',
    slug: 'tee-logo-drop-negro',
    description: 'Básica negra con logo estampado bajo un lavado premium.',
    price: 12990,
    image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Poleras',
    tag: 'Últimas',
    color: 'Negro',
  },
  {
    id: '5',
    name: 'Pantalón Cargo Wide',
    slug: 'pantalon-cargo-wide',
    description: 'Cargo wide con proporciones amplias y una mezcla versátil.',
    price: 32990,
    image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4c55?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4c55?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Pantalones',
    tag: 'Nuevo',
    color: 'Kaki',
  },
  {
    id: '6',
    name: 'Pantalón Jogger Negro',
    slug: 'pantalon-jogger-negro',
    description: 'Jogger cómodo con caída limpia y ajuste moderno.',
    price: 19990,
    image_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Pantalones',
    tag: null,
    color: 'Negro',
  },
  {
    id: '7',
    name: 'Cap Bordado drp',
    slug: 'cap-bordado-drp',
    description: 'Gorra con bordado premium y ajuste cómodo para todo día.',
    price: 9990,
    image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Accesorios',
    tag: null,
    color: 'Negro',
  },
  {
    id: '8',
    name: 'Tote Bag drp Logo',
    slug: 'tote-bag-drp-logo',
    description: 'Bolso tote con estampado minimal y gran capacidad.',
    price: 7990,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&auto=format',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop&auto=format',
    available: true,
    cat: 'Accesorios',
    tag: null,
    color: 'Natural',
  },
];

export function getAllProducts(): Product[] {
  return productsSeed;
}

export function getProductBySlug(slug: string) {
  return productsSeed.find((p) => p.slug === slug);
}