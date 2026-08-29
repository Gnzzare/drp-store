import './globals.css';
import Header from '../components/Header';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'drp.cl — Catálogo Premium',
  description: 'drp.cl — Tienda de ropa: poleras, chaquetas, pantalones y accesorios. Compra online con seguridad.',
  openGraph: {
    title: 'drp.cl — Catálogo Premium',
    description: 'drp.cl — Tienda de ropa: poleras, chaquetas, pantalones y accesorios. Compra online con seguridad.',
  },
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const year = new Date().getFullYear();

  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {/* Header (cliente) */}
        <Header />

        {/* Main content area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t bg-white mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-neutral-600">
              © {year} drp.cl — Hecho con Next.js y Supabase
            </div>

            <div className="flex items-center gap-4 text-sm">
              <a href="/terms" className="text-neutral-600 hover:underline">Términos</a>
              <a href="/privacy" className="text-neutral-600 hover:underline">Privacidad</a>
              <a href="/contact" className="text-neutral-600 hover:underline">Contacto</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}