/// <reference types="vite/client" />

// Asset imports (SVG, CSS, images)
declare module "*.svg" {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Environment variables (from .env)
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG: "true" | "false";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
