# 🧭 PathForge — MERN Stack Student Learning Ecosystem

PathForge is a complete, feature-rich MERN stack application designed for students. It combines the gamified learning loop of **Duolingo**, the structured learning paths of **Roadmap.sh**, and the note-taking capabilities of **Notion** into a unified student portal.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm (v7+)
- MongoDB (optional, the backend automatically falls back to an in-memory mock database if MongoDB is not running!)

### Installation & Run

1. **Install all dependencies** (for root, backend, and frontend):
   ```bash
   npm run install-all
   ```

2. **Start the application in Development Mode** (runs frontend and backend concurrently):
   ```bash
   npm run dev
   ```

   - Backend will run on: [http://localhost:5000](http://localhost:5000)
   - Frontend will run on: [http://localhost:5173](http://localhost:5173)

### Production Setup
1. Create a `.env` file in `backend/` from `backend/.env.example`.
2. Set `MONGO_URI` to your MongoDB Atlas URI and use a strong `JWT_SECRET`.
   - If Atlas SRV resolution fails, add `DNS_SERVERS=8.8.8.8,8.8.4.4` to `backend/.env`.
3. Create a `.env` file in `frontend/` from `frontend/.env.example` and update `VITE_API_BASE_URL` if the frontend is deployed separately.
4. Build the frontend and start the backend:
   ```bash
   npm run build:frontend
   npm start
   ```

---

## 🏗️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Chart.js, Lucide React
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs
- **Database**: MongoDB (with mongoose) or fallback mock in-memory DB

---

## 📂 Project Structure

```text
PathForge/
├── backend/            # Express.js backend
│   ├── config/         # DB connection & mock database configs
│   ├── controllers/    # Request handlers (auth, roadmaps, quizzes, etc.)
│   ├── data/           # Academic roadmaps & quiz seed data
│   ├── middleware/     # Auth guarding middleware
│   ├── models/         # Mongoose schemas
│   └── routes/         # Express API routes
├── frontend/           # React.js frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # React Context (Auth)
│   │   ├── pages/      # Views/Screens
│   │   └── services/   # API client services
└── package.json        # Root workspace script runner
```
