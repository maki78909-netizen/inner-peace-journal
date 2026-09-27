import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import { Logo } from '../brand/Logo';
import {
  User,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface RegistrationPageProps {
  onSuccess?: () => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ onSuccess }) => {
  const { registerUser, setScreen } = useJournal();

  const [name, setName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    whatsappNumber: false,
    email: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Simple validation helpers
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isWhatsappValid = whatsappNumber.replace(/[^0-9]/g, '').length >= 8;

  const isFormValid = isNameValid && isEmailValid && isWhatsappValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      whatsappNumber: true,
      email: true,
    });

    if (!isFormValid) {
      setSubmitError('Please fill in all required fields with valid details.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const regData = {
      name: name.trim(),
      whatsappNumber: whatsappNumber.trim(),
      email: email.trim().toLowerCase(),
      registeredAt: new Date().toISOString(),
    };

    try {
      await registerUser(regData);

      // Trigger hidden form submission to guarantee FormSubmit email delivery
      try {
        const fallbackForm = document.getElementById('formsubmit-hidden-form') as HTMLFormElement;
        if (fallbackForm) {
          fallbackForm.submit();
        }
      } catch (e) {
        // Ignored
      }

      if (onSuccess) {
        onSuccess();
      } else {
        setScreen(0); // Take to Cover Page
      }
    } catch (err) {
      console.error('Registration submission error', err);
      // Still proceed since local data is captured
      if (onSuccess) {
        onSuccess();
      } else {
        setScreen(0);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 bg-gradient-to-br from-[#f8f5ee] via-[#f1eee4] to-[#e7e3d7] selection:bg-[#D9A441]/30 selection:text-[#064A32]">
      {/* Hidden iframe & FormSubmit fallback for guaranteed email delivery */}
      <iframe name="hidden_formsubmit_iframe" id="hidden_formsubmit_iframe" className="hidden" title="hidden_frame" />
      <form
        id="formsubmit-hidden-form"
        action="https://formsubmit.co/mchatterjee69@gmail.com"
        method="POST"
        target="hidden_formsubmit_iframe"
        className="hidden"
      >
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="whatsapp" value={whatsappNumber} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="_subject" value={`New Journal Registration: ${name}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
      </form>

      {/* Main Registration Card */}
      <div className="max-w-[560px] w-full bg-white rounded-3xl shadow-2xl border-2 border-[#D9A441]/40 overflow-hidden relative">
        {/* Top Decorative Gold & Emerald Contour Header */}
        <div className="relative bg-[#064A32] text-white pt-8 pb-7 px-6 sm:px-8 text-center overflow-hidden">
          {/* Subtle curved background pattern */}
          <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none opacity-60">
            <svg viewBox="0 0 400 16" fill="none" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0 0C100 12 300 16 400 2V16H0V0Z" fill="#D9A441" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Full-fledged Logo without Border */}
            <div className="mb-3 flex justify-center">
              <img
                src="/logo.webp"
                alt="Path to Inner Peace"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>

            <span className="font-serif font-bold text-xs sm:text-sm tracking-[0.22em] text-[#D9A441] uppercase">
              PATH TO INNER PEACE
            </span>

            <h1 className="font-serif font-extrabold text-2xl sm:text-3xl text-white tracking-wide uppercase mt-1">
              Begin Your Journey
            </h1>

            <p className="text-xs sm:text-sm text-[#e0ede4] font-sans font-light max-w-sm mt-1 leading-relaxed">
              Activate your personalized 21-Day Inner Healing Journal to release, reconnect, rebuild and transform.
            </p>
          </div>
        </div>

        {/* Registration Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 bg-[#FAF8F3]">
          {submitError && (
            <div className="p-3.5 rounded-xl bg-[#fdf2f2] border border-[#f5c2c2] text-[#962e2e] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#962e2e]" />
              <span>{submitError}</span>
            </div>
          )}

          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#064A32]">
              Full Name <span className="text-[#c73838]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#064A32]/60">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                placeholder="Enter your full name"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-sans text-[#064A32] placeholder:text-gray-400 focus:outline-none transition-colors shadow-2xs ${
                  touched.name && !isNameValid
                    ? 'border-[#c73838] ring-1 ring-[#c73838]'
                    : 'border-[#d7e4d8] focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/30'
                }`}
              />
            </div>
            {touched.name && !isNameValid && (
              <p className="text-[11px] text-[#c73838] font-sans pl-1">
                Please enter your full name (at least 2 characters).
              </p>
            )}
          </div>

          {/* 2. WhatsApp Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#064A32]">
              WhatsApp Number <span className="text-[#c73838]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#064A32]/60">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, whatsappNumber: true }))}
                placeholder="+91 98765 43210 (with country code)"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-sans text-[#064A32] placeholder:text-gray-400 focus:outline-none transition-colors shadow-2xs ${
                  touched.whatsappNumber && !isWhatsappValid
                    ? 'border-[#c73838] ring-1 ring-[#c73838]'
                    : 'border-[#d7e4d8] focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/30'
                }`}
              />
            </div>
            {touched.whatsappNumber && !isWhatsappValid && (
              <p className="text-[11px] text-[#c73838] font-sans pl-1">
                Please provide a valid WhatsApp number (at least 8 digits).
              </p>
            )}
          </div>

          {/* 3. Email ID */}
          <div className="space-y-1.5">
            <label className="block text-xs font-serif font-bold uppercase tracking-wider text-[#064A32]">
              Email Address <span className="text-[#c73838]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#064A32]/60">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                placeholder="your.email@example.com"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm font-sans text-[#064A32] placeholder:text-gray-400 focus:outline-none transition-colors shadow-2xs ${
                  touched.email && !isEmailValid
                    ? 'border-[#c73838] ring-1 ring-[#c73838]'
                    : 'border-[#d7e4d8] focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/30'
                }`}
              />
            </div>
            {touched.email && !isEmailValid && (
              <p className="text-[11px] text-[#c73838] font-sans pl-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Value Proposition Highlights */}
          <div className="pt-2 pb-1 grid grid-cols-2 gap-2 text-[11px] text-[#3c594b] font-sans">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
              <span>Full 21-Day Guided Prompts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
              <span>Daily Practice & Habit Tracker</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
              <span>Personal Declaration & Milestone</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
              <span>Private & Auto-Saved</span>
            </div>
          </div>

          {/* Primary CTA: START MY JOURNEY */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D9A441] via-[#E5C578] to-[#D9A441] text-[#064A32] font-serif font-extrabold text-base sm:text-lg tracking-[0.15em] uppercase shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-3 border-2 border-white ring-4 ring-[#064A32] disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#064A32] border-t-transparent rounded-full animate-spin" />
                  <span>Activating Your Journal...</span>
                </>
              ) : (
                <>
                  <span>START MY JOURNEY</span>
                  <ArrowRight className="w-5 h-5 text-[#064A32] stroke-[2.5]" />
                </>
              )}
            </button>
          </div>

          {/* Privacy & Security Note */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#557062] text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#075B3A] shrink-0" />
            <span>Registration details are securely stored & transmitted to the journal team</span>
          </div>
        </form>
      </div>
    </div>
  );
};
