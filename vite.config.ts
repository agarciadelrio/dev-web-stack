import { defineConfig, Plugin, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fullReload from "vite-plugin-full-reload";
import path from "path";
import type { IncomingMessage } from "http";
import { minify } from "html-minifier-terser";

/**
 * Plugin personalizado para simular el manifest de producción en desarrollo.
 * Esto permite usar las mismas etiquetas <script> y <link> en dev y prod.
 */
function devManifestPlugin(): Plugin {
  return {
    name: "dev-manifest-plugin",
    apply: "serve", // Solo se ejecuta en 'dev'
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? ""; // Limpiar la URL de parámetros

        if (url === "/assets/main.js") {
          res.setHeader("Content-Type", "application/javascript");
          res.end(`import '/@vite/client';\nimport '/src/js/main.ts';`);
          return;
        }

        if (url === "/assets/styles.css") {
          res.setHeader("Content-Type", "text/css");
          res.end(`@import "/src/css/tailwind.css";`);
          return;
        }

        next();
      });
    },
  };
}

/**
 * Plugin para minificar el contenido de los archivos HTML importados con `?raw`.
 * Se ejecuta únicamente durante el 'build'.
 */
function minifyHtmlRawPlugin(): Plugin {
  return {
    name: "minify-html-raw-plugin",
    apply: "build",
    async transform(code, id) {
      if (id.endsWith(".html?raw")) {
        try {
          const minifiedHtml = await minify(code, {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeRedundantAttributes: true,
            ignoreCustomFragments: [/.*/],
          });
          return { code: `export default ${JSON.stringify(minifiedHtml)};` };
        } catch (error) {
          console.error(`Error minificando ${id}:`, error);
          return { code: `export default ${JSON.stringify(code)};` };
        }
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      tailwindcss(),
      fullReload(["public_html/**/*.php"]),
      devManifestPlugin(),
      minifyHtmlRawPlugin(),
    ],

    server: {
      host: "localhost",
      port: parseInt(env.VITE_PORT, 10) || 5173,
      proxy: {
        "/": {
          target: `http://localhost:${env.PHP_PORT || 8080}`,
          changeOrigin: true,
          secure: false,
          bypass(req: IncomingMessage) {
            const url = req.url?.split("?")[0] ?? ""; // Limpiar la URL para una comparación robusta
            const isStaticAsset = /\.\w+$/.test(url);

            if (isStaticAsset) {
              // Si parece un asset estático (como .ico, .png, .jpg),
              // dejamos que Vite intente servirlo desde la carpeta 'public'.
              return req.url;
            }

            if (
              url.startsWith("/@vite/") ||
              url.startsWith("/src/") ||
              url.startsWith("/node_modules/") ||
              url === "/assets/main.js" ||
              url === "/assets/styles.css"
            ) {
              return req.url; // Devolvemos la URL original para que Vite la procese
            }
            return undefined; // Dejamos que el proxy actúe para todo lo demás
          },
        },
      },
    },
    build: {
      outDir: path.resolve(__dirname, "public_html"),
      emptyOutDir: false,
      rollupOptions: {
        input: {
          // Combinamos las entradas e importamos el CSS desde el main.ts
          // para tener un único punto de entrada, que es más limpio.
          main: path.resolve(__dirname, "src/js/main.ts"),
        },
        output: {
          // Mantener los nombres de archivo fijos.
          entryFileNames: "assets/main.js",
          assetFileNames: "assets/styles.css",

          chunkFileNames(chunkInfo) {
            if (chunkInfo.facadeModuleId?.endsWith(".html?raw")) {
              return "assets/[name].html.js";
            }
            return "assets/[name].js";
          },
        },
      },
    },
  };
});
