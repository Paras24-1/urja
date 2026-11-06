'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const motivations = [
  'Better focus and energy',
  'Confidence and self-respect',
  'Spiritual growth (Brahmacharya)',
  'Better relationships',
  'Athletic performance',
  'Mental clarity',
]

export default function RegisterPage() {
  const router = useRouter()
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
      // Update profile
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Urja!</h2>
          <p className="text-white/60 mb-6 text-sm">
            Check your email to verify your account. Your journey starts now.
          </p>
          <Link href="/auth/login" className="btn-primary flex items-center justify-center gap-2">
            Go to Login <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🔥</span>
            <span className="text-2xl font-black gradient-text">URJA</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4 mb-1">
            {step === 1 ? 'Create your account' : 'Tell us about yourself'}
          </h1>
          <p className="text-white/50 text-sm">
            {step === 1 ? 'Free forever. 100% anonymous.' : 'Help us personalize your experience'}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-orange-500' : 'bg-white/10'}`} />
          <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`} />
        </div>

        <div className="glass-card p-6">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="warrior_123"
                      className="input-field pl-9"
                      required
                      minLength={3}
                    />
                  </div>
                  <p className="text-xs text-white/30 mt-1">This is how others see you. Can be changed later.</p>
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="input-field pl-9"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      className="input-field pl-9 pr-9"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  Next Step <ArrowRight size={16} />
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-white/30">or</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  className="btn-secondary w-full flex items-center justify-center gap-3"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign up with Google
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="text-sm text-white/60 mb-3 block">Your age group</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['16-18', '19-22', '23-26', '27-30', '30+'].map(age => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeGroup(age)}
                        className={`py-2 px-3 rounded-xl text-sm border transition-all duration-200 ${
                          ageGroup === age
                            ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60 mb-3 block">Why are you joining? (select all that apply)</label>
                  <div className="space-y-2">
                    {motivations.map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleMotivation(m)}
                        className={`w-full text-left py-2.5 px-4 rounded-xl text-sm border transition-all duration-200 flex items-center gap-3 ${
                          selectedMotivations.includes(m)
                            ? 'bg-orange-500/20 border-orange-500/50 text-white'
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedMotivations.includes(m) ? 'bg-orange-500 border-orange-500' : 'border-white/30'
                        }`}>
                          {selectedMotivations.includes(m) && <CheckCircle size={12} className="text-white" />}
                        </div>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Start Journey <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-white/50">
          Already a warrior?{' '}
          <Link href="/auth/login" className="text-orange-400 hover:text-orange-300 font-semibold">
            Login
          </Link>
        </p>

        <p className="text-center mt-3 text-xs text-white/25">
          By joining, you agree to our Terms & Privacy Policy.
        </p>
      </div>
    </div>
  )
}
