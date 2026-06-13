'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '../../lib/supabase/client'

export function LoginForm({ redirectTo }) {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const ROLE_HOME = {
        admin: '/admin/dashboard',
        staff: '/staff/dashboard',
        client: '/portal/dashboard',
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const supabase = supabaseBrowser()

        const { error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim().toLowerCase(),
            password,
        })

        if (authError) {
            setLoading(false)
            // Generic message — don't reveal if email exists
            setError('Invalid email or password.')
            return
        }

        // Get role from profile
        const { data: { user } } = await supabase.auth.getUser()
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()
        console.log({
            redirectTo,
            role: profile?.role,
            roleHome: ROLE_HOME[profile?.role],
            destination: redirectTo ?? ROLE_HOME[profile?.role] ?? '/login',
        });

        // Redirect to role home (or original destination)
        router.push(redirectTo ?? ROLE_HOME[profile?.role] ?? '/error')
        router.refresh()

       

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                     text-black placeholder-gray-500 focus:outline-none
                     focus:ring-2 focus:ring-[#F5A623] focus:border-transparent
                     transition-all"
                        placeholder="you@company.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg
                     text-black placeholder-gray-500 focus:outline-none
                     focus:ring-2 focus:ring-[#F5A623] focus:border-transparent
                     transition-all"
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-[#F5A623] text-black font-semibold
                   rounded-lg hover:bg-[#F5A623]/90 focus:outline-none
                   focus:ring-2 focus:ring-[#F5A623] focus:ring-offset-2
                   focus:ring-offset-[#0D0D1A] disabled:opacity-50
                   disabled:cursor-not-allowed transition-all"
                >
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>
        )
    }}