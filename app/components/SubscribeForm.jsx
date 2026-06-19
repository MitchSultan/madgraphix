'use client'

import { useActionState, useEffect, useRef } from 'react'
import { subscribeEmail } from '../../lib/actions/subscribe'

const initialState = { success: null, message: '' }

export default function SubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribeEmail, initialState)
  const inputRef = useRef(null)

  // Clear input on success
  useEffect(() => {
    if (state.success && inputRef.current) {
      inputRef.current.value = ''
    }
  }, [state.success])

  return (
    <form action={formAction} className="mt-2 w-full">
      <div className="relative max-w-lg mx-auto">
        <label className="sr-only" htmlFor="email">Email</label>

        <input
          ref={inputRef}
          className="w-full rounded-pill border-1 border-black/20 bg-white/10 p-4 pr-36 text-sm font-medium focus:outline-none focus:border-white/50 backdrop-blur-sm transition-colors disabled:opacity-60"
          id="email"
          name="email"
          type="email"
          placeholder="Joe@madgraphix.co.ke"
          required
          disabled={pending}
        />

        <button
          type="submit"
          disabled={pending}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-pill bg-blue-900 px-6 py-2.5 text-sm font-bold transition hover:bg-[#e67e00] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed min-w-[110px]"
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Sending
            </span>
          ) : 'Subscribe'}
        </button>
      </div>

      {/* Feedback message */}
      {state.message && (
        <p className={`mt-3 text-center text-sm font-medium transition-all ${
          state.success
            ? 'text-green-300'
            : 'text-red-300'
        }`}>
          {state.message}
        </p>
      )}
    </form>
  )
}