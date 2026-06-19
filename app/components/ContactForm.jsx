'use client'

import { useActionState, useEffect, useRef } from 'react'
import { submitLead } from '@/lib/actions/contact'

const SERVICES = [
  'Business Cards',
  'Flyers & Brochures',
  'Books & Booklets',
  'Banners & Signage',
  'Logo & Brand Identity',
  'Social Media Design',
  'Other',
]

const initialState = { success: null, message: '' }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState)
  const formRef = useRef(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  // Show success screen instead of form
  if (state.success) {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Message Sent!</h3>
          <p className="mt-2 text-slate-500 text-sm leading-relaxed">{state.message}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-emerald-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          disabled={pending}
          className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors disabled:opacity-60 bg-white text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          disabled={pending}
          className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors disabled:opacity-60 bg-white text-slate-800 placeholder:text-slate-400"
        />
      </div>

      {/* Service selector — was the // comment */}
      <div className="relative">
        <select
          name="service"
          disabled={pending}
          defaultValue=""
          className="w-full h-12 px-4 pr-10 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors disabled:opacity-60 bg-white text-slate-800 appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a service (optional)</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder="Tell us about your project..."
          required
          disabled={pending}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-colors disabled:opacity-60 bg-white text-slate-800 placeholder:text-slate-400 resize-none"
        />
      </div>

      {/* Error message */}
      {state.success === false && (
        <p className="text-sm text-red-500 font-medium">{state.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-lg py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 font-semibold flex items-center justify-center gap-3"
      >
        {pending ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending…
          </>
        ) : 'Lets Talk'}
      </button>

    </form>
  )
}