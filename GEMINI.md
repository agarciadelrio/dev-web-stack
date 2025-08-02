# Gemini Assistant Configuration

This document provides context and instructions for the Gemini AI assistant to effectively collaborate on this project. Please review and update it for your specific project after using this template.

## 1. Project Overview

- **Objective**: This is a boilerplate project for building web applications. It combines a traditional PHP backend with a modern, Vite-powered frontend stack.
- **Key Goal**: To provide a seamless development experience with hot-reloading for both frontend assets (JS, TS, CSS) and backend PHP files.

## 2. Core Technologies

- **Backend**: PHP
- **Frontend Build Tool**: Vite
- **CSS Framework**: Tailwind CSS
- **JavaScript Framework**: Alpine.js (intended for use)
- **Language**: TypeScript
- **Package Manager**: pnpm

When writing code, strictly adhere to the syntax and conventions of these technologies.

## 3. Project Structure

- `public_html/`: This is the web server's document root. All backend PHP code resides here. This is the folder to be deployed in production.
- `src/`: Contains all frontend source files (TypeScript, Tailwind CSS, etc.) that will be processed by Vite.
- `public/`: Holds static assets (like `favicon.ico`) that are copied to the build directory as-is.
- `dist/` (or `public_html/assets/`): The output directory for Vite's production build. Do not edit files here directly.

## 4. Important Commands

- **Install Dependencies**: `pnpm install`
- **Run Development Server**: `pnpm dev` (This starts both the PHP and Vite servers).
- **Build for Production**: `pnpm build` (This compiles frontend assets into `public_html/assets/`).

## 5. Development Workflow

1.  Run `pnpm dev` to start the development environment.
2.  Modify frontend files in `src/`.
3.  Modify backend files in `public_html/`.
4.  The browser will automatically reload thanks to Vite and the full-reload plugin.

## 6. Coding Conventions

- **PHP**: Follow modern PHP standards (PSR-12).
- **TypeScript**: Adhere to standard TypeScript best practices. Use types wherever possible.
- **CSS**: Use Tailwind CSS utility classes directly in the HTML. Avoid writing custom CSS files unless absolutely necessary.
- **Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
