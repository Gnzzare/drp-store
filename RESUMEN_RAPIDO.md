# 🚀 RESUMEN RÁPIDO - Tienda de Ropa

## Lo Más Importante (Leer primero)

### Versiones Correctas ✅
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "tailwindcss": "^4.3.3",
  "@tailwindcss/postcss": "^4.3.3",
  "typescript": "^5.7.0"
}
```

### 3 Cambios Críticos en Tailwind 4 ⭐
1. **postcss.config.js:**
   ```javascript
   plugins: { '@tailwindcss/postcss': {} }
   ```

2. **globals.css:**
   ```css
   @import "tailwindcss";
   ```

3. **ESM Modules:**
   - `next.config.js` → `export default { ... }`
   - `tailwind.config.js` → `export default { ... }`
   - `postcss.config.js` → `export default { ... }`

---

## Problemas Que Hubo y Se Arreglaron

| Problema | Causa | Solución |
|----------|-------|----------|
| **Build fallaba** | Tailwind 4 usa `@tailwindcss/postcss` no `tailwindcss` | Actualizar postcss.config.js |
| **CSS no aplicaba** | Sintaxis `@tailwind` es de Tailwind 3 | Cambiar a `@import "tailwindcss"` |
| **npm install fallaba** | TypeScript 5.5.6 no existe | Usar `^5.7.0` |
| **Imágenes 404** | Archivos .jpg no existían | Crear SVG en public/images/ |
| **Conflicto módulos** | next.config.js era CommonJS | Convertir a ESM (import/export) |
| **Componentes duplicados** | Código repetido en page.tsx | Crear ProductCard.tsx reutilizable |

---

## Cuando Generes Código Nuevo

✅ **CHECKLIST MÍNIMO:**

- [ ] ¿Usa Tailwind 4? (verifica `@import "tailwindcss"` no `@tailwind`)
- [ ] ¿Las imágenes existen? (public/images/ deben tener los archivos)
- [ ] ¿ESM modules? (import/export, no require)
- [ ] ¿Componentes reutilizables? (extraer a carpeta components/)
- [ ] ¿TypeScript correcto? (jsconfig: `react-jsx`)
- [ ] ¿Versiones reales? (no inventadas como 5.5.6)

---

## Archivos Críticos

```
postcss.config.js         ⚠️ DEBE tener @tailwindcss/postcss
app/globals.css           ⚠️ DEBE tener @import "tailwindcss"
tsconfig.json             ⚠️ DEBE tener jsx: react-jsx
next.config.js            ⚠️ DEBE ser ESM (export default)
tailwind.config.js        ⚠️ DEBE ser ESM (export default)
package.json              ⚠️ Versiones reales del stack
public/images/            ⚠️ DEBEN existir los SVG/imágenes
components/ProductCard.tsx ✅ Componentes reutilizables aquí
```

---

## Estructura Actual (Funciona)

```
tienda-ropa/
├── app/page.tsx                    (importa ProductCard)
├── components/ProductCard.tsx      (componente reutilizable)
├── public/images/                  (SVG placeholder)
├── next.config.js                  (ESM)
├── tailwind.config.js              (ESM)
├── postcss.config.js               (@tailwindcss/postcss)
├── app/globals.css                 (@import "tailwindcss")
└── tsconfig.json                   (jsx: react-jsx)
```

---

## Si Algo Falla

### Build Error: "tailwindcss as PostCSS plugin"
→ Revisa `postcss.config.js` debe ser `@tailwindcss/postcss`

### Estilos no se aplican
→ Revisa `app/globals.css` debe iniciar con `@import "tailwindcss"`

### Imagen 404
→ Revisa que el archivo existe en `public/images/nombre.svg`

### TypeScript error
→ Revisa `tsconfig.json` tiene `jsx: react-jsx`

### import/export errors
→ Revisa `next.config.js` usa `export default`, no `module.exports`

---

## Los 6 Productos (Seed Data)

```javascript
{
  id: 1, name: "Polera Básica Negra", price: 12990, available: true,
  image_url: "/images/polera-basica-negra.svg"
},
{
  id: 2, name: "Chaqueta Denim Azul", price: 45990, available: true,
  image_url: "/images/chaqueta-denim-azul.svg"
},
{
  id: 3, name: "Gorro de Lana", price: 7990, available: true,
  image_url: "/images/gorro-de-lana.svg"
},
{
  id: 4, name: "Sudadera Premium Gris", price: 29990, available: true,
  image_url: "/images/sudadera-premium-gris.svg"
},
{
  id: 5, name: "Jeans Clásico Azul", price: 34990, available: true,
  image_url: "/images/jeans-clasico-azul.svg"
},
{
  id: 6, name: "Bufanda de Lana Suave", price: 15990, available: false,
  image_url: "/images/bufanda-lana-suave.svg"
}
```

---

## Tips para GitHub Copilot

```
"Eres un experto en Next.js 15, React 19 y Tailwind CSS 4.
- Tailwind 4: SIEMPRE usa @tailwindcss/postcss, NUNCA tailwindcss
- Estilos: @import 'tailwindcss' en globals.css, NO @tailwind
- Módulos: ESM (import/export), NO CommonJS
- Imágenes: Siempre verificar que el archivo exista en public/images/
- Componentes: Reutilizables en carpeta components/
- TypeScript: jsx: 'react-jsx' en tsconfig.json
"
```

---

**Resumen:** El problema principal era que Tailwind CSS 4 es completamente diferente a Tailwind 3. Cambiar `@tailwindcss/postcss` y `@import "tailwindcss"` lo arregla TODO. Después es solo asegurarse de que archivos existan y código sea limpio.

✅ **Ahora está funcionando perfectamente**
