import { useState, useCallback } from 'react';
import { submitRecruitmentForm, type FormData } from '../../services/recruitmentForm';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const INTEREST_OPTIONS = [
  'Technical', 'Cybersecurity', 'Development', 'AI/ML', 'Design',
  'UI/UX', 'Media', 'Content', 'Management', 'Research', 'Other',
];

const DAY_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface FormErrors {
  [key: string]: string;
}

export default function RecruitmentForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [referenceId, setReferenceId] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    yearOfStudy: '',
    studentId: '',
    interests: [],
    skills: '',
    experience: '',
    projects: '',
    certifications: '',
    github: '',
    linkedin: '',
    portfolio: '',
    motivation: '',
    availableDays: [],
    startTime: '',
    endTime: '',
    agreement: false,
  });

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
          try {
            new URL(value);
          } catch {
            return 'Please enter a valid URL';
          }
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

  const isFormValid = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      'fullName', 'email', 'phone', 'department', 'yearOfStudy', 'studentId',
      'interests', 'availableDays', 'startTime', 'endTime', 'agreement',
    ];

    for (const field of requiredFields) {
      const error = validateField(field, formData[field] as string | string[] | boolean);
      if (error) return false;
    }

    // Check optional URL fields
    for (const field of ['github', 'linkedin', 'portfolio'] as const) {
      const error = validateField(field, formData[field]);
      if (error) return false;
    }

    // Check motivation length
    if (formData.motivation.length > 500) return false;

    return true;
  };

  const isEndpointConfigured = Boolean(import.meta.env.VITE_RECRUITMENT_FORM_ENDPOINT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
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

    if (Object.values(newErrors).some(e => e !== '')) return;

    if (!isEndpointConfigured) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    const result = await submitRecruitmentForm(formData);

    if (result.success) {
      setStatus('success');
      setReferenceId(result.referenceId || '');
    } else {
      setStatus('error');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
  };

  // Success state
  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="comic-panel p-8 md:p-12 text-center">
          <div className="text-5xl mb-6">✅</div>
          <h3 className="comic-heading text-2xl md:text-3xl text-comic-red mb-4">
            APPLICATION RECEIVED!
          </h3>
          <p className="text-white/80 font-[var(--font-comic-body)] text-base md:text-lg mb-6 leading-relaxed">
            Well, look at you. Your application has officially entered the system. 
            Our crew will review your application and get back to you with the next steps. 
            Until then... Stay curious. Stay ready.
          </p>
          {referenceId && (
            <div className="mb-6">
              <div className="comic-caption text-sm">
                REFERENCE: {referenceId}
              </div>
              <p className="text-white/40 text-xs mt-2">
                This is a local confirmation identifier for your records.
              </p>
            </div>
          )}
          <button
            onClick={() => {
              setStatus('idle');
              setFormData({
                fullName: '', email: '', phone: '', department: '', yearOfStudy: '',
                studentId: '', interests: [], skills: '', experience: '', projects: '',
                certifications: '', github: '', linkedin: '', portfolio: '',
                motivation: '', availableDays: [], startTime: '', endTime: '', agreement: false,
              });
              setErrors({});
              setTouched(new Set());
            }}
            className="comic-btn comic-btn-outline text-sm"
          >
            SUBMIT ANOTHER
          </button>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="comic-panel p-8 md:p-12 text-center">
          <div className="text-5xl mb-6">⚠️</div>
          <h3 className="comic-heading text-2xl md:text-3xl text-comic-red mb-4">
            SOMETHING WENT WRONG.
          </h3>
          <p className="text-white/80 font-[var(--font-comic-body)] text-base md:text-lg mb-6">
            {isEndpointConfigured 
              ? "Looks like the mission encountered a tiny complication."
              : "The recruitment form endpoint is not yet configured. Please set VITE_RECRUITMENT_FORM_ENDPOINT in your environment variables to enable form submissions."
            }
          </p>
          {isEndpointConfigured && (
            <button onClick={handleRetry} className="comic-btn">
              RETRY
            </button>
          )}
          {!isEndpointConfigured && (
            <div className="mt-4">
              <p className="text-white/40 text-sm font-[var(--font-comic-body)]">
                Your data has been preserved. Go back to the form once the endpoint is configured.
              </p>
              <button onClick={handleRetry} className="comic-btn comic-btn-outline text-sm mt-4">
                BACK TO FORM
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-3xl mx-auto space-y-8">
      {/* Personal Information */}
      <fieldset className="comic-panel p-6 md:p-8">
        <legend className="text-lg font-[var(--font-comic-display)] text-comic-red tracking-wider px-2">
          PERSONAL INFORMATION
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('fullName') ? errors.fullName : ''}
            required
            placeholder="Your full name"
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('email') ? errors.email : ''}
            required
            placeholder="your@email.com"
          />
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('phone') ? errors.phone : ''}
            required
            placeholder="+1 234 567 8900"
          />
          <FormField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('department') ? errors.department : ''}
            required
            placeholder="e.g., Computer Science"
          />
          <FormField
            label="Year of Study"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('yearOfStudy') ? errors.yearOfStudy : ''}
            required
            placeholder="e.g., 2nd Year"
          />
          <FormField
            label="Student ID / Roll Number"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.has('studentId') ? errors.studentId : ''}
            required
            placeholder="Your student ID"
          />
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
          <FormField label="Skills" name="skills" value={formData.skills} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., Python, React, Figma" />
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
            What makes you want to join Deadpool Crew?
          </label>
          <textarea
            id="motivation"
            value={formData.motivation}
            onChange={(e) => handleChange('motivation', e.target.value)}
            onBlur={() => handleBlur('motivation')}
            rows={4}
            maxLength={500}
            className="comic-input resize-none"
            placeholder="Tell us why you want to be part of the crew..."
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
          disabled={!isFormValid() || status === 'submitting'}
          className={`comic-btn text-lg px-12 ${
            !isFormValid() || status === 'submitting'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {status === 'submitting' ? 'PROCESSING APPLICATION...' : 'SUBMIT APPLICATION'}
        </button>
      </div>
    </form>
  );
}

// Reusable form field component
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
