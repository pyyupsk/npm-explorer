# 🌐 NPM Explorer

A sleek, modern web application for browsing npm package metadata and visualizing download statistics — powered by **Next.js** and **TailwindCSS**.

> ⚠️ **Disclaimer:**
> This project is _not affiliated_ with npm, Inc. All package data is fetched from the public npm registry.

## ✨ Features

- 🔍 **Search** any npm package
- 📦 **View** detailed package metadata
- 📈 **Analyze** download trends over time
- 🏷️ **Generate** customizable download badges
- 💡 **Modern UI** with a responsive, mobile-first layout
- 🌙 **Dark mode** support
- 📱 **Fully mobile-optimized** (maybe)

## 🛠 Tech Stack

| Layer               | Stack                                          |
| ------------------- | ---------------------------------------------- |
| **Framework**       | Next.js 15                                     |
| **Styling**         | TailwindCSS 4 + shadcn/ui                      |
| **State**           | TanStack Query                                 |
| **API**             | Hono + JStack                                  |
| **Deployment**      | Frontend: Vercel • Backend: Cloudflare Workers |
| **Package Manager** | Bun                                            |

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone git@github.com:pyyupsk/npm-explorer.git
   cd npm-explorer
   ```

2. **Install dependencies**:

   ```bash
   bun install
   ```

3. **Start development servers**:

   ```bash
   # Frontend
   bun run dev

   # Backend
   bun run server:dev
   ```

## 📡 API Endpoints

### 🔓 Public

- `/badge/downloads?q=<packageName>`
  → Generate a badge showing total downloads
  _Example: `/badge/downloads?q=react`_

### 🔒 Private

- `/api/og`
  → Generate OpenGraph preview images

- `/api/package/metadata`
  → Retrieve package metadata

- `/api/downloads/range`
  → Fetch download stats over a date range

## 🏷 Badge Integration

Use the badge endpoint to embed real-time npm download stats:

```md
![Downloads](https://npm.fasu.dev/badge/downloads?q=react)
```

**Customizable Parameters:**

| Param        | Description                   | Default   | Preview                                      |
| ------------ | ----------------------------- | --------- | -------------------------------------------- |
| `label`      | Custom label text             | downloads | None                                         |
| `labelColor` | Background color of the label | `#555`    | ![#555](.github/assets/color-555-circle.png) |
| `valueColor` | Background color of the value | `#4c1`    | ![#4c1](.github/assets/color-4c1-circle.png) |

**Example with custom styles**:

```md
![Downloads](https://npm.fasu.dev/badge/downloads?q=react?label=npm&labelColor=red&valueColor=blue)
```

> 💡 **Tip:**
> If your package name includes special characters, use [URL encoding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent).

## 🤝 Contributing

We welcome contributions! Here's how:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request 🎉

## 🙌 Credits

- Popular package data by [Anvaka’s dependency graph](https://gist.githubusercontent.com/anvaka/8e8fa57c7ee1350e3491/raw/b6f3ebeb34c53775eea00b489a0cea2edd9ee49c/01.most-dependent-upon.md)
- All npm data sourced from the [public npm registry](https://github.com/npm/registry)

## 📄 License

Licensed under the [MIT License](LICENSE).
