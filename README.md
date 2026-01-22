Alright — **full drip mode activated** 😎🔥
Here’s a **next-level README** with **badges, marketing polish, clean UX language, and open-source vibes**.

---

# 🏨 Booking App

⚠️ Please, make sure the volume of your speakers is not too loud 🚀

![loud](./loud.jpeg)

### *A sleek, zero-backend booking experience powered by Nuxt 3*

![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxtdotjs\&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js\&logoColor=white)
![Static](https://img.shields.io/badge/SSG-Static%20Site-blue)
![GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-black?logo=github)
![LocalStorage](https://img.shields.io/badge/Data-Local%20Storage-orange)

> ⚡ A modern **Booking App** built with **Nuxt 3**, optimized for **static deployment** and rapid iteration.
> 💾 **User creation and app state are persisted in browser Local Storage**, so no backend is required.

---

## ✨ Why This App?

This project is designed to be:

* 🚀 **Fast** — static site generation (SSG)
* 🧠 **Simple** — no server, no database
* 🧩 **Hackable** — easy to extend or refactor
* 🌍 **Deployable anywhere** — GitHub Pages ready
* 🧪 **Perfect for demos & prototypes**

---

## 🧠 Core Features

* ✅ Nuxt 3 + Vue 3
* 💾 User creation saved in **Local Storage**
* 🔄 Persistent state across page reloads
* 📦 Static Site Generation (SSG)
* 🌐 GitHub Pages deployment
* 🛠 Clean developer setup

> ⚠️ Clearing browser storage will reset all users and bookings.

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

For Nuxt fundamentals, check the official docs:
👉 [https://nuxt.com/docs/getting-started/introduction](https://nuxt.com/docs/getting-started/introduction)

---

## 🌐 Deploying to GitHub Pages

This setup follows the approach from:
👉 [https://github.com/lucpotage/nuxt-github-pages](https://github.com/lucpotage/nuxt-github-pages)

### 🧾 Steps

1. Install the deploy helper:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Add a deploy script to `package.json`:

   ```json
   "deploy": "gh-pages -d dist"
   ```

3. Configure Nuxt for GitHub Pages:

   ```ts
   export default defineNuxtConfig({
     app: {
       baseURL: '/booking/', // repository name
       buildAssetsDir: 'assets', // must NOT start with "_"
     }
   })
   ```

4. Disable Jekyll:

   ```bash
   touch .nojekyll
   ```

5. Generate the static site:

   ```bash
   npm run generate
   ```

6. Deploy 🚀:

   ```bash
   npm run deploy
   ```

---

## 🧪 Development Pitfalls & Fixes

### ⚠️ Broken HMR (Hot Module Replacement)

At some point, HMR may completely break, making development painful or impossible.
This appears to be a **Nuxt / Nuxi edge-case bug**.

🔗 Related issue: [https://github.com/nuxt/nuxt/issues/25335](https://github.com/nuxt/nuxt/issues/25335)

### ✅ Fix: Disable Vite HMR

Add an alternative dev script:

```json
"dev2": "export NUXI_DISABLE_VITE_HMR=1 && nuxi dev"
```

Run with:

```bash
npm run dev2
```

🧘‍♂️ Sanity restored.

---

## 💾 Data Model (No Backend)

* 👤 Users are created client-side
* 💾 Stored in **browser Local Storage**
* 🔄 Automatically restored on refresh
* 🚫 No server, no database, no API

**Perfect for:**

* UI/UX demos
* Technical challenges
* MVPs
* Interviews
* Learning Nuxt 3

---

## 🛣 Roadmap

* 🤖 GitHub Actions deployment workflow
* 🧪 Automated tests
* 🎨 UI polish & animations
* 🧠 Optional backend integration

For more deployment strategies:
👉 [https://nuxt.com/docs/getting-started/deployment](https://nuxt.com/docs/getting-started/deployment)

---

## 🧑‍💻 Author Notes

This project intentionally favors **clarity over complexity**.
It’s meant to be read, modified, and extended — not over-engineered.

If you fork it, break it, or improve it — mission accomplished 🚀
