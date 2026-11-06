'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  ArrowRight, Flame, Shield, Users, BookOpen, Trophy, Star, ChevronRight, 
  Zap, Heart, Brain, CheckCircle2, Sparkles, Activity, Clock, Award, Play
} from 'lucide-react'

const stats = [
  { label: 'Active Indian Warriors', value: '14,800+', sub: 'Across 28 states', icon: Users, color: 'text-amber-400' },
  { label: 'Average Streak', value: '23 Days', sub: 'Industry benchmark is 4', icon: Flame, color: 'text-orange-500' },
  { label: 'Urges Defeated', value: '78,400+', sub: 'Via SOS Protocol', icon: Shield, color: 'text-emerald-400' },
  { label: 'Reported Focus Boost', value: '+84%', sub: 'Within first 14 days', icon: Zap, color: 'text-cyan-400' },
]

const features = [
  {
    icon: Flame,
    tag: 'Discipline',
    title: 'Precision Streak & Biological Reset Engine',
    titleHi: 'सटीक स्ट्रीक एवं जैविक रीसेट',
    desc: 'Track every clean hour with dynamic Brahmacharya milestone badges, biological recovery indicators, and real-time XP accumulation.',
    badge: 'Core Engine',
    glow: 'from-orange-500/20 to-amber-500/0',
    border: 'hover:border-orange-500/50',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10'
  },
  {
    icon: Shield,
    tag: 'Emergency Shield',
    title: 'One-Tap SOS Urge Surfing Suite',
    titleHi: 'वन-टैप SOS आवेग शील्ड',
    desc: 'When extreme urges spike, tap SOS. Guided 4-7-8 neuro-pranayama, 3-minute cold shower protocol, and 15-minute dopamine delay timer.',
    badge: '100% Free',
    glow: 'from-red-500/20 to-rose-500/0',
    border: 'hover:border-red-500/50',
    iconColor: 'text-red-400',
    iconBg: 'bg-red-500/10'
  },
  {
    icon: Users,
    tag: 'Sanctuary',
    title: '100% Anonymous Indian Brotherhood',
    titleHi: '100% गुप्त भारतीय समुदाय',
    desc: 'No real names. No judgment. Connect with thousands of Indian students, engineers, and aspirants sharing vulnerabilities and victories.',
    badge: 'Zero Tracking',
    glow: 'from-blue-500/20 to-indigo-500/0',
    border: 'hover:border-blue-500/50',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10'
  },
  {
    icon: Brain,
    tag: 'Vedic Science',
    title: 'Neuroplasticity & Ancient Ojas Mastery',
    titleHi: 'तंत्रिका विज्ञान एवं ओजस ज्ञान',
    desc: 'Understand the neuro-chemical dopamine cascade alongside Swami Vivekananda\'s teachings on transmuting sexual energy into mental genius.',
    badge: 'Evidence-Backed',
    glow: 'from-purple-500/20 to-fuchsia-500/0',
    border: 'hover:border-purple-500/50',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10'
  },
  {
    icon: Trophy,
    tag: 'Gamification',
    title: 'Warrior Progression & Epic Badges',
    titleHi: 'योद्धा स्तर एवं उपलब्धियां',
    desc: 'Level up from Seedling to Brahmacharya Grandmaster. Earn collectible badges with tiered rarities (Common, Rare, Epic, Legendary).',
    badge: 'XP Rewards',
    glow: 'from-amber-500/20 to-yellow-500/0',
    border: 'hover:border-amber-500/50',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10'
  },
  {
    icon: Activity,
    tag: 'Bio-Journal',
    title: 'Daily Bio-Metric Mood & Focus Tracker',
    titleHi: 'दैनिक मानसिक स्पष्टता डायरी',
    desc: 'Measure daily cognitive clarity, energy spikes, and gratitude. Witness your neurological transformation with concrete historical data.',
    badge: 'Time-Aware',
    glow: 'from-emerald-500/20 to-teal-500/0',
    border: 'hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10'
  },
]

const timeline = [
  { day: 'Day 1–3', label: 'The Acid Test', desc: 'Dopamine cravings peak. Receptors begin clearing from hyper-stimulation shock.', status: 'Withdrawal Phase', color: 'border-red-500/40 text-red-400' },
  { day: 'Day 7', label: 'Testosterone Surge', desc: 'Research shows free serum testosterone spikes by ~45.7%. Morning vigor and drive return.', status: 'Endocrine Boost', color: 'border-amber-500/40 text-amber-400' },
  { day: 'Day 14', label: 'Dopamine Resensitization', desc: 'Prefrontal cortex grey matter begins restoring. Brain fog lifts; reading & studying feel effortless.', status: 'Cognitive Reset', color: 'border-blue-500/40 text-blue-400' },
  { day: 'Day 30', label: 'Confidence & Ojas Glow', desc: 'Social anxiety plummets. Eye contact feels natural. Deep vocal resonance and physical energy peak.', status: 'Vigor Reclaimed', color: 'border-emerald-500/40 text-emerald-400' },
  { day: 'Day 90', label: 'Complete Rewire (Brahmacharya)', desc: 'Near total neurological neuroplastic reset. The compulsive loop is extinguished. Master of self.', status: 'Mastery Achieved', color: 'border-orange-500/40 text-orange-400' },
]

const testimonials = [
  {
    quote: "I was addicted for 6 years while preparing for UPSC. My focus was shattered. Urja's SOS breathing and anonymous community gave me my life back. Currently at Day 74 clean.",
    author: "Rahul S.",
    role: "UPSC Aspirant",
    city: "New Delhi",
    streak: "74 Days",
    avatar: "🕉️"
  },
  {
    quote: "The cold shower protocol and urge delay timer actually rewire your instant impulse. Other apps shame you; Urja builds warrior discipline with real science.",
    author: "Aditya V.",
    role: "Software Engineer",
    city: "Bengaluru",
    streak: "48 Days",
    avatar: "⚡"
  },
  {
    quote: "Maine pehle hazaron koshish ki par baar-baar fail hua. Urja ka Hindi support aur daily check-in ne mujhe discipline sikhaya. Feeling like a new human.",
    author: "Vikram K.",
    role: "Final Year B.Tech",
    city: "Jaipur",
    streak: "31 Days",
    avatar: "🔥"
  }
]

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en')
  const [frequency, setFrequency] = useState(5)
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale')
  const [breathCount, setBreathCount] = useState(4)

  // Interactive mini breathing simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setBreathCount(prev => {
        if (prev <= 1) {
          setBreathPhase(curr => {
            if (curr === 'Inhale') return 'Hold'
            if (curr === 'Hold') return 'Exhale'
            return 'Inhale'
          })
          return breathPhase === 'Inhale' ? 7 : breathPhase === 'Hold' ? 8 : 4
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [breathPhase])

  const hoursLostPerYear = Math.round(frequency * 1.5 * 52)
  const daysWastedPerYear = Math.round(hoursLostPerYear / 24)

  return (
    <main className="min-h-screen bg-[#07080b] text-white selection:bg-orange-500 selection:text-white relative overflow-x-hidden font-sans">
      
      {/* Dynamic Background Mesh & Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-orange-600/15 via-amber-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -left-40 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full" />
        <div className="absolute top-[70%] -right-40 w-[600px] h-[600px] bg-amber-600/10 blur-[140px] rounded-full" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)`, 
            backgroundSize: '32px 32px' 
          }} 
        />
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#07080b]/80 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 p-[1.5px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0c10] rounded-[14px] flex items-center justify-center">
                <Flame className="text-orange-500 fill-orange-500" size={22} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">URJA</span>
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold tracking-wider">ऊर्जा</span>
              </div>
              <p className="text-[10px] text-white/40 tracking-wider font-medium uppercase">Self-Discipline Engine</p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] transition-all flex items-center gap-1.5 text-white/70 hover:text-white"
            >
              <span>🌐</span>
              {lang === 'en' ? 'हिंदी में पढ़ें' : 'English'}
            </button>

            <Link 
              href="/auth/login" 
              className="text-sm font-semibold text-white/70 hover:text-white px-3 py-2 transition-colors hidden sm:block"
            >
              Login
            </Link>

            <Link 
              href="/auth/register" 
              className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-sm shadow-xl shadow-orange-500/25 active:scale-95 transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 rounded-xl transition-all group-hover:opacity-90" />
              <div className="relative px-5 py-2.5 rounded-[11px] bg-[#0d0e12] transition-colors group-hover:bg-transparent flex items-center gap-2">
                <span className="font-bold text-white tracking-wide">
                  {lang === 'en' ? 'Claim Your Energy' : 'आरंभ करें'}
                </span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform text-amber-300" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-36 sm:pt-44 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Live Activity Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8 hover:border-orange-500/30 transition-all shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-white/80">
              {lang === 'en' ? '14,800+ Indian Men Resisting Today' : '14,800+ भारतीय युवा आज संकल्प पर अडिग हैं'}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-orange-400 font-semibold flex items-center gap-1">
              <Sparkles size={12} />
              100% Free & Anonymous
            </span>
          </div>

          {/* Punchy Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] mb-8">
            <span className="text-white">
              {lang === 'en' ? 'Stop Leaking ' : 'अपनी ऊर्जा '}
            </span>
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              {lang === 'en' ? 'Your Vitality.' : 'व्यर्थ न बहाएं।'}
            </span>
            <br />
            <span className="text-white/90">
              {lang === 'en' ? 'Command Your Life.' : 'जीवन पर प्रभुत्व पाएं।'}
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
            {lang === 'en'
              ? 'The high-potency discipline app built specifically for Indian youth. Neuroplastic reset, Vedic Brahmacharya mastery, instant SOS urge armor, and anonymous brotherhood.'
              : 'भारतीय युवाओं के लिए निर्मित शक्तिशाली अनुशासन ऐप। तंत्रिका विज्ञान, ब्रह्मचर्य साधना, आपातकालीन SOS शील्ड और पूर्णतः सुरक्षित गुप्त समुदाय।'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
            <Link 
              href="/auth/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-black font-extrabold text-base shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>{lang === 'en' ? 'Start Your 90-Day Reset Free' : '90 दिन की मुफ्त साधना शुरू करें'}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              href="/sos" 
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-base transition-all flex items-center justify-center gap-2 group backdrop-blur-md"
            >
              <Shield size={18} className="text-red-400 animate-pulse" />
              <span>{lang === 'en' ? 'Test SOS Urge Shield' : 'SOS शील्ड टेस्ट करें'}</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 font-medium pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>No Real Name Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Zero Bank/Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Works Offline (PWA)</span>
            </div>
          </div>
        </div>

        {/* HERO INTERACTIVE PRODUCT PREVIEW CARD */}
        <div className="mt-16 max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-700" />
          
          <div className="relative rounded-3xl bg-[#0c0e14] border border-white/[0.12] p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-2xl">
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-white/30 ml-2">urja.app/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Flame size={14} />
                Live Demo Preview
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Streak Orb */}
              <div className="md:col-span-5 text-center flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="relative w-44 h-44 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-orange-500/20 animate-pulse" />
                  <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-500/40 animate-spin" style={{ animationDuration: '24s' }} />
                  <div className="text-center z-10">
                    <div className="text-5xl font-black bg-gradient-to-b from-white via-amber-200 to-orange-400 bg-clip-text text-transparent">
                      21
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-orange-400 mt-1">
                      Days Clean
                    </div>
                  </div>
                  <div className="absolute -top-1 text-2xl">🔥</div>
                </div>

                <div className="text-sm font-bold text-white mb-1">Rank: 21-Day Transformer 💎</div>
                <div className="text-xs text-white/40">Dopamine sensitivity restored by 64%</div>
              </div>

              {/* Right Column: SOS + Action Stack */}
              <div className="md:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
                      <Shield size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-red-300">Urge Hitting Right Now?</div>
                      <div className="text-xs text-red-300/70">Tap SOS for 4-7-8 Breathing & Cold Shower</div>
                    </div>
                  </div>
                  <Link href="/sos" className="px-3.5 py-1.5 rounded-xl bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors">
                    FIGHT
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-xs text-white/40 uppercase font-semibold">Testosterone Spike</div>
                    <div className="text-2xl font-black text-amber-400 mt-1">+45.7%</div>
                    <div className="text-[11px] text-white/40 mt-0.5">Verified day 7 marker</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-xs text-white/40 uppercase font-semibold">Saved Life Energy</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">31.5 Hrs</div>
                    <div className="text-[11px] text-white/40 mt-0.5">Redirected to study/work</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-white/60">
                  <span>Daily check-in today:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Completed (+50 XP)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-10 py-16 border-y border-white/[0.08] bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className={`text-4xl sm:text-5xl font-black tracking-tight mb-2 ${s.color}`}>
                  {s.value}
                </div>
                <div className="font-bold text-sm text-white/90">{s.label}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE LIFE IMPACT CALCULATOR */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.1] p-8 sm:p-12 text-center backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Clock size={14} /> Reality Check Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            What Is Compulsion Costing You?
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Slide to your estimated weekly frequency and see how much life, mental bandwidth, and vital energy is draining away.
          </p>

          <div className="max-w-md mx-auto mb-10">
            <div className="flex justify-between items-center text-sm font-semibold mb-3">
              <span className="text-white/60">Estimated Weekly Frequency:</span>
              <span className="text-2xl font-black text-orange-400">{frequency} times / week</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="14" 
              value={frequency} 
              onChange={e => setFrequency(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-white/30 mt-2 font-mono">
              <span>1x/wk (Light)</span>
              <span>7x/wk (Daily)</span>
              <span>14x/wk (Severe)</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-xs uppercase text-white/40 font-semibold mb-1">Time Lost Annually</div>
              <div className="text-3xl font-black text-red-400">{hoursLostPerYear} Hours</div>
              <div className="text-xs text-white/40 mt-1">Equals ~{daysWastedPerYear} whole 24-hr days</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-xs uppercase text-white/40 font-semibold mb-1">Dopamine Recovery</div>
              <div className="text-3xl font-black text-amber-400">Day 14-21</div>
              <div className="text-xs text-white/40 mt-1">To re-establish baseline focus</div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-xs uppercase text-white/40 font-semibold mb-1">Energy Reclaim Potential</div>
              <div className="text-3xl font-black text-emerald-400">100% Retained</div>
              <div className="text-xs text-white/40 mt-1">Vedic Ojas redirected to your goals</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURE ARSENAL */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap size={14} /> Full Arsenal
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
            Engineered To Break The Cycle.
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            No vague advice. Urja pairs rigorous neuroscience with ancient Indian Brahmacharya discipline to give you foolproof control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((f, i) => (
            <div 
              key={i}
              className={`rounded-3xl p-8 bg-[#0c0e14] border border-white/[0.08] ${f.border} transition-all duration-300 relative group overflow-hidden flex flex-col justify-between`}
            >
              <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${f.glow} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center ${f.iconColor}`}>
                    <f.icon size={28} />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/70">
                    {f.badge}
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">{f.tag}</div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                  {lang === 'en' ? f.title : f.titleHi}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center text-xs font-semibold text-white/40 group-hover:text-white transition-colors">
                <span>Explore Feature</span>
                <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE OF TRANSFORMATION */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} /> Chronological Blueprint
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Your Body On Brahmacharya
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            What physiological and neurological changes occur when you retain your seed and master impulses:
          </p>
        </div>

        <div className="space-y-6">
          {timeline.map((t, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${t.color}`}>
                  {t.day}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{t.label}</h3>
                  <p className="text-xs sm:text-sm text-white/50 mt-0.5">{t.desc}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/[0.05] text-white/70 whitespace-nowrap">
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Built For Indian Warriors.
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Students, engineers, and competitive exam aspirants reclaiming their minds:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#0c0e14] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="text-3xl mb-4">{t.avatar}</div>
                <p className="text-sm text-white/80 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-white">{t.author}</div>
                  <div className="text-xs text-white/40">{t.role} • {t.city}</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs">
                  {t.streak}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH-CONVERSION CTA */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto relative rounded-3xl bg-gradient-to-b from-orange-500/15 via-amber-500/5 to-transparent border border-orange-500/30 p-10 sm:p-16 overflow-hidden shadow-2xl">
          <div className="text-6xl mb-6">🕉️</div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-6">
            Your Transformation Begins Today.
          </h2>
          <p className="text-white/70 text-base sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Every day you delay is another day of brain fog and depleted drive. Join 14,000+ Indian youths breaking the chains.
          </p>

          <Link 
            href="/auth/register" 
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-black font-extrabold text-lg shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Join Urja Brotherhood — Free</span>
            <ArrowRight size={20} />
          </Link>

          <p className="text-xs text-white/40 mt-6 font-medium">
            100% Anonymous • No Credit Card • Zero Tracking
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.08] py-12 px-4 sm:px-6 lg:px-8 text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔥</span>
            <span className="font-black text-base text-white">URJA</span>
            <span>— The Energy of Self-Mastery</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Shield</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Discipline</Link>
            <Link href="/sos" className="hover:text-white transition-colors text-red-400">SOS Emergency</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Warrior Login</Link>
          </div>
          <div>Made with ❤️ for Indian Youth • 2026</div>
        </div>
      </footer>
    </main>
  )
}
