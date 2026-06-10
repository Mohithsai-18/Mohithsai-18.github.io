# Mohith Sai — Personal Portfolio Website

A world-class, premium, recruiter-focused personal brand portfolio website designed to showcase projects, engineering depth, and technical skills as an AI Engineer, Full Stack Developer, and Embedded Systems Engineer.

Live Site: [https://Mohithsai-18.github.io](https://Mohithsai-18.github.io)

## 🚀 Tech Stack & Design Architecture

- **Framework**: Next.js (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React + Custom SVG paths
- **CI/CD / Deployment**: GitHub Pages + GitHub Actions

## ✨ Key Features

- **Apple Vision Pro / Linear Aesthetic**: Futuristic, minimalist dark mode UI utilizing subtle glassmorphism overlay patterns, gradient glow-rings, and smooth micro-animations.
- **Dynamic Skill Toolkit**: Segmented competency progress cards.
- **Interactive Project Architecture Modals**: Deep-dive modals explaining the system flows, design decisions, mitigations, and performance outcomes for six core projects (Aperture AI, AURA Face Recognition, NPD Shoe POS, etc.).
- **Live Architecture Showcase**: Fully responsive tabbed interactive system diagrams.
- **GitHub Analytics**: Dynamic repository and statistics card loading.
- **Interactive Roadmap**: Visual growth roadmap tracing milestones from 2024 to 2026.
- **Responsive Contact Core**: Fully optimized validator feedback submission form.

## 🛠️ Development & Deployment

### Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Spawn the local development portal:
   ```bash
   npm run dev
   ```
3. Compile static distribution files locally:
   ```bash
   npm run build
   ```

### Pages Automation

Every commit pushed to the `main` branch triggers the GitHub Actions workflow defined in `.github/workflows/deploy.yml`. The action:
1. Installs npm packages
2. Checks types and compiles the static Next.js production bundle
3. Deploys the static assets from the `/out` directory directly to GitHub Pages
