# BoardMind AI — Project Architecture & Learning Platform

BoardMind AI is a competition-grade, student-centered AI coaching and examination platform designed for Indian Board exams (CBSE, ICSE, Maharashtra HSC, and State Boards).

---

## Key Features

1. **Saturday (S.A.T) AI Voice Tutor & Doubt Solver**
   - High-speed voice interaction powered by Groq (`openai/gpt-oss-120b`).
   - Generates dedicated audio speech responses, step-by-step mark breakdown explanations, key formulas, and official board examiner tips.

2. **Adaptive Quiz Engine**
   - Real-time diagnostic loop adapting question difficulty and topics dynamically based on student response accuracy.

3. **Targeted Weakness Remediation ("Fix My Weakness")**
   - Automatically isolates subtopics with mastery scores under 60% and generates focused remedial drills.

4. **Descriptive AI Examiner**
   - Step-by-step marking evaluating formula derivation, reasoning, keywords, and SI units against official board marking schemes.

5. **Timed Board Mock Exam with Smart Proctoring**
   - Full-length simulated board examinations.
   - **Privacy Guard:** Camera, screen sharing, and fullscreen lock activate **strictly upon clicking "Start Timed Mock Exam"** and shut down immediately on test submission.

6. **Google Student Authentication**
   - One-click Google sign-in and account linking for seamless cross-device profile and progress synchronization.

7. **My Mistakes Notebook & Visual Analytics**
   - Categorized error logs (concept, formula, calculation, unit, misreading errors) with spaced-repetition retry.
   - Topic mastery radar chart and board readiness scoring index.

---

## Design System

- **Color Palette (Friendly & Student-Centered):**
  - **Primary Orange (`#EA580C`):** CTAs, active highlights, logos, and voice pulses.
  - **Warm Cream (`#FFF7ED`):** Canvas background and soft card surfaces.
  - **Balanced Teal (`#0F766E`):** Secondary metrics, badges, and progress indicators.
  - **Readable Slate (`#334155`):** Text typography and structural borders.
- **Visuals:** Zero AI-generated images or emojis. Built entirely with scalable vector SVGs (Lucide Icons).

---

## Tech Stack

- **Framework:** Next.js (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS
- **AI Engines:** Groq API (`openai/gpt-oss-120b`), Google Gemini API (`gemini-2.5-flash`)
- **Database / Auth:** Supabase (`@supabase/ssr`)
- **Data Visualizations:** Recharts
- **Icons:** Lucide React

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/bhagwatdhonde15/BoardMind-AI-Project-Architecture.git
cd BoardMind-AI-Project-Architecture
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
