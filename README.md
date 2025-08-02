# PHP & Vite Boilerplate

A modern boilerplate for developing web applications using a classic PHP backend with a modern Vite-powered frontend stack. This setup provides a seamless development experience with hot-reloading for both frontend assets and backend PHP files.

<details>
<summary>Ver la versión en español</summary>

## Boilerplate PHP & Vite

Un boilerplate moderno para desarrollar aplicaciones web usando un backend clásico de PHP con un stack de frontend moderno gestionado por Vite. Esta configuración proporciona una experiencia de desarrollo fluida con recarga en caliente tanto para los assets del frontend como para los archivos PHP del backend.

</details>

---

## Technology Stack

- **Backend**: PHP 8.x
- **Frontend**:
    - [Vite](https://vitejs.dev/) as a build tool and dev server.
    - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
    - [Alpine.js](https://alpinejs.dev/) (intended for use) for lightweight interactivity.
    - [TypeScript](https://www.typescriptlang.org/) for type-safe JavaScript.
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## Features

- **Vite Dev Server**: A fast development server with proxying to the PHP backend.
- **Hot Module Replacement (HMR)**: Instant updates in the browser for your JS/TS and CSS files without a full page reload.
- **PHP Live Reload**: Automatically reloads the page when you make changes to `.php` files.
- **Optimized Build Process**: Generates minified and optimized assets for production.
- **Clean Project Structure**: A clear separation between backend (`public_html`), frontend source (`src`), and static public assets (`public`).

---

## Getting Started

### Prerequisites

- PHP 8.0 or higher
- Node.js 18.x or higher
- `pnpm` installed globally (`npm install -g pnpm`)

### Installation

1.  Create a new repository from this template.
2.  Clone your new repository:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
3.  Navigate to the project directory:
    ```bash
    cd your-repository-name
    ```
4.  Install the dependencies:
    ```bash
    pnpm install
    ```

### Development

To start the development server, which runs both the PHP server and the Vite dev server with proxying, execute:

```bash
pnpm dev
```

This will:
- Start the PHP built-in server on port `8080` (or as configured in `.env`).
- Start the Vite server on port `5173` (or as configured in `.env`).
- Open your default browser to `http://localhost:5173`.

### Production Build

To build the assets for production, run:

```bash
pnpm build
```

This command will compile and minify the TypeScript and CSS files from `src/` and place them directly into `public_html/assets/`. The `public_html` directory is then ready to be deployed to a standard PHP hosting environment.
