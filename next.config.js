import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Obtiene el hostname del URL de Supabase desde env.
// Ejemplo: NEXT_PUBLIC_SUPABASE_URL = "https://xyz.supabase.co"
// -> hostname = "xyz.supabase.co"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseHost = supabaseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

const remotePatterns = supabaseHost
  ? [
      {
        protocol: "https",
        hostname: supabaseHost,
        pathname: "/storage/v1/**"
      }
    ]
  : [];

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname)
  },
  images: {
    // Usamos remotePatterns para permitir cargar imágenes desde Supabase Storage
    remotePatterns
  }
};

export default nextConfig;