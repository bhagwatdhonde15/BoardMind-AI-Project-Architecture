-- BoardMind AI Database Schema for Supabase
-- Full database structure for students, board curriculum, questions, attempts, and topic mastery.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Boards Table
CREATE TABLE IF NOT EXISTS public.boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Classes Table
CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  class_number INT NOT NULL UNIQUE
);

-- 3. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE,
  class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  UNIQUE(board_id, class_id, name)
);

-- 4. Chapters Table
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  chapter_number INT NOT NULL,
  UNIQUE(subject_id, chapter_number)
);

-- 5. Study Materials Table
CREATE TABLE IF NOT EXISTS public.study_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'TEXT', -- TEXT | PDF | NOTES
  file_url TEXT,
  content_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Users / Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  board_id UUID REFERENCES public.boards(id),
  class_id UUID REFERENCES public.classes(id),
  target_score INT DEFAULT 95,
  streak_days INT DEFAULT 5,
  overall_progress NUMERIC DEFAULT 66,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Questions Table
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL, -- MCQ | SHORT_ANSWER | LONG_ANSWER | CASE_STUDY
  difficulty TEXT NOT NULL, -- EASY | MEDIUM | HARD | BOARD_STANDARD
  options JSONB, -- For MCQs: ["A", "B", "C", "D"]
  correct_answer TEXT NOT NULL,
  sample_answer TEXT,
  marking_scheme JSONB,
  explanation TEXT NOT NULL,
  marks INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Quizzes Table
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id),
  title TEXT NOT NULL,
  quiz_type TEXT NOT NULL, -- ADAPTIVE | GENERATOR | FIX_WEAKNESS | MOCK_EXAM
  question_count INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  score NUMERIC DEFAULT 0,
  max_score NUMERIC DEFAULT 0,
  accuracy NUMERIC DEFAULT 0,
  time_taken_seconds INT DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Answers Table
CREATE TABLE IF NOT EXISTS public.answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  selected_option TEXT,
  answer_text TEXT,
  is_correct BOOLEAN NOT NULL,
  marks_obtained NUMERIC DEFAULT 0,
  max_marks NUMERIC DEFAULT 1,
  time_taken_seconds INT DEFAULT 0,
  mistake_type TEXT -- Formula Error | Calculation Error | Conceptual Gap | Sign Error
);

-- 11. Topic Performance Table (Mastery Scores per Student per Topic)
CREATE TABLE IF NOT EXISTS public.topic_performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  mastery_score NUMERIC NOT NULL DEFAULT 50, -- 0 to 100 percentage
  total_attempted INT DEFAULT 0,
  total_correct INT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'MODERATE', -- WEAK | MODERATE | STRONG
  last_evaluated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject_id, topic_name)
);

-- 12. Mistakes Notebook Table
CREATE TABLE IF NOT EXISTS public.mistakes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  attempt_id UUID REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
  submitted_answer TEXT,
  mistake_type TEXT NOT NULL,
  mistake_reason TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Study Plans Table
CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  schedule_json JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  badge_icon TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS Policies on all public tables
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Read policies for curriculum tables
CREATE POLICY "Public boards read" ON public.boards FOR SELECT USING (true);
CREATE POLICY "Public classes read" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public subjects read" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public chapters read" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Public questions read" ON public.questions FOR SELECT USING (true);

-- User specific RLS policies
CREATE POLICY "Users access own profile" ON public.users FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users access own quizzes" ON public.quizzes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own attempts" ON public.quiz_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own answers" ON public.answers FOR ALL USING (EXISTS (SELECT 1 FROM public.quiz_attempts WHERE id = attempt_id AND user_id = auth.uid()));
CREATE POLICY "Users access own topic_performance" ON public.topic_performance FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own mistakes" ON public.mistakes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own study_plans" ON public.study_plans FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own achievements" ON public.achievements FOR ALL USING (auth.uid() = user_id);
