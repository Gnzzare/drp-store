import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Tienda de Ropa — Home',
  description: 'Catálogo profesional de ropa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <footer className="border-t mt-12 py-6 text-center text-sm text-neutral-600">
          © {new Date().getFullYear()} Tienda de Ropa — Hecho con Next.js y Supabase
        </footer>
      </body>
    </html>
  );
}