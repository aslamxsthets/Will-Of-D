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
}

function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `CLUB-${year}-${random}`;
}

export async function submitRecruitmentForm(data: FormData): Promise<FormSubmissionResult> {
  const endpoint = import.meta.env.VITE_RECRUITMENT_FORM_ENDPOINT as string | undefined;

  if (!endpoint) {
    return {
      success: false,
      error: 'Form submission is not configured. Please contact the crew administrators.',
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        interests: data.interests.join(', '),
        availableDays: data.availableDays.join(', '),
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const referenceId = generateReferenceId();

    return {
      success: true,
      referenceId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    
    if (import.meta.env.DEV) {
      console.error('Form submission failed:', message);
    }

    return {
      success: false,
      error: 'Failed to submit application. Please check your connection and try again.',
    };
  }
}
