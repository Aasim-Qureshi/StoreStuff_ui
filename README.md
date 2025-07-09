
# StoreStuff – Frontend
This is the **React + TypeScript + Vite** frontend for the StoreStuff application — a collaborative cloud storage platform. It features a clean, fast development experience with hot module replacement (HMR), modern ESLint rules, and strict type safety.

## Tech Stack
- React
- TypeScript
- Vite
- React Router

## 🛠️ Getting Started
### 1. Install dependencies
```bash
npm install
````
### 2. Start the development server
```bash
npm run dev
```
The app will be available at:
`http://localhost:5173`


## Project Structure (Feature-Based)
This project follows a feature-based architecture, promoting scalability and maintainability by keeping related logic — UI, API calls, state, and styles — together in a single folder per feature. Shared functionality is organized under a separate shared/ folder.

```
src/
  features/             # Feature-specific logic and UI
    auth/               # Authentication pages, hooks, and services
    spaces/             # Space creation, joining, and listing
    spaceView/          # Folder/file management: upload, download, creation

  shared/               # App-wide reusable code
    components/         # UI components (buttons, modals, etc.)
    hooks/              # Reusable custom React hooks
    api/                # API client setup (e.g., axios instances)
    routes/             # Centralized route and path definitions
    types/              # Global TypeScript types and interfaces

  main.tsx              # App entry point
  App.tsx               # App layout and route setup
```
### Why Feature-Based?
- Encapsulation: Keeps logic for each feature in one place
- Scalability: Easier to add new features without bloating global folders
- Clarity: Quickly locate the code for a specific screen or functionality
- Reusability: Shared logic lives in clearly separated shared/ modules

## Linting & Type Checking
This project includes ESLint configured for **TypeScript-aware linting** with optional strict modes.
## To expand or enable type-aware lint rules:
Replace the recommended config:
```js
export default tseslint.config({
  extends: [
    // Use stricter type-aware rules
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

### Recommended ESLint plugins for React:
Install these for additional React rules:
```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## 🤝 Contributing

Pull requests are welcome! Before pushing changes, run:

```bash
npm run lint
```
---

## 🧑‍💻 Author

**Aasim Qureshi**
GitHub: [@Aasim-Qureshi](https://github.com/Aasim-Qureshi)

