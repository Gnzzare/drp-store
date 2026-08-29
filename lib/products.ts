export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
  created_at?: string;
  categories?: string[];
};

export const products: Product[] = [
  { id: '1', name: "Polera Básica Negra", slug: "polera-basica-negra", description: "Polera de algodón peinado.", price: 12990, image_url: "/images/polera-basica-negra.svg", available: true },
  { id: '2', name: "Chaqueta Denim Azul", slug: "chaqueta-denim-azul", description: "Chaqueta de jean con costuras reforzadas.", price: 45990, image_url: "/images/chaqueta-denim-azul.svg", available: true },
  { id: '3', name: "Gorro de Lana", slug: "gorro-de-lana", description: "Gorro tejido para invierno.", price: 7990, image_url: "/images/gorro-de-lana.svg", available: true },
  { id: '4', name: "Sudadera Premium Gris", slug: "sudadera-premium-gris", description: "Sudadera con forro polar.", price: 29990, image_url: "/images/sudadera-premium-gris.svg", available: true },
  { id: '5', name: "Jeans Clásico Azul", slug: "jeans-clasico-azul", description: "Jeans de corte clásico.", price: 34990, image_url: "/images/jeans-clasico-azul.svg", available: true },
  { id: '6', name: "Bufanda de Lana Suave", slug: "bufanda-lana-suave", description: "Bufanda tejida, edición limitada.", price: 15990, image_url: "/images/bufanda-lana-suave.svg", available: false }
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}