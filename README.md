# 🔥 URJA (ऊर्जा) — Production Anti-Masturbation & Self-Discipline App

> **"Your Energy. Your Power. Your Control."**  
> A high-conversion, production-ready PWA & Web Application engineered specifically for Indian youth seeking brahmacharya, neuroplastic reset, habit mastery, and disciplined energy transmutation.

---

## 🚀 Live Production Features Built

### 1. ⚡ Dynamic Streak Tracker & Leveling Engine
- **Visual Circular Progress**: Real-time counter with glowing flame physics and status ranks (Seedling, Warrior, Fighter, Champion, Hero, Legend, Master, Grandmaster, Brahmacharya Master).
- **Daily Check-In & XP Accumulation**: Daily check-in granting +50 XP and automatic level-ups based on quadratic progression.
- **Honest Relapse Reflection Modal**: Guilt-free, constructive relapse tracking logging triggers (stress, late night, boredom) and personal reflections.

### 2. 🚨 SOS Emergency Urge Shield (`/sos`)
- **4-7-8 Deep Pranayama Breathing Circle**: Animated breathing indicator (4s Inhale, 7s Hold, 8s Exhale) over 5 complete rounds to recalibrate the autonomic nervous system.
- **Cold Shower Protocol**: 3-minute guided timer for immediate dopamine reset.
- **Physical Exertion Counter**: Immediate 20 push-up distraction trigger.
- **15-Minute Urge Delay Stopwatch**: Scientific time-delaying tool that defeats transient dopamine spikes.
- **Urge Defeated Rewards**: Logging successful resistances to database and awarding +100 XP.

### 3. 🤝 Anonymous Peer Community (`/community`)
- **Anonymous Posting**: Safe space to share vulnerabilities and successes without fear of judgment.
- **Category Filter Tabs**: Success stories 🏆, Struggles 💪, Motivation 🔥, Questions ❓, Advice 💡.
- **Interactive Likes & Threaded Replies**: Instant community encouragement and mutual accountability.

### 4. 🧠 Neuroplasticity & Brahmacharya Academy (`/learn`)
- Curated, high-retention long-form guides blending modern neuroscience (androgen receptor sensitivity, dopamine downregulation) and Vedic philosophy:
  - *What NoFap Actually Does to Your Brain*
  - *Brahmacharya: Ancient Wisdom for Modern Times (Swami Vivekananda & Ojas)*
  - *7 Science-Backed Benefits of Abstinence (Testosterone Spike & Receptor Upregulation)*
  - *The 5 Predictable Relapse Triggers & Disarming Strategies*
  - *Cold Shower — The #1 Anti-Urge Tool*

### 5. 📖 Daily Mindfulness Journal (`/journal`)
- **Sliders for Key Bio-Metrics**: Mood (1-10), Energy (1-10), Focus (1-10) with reactive emojis.
- **Morning Intention & Gratitude Prompts**: Goal-setting for mental clarity.
- **Evening Reflection**: Automatically adapts to evening mode after 5 PM.
- **Past History Archive**: Expandable review of the past 7 days of growth.

### 6. 🏆 Gamified Badges & Achievements (`/achievements`)
- 10 structured milestone badges with tiered rarities (Common, Rare, Epic, Legendary):
  - *First Day*, *3-Day Warrior*, *One Week Strong*, *Two Week Champion*, *21-Day Transformer*, *One Month Legend*, *Brahmacharya Master (90 Days)*, *Journal Keeper*, *Community Pillar*, *Urge Slayer*.

### 7. 👑 Global & Weekly Leaderboard (`/leaderboard`)
- Top-3 podium layout (Gold 👑, Silver 🥈, Bronze 🥉) with user streak highlighting and anonymous alias support.

### 8. 👤 Profile & Customization (`/profile`)
- Bilingual toggle (**English / हिंदी**), Anonymous Mode toggle, bio editing, and journey summary stats.

### 9. 📱 Progressive Web App (PWA)
- Standalone app feel, web app manifest (`manifest.json`), service worker (`sw.js`) for offline caching, and crisp app icons generated for all mobile screen densities (72x72 to 512x512).

---

## 🛠️ Tech Architecture

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Glassmorphism Design Tokens
- **Database & Auth**: Supabase (PostgreSQL with Row Level Security & Cascading Triggers)
- **Icons**: Lucide React
- **PWA**: Custom Service Worker + Web App Manifest

---

## 🗄️ Database Setup (Supabase)

1. Create a free project on [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` in this repo, copy its contents, paste them into the SQL editor, and click **Run**.
4. That creates all tables (`profiles`, `streaks`, `relapses`, `journals`, `posts`, `replies`, `post_likes`, `achievements`, `user_achievements`, `urge_logs`, `tips`), enables Row Level Security (RLS) policies, and populates seed data.

---

## ⚙️ Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🏃 Running & Building

```bash
# Run development server
npm run dev

# Run production build
npm run build

# Start production server
npm start
```

---

## 💰 Monetization & GTM Strategy for Indian Market

1. **Freemium Core**: Keep basic streak counter, SOS, and community free to build a massive funnel.
2. **Urja Pro (₹99 - ₹199 / month or ₹999 lifetime)**:
   - Unlock 1-on-1 accountability buddy matching.
   - Advanced streak analytics & relapse prevention AI analysis.
   - Guided audio meditations & Brahmacharya masterclasses.
3. **Distribution Channels**:
   - Partner with Indian self-improvement, fitness, and UPSC/JEE preparation YouTubers.
   - Target Reddit communities (r/NoFap, r/Indian_Academia, r/IndiaSpeaks).
   - Leverage WhatsApp & Telegram community groups for retention.
