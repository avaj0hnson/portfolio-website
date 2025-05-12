# 🌐 Portfolio Website

A modern, animated portfolio built with **Angular**, **TailwindCSS**, and **TypeScript**, designed to showcase personal projects, technical skills, and contact capabilities — all following scalable, maintainable structure with standalone components.

![screenshot](img/portfolio-thumbnail.png)

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
│   │   ├── contact/           → Contact form component
│   │   ├── home/              → Hero section with typing animation
│   │   ├── portfolio/
│   │   │   ├── models/        → `Project` model & category types
│   │   │   ├── project-card/  → Reusable card component per project
│   │   │   └── project-modal/ → Modal for viewing project details
│   │   └── skills/            → Skill badges and levels
│   ├── layout/
│   │   └── navbar/            → Responsive navigation bar
│   └── models/                → Shared models (if any)
├── assets/                    → Images, icons, and static files
├── styles/                    → Global styles and Tailwind config
└── index.html
```

---

## 🧪 Testing

Each component includes unit tests using Angular’s built-in test utilities and `HttpClientTestingModule`.

To run tests:
```bash
ng test
