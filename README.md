# 🔮 Altar Focus Ritual
A minimalist focus ritual app for intentional deep work sessions.

🌐 Live App: `https://altar-focus.vercel.app/`  
🚀 Local App: `http://localhost:8080/`  
🧱 Stack: TanStack Start + React + TypeScript + Tailwind CSS

---

## 🛠️ What it solves
- **Ritualized Session Start:** Turn “I should focus” into a concrete commitment by naming what you will sacrifice.
- **Timed Focus Flow:** Run a 15, 30, or 60-minute ritual session with visual progress.
- **Ephemeral Sessions:** Timer state is intentionally reset on refresh for a clean restart.
- **Completion Reflection:** Ends with a blessing/affirmation screen to reinforce consistency.

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

### 2) Run development server
```bash
npm run dev
```

### 3) Build for production
```bash
npm run build
```

---

## ⚠️ Important behavior notes
- The app uses browser `sessionStorage` for temporary in-session ritual state.
- Refreshing during a ritual intentionally resets the flow.
- No environment variables or backend services are required.

---

## 💼 Professional customization
Want to extend this into a full ritual dashboard (history analytics, streaks, auth profiles, and team focus rooms)?  
I can help you design and ship production-ready features on top of this base.

