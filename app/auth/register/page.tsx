'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, ArrowLeft, AlertCircle, CheckCircle, Home, Flame } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const motivations = [
  'Better focus and energy',
  'Confidence and self-respect',
  'Spiritual growth (Brahmacharya)',
  'Better relationships',
  'Athletic performance',
  'Mental clarity',
]

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'

  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const toggleMotivation = (m: string) => {
    setSelectedMotivations(prev =>
      prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
    )
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!username.trim() || !email.trim() || !password.trim()) {
        setError('Please fill in all fields')
        return
      }
      setError('')
      setStep(2)
      return
    }

    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, age_group: ageGroup, motivation: selectedMotivations.join(', ') },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').update({
        username,
        age_group: ageGroup,
        motivation: selectedMotivations.join(', '),
      }).eq('id', data.user.id)
    }

    setSuccess(true)
    setLoading(false)
  }

  const handleGoogleSignup = async () => {
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

  if (success) {
    return (
      <div className="w-full max-w-md text-center py-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400 text-3xl">
          🎉
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Welcome to Urja!</h2>
        <p className="text-white/60 mb-6 text-sm leading-relaxed max-w-sm mx-auto">
          We sent a verification link to <strong className="text-white">{email}</strong>. Check your inbox and log in to begin.
        </p>
        <Link 
          href={`/auth/login?next=${encodeURIComponent(next)}`} 
          className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold"
        >
          <span>Go to Login</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    )
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
        <h1 className="text-2xl sm:text-3xl font-extrabold mt-4 mb-1.5 tracking-tight text-white">
          {step === 1 ? 'Create Your Account' : 'Personalize Your Journey'}
        </h1>
        <p className="text-white/50 text-sm">
          {step === 1 ? 'Free forever • 100% anonymous • No credit card' : 'Step 2 of 2: Set your warrior intention'}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-orange-500' : 'bg-white/10'}`} />
        <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />
      </div>

      {/* Form Card */}
      <div className="glass-card p-7 sm:p-8 border border-white/10 bg-[#0d0f15]/90 backdrop-blur-2xl shadow-2xl">
        {error && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-3.5 mb-5 text-red-400 text-xs sm:text-sm">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {step === 1 && (
            <>
              {/* Username field */}
              <div>
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 block">
                  Anonymous Warrior Alias
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none text-white/40 flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="brahma_warrior"
                    className="input-field input-with-icon-left text-white placeholder-white/30 text-sm"
                    required
                    minLength={3}
                  />
                </div>
                <p className="text-[11px] text-white/40 mt-1.5">No real name needed. Keeps your identity completely private.</p>
              </div>

              {/* Email field */}
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

              {/* Password field */}
              <div>
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none text-white/40 flex items-center justify-center">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="input-field input-with-icon-left input-with-icon-right text-white placeholder-white/30 text-sm"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 p-1 text-white/40 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all mt-2"
              >
                <span>Continue to Step 2</span>
                <ArrowRight size={16} />
              </button>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">or</span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="btn-secondary w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold hover:border-white/20 transition-all disabled:opacity-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign up with Google</span>
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2.5 block">
                  Your Age Group
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['16-18', '19-22', '23-26', '27-30', '30+'].map(age => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setAgeGroup(age)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        ageGroup === age
                          ? 'bg-orange-500/20 border-orange-500/60 text-orange-400'
                          : 'bg-white/[0.04] border-white/10 text-white/60 hover:bg-white/[0.08]'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-2.5 block">
                  What drives you to conquer urges?
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {motivations.map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMotivation(m)}
                      className={`w-full text-left py-2.5 px-3.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-3 ${
                        selectedMotivations.includes(m)
                          ? 'bg-orange-500/15 border-orange-500/40 text-white'
                          : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                        selectedMotivations.includes(m) ? 'bg-orange-500 border-orange-500 text-black' : 'border-white/30'
                      }`}>
                        {selectedMotivations.includes(m) && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span>{m}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1 py-3 text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Begin Journey</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Footer link */}
      <p className="text-center mt-6 text-sm text-white/50">
        Already registered?{' '}
        <Link 
          href={`/auth/login?next=${encodeURIComponent(next)}`} 
          className="text-orange-400 hover:text-orange-300 font-bold transition-colors underline-offset-4 hover:underline"
        >
          Warrior Login
        </Link>
      </p>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-b from-orange-600/15 via-amber-600/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/10 blur-[120px] rounded-full pointer-events-none" />

      <Suspense fallback={<div className="text-white/40 text-sm">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  )
}
