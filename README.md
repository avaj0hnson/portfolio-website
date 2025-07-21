# 🌐 Portfolio Website
[![codecov](https://codecov.io/gh/avaj0hnson/portfolio-website/branch/main/graph/badge.svg)](https://codecov.io/gh/avaj0hnson/portfolio-website)

A modern, animated portfolio built with **Angular**, **TailwindCSS**, and **TypeScript**, designed to showcase personal projects, technical skills, and contact capabilities — all following scalable, maintainable structure with standalone components.

![screenshot](public/img/portfolio-thumbnail.png)

---

## 🚀 Features

- 🔩 **Modular Feature Architecture** – Organized by domain (features, layout, models)
- ⚙️ **Angular Standalone Components** – Lightweight, fast-bootstrapping setup
- 💨 **TailwindCSS Styling** – Utility-first styling for modern responsive UI
- 💬 **Contact Form** – Integrated with Formspree for easy message sending
- ✨ **Typing Intro Effect** – Smooth animated intro text using `typed.js`
- 📁 **Filterable Project Showcase** – Modal-based detail view and category filters
- 🔐 **Fully Unit Tested** – Coverage across logic and user interactions

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── features/
│   │   ├── contact/             → Contact form section
│   │   ├── home/                → Hero section with animation
│   │   ├── portfolio/           → Projects showcase
│   │   │   ├── models/          → Project types and enums
│   │   │   ├── project-card/    → Project card component
│   │   │   └── project-modal/   → Project detail modal
│   │   └── skills/              → Skills and tools section
│   ├── layout/
│   │   ├── footer/              → Site footer
│   │   └── navbar/              → Top navigation bar
│   ├── app.component.*          → Root component files
│   ├── app.config.*             → App-wide configuration
│   └── app.routes.ts            → Route definitions
├── index.html                   → Main HTML entry
├── main.ts                      → App bootstrap
├── main.server.ts               → SSR entry point
├── server.ts                    → Express server (SSR)
├── tailwind-setup.scss          → Tailwind config
├── styles.scss                  → Global styles
├── angular.json                 → Angular config
├── package.json                 → Project dependencies
└── README.md                    → Project overview
```

---

## 🧪 Testing

This project includes unit tests for all major components.

```bash
ng test --code-coverage
```

View full coverage on [Codecov](https://app.codecov.io/gh/avaj0hnson/portfolio-website)
