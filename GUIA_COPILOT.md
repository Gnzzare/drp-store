# 🤖 Cómo Hablar con GitHub Copilot - Instrucciones Copy-Paste

## ANTES de pedir código nuevo, copia esto:

```
Contexto del proyecto:
- Stack: Next.js 15.5, React 19, Tailwind CSS 4, TypeScript 5.7
- Módulos: ESM (import/export)
- Estilos: @import "tailwindcss" en globals.css
- PostCSS: '@tailwindcss/postcss' plugin
- JSX: react-jsx en tsconfig.json

REGLAS OBLIGATORIAS:
1. Tailwind CSS 4: NUNCA @tailwind, SIEMPRE @import "tailwindcss"
2. PostCSS: plugins: { '@tailwindcss/postcss': {} }
3. Módulos: export default, NO module.exports
4. Imágenes: public/images/ deben tener los archivos
5. Componentes: Reutilizables en carpeta components/
6. TypeScript: Tipos explícitos, jsx: react-jsx

VERIFICAR DESPUÉS:
- ¿Usa @tailwindcss/postcss? ✓
- ¿Imágenes existen? ✓
- ¿ESM modules? ✓
- ¿Componentes reutilizables? ✓
- ¿Versiones reales? ✓
```

---

## Ejemplos de Prompts Correctos

### Para Crear un Componente Nuevo
```
Crea un componente React reutilizable llamado "ProductFilter" para filtrar productos por categoría.

Requisitos:
- TypeScript con interface Props
- 'use client' en la parte superior
- Tailwind CSS 4 (solo @import syntax)
- Import desde next/link y next/image
- Archivo: components/ProductFilter.tsx

Estructura:
interface ProductFilterProps {
  categories: string[];
  onFilter: (category: string) => void;
}

export default function ProductFilter({ ... }: ProductFilterProps) {
  return (
    // UI con Tailwind CSS
  );
}
```

### Para Agregar una Nueva Página
```
Crea una página detail para ver un producto específico.

Requisitos:
- Ruta: app/product/[slug]/page.tsx
- TypeScript
- SSG con generateStaticParams()
- Importar ProductCard y otros componentes existentes
- Usar Image de next/image
- Tailwind CSS 4 (clases solamente, NO estilos inline)

Datos: Usa el mismo format de Product type que existe
```

### Para Crear Utilitarios
```
Crea funciones utilitarias para el carrito en lib/cart.ts

Requisitos:
- ESM modules (export function, no exports)
- TypeScript con tipos explícitos
- Funciones: addToCart, removeFromCart, getCartTotal
- Usa formato CLP (Peso Chileno)

Ejemplo:
export function formatCLP(price: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
}
```

---

## Cosas Que Evitar

❌ **NUNCA pidas:**
```
"Agrega @tailwind base/components/utilities"
→ ✅ CORRECTO: "Agrega @import 'tailwindcss'"

"Usa tailwindcss plugin en PostCSS"
→ ✅ CORRECTO: "Usa @tailwindcss/postcss en PostCSS"

"Usa require() y module.exports"
→ ✅ CORRECTO: "Usa import y export default"

"Crea CSS custom con clases nuevas"
→ ✅ CORRECTO: "Usa clases de Tailwind CSS 4"

"Las imágenes serán de placeholder.com"
→ ✅ CORRECTO: "Crea SVG en public/images/"
```

---

## Preguntas de Verificación

Después de que Copilot genere código, hazle estas preguntas:

### Sobre Tailwind
```
Q: "¿El archivo CSS usa @import 'tailwindcss' como base?"
Q: "¿PostCSS config usa '@tailwindcss/postcss'?"
Q: "¿No hay @tailwind directives?"
Q: "¿Solo usas clases Tailwind, no estilos custom?"
```

### Sobre Módulos
```
Q: "¿Todos los imports/exports usan ESM (import/export)?"
Q: "¿No hay require() o module.exports?"
Q: "¿Los archivos config usan 'export default'?"
```

### Sobre Archivos
```
Q: "¿Todos los archivos/imágenes que creas existen realmente?"
Q: "¿Los paths de importación son correctos (@/* aliases)?"
Q: "¿Las imágenes están en public/images/?"
```

### Sobre Estructura
```
Q: "¿Los componentes están en carpeta components/?"
Q: "¿No hay código duplicado?"
Q: "¿Todo tiene tipos TypeScript?"
```

---

## Checklist Final

Antes de hacer commit con código nuevo:

- [ ] Probé el código localmente (`npm run dev`)
- [ ] No hay errores en consola
- [ ] No hay 404 en red
- [ ] Las imágenes se ven correctamente
- [ ] TypeScript no tiene errores (`npm run type-check`)
- [ ] ESLint está OK (`npm run lint`)
- [ ] Revisé que `@tailwindcss/postcss` esté en package.json
- [ ] Revisé que globals.css tenga `@import "tailwindcss"`
- [ ] Confirmé que archivos/imágenes referenciadas existen

---

## Si Algo Falla: Debugging Rápido

```
SÍNTOMA: Build error "tailwindcss as PostCSS plugin"
→ Revisar postcss.config.js
→ DEBE ser: '@tailwindcss/postcss'

SÍNTOMA: Estilos no se aplican
→ Revisar globals.css
→ DEBE ser: @import "tailwindcss"

SÍNTOMA: Imagen 404
→ Revisar que /images/nombre.svg existe en public/

SÍNTOMA: TypeScript error de JSX
→ Revisar tsconfig.json
→ DEBE ser: "jsx": "react-jsx"

SÍNTOMA: import/export error
→ Revisar que es ESM, no CommonJS
→ DEBE ser: export default, no module.exports

SÍNTOMA: Componente no se renderiza
→ ¿Agregó 'use client'? (obligatorio si es interactivo)
→ ¿Los types están correctos?
```

---

## Prompt Maestro (Copy-Paste Completo)

Si necesitas que Copilot entienda perfectamente el proyecto, usa esto:

```
CONTEXTO: Estoy desarrollando una tienda de ropa con Next.js 15, React 19, 
Tailwind CSS 4 y TypeScript 5.7. El proyecto usa ESM modules.

CONFIGURACIÓN ACTUAL:
- tsconfig.json: jsx: "react-jsx", noImplicitAny: false
- postcss.config.js: plugins: { '@tailwindcss/postcss': {} }
- app/globals.css: @import "tailwindcss" (NO @tailwind)
- Módulos: ESM (import/export)
- Imágenes: public/images/ con archivos SVG
- Componentes: carpeta components/ con ProductCard.tsx ya existente

TAREA: [Tu tarea aquí]

REQUISITOS:
- TypeScript con tipos explícitos
- Tailwind CSS 4 (solo clases, NO @tailwind directives)
- ESM modules (import/export, NO require)
- 'use client' si es componente interactivo
- Crear archivos SVG si necesita imágenes
- Componentes reutilizables
- Importar ProductCard o componentes existentes si aplica

DESPUÉS DE GENERAR:
- Verifica que @tailwindcss/postcss está en use
- Verifica que globals.css usa @import "tailwindcss"
- Verifica que archivos/imágenes creadas existen
- Verifica que no hay código duplicado
```

---

## Tips Finales

🎯 **SEÉ ESPECÍFICO:** En lugar de "crea una página", describe exactamente qué necesitas

🎯 **ADJUNTA CONTEXTO:** Menciona que Tailwind 4 es diferente a 3

🎯 **VERIFICA DESPUÉS:** No confíes 100% al 100%, siempre revisa

🎯 **USA ESTE DOCUMENTO:** Si Copilot genera mal código, muéstrale este archivo

🎯 **ITERA:** Si algo está mal, explícale el error y pide que lo corrija

---

**Recuerda:** El problema mayor fue Tailwind 4. Si en duda, pregunta: "¿Usaste @tailwindcss/postcss y @import en globals.css?"

¡Buena suerte con tu tienda! 🛍️
