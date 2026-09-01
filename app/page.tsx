import HomeClient from '../components/HomeClient';
import { getAllProducts } from '../lib/products';

export default function Page() {
  const products = getAllProducts();
  return <HomeClient initialProducts={products} />;
}