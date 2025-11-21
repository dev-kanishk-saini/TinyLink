Absolutely — here’s a clean, professional **README.md** written specifically for your project **TinyLink**.
You can copy-paste this directly into your repo.
If you want badges, branding, or images later, I can help add those too.

---

# 📎 TinyLink — URL Shortener with Analytics

TinyLink is a full-stack URL shortening platform that allows users to generate short links, track clicks, view access history, and manage their links through a modern minimal UI.

It includes:

* 🔗 Custom short URLs
* 📊 Click tracking & timestamp logs
* 🗑 Link management (copy, delete, stats)
* 🚀 Full-stack application with frontend + backend + PostgreSQL database

---

## 🔧 Tech Stack

| Layer    | Technology                                               |
| -------- | -------------------------------------------------------- |
| Frontend | Next.js (App Router), React, Tailwind CSS                |
| Backend  | Node.js, Express.js                                      |
| Database | PostgreSQL                                               |
| Hosting  | (Backend: Render), (Frontend: Vercel / Railway / Render) |
| Other    | CORS, Environment Config, REST API                       |

---

## 📁 Project Structure

```
TinyLink/
│
├── client/              # Next.js frontend
│   ├── app/             # Routes + UI
│   ├── components/      # Reusable UI components
│   ├── public/          # Static assets
│   └── ...              
│
├── server/              # Express API backend
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── db/          # Database logic (PostgreSQL)
│   │   └── app.js       # Express server config
│   └── index.js         # Server entry file
│
├── sql/                 # Database schema and optional seed files
│
└── README.md
```

---

## 🚀 Features

* 🔥 Shorten any long URL within a single click
* ✨ Optional custom short code support
* 📡 Auto redirect when visiting the short link
* 📈 Analytics including:

  * Total clicks
  * Last accessed timestamp
* ⏱ Optimized UI table with copy-to-clipboard, open, delete, and stats actions
* 🌓 Modern dark UI built with Tailwind & ShadCN-style components

---

## 🛠 Installation & Setup

> Prerequisites:
> ✔ Node.js
> ✔ PostgreSQL

---

### 1️⃣ Clone the repo

```sh
git clone https://github.com/dev-kanishk-saini/TinyLink
cd TinyLink
```

---

### 2️⃣ Backend Setup

```sh
cd server
npm install
```

Create `.env` in `/server`:

```
PORT=5000
DATABASE_URL=postgres://<username>:<password>@localhost:5432/tinylink
CORS_ORIGIN=http://localhost:3000
```

Start backend

```sh
npm start
```

---

### 3️⃣ Frontend Setup

```sh
cd ../client
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Run frontend:

```sh
npm run dev
```

---



## 📌 Roadmap (Future Improvements)

* 🔐 Authentication (admin login)
* 📍 Geo-location tracking per click
* 📅 Expiring links option
* 📦 Export stats CSV
* 🧪 Test coverage (Jest, Playwright)

---

## 🤝 Contributions

Pull Requests are welcome!
If you'd like to add a feature or fix an issue, feel free to fork and submit.

---

## 📄 License

MIT License — free for personal and commercial use.

---

### ⭐ If this project helped you, consider giving it a star on GitHub!

---


## Deployed Links
Client - https://tinylink-y3yp.onrender.com
Server - https://tinylinkbackend2.onrender.com