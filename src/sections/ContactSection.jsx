import { useState } from 'react';
import './ContactSection.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  countryCode: '+91',
  phone: '',
  experience: '',
  previousTreks: '',
  ownGear: '',
  nmimsStudent: '',
  message: '',
  consent: false,
};

const COUNTRY_CODES = [
  { code: '+91', label: '🇮🇳 +91' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+61', label: '🇦🇺 +61' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+65', label: '🇸🇬 +65' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+81', label: '🇯🇵 +81' },
];

export default function ContactSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    
    // Strict email format checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }

    // Phone format checking
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (form.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number.';
    }

    if (!form.experience) errs.experience = 'Please select your experience level.';
    if (!form.ownGear) errs.ownGear = 'Please let us know about your gear.';
    if (!form.nmimsStudent) errs.nmimsStudent = 'Please select an option.';
    if (!form.consent) errs.consent = 'Consent is required to submit your enquiry.';
    
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Announce to screen readers that there are errors
      const firstErrorId = `field-${Object.keys(errs)[0]}`;
      const el = document.getElementById(firstErrorId);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setApiError('');
    setErrors({});

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT;

    try {
      if (!endpoint) {
        // Safe mock simulation if no endpoint is configured
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitted(true);
      } else {
        // Real API request
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        setSubmitted(true);
      }
    } catch (error) {
      setApiError('Something went wrong submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact section" id="contact" aria-labelledby="contact-heading">
      <div className="container container--narrow">
        <p className="section-label">Get In Touch</p>
        <h2 id="contact-heading" className="section-heading">
          Enquire About the Trek
        </h2>

        {submitted ? (
          <div className="contact__success" role="status" aria-live="polite">
            <h3 className="contact__success-title">Enquiry Received</h3>
            <p className="contact__success-text">
              Thanks — we'll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            
            {apiError && (
              <div className="contact__api-error" role="alert">
                {apiError}
              </div>
            )}

            {/* Full Name */}
            <div className={`form-field ${errors.name ? 'form-field--error' : ''}`}>
              <label className="form-label" htmlFor="field-name">
                Full Name <span className="form-required" aria-label="required">*</span>
              </label>
              <input
                className="form-input"
                type="text"
                id="field-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
                disabled={isSubmitting}
              />
              {errors.name && <span className="form-error" id="err-name" role="alert">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={`form-field ${errors.email ? 'form-field--error' : ''}`}>
              <label className="form-label" htmlFor="field-email">
                Email Address <span className="form-required" aria-label="required">*</span>
              </label>
              <input
                className="form-input"
                type="email"
                id="field-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
                disabled={isSubmitting}
              />
              {errors.email && <span className="form-error" id="err-email" role="alert">{errors.email}</span>}
            </div>

            {/* Phone with country code */}
            <div className={`form-field form-field--phone ${errors.phone ? 'form-field--error' : ''}`}>
              <label className="form-label" htmlFor="field-phone">
                Phone Number <span className="form-required" aria-label="required">*</span>
              </label>
              <div className="form-phone-group">
                <select
                  className="form-input form-select form-phone-code"
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  aria-label="Country code"
                  disabled={isSubmitting}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <input
                  className="form-input form-phone-number"
                  type="tel"
                  id="field-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel-national"
                  inputMode="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                  disabled={isSubmitting}
                />
              </div>
              {errors.phone && <span className="form-error" id="err-phone" role="alert">{errors.phone}</span>}
            </div>

            {/* Trekking Experience */}
            <div className={`form-field ${errors.experience ? 'form-field--error' : ''}`}>
              <label className="form-label" htmlFor="field-experience">
                Trekking Experience <span className="form-required" aria-label="required">*</span>
              </label>
              <select
                className="form-input form-select"
                id="field-experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                aria-invalid={!!errors.experience}
                aria-describedby={errors.experience ? 'err-experience' : undefined}
                disabled={isSubmitting}
              >
                <option value="">Select your experience level</option>
                <option value="First-time trekker">First-time trekker</option>
                <option value="Some experience">Some experience (day hikes, easy treks)</option>
                <option value="Experienced">Experienced (multiple Himalayan treks)</option>
                <option value="Very experienced">Very experienced (high-altitude/technical treks)</option>
              </select>
              {errors.experience && <span className="form-error" id="err-experience" role="alert">{errors.experience}</span>}
            </div>

            {/* Previous Treks */}
            <div className="form-field">
              <label className="form-label" htmlFor="field-previous-treks">
                Previous Treks <span className="form-optional">(Optional)</span>
              </label>
              <input
                className="form-input"
                type="text"
                id="field-previous-treks"
                name="previousTreks"
                value={form.previousTreks}
                onChange={handleChange}
                placeholder="e.g. Hampta Pass, Roopkund, Kedarkantha"
                disabled={isSubmitting}
              />
            </div>

            {/* Own Gear */}
            <div className={`form-field ${errors.ownGear ? 'form-field--error' : ''}`}>
              <label className="form-label" htmlFor="field-own-gear">
                Own Trekking / Camping Gear? <span className="form-required" aria-label="required">*</span>
              </label>
              <select
                className="form-input form-select"
                id="field-own-gear"
                name="ownGear"
                value={form.ownGear}
                onChange={handleChange}
                required
                aria-invalid={!!errors.ownGear}
                aria-describedby={errors.ownGear ? 'err-own-gear' : undefined}
                disabled={isSubmitting}
              >
                <option value="">Select</option>
                <option value="Yes, I have my own gear">Yes, I have my own gear</option>
                <option value="Partial — some items">Partial — some items</option>
                <option value="No, I'll need to rent/borrow">No, I'll need to rent/borrow</option>
              </select>
              {errors.ownGear && <span className="form-error" id="err-own-gear" role="alert">{errors.ownGear}</span>}
            </div>

            {/* NMIMS Student */}
            <fieldset className={`form-field form-fieldset ${errors.nmimsStudent ? 'form-field--error' : ''}`}>
              <legend className="form-label">
                Are you an NMIMS student? <span className="form-required" aria-label="required">*</span>
              </legend>
              <div className="form-radio-group">
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="nmimsStudent"
                    value="Yes"
                    checked={form.nmimsStudent === 'Yes'}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>Yes</span>
                </label>
                <label className="form-radio-label">
                  <input
                    type="radio"
                    name="nmimsStudent"
                    value="No"
                    checked={form.nmimsStudent === 'No'}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.nmimsStudent && <span className="form-error" role="alert">{errors.nmimsStudent}</span>}
            </fieldset>

            {/* Message */}
            <div className="form-field form-field--full">
              <label className="form-label" htmlFor="field-message">
                Additional Queries / Message <span className="form-optional">(Optional)</span>
              </label>
              <textarea
                className="form-input form-textarea"
                id="field-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            {/* Consent */}
            <div className={`form-field form-field--full form-field--checkbox ${errors.consent ? 'form-field--error' : ''}`}>
              <input
                className="form-checkbox"
                type="checkbox"
                id="field-consent"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                required
                aria-invalid={!!errors.consent}
                disabled={isSubmitting}
              />
              <label className="form-label form-label--checkbox" htmlFor="field-consent">
                I consent to TrailBorn collecting and storing this information to respond to my enquiry.
              </label>
              {errors.consent && <span className="form-error" role="alert">{errors.consent}</span>}
            </div>

            {/* Submit */}
            <div className="form-field form-field--full">
              <button
                className={`btn btn--primary contact__submit ${isSubmitting ? 'is-loading' : ''}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
