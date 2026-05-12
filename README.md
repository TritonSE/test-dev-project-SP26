# TSE Social Points Tracker

A mobile-first web application for tracking social event points across TSE project teams. Teams earn points when members attend socials. This app handles submissions, admin review, and live standings.

---

# Getting Started

## Tech Stack
| Stack | Technology |
|-------|------------|
| **Frontend** | Next.js 16 + TypeScript + Tailwind CSS |
| **Backend** | Express.js + TypeScript |
| **Database** | MongoDB |
| **Linting** | ESLint + Prettier |
| **Git Hooks** | Husky + Secret Scanner |

---

## Prerequisites

Before running the project, make sure you have:

- Node.js v18+
  - ```node --version```    # should show v18.0.0 or higher
- npm v9+
  - ```npm --version```     # should show v9.0.0 or higher
- MongoDB (for local development)

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/TritonSE/test-dev-project-SP26.git
cd test-dev-project-SP26
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# Running the Development Servers

## Backend

```bash
cd backend
npm run dev
```

Backend runs on:  
`http://localhost:3001`

---

## Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:  
`http://localhost:3000`

---

# Project Structure
IMPORTANT: Never remove anything from .gitignore. It prevents .env files and other sensitive files from being pushed to GitHub.

```plaintext
.
├── backend/          # Express + TypeScript API
├── frontend/         # Next.js + TypeScript app
└── .github/          # GitHub templates and actions
```

---

# Contributing

- All PRs require at least **1 approval**
- Follow the PR template before submitting
- Run lint checks before committing:

```bash
npm run lint-fix     # auto-fixes lint errors and reformats code — run before opening a PR
npm run lint-check   # checks for errors without modifying files — used by CI
npm run format       # reformats code only, no lint check
```

---

# Daily Workflow
### 1. Make sure you're on main and up to date
```
git checkout main
git pull origin main
```
### 2. Create a new branch for your feature
```
git checkout -b feature/your-feature-name
```

### 3. Make your changes and commit frequently
```
git add .
git commit -m "feat: add submission form"
```

### 4. Push your branch
```
git push -u origin feature/your-feature-name
```

### 5. Open a Pull Request on GitHub
```
- Fill out the PR template
- Request a reviewer
- Wait for CI checks to pass
```

---