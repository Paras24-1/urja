'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/layout/BottomNav'
import { ArrowLeft, Zap, Wind, Dumbbell, Brain, Droplets, Music, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const techniques = [
  {
    id: 'breathing',
    icon: Wind,
    title: '4-7-8 Breathing',
    titleHi: '4-7-8 साँस लेना',
    desc: 'Inhale 4s, hold 7s, exhale 8s. Calms nervous system instantly.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    duration: '3 minutes',
  },
  {
    id: 'exercise',
    icon: Dumbbell,
    title: '20 Push-ups NOW',
    titleHi: 'अभी 20 पुशअप',
    desc: 'Physical exertion burns the urge energy. Do it immediately.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    duration: '2 minutes',
  },
  {
    id: 'cold_shower',
    icon: Droplets,
    title: 'Cold Shower Timer',
    titleHi: 'ठंडे पानी से नहाना',
    desc: 'Cold water kills urges 100% of the time. Use this timer.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    duration: '5 minutes',
  },
  {
    id: 'meditation',
    icon: Brain,
    title: 'Urge Surfing',
    titleHi: 'आवेग सर्फिंग',
    desc: 'Observe the urge like a wave. Don\'t fight it. Watch it rise and fall.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    duration: '5 minutes',
  },
]

const emergencyQuotes = [
  "This urge will pass in 10-15 minutes. You just need to outlast it.",
  "Every time you resist, your brain gets stronger. Every single time.",
  "You are not your urges. You are the one watching them.",
  "Think of the person you want to be. That person said no.",
  "Your future self will be grateful you didn't give in right now.",
  "The urge is not YOU. It's a chemical signal. You are more than chemistry.",
  "आवेग आप नहीं हैं। बस 15 मिनट और। आप मजबूत हैं।",
  "अपने लक्ष्य को याद करो। यह पल गुजर जाएगा।",
]

function BreathingExercise({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [count, setCount] = useState(4)
  const [cycles, setCycles] = useState(0)
  const [circleScale, setCircleScale] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev <= 1) {
          setPhase(current => {
            if (current === 'inhale') {
              setCircleScale(1.4)
              return 'hold'
            }
            if (current === 'hold') return 'exhale'
            setCircleScale(1)
            setCycles(c => c + 1)
            return 'inhale'
          })
          return phase === 'inhale' ? 7 : phase === 'hold' ? 8 : 4
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase])

  const phaseColors = {
    inhale: 'border-blue-500',
    hold: 'border-purple-500',
    exhale: 'border-cyan-500',
  }

  const phaseText = {
    inhale: 'Breathe IN',
    hold: 'HOLD',
    exhale: 'Breathe OUT',
  }

  return (
    <div className="text-center py-8">
      <div className="relative inline-flex items-center justify-center mb-6">
        <div
          className={`w-48 h-48 rounded-full border-4 ${phaseColors[phase]} transition-transform duration-1000 flex items-center justify-center`}
          style={{ transform: `scale(${circleScale})` }}
        >
          <div className="text-center">
            <div className="text-4xl font-black">{count}</div>
            <div className="text-sm text-white/60">{phaseText[phase]}</div>
          </div>
        </div>
        <div className={`absolute inset-0 rounded-full border-4 ${phaseColors[phase]} opacity-20 pulse-ring`} />
      </div>
      
      <p className="text-sm text-white/50 mb-2">Cycle {cycles + 1} of 5</p>
      <div className="progress-bar max-w-xs mx-auto mb-6">
        <div className="progress-fill" style={{ width: `${(cycles / 5) * 100}%` }} />
      </div>

      {cycles >= 5 && (
        <button onClick={onDone} className="btn-primary flex items-center gap-2 mx-auto">
          <Zap size={16} />
          Done! Urge Resisted! 🎉
        </button>
      )}
    </div>
  )
}

function ColdShowerTimer({ onDone }: { onDone: () => void }) {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const target = 180 // 3 minutes

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s >= target) {
          setRunning(false)
          return s
        }
        return s + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [running])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="text-center py-6">
      <div className="text-6xl mb-2">🚿</div>
      <div className="text-5xl font-black mb-4 font-mono">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>
      
      <div className="progress-bar max-w-xs mx-auto mb-6">
        <div className="progress-fill" style={{ width: `${(seconds / target) * 100}%`, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }} />
      </div>

      <p className="text-sm text-white/50 mb-6">
        Go take a cold shower RIGHT NOW. Start the timer when you step in.
      </p>

      {!running && seconds === 0 && (
        <button onClick={() => setRunning(true)} className="btn-primary flex items-center gap-2 mx-auto" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>
          🧊 Start Cold Shower Timer
        </button>
      )}
      
      {running && (
        <div className="text-cyan-400 font-semibold animate-pulse">In the shower? Great! Stay in!</div>
      )}

      {seconds >= target && !running && (
        <button onClick={onDone} className="btn-primary flex items-center gap-2 mx-auto">
          <Zap size={16} />
          Done! Urge Killed! 🎉
        </button>
      )}
    </div>
  )
}

function UrgeDelayTimer({ onDone }: { onDone: () => void }) {
  const [seconds, setSeconds] = useState(900) // 15 minutes
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setRunning(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [running])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="text-center py-6">
      <p className="text-sm text-white/60 mb-4">The urge will fade. Just wait it out.</p>
      <div className="text-6xl font-black mb-4 font-mono gradient-text">
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </div>

      {!running ? (
        <button onClick={() => setRunning(true)} className="btn-primary flex items-center gap-2 mx-auto">
          ⏱️ Start 15-Minute Delay
        </button>
      ) : (
        <div>
          <p className="text-orange-400 font-semibold mb-4">Hold on! The urge is temporary...</p>
          <button onClick={onDone} className="btn-secondary text-sm">I already resisted ✓</button>
        </div>
      )}

      {seconds === 0 && (
        <button onClick={onDone} className="btn-primary flex items-center gap-2 mx-auto mt-4">
          <Zap size={16} />
          You made it! Urge gone! 🎉
        </button>
      )}
    </div>
  )
}

export default function SOSPage() {
  const router = useRouter()
  const supabase = createClient()
  const [activeTechnique, setActiveTechnique] = useState<string | null>(null)
  const [urgeDone, setUrgeDone] = useState(false)
  const [quoteIndex] = useState(Math.floor(Math.random() * emergencyQuotes.length))
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const backHref = user ? '/dashboard' : '/'

  const handleResisted = async (technique: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('urge_logs').insert({
        user_id: user.id,
        technique_used: technique,
        success: true,
      })
      const { data: prof } = await supabase.from('profiles').select('xp').eq('id', user.id).single()
      if (prof) {
        await supabase.from('profiles').update({
          xp: (prof.xp || 0) + 100,
        }).eq('id', user.id)
      }
    }
    setUrgeDone(true)
    setActiveTechnique(null)
  }

  if (urgeDone) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-7xl mb-6">⚔️</div>
          <h2 className="text-3xl font-black gradient-text mb-3">URGE DEFEATED!</h2>
          <p className="text-white/60 mb-6">
            You proved to yourself that you are stronger than your urges. That is HUGE.
          </p>
          <div className="glass-card p-4 border-green-500/20 bg-green-500/5 mb-6">
            <div className="text-green-400 font-semibold">+100 XP Earned 🏆</div>
            <div className="text-sm text-white/50 mt-1">Urge Resisted Badge Progress</div>
          </div>
          <Link href={backHref} className="btn-primary flex items-center justify-center gap-2">
            {user ? 'Back to Dashboard 🔥' : 'Back to Home 🔥'}
          </Link>
        </div>
      </div>
    )
  }

  if (activeTechnique) {
    const tech = techniques.find(t => t.id === activeTechnique)!
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-sm mx-auto">
          <button
            onClick={() => setActiveTechnique(null)}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to SOS
          </button>

          <div className="glass-card p-6">
            <div className="text-center mb-6">
              <tech.icon className={`${tech.color} mx-auto mb-2`} size={32} />
              <h2 className="text-xl font-bold">{tech.title}</h2>
              <p className="text-sm text-white/50 mt-1">{tech.desc}</p>
            </div>

            {activeTechnique === 'breathing' && (
              <BreathingExercise onDone={() => handleResisted('breathing')} />
            )}
            {activeTechnique === 'cold_shower' && (
              <ColdShowerTimer onDone={() => handleResisted('cold_shower')} />
            )}
            {activeTechnique === 'exercise' && (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">💪</div>
                <p className="text-white/80 font-semibold mb-2">Get on the floor RIGHT NOW</p>
                <p className="text-sm text-white/50 mb-6">Do 20 push-ups. Urge will be gone by rep 10.</p>
                <button onClick={() => handleResisted('exercise')} className="btn-primary flex items-center gap-2 mx-auto">
                  <Zap size={16} />
                  Done! 20 Push-ups Complete! 💪
                </button>
              </div>
            )}
            {activeTechnique === 'meditation' && (
              <UrgeDelayTimer onDone={() => handleResisted('meditation')} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28 px-4">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40 border-red-500/20 bg-red-500/5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href={backHref} className="text-white/50 hover:text-white flex items-center gap-1 text-xs font-semibold">
            <ArrowLeft size={18} />
            <span>{user ? 'Dashboard' : 'Home'}</span>
          </Link>
          <div className="text-center">
            <div className="font-black text-red-400 text-lg">🚨 SOS MODE</div>
            <p className="text-xs text-white/40">You can do this.</p>
          </div>
          <div className="w-6" />
        </div>
      </div>

      <div className="max-w-sm mx-auto py-6 space-y-6 fade-in">
        {/* Emergency Quote */}
        <div className="glass-card p-5 border-orange-500/30 bg-orange-500/5 text-center">
          <div className="text-3xl mb-3">🧠</div>
          <p className="text-white font-semibold italic">
            &ldquo;{emergencyQuotes[quoteIndex]}&rdquo;
          </p>
        </div>

        {/* Key fact */}
        <div className="glass-card p-4 border-blue-500/20 bg-blue-500/5 text-center">
          <div className="text-blue-400 font-bold text-lg">⏱️ 15 Minutes</div>
          <div className="text-sm text-white/60 mt-1">That is how long this urge will last. Just 15 minutes.</div>
        </div>

        {/* Techniques */}
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Choose a Technique</h3>
          <div className="space-y-3">
            {techniques.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTechnique(t.id)}
                className={`w-full glass-card p-4 border ${t.border} ${t.bg} hover:scale-[1.01] transition-all duration-200 text-left flex items-center gap-4`}
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center`}>
                  <t.icon className={t.color} size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{t.title}</div>
                  <div className="text-xs text-white/40 mt-0.5">{t.desc.substring(0, 50)}...</div>
                </div>
                <div className="text-xs text-white/30">{t.duration}</div>
                <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Just delay option */}
        <div className="glass-card p-4 text-center border-white/5">
          <p className="text-sm text-white/50 mb-3">Or just walk away from your phone for 15 minutes.</p>
          <button
            onClick={() => handleResisted('distraction')}
            className="btn-secondary text-sm"
          >
            I walked away and resisted ✓
          </button>
        </div>

        {/* Community support */}
        <Link href="/community" className="glass-card p-4 flex items-center gap-3 hover:border-blue-500/30 transition-all">
          <div className="text-2xl">🤝</div>
          <div>
            <div className="text-sm font-semibold">Talk to the community</div>
            <div className="text-xs text-white/40">You are not alone. Warriors are here for you.</div>
          </div>
          <ChevronRight size={16} className="text-white/30 ml-auto" />
        </Link>
      </div>

      <BottomNav active="sos" />
    </div>
  )
}
