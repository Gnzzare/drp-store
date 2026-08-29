# Instrucciones para Desarrollo - Tienda de Ropa

## 📌 STACK DEL PROYECTO

- **Framework:** Next.js 15.x (App Router)
- **React:** 19.x
- **CSS:** Tailwind CSS 4.x (NO 3.x)
- **TypeScript:** 5.7.x
- **Backend:** Supabase (opcional, fallback a mock data)
- **Módulos:** ESM (ECMAScript Modules)
- **Node:** Compatible con LTS

---

## ⚠️ CONFIGURACIONES CRÍTICAS

### 1. PostCSS (postcss.config.js)
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ⭐ OBLIGATORIO: NO usar 'tailwindcss'
  },
};
```

### 2. Estilos Globales (app/globals.css)
```css
@import "tailwindcss";  // ⭐ OBLIGATORIO: Sintaxis Tailwind 4

@layer base {
  body {
    @apply bg-neutral-50 text-neutral-900 antialiased;
  }
}
```

### 3. TypeScript (tsconfig.json)
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",    // ⭐ Obligatorio
    "noImplicitAny": false // ⭐ Evita errores estrictos innecesarios
  }
}
```

### 4. Next.js Config (next.config.js)
```javascript
// ⭐ OBLIGATORIO: Usar ESM format
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  reactStrictMode: true
};
```

---

## 🎨 CONVENCIONES DE CÓDIGO

### Componentes
```typescript
// ✅ CORRECTO
'use client';  // Si es interactivo

import Link from 'next/link';
import Image from 'next/image';

interface ComponentProps {
  prop1: string;
  prop2: number;
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  return <div>{/* contenido */}</div>;
}
```

### Importes
```typescript
// ✅ CORRECTO
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

// ❌ EVITAR
import ProductCard from '../components/ProductCard';  // Rutas relativas complejas
```

### Tailwind CSS
```html
<!-- ✅ CORRECTO - Clases de Tailwind 4 -->
<button className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
  Botón
</button>

<!-- ❌ EVITAR -->
<button style={{...}}>Botón</button>  <!-- CSS-in-JS -->
<button className="custom-btn">Botón</button>  <!-- Clases custom sin @layer -->
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
tienda-ropa/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página home
│   └── globals.css         # Estilos globales
├── components/             # Componentes reutilizables
│   ├── ProductCard.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── public/
│   └── images/             # Imágenes locales
│       ├── logo.svg
│       └── producto-*.svg
├── lib/                    # Utilidades y funciones
│   └── supabase.ts
├── next.config.js          # ESM format ⭐
├── tailwind.config.js      # ESM format ⭐
├── postcss.config.js       # ESM format ⭐
├── tsconfig.json           ⭐
└── package.json            ⭐
```

---

## ✅ CHECKLIST ANTES DE GENERAR CÓDIGO

Cuando pidas a Copilot que genere algo nuevo:

```markdown
[ ] Confirmar que usa Tailwind CSS 4 (NO 3)
[ ] Verificar que @tailwindcss/postcss está en package.json
[ ] Las imágenes referenciadas existen en public/images/
[ ] Componentes extraídos a carpeta components/
[ ] ESM modules (import/export, no require)
[ ] TypeScript con tipos explícitos
[ ] Usar alias @/* para importes
[ ] Componentes reutilizables (NO duplicación)
[ ] 'use client' en componentes interactivos
[ ] Precios en formato CLP (Peso Chileno)
[ ] Estados available: true/false en productos
```

---

## 🛑 ERRORES COMUNES A EVITAR

### ❌ Error 1: Tailwind CSS 3 en config de Tailwind 4
```javascript
// MAL
plugins: { tailwindcss: {} }

// BIEN
plugins: { '@tailwindcss/postcss': {} }
```

### ❌ Error 2: Sintaxis antigua en globals.css
```css
/* MAL */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* BIEN */
@import "tailwindcss";
```

### ❌ Error 3: CommonJS en archivos config
```javascript
// MAL
const path = require("path");
module.exports = { ... };

// BIEN
import path from "path";
export default { ... };
```

### ❌ Error 4: Imágenes que no existen
```typescript
// MAL - Archivo no existe
image_url: "/images/producto.jpg"

// BIEN - Archivo existe en public/images/
image_url: "/images/producto.svg"
```

### ❌ Error 5: Versiones inexistentes
```json
// MAL
"typescript": "5.5.6"   // Esta versión NO existe

// BIEN
"typescript": "^5.7.0"  // Versión real
```

---

## 🚀 PATRONES RECOMENDADOS

### Formato de Productos
```typescript
type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;              // CLP (Peso Chileno)
  image_url: string;          // /images/name.svg
  available: boolean;
  created_at: string;
  categories?: string[];
};
```

### Formatea Precios
```typescript
function formatCLP(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(value);
}
```

### Componente Card
```typescript
interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  // Usar clases Tailwind, NO estilos inline
  // Usar Image de next/image, NO img
  // Usar Link de next/link, NO a
}
```

---

## 🔧 COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev              # Inicia servidor en puerto 3000

# Verificación
npm run type-check      # Verifica tipos TypeScript
npm run lint            # Ejecuta ESLint

# Producción
npm run build           # Build optimizado
npm run start           # Inicia servidor de producción
```

---

## 🌐 URLs IMPORTANTES

- **Desarrollo:** http://localhost:3000
- **Supabase:** (Cuando esté configurado)
- **Archivos estáticos:** `/images/`

---

## 📚 REFERENCIAS

- **Tailwind CSS 4:** https://tailwindcss.com/docs/upgrading-to-v4
- **Next.js 15:** https://nextjs.org/docs
- **React 19:** https://react.dev/blog/2024/12/19/react-19
- **Supabase:** https://supabase.com/docs

---

**Última actualización:** 2026-08-29
**Estado del proyecto:** ✅ Funcionando correctamente
