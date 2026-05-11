<div align="center">
  <img src="public/favicon.svg" width="80" alt="EdgeStack Logo" />
  <h1 align="center">EdgeStack</h1>
  <p align="center">
    <strong>Full-Stack React on the Cloudflare Edge. Zero latency. Global scale.</strong>
  </p>
  <p align="center">
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://hono.dev/"><img src="https://img.shields.io/badge/Hono-Edge-E36002?logo=hono&logoColor=white" alt="Hono" /></a>
    <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  </p>
</div>

---

## ⚡️ Overview

**EdgeStack** is a production-ready, ultra-low-latency starter kit designed to deploy full-stack TypeScript applications directly to the **Cloudflare Global Edge Network**. 

By natively integrating **Vite**, **React**, and **Tailwind CSS** with a blazingly fast **Hono** backend router, this architecture eliminates the need for complex proxy setups and traditional Node.js origin servers. Your frontend assets and backend API APIs run globally, mere milliseconds away from your users.

## 🚀 Key Features

* **True Edge Rendering:** Both your static frontend assets and dynamic API routes are served from Cloudflare's distributed edge nodes (`Vite` + `Cloudflare Pages/Workers`).
* **Hono Backend:** A lightweight, ultrafast routing framework built explicitly for Edge and Deno environments.
* **Unified Monorepo Experience:** Seamlessly develop frontend UI and backend APIs concurrently with native `@cloudflare/vite-plugin` hot-module replacement (HMR).
* **Database Ready:** Pre-configured environment bindings for Cloudflare **D1** (Serverless SQLite) and **KV** (Key-Value Datastore).
* **Fully Responsive UI:** Built-in dashboard demonstrating real-time API latency tracking, Edge network routing (`colo`), and fluid typography using Shadcn UI and Tailwind v4 methodologies.
* **Strict Type Safety:** End-to-end TypeScript enforcement, including strict Cloudflare `Env` bindings
