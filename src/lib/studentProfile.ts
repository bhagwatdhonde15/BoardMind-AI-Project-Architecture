'use client';

export interface StudentProfile {
  name: string;
  board: string;
  classLevel: string;
  targetScore: number;
  streakDays: number;
  overallProgress: number;
  email: string;
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: 'Student',
  board: 'CBSE',
  classLevel: 'Class 12',
  targetScore: 95,
  streakDays: 1,
  overallProgress: 68,
  email: 'student@boardmind.ai',
};

const STORAGE_KEY = 'boardmind_student_profile';

export function getStudentProfile(): StudentProfile {
  if (typeof window === 'undefined') {
    return DEFAULT_STUDENT_PROFILE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STUDENT_PROFILE;
    return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STUDENT_PROFILE;
  }
}

export function saveStudentProfile(profile: Partial<StudentProfile>): StudentProfile {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_STUDENT_PROFILE, ...profile };
  }

  try {
    const current = getStudentProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  } catch {
    return { ...DEFAULT_STUDENT_PROFILE, ...profile };
  }
}
