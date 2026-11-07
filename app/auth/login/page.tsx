'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Flame, ArrowRight, AlertCircle, ArrowLeft, Home } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    
    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    } else {
      router.push(next)
      router.refresh()
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    })
    if (oAuthError) {
      setError(oAuthError.message)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Top back to home navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors">
          <Home size={14} />
          <span>Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d0e12] rounded-[10px] flex items-center justify-center">
              <Flame className="text-orange-500 fill-orange-500" size={20} />
            </div>
          </div>
          <span className="text-2xl font-black gradient-text">URJA</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 mb-2 tracking-tight text-white">
          Welcome back, Warrior
        </h1>
        <p className="text-white/60 text-sm">
          Log in to check in today & protect your clean streak.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="glass-card p-7 sm:p-8 border border-white/10 bg-[#0d0f15]/90 backdrop-blur-2xl shadow-2xl">
        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 mb-5 text-red-400 text-xs sm:text-sm leading-relaxed">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email field with guaranteed spacing */}
          <div>
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 block">
              Email Address
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
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password field with guaranteed spacing */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                Password
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 pointer-events-none text-white/40 flex items-center justify-center">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-field input-with-icon-left input-with-icon-right text-white placeholder-white/30 text-sm"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 p-1 text-white/40 hover:text-white transition-colors rounded-lg flex items-center justify-center"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Flame size={18} />
                <span>Enter Warrior Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">or continue with</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        {/* Google OAuth button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn-secondary w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold hover:border-white/20 transition-all disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Footer link */}
      <p className="text-center mt-6 text-sm text-white/50">
        New warrior?{' '}
        <Link 
          href={`/auth/register?next=${encodeURIComponent(next)}`} 
          className="text-orange-400 hover:text-orange-300 font-bold transition-colors underline-offset-4 hover:underline"
        >
          Create free account
        </Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-b from-orange-600/15 via-amber-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Suspense fallback={<div className="text-white/40 text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
