# 🔮 Altar Focus Ritual
A minimalist focus ritual app for intentional deep work sessions.

🚀 Local App: `http://localhost:8080/`  
🧱 Stack: TanStack Start + React + TypeScript + Tailwind CSS + Supabase

---

## 🛠️ What it solves
- **Ritualized Session Start:** Turn “I should focus” into a concrete commitment by naming what you will sacrifice.
- **Timed Focus Flow:** Run a 15, 30, or 60-minute ritual session with visual progress.
- **Session Persistence:** Keeps active ritual state in `sessionStorage` so accidental refreshes are less disruptive.
- **Completion Reflection:** Ends with a blessing/affirmation screen to reinforce consistency.
- **Simple Ritual Logging:** Stores ritual records in Supabase for persistence and future analytics.

---

## ✨ Core experience
1. Enter what you are sacrificing (e.g., “TikTok”, “Slack”, “the news”).
2. Choose duration: **15 / 30 / 60** minutes.
3. Click **Begin Ritual**.
4. Stay in the focus screen while progress advances.
5. On completion, receive an affirmation and summary.

---

## 📦 Project setup
### 1) Clone and install
```bash
git clone <your-repo-url>
cd altar-focus
npm install
```

### 2) Configure environment variables
Create a `.env` file in project root:

```env
SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_ANON_KEY"
VITE_SUPABASE_PROJECT_ID="YOUR_PROJECT_REF"
```

### 3) Run development server
```bash
npm run dev
```

### 4) Build for production
```bash
npm run build
```

---

## 🗄️ Supabase schema notes
The app expects a `public.rituals` table with fields like:
- `id` (UUID, primary key)
- `sacrifice_text` (TEXT)
- `duration` (INTEGER)
- `completed_status` (BOOLEAN)
- `created_at` / `completed_at` (TIMESTAMPTZ)

It also expects Row Level Security policies that allow:
- **INSERT** for anon/authenticated users (begin ritual)
- **UPDATE** for anon/authenticated users (complete or abandon ritual)

---

## ⚠️ Important behavior notes
- The app uses browser `sessionStorage` for active and recently completed ritual state.
- Closing the tab or opening a new browser session may clear ritual context.
- Supabase failures are logged to the browser console for debugging.

---

## 💼 Professional customization
Want to extend this into a full ritual dashboard (history analytics, streaks, auth profiles, and team focus rooms)?  
I can help you design and ship production-ready features on top of this base.

