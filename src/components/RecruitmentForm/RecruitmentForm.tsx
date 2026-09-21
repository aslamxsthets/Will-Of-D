import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle, AlertTriangle, Save } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  submitRecruitmentForm,
  saveDraft,
  loadDraft,
  type FormData,
} from '../../services/recruitmentForm';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const INTEREST_OPTIONS = [
  "DFIR", "Penetration Testing", "Threat Hunting", "Threat Intelligence", "Malware Analysis", 
  "Web Application Security", "Detection Engineering", "Exploit Development", "Digital Forensics", 
  "Digital Signature Security", "Others",
];

const DAY_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const EMPTY_FORM: FormData = {
  fullName: '', email: '', phone: '', department: '', yearOfStudy: '',
  studentId: '', interests: [], skills: '', experience: '', projects: '',
  certifications: '', github: '', linkedin: '', portfolio: '',
  motivation: '', availableDays: [], startTime: '', endTime: '', agreement: false,
};

interface FormErrors {
  [key: string]: string;
}

function fireConfetti() {
  // Burst from the centre-top of the viewport in Deadpool red + white
  const common = { spread: 100, startVelocity: 45, gravity: 0.9 };
  confetti({ ...common, particleCount: 80, origin: { x: 0.35, y: 0.55 }, colors: ['#c41e2a', '#ffffff', '#ffcc00'] });
  confetti({ ...common, particleCount: 80, origin: { x: 0.65, y: 0.55 }, colors: ['#c41e2a', '#ffffff', '#ffcc00'] });
}

export default function RecruitmentForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [referenceId, setReferenceId] = useState<string>('');
  const [savedLocally, setSavedLocally] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Focus the status heading when it mounts so screen-reader / keyboard users
  // are informed immediately of the outcome.
  const statusHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusHeadingRef.current?.focus();
    }
  }, [status]);

  // Initialise form — restore a previously saved draft if one exists
  const [formData, setFormData] = useState<FormData>(() => {
    const draft = loadDraft();
    if (!draft) return EMPTY_FORM;
    return { ...EMPTY_FORM, ...draft };
  });

  // Auto-save draft to localStorage ~1 s after the user stops typing
  useEffect(() => {
    if (draftTimer.current) clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      saveDraft(formData);
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2000);
    }, 1000);
    return () => {
      if (draftTimer.current) clearTimeout(draftTimer.current);
    };
  }, [formData]);

  const validateField = useCallback((name: string, value: string | string[] | boolean): string => {
    switch (name) {
      case 'fullName':
        return !value || (typeof value === 'string' && value.trim().length < 2) ? 'Full name is required' : '';
      case 'email':
        if (!value) return 'Email is required';
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        if (typeof value === 'string' && !/^[\d+\-\s()]{7,15}$/.test(value)) return 'Please enter a valid phone number';
        return '';
      case 'department':
        return !value ? 'Department is required' : '';
      case 'yearOfStudy':
        return !value ? 'Year of study is required' : '';
      case 'studentId':
        return !value ? 'Student ID is required' : '';
      case 'interests':
        return !value || (Array.isArray(value) && value.length === 0) ? 'Select at least one interest' : '';
      case 'github':
      case 'linkedin':
      case 'portfolio':
        if (value && typeof value === 'string' && value.length > 0) {
          try { new URL(value); } catch { return 'Please enter a valid URL'; }
        }
        return '';
      case 'motivation':
        if (typeof value === 'string' && value.length > 500) return 'Maximum 500 characters';
        return '';
      case 'availableDays':
        return !value || (Array.isArray(value) && value.length === 0) ? 'Select at least one day' : '';
      case 'startTime':
        return !value ? 'Start time is required' : '';
      case 'endTime':
        return !value ? 'End time is required' : '';
      case 'agreement':
        return !value ? 'You must agree to continue' : '';
      default:
        return '';
    }
  }, []);

  const handleChange = (name: string, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched.has(name)) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => new Set(prev).add(name));
    const value = formData[name as keyof FormData];
    const error = validateField(name, value as string | string[] | boolean);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    handleChange('interests', newInterests);
  };

  const handleDayToggle = (day: string) => {
    const newDays = formData.availableDays.includes(day)
      ? formData.availableDays.filter(d => d !== day)
      : [...formData.availableDays, day];
    handleChange('availableDays', newDays);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const allFields = Object.keys(formData) as (keyof FormData)[];
    const allTouched = new Set<string>();

    for (const field of allFields) {
      allTouched.add(field);
      const error = validateField(field, formData[field] as string | string[] | boolean);
      if (error) newErrors[field] = error;
    }

    setTouched(allTouched);
    setErrors(newErrors);
    setSubmitAttempted(true);

    const firstInvalid = allFields.find((field) => newErrors[field]);
    if (firstInvalid) {
      const control = document.getElementById(String(firstInvalid));
      if (control) {
        control.focus();
        control.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setStatus('submitting');

    const result = await submitRecruitmentForm(formData);

    if (result.success) {
      setStatus('success');
      setReferenceId(result.referenceId || '');
      setSavedLocally(result.savedLocally ?? false);
      fireConfetti();
    } else {
      setStatus('error');
    }
  };

  const handleRetry = () => setStatus('idle');

  const resetForm = () => {
    setStatus('idle');
    setFormData(EMPTY_FORM);
    setErrors({});
    setTouched(new Set());
    setSubmitAttempted(false);
    setSavedLocally(false);
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto" role="status" aria-live="polite">
        <div className="comic-panel p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-[3px] border-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" aria-hidden="true" />
          </div>
          <h3
            ref={statusHeadingRef}
            tabIndex={-1}
            className="comic-heading text-2xl md:text-3xl text-comic-red mb-4"
          >
            APPLICATION RECEIVED!
          </h3>
          <p className="text-white/80 font-[var(--font-comic-body)] text-base md:text-lg mb-6 leading-relaxed">
            Well, look at you. Your application has officially entered the system.
            Our community will review it and get back to you. Until then — stay curious. Stay ready.
          </p>
          {referenceId && (
            <div className="mb-6">
              <div className="comic-caption text-sm">
                REFERENCE: {referenceId}
              </div>
              {savedLocally && (
                <p className="text-yellow-400/80 text-xs mt-2 font-[var(--font-comic-body)]">
                  ⚠️ Saved locally in your browser (no live endpoint configured). Admins can
                  retrieve submissions from localStorage key <code>deadpool_crew_submissions</code>.
                </p>
              )}
            </div>
          )}
          <button onClick={resetForm} className="comic-btn comic-btn-outline text-sm">
            SUBMIT ANOTHER
          </button>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="max-w-2xl mx-auto" role="alert">
        <div className="comic-panel p-8 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-[3px] border-comic-red rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-comic-red" aria-hidden="true" />
          </div>
          <h3
            ref={statusHeadingRef}
            tabIndex={-1}
            className="comic-heading text-2xl md:text-3xl text-comic-red mb-4"
          >
            SOMETHING WENT WRONG.
          </h3>
          <p className="text-white/80 font-[var(--font-comic-body)] text-base md:text-lg mb-6">
            Looks like the mission encountered a complication. Your draft is still saved locally.
          </p>
          <button onClick={handleRetry} className="comic-btn">RETRY</button>
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-3xl mx-auto space-y-8"
      aria-busy={status === 'submitting'}
    >
      {/* Draft-saved toast */}
      {draftSaved && (
        <div
          className="flex items-center gap-2 text-xs text-white/50 justify-end"
          aria-live="polite"
          role="status"
        >
          <Save className="w-3 h-3" aria-hidden="true" />
          Draft saved
        </div>
      )}

      {/* Error summary */}
      {submitAttempted && errorCount > 0 && (
        <div className="comic-caption text-sm" role="alert">
          Please fix the {errorCount} highlighted field{errorCount > 1 ? 's' : ''} below.
        </div>
      )}

      {/* Personal Information */}
      <fieldset className="comic-panel p-6 md:p-8">
        <legend className="text-lg font-[var(--font-comic-display)] text-comic-red tracking-wider px-2">
          PERSONAL INFORMATION
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} error={touched.has('fullName') ? errors.fullName : ''} required placeholder="Your full name" />
          <FormField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={touched.has('email') ? errors.email : ''} required placeholder="your@email.com" />
          <FormField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} onBlur={handleBlur} error={touched.has('phone') ? errors.phone : ''} required placeholder="+91 98765 43210" />
          <FormField label="Department" name="department" value={formData.department} onChange={handleChange} onBlur={handleBlur} error={touched.has('department') ? errors.department : ''} required placeholder="e.g., B.Tech Cybersecurity" />
          <FormField label="Year of Study" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} onBlur={handleBlur} error={touched.has('yearOfStudy') ? errors.yearOfStudy : ''} required placeholder="e.g., 2nd Year" />
          <FormField label="Student ID / Roll Number" name="studentId" value={formData.studentId} onChange={handleChange} onBlur={handleBlur} error={touched.has('studentId') ? errors.studentId : ''} required placeholder="Your student ID" />
        </div>
      </fieldset>

      {/* Interests */}
      <fieldset className="comic-panel p-6 md:p-8">
        <legend className="text-lg font-[var(--font-comic-display)] text-comic-red tracking-wider px-2">
          INTERESTS
        </legend>
        <p className="text-white/60 text-sm mb-4">Select all that apply (at least one required)</p>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => handleInterestToggle(interest)}
              className={`px-3 py-2 text-sm font-medium border-2 transition-all ${
                formData.interests.includes(interest)
                  ? 'border-comic-red bg-comic-red text-white'
                  : 'border-white/30 text-white/70 hover:border-white/60'
              }`}
              aria-pressed={formData.interests.includes(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
        {touched.has('interests') && errors.interests && (
          <p className="text-comic-red text-sm mt-2" role="alert">{errors.interests}</p>
        )}
      </fieldset>

      {/* Experience */}
      <fieldset className="comic-panel p-6 md:p-8">
        <legend className="text-lg font-[var(--font-comic-display)] text-comic-red tracking-wider px-2">
          EXPERIENCE
        </legend>
        <p className="text-white/60 text-sm mb-4">Optional — tell us what you've done</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Skills" name="skills" value={formData.skills} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., Python, NMap, Burp Suite, etc." />
          <FormField label="Previous Experience" name="experience" value={formData.experience} onChange={handleChange} onBlur={handleBlur} placeholder="Clubs, internships, etc." />
          <FormField label="Projects" name="projects" value={formData.projects} onChange={handleChange} onBlur={handleBlur} placeholder="Notable projects" />
          <FormField label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} onBlur={handleBlur} placeholder="Relevant certifications" />
          <FormField label="GitHub" name="github" type="url" value={formData.github} onChange={handleChange} onBlur={handleBlur} error={touched.has('github') ? errors.github : ''} placeholder="https://github.com/username" />
          <FormField label="LinkedIn" name="linkedin" type="url" value={formData.linkedin} onChange={handleChange} onBlur={handleBlur} error={touched.has('linkedin') ? errors.linkedin : ''} placeholder="https://linkedin.com/in/username" />
          <FormField label="Portfolio" name="portfolio" type="url" value={formData.portfolio} onChange={handleChange} onBlur={handleBlur} error={touched.has('portfolio') ? errors.portfolio : ''} placeholder="https://yourportfolio.com" />
        </div>
      </fieldset>

      {/* Motivation */}
      <fieldset className="comic-panel p-6 md:p-8">
        <legend className="text-lg font-[var(--font-comic-display)] text-comic-red tracking-wider px-2">
          MOTIVATION
        </legend>
        <div className="mt-4">
          <label htmlFor="motivation" className="block text-sm font-medium text-white/80 mb-2">
            What makes you want to join "Will of D" Community?
          </label>
          <textarea
            id="motivation"
            value={formData.motivation}
            onChange={(e) => handleChange('motivation', e.target.value)}
            onBlur={() => handleBlur('motivation')}
            rows={4}
            maxLength={500}
            className="comic-input resize-none"
            placeholder="Tell us why you want to be part of the community..."
          />
          <div className="flex justify-between items-center mt-1">
            {touched.has('motivation') && errors.motivation && (
              <p className="text-comic-red text-sm" role="alert">{errors.motivation}</p>
            )}
            <span className={`text-sm ml-auto ${formData.motivation.length > 450 ? 'text-comic-red' : 'text-white/50'}`}>
              {formData.motivation.length} / 500
            </span>
          </div>
        </div>
      </fieldset>

      {/* Availability */}
      <fieldset className="comic-panel p-6 md:p-8">
        <legend className="text-lg font-[var(--font-comic-display)] text-comic-red tracking-wider px-2">
          AVAILABILITY
        </legend>
        <div className="mt-4">
          <p className="text-sm text-white/80 mb-3">Select available days:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {DAY_OPTIONS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-2 text-sm font-medium border-2 transition-all ${
                  formData.availableDays.includes(day)
                    ? 'border-comic-red bg-comic-red text-white'
                    : 'border-white/30 text-white/70 hover:border-white/60'
                }`}
                aria-pressed={formData.availableDays.includes(day)}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
          {touched.has('availableDays') && errors.availableDays && (
            <p className="text-comic-red text-sm mb-3" role="alert">{errors.availableDays}</p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm text-white/80 mb-1">Start Time</label>
              <input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleChange('startTime', e.target.value)}
                onBlur={() => handleBlur('startTime')}
                className="comic-input"
                required
              />
              {touched.has('startTime') && errors.startTime && (
                <p className="text-comic-red text-xs mt-1" role="alert">{errors.startTime}</p>
              )}
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm text-white/80 mb-1">End Time</label>
              <input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleChange('endTime', e.target.value)}
                onBlur={() => handleBlur('endTime')}
                className="comic-input"
                required
              />
              {touched.has('endTime') && errors.endTime && (
                <p className="text-comic-red text-xs mt-1" role="alert">{errors.endTime}</p>
              )}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Agreement */}
      <fieldset className="comic-panel p-6 md:p-8">
        <div className="flex items-start gap-3">
          <input
            id="agreement"
            type="checkbox"
            checked={formData.agreement}
            onChange={(e) => handleChange('agreement', e.target.checked)}
            onBlur={() => handleBlur('agreement')}
            className="mt-1 w-5 h-5 accent-comic-red border-2 border-white/30"
            required
          />
          <label htmlFor="agreement" className="text-sm text-white/80 leading-relaxed">
            I confirm that the information provided above is accurate and I consent to its use
            for the club's recruitment and selection process.
          </label>
        </div>
        {touched.has('agreement') && errors.agreement && (
          <p className="text-comic-red text-sm mt-2" role="alert">{errors.agreement}</p>
        )}
      </fieldset>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="comic-btn text-lg px-12"
        >
          {status === 'submitting' ? 'PROCESSING APPLICATION...' : 'SUBMIT APPLICATION'}
        </button>
        <p className="text-white/55 text-xs mt-3 font-[var(--font-comic-body)]">
          Fields marked <span className="text-comic-red">*</span> are required.
        </p>
      </div>
    </form>
  );
}

// ── Reusable form field ──────────────────────────────────────────────────────
interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

function FormField({ label, name, value, onChange, onBlur, error, required, type = 'text', placeholder }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white/80 mb-1">
        {label} {required && <span className="text-comic-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        className={`comic-input ${error ? 'comic-input-error' : ''}`}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-comic-red text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
