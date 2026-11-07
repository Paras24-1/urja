'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Flame, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
    })

    if (resetError) {
      setError(resetError.message)
      setLoading(false)
    } else {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-b from-orange-600/15 via-amber-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/auth/login" 
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to Login</span>
          </Link>
          <Link href="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="text-3xl">🔥</span>
            <span className="text-2xl font-black gradient-text">URJA</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 mb-2 tracking-tight text-white">
            Reset Password
          </h1>
          <p className="text-white/60 text-sm">
            Enter your email and we&apos;ll send you a recovery link.
          </p>
        </div>

        <div className="glass-card p-7 sm:p-8 border border-white/10 bg-[#0d0f15]/90 backdrop-blur-2xl shadow-2xl">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-lg font-bold text-white">Check your email</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                We sent a password reset link to <strong className="text-white">{email}</strong>. Follow the instructions to regain access.
              </p>
              <Link 
                href="/auth/login" 
                className="btn-primary inline-flex items-center gap-2 mt-4 px-6 py-2.5 text-sm"
              >
                <span>Return to Login</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              {error && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 text-red-400 text-xs sm:text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 block">
                  Registered Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none text-white/40 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="warrior@example.com"
                    className="input-field input-with-icon-left text-white placeholder-white/30 text-sm"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
