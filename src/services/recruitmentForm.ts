import { createClient } from '@supabase/supabase-js';

export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  yearOfStudy: string;
  studentId: string;
  interests: string[];
  skills: string;
  experience: string;
  projects: string;
  certifications: string;
  github: string;
  linkedin: string;
  portfolio: string;
  motivation: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  agreement: boolean;
}

export interface FormSubmissionResult {
  success: boolean;
  referenceId?: string;
  error?: string;
  savedLocally?: boolean;
}

const DRAFT_KEY = 'deadpool_crew_draft';
const SUBMISSIONS_KEY = 'deadpool_crew_submissions';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  supabaseKey
);

function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CLUB-${year}-${random}`;
}

/** Persist a draft so the user never loses their progress on a page refresh. */
export function saveDraft(data: Partial<FormData>): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

/** Retrieve a previously saved draft, or null if none exists. */
export function loadDraft(): Partial<FormData> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Partial<FormData>) : null;
  } catch {
    return null;
  }
}

/** Delete the draft after a successful submission. */
export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // noop
  }
}

/**
 * Submit the recruitment form to Supabase.
 *
 * If Supabase is unavailable, the app falls back to localStorage so the user
 * will not lose their application data.
 */
export async function submitRecruitmentForm(data: FormData): Promise<FormSubmissionResult> {
  const referenceId = generateReferenceId();

  try {
    const { error } = await supabase.from('applications').insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      department: data.department,
      year_of_study: data.yearOfStudy,
      student_id: data.studentId,
      interests: data.interests.join(', '),
      skills: data.skills,
      experience: data.experience,
      projects: data.projects,
      certifications: data.certifications,
      github: data.github,
      linkedin: data.linkedin,
      portfolio: data.portfolio,
      motivation: data.motivation,
      available_days: data.availableDays.join(', '),
      start_time: data.startTime,
      end_time: data.endTime,
      agreement: data.agreement,
      reference_id: referenceId,
      submitted_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    clearDraft();
    return { success: true, referenceId };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Supabase insert failed, falling back to localStorage:', error);
    }

    try {
      const stored = localStorage.getItem(SUBMISSIONS_KEY);
      const submissions: object[] = stored ? JSON.parse(stored) : [];
      submissions.push({
        ...data,
        referenceId,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
      clearDraft();
      return { success: true, referenceId, savedLocally: true };
    } catch {
      return {
        success: false,
        error:
          'Unable to save your application. Please try again or contact crew administrators directly.',
      };
    }
  }
}
