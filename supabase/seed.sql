-- Supabase Seed Data for BoardMind AI
-- Demo Board: Maharashtra HSC, Class 12, Physics
-- Topics: Electrostatics (86%), Current Electricity (73%), Capacitance (48%), Ray Optics (56%)

-- 1. Insert Maharashtra HSC Board
INSERT INTO public.boards (id, name, full_name, code)
VALUES ('b1000000-0000-0000-0000-000000000001', 'Maharashtra HSC', 'Maharashtra State Board of Secondary and Higher Secondary Education', 'MH_HSC')
ON CONFLICT (name) DO NOTHING;

-- 2. Insert Class 12
INSERT INTO public.classes (id, name, class_number)
VALUES ('c1000000-0000-0000-0000-000000000012', 'Class 12', 12)
ON CONFLICT (name) DO NOTHING;

-- 3. Insert Subject: Physics
INSERT INTO public.subjects (id, board_id, class_id, name, code)
VALUES (
  's1000000-0000-0000-0000-000000000001',
  'b1000000-0000-0000-0000-000000000001',
  'c1000000-0000-0000-0000-000000000012',
  'Physics',
  'MH_HSC_PHY_12'
)
ON CONFLICT (board_id, class_id, name) DO NOTHING;

-- 4. Insert Chapters for Maharashtra HSC Class 12 Physics
INSERT INTO public.chapters (id, subject_id, name, chapter_number)
VALUES
  ('ch100000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001', 'Electrostatics', 1),
  ('ch100000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000002', 'Current Electricity', 2),
  ('ch100000-0000-0000-0000-000000000003', 's1000000-0000-0000-0000-000000000003', 'Capacitance & Dielectrics', 3),
  ('ch100000-0000-0000-0000-000000000004', 's1000000-0000-0000-0000-000000000004', 'Ray Optics', 4)
ON CONFLICT DO NOTHING;

-- 5. Insert Questions for Maharashtra HSC Class 12 Physics
INSERT INTO public.questions (id, chapter_id, topic_name, question_text, question_type, difficulty, options, correct_answer, explanation, marks)
VALUES
  (
    'q1000000-0000-0000-0000-000000000001',
    'ch100000-0000-0000-0000-000000000001',
    'Electrostatics',
    'According to Coulomb’s Law in electrostatics, electrostatic force between two point charges is inversely proportional to:',
    'MCQ',
    'EASY',
    '["Square of distance between them", "Distance between them", "Product of charges", "Permittivity of vacuum"]'::jsonb,
    'Square of distance between them',
    'Coulomb’s law states F = (1/4πε₀) · (q1·q2 / r²), hence force is inversely proportional to r².',
    1
  ),
  (
    'q1000000-0000-0000-0000-000000000002',
    'ch100000-0000-0000-0000-000000000003',
    'Capacitance',
    'Three identical capacitors each of capacitance C are connected in series. What is the net equivalent capacitance of the combination?',
    'MCQ',
    'MEDIUM',
    '["3C", "C / 3", "C / 2", "3 / C"]'::jsonb,
    'C / 3',
    'In series combination of identical capacitors, 1/Ceq = 1/C + 1/C + 1/C = 3/C. Therefore Ceq = C/3.',
    1
  ),
  (
    'q1000000-0000-0000-0000-000000000003',
    'ch100000-0000-0000-0000-000000000004',
    'Ray Optics',
    'A convex lens has a focal length of 20 cm in air. What is the optical power of the lens in Dioptres (D)?',
    'SHORT_ANSWER',
    'MEDIUM',
    NULL,
    '+5 D',
    'Optical power P = 1 / f(in meters) = 1 / 0.20 m = +5 D.',
    2
  )
ON CONFLICT DO NOTHING;

-- 6. Demo Student Topic Performance (Required exact metrics: Electrostatics 86%, Current Electricity 73%, Capacitance 48%, Ray Optics 56%)
-- Note: Replace 'u1000000-0000-0000-0000-000000000001' with actual user id when logged in
INSERT INTO public.topic_performance (id, user_id, subject_id, topic_name, mastery_score, total_attempted, total_correct, status)
VALUES
  ('tp100000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 's1000000-0000-0000-0000-000000000001', 'Electrostatics', 86, 25, 22, 'STRONG'),
  ('tp100000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 's1000000-0000-0000-0000-000000000001', 'Current Electricity', 73, 20, 15, 'MODERATE'),
  ('tp100000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 's1000000-0000-0000-0000-000000000001', 'Capacitance', 48, 15, 7, 'WEAK'),
  ('tp100000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 's1000000-0000-0000-0000-000000000001', 'Ray Optics', 56, 18, 10, 'WEAK')
ON CONFLICT DO NOTHING;
