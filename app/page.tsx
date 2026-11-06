'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, Flame, Shield, Users, BookOpen, Trophy, Star, ChevronRight, Zap, Heart, Brain } from 'lucide-react'

const stats = [
  { label: 'Active Users', value: '10,000+', icon: Users },
  { label: 'Avg Streak', value: '18 Days', icon: Flame },
  { label: 'Success Rate', value: '73%', icon: Star },
  { label: 'Urges Resisted', value: '50,000+', icon: Shield },
]

const features = [
  {
    icon: Flame,
    title: 'Streak Tracker',
    titleHi: 'स्ट्रीक ट्रैकर',
    desc: 'Track your clean days with beautiful visuals, milestones, and daily check-ins.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Shield,
    title: 'SOS Urge Control',
    titleHi: 'SOS आवेग नियंत्रण',
    desc: 'Hit the SOS button when urges strike. Breathing exercises, cold shower timer, distraction tools.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    icon: Users,
    title: 'Anonymous Community',
    titleHi: 'गुमनाम समुदाय',
    desc: 'Share struggles and victories anonymously. Buddy system and peer support.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: BookOpen,
    title: 'Science + Spirituality',
    titleHi: 'विज्ञान + अध्यात्म',
    desc: 'Learn about dopamine, neuroplasticity, brahmacharya, and ayurveda — all in Hindi & English.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Trophy,
    title: 'Gamified Achievements',
    titleHi: 'गेमिफाइड उपलब्धियां',
    desc: 'Earn XP, unlock badges, level up. From Seedling to Brahmacharya Master.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: Brain,
    title: 'Daily Journal',
    titleHi: 'दैनिक डायरी',
    desc: 'Track mood, energy, and focus. See how your life improves day by day.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
]

const testimonials = [
  {
    text: "I failed 50 times in 2 years. With Urja, I hit 90 days. The community kept me going.",
    days: 90,
    location: 'Delhi',
    emoji: '🕉️',
  },
  {
    text: "The SOS button saved me so many times. When the urge hits, I press it and do the breathing. It works.",
    days: 34,
    location: 'Mumbai',
    emoji: '💪',
  },
  {
    text: "Maine pehle sab try kiya. Urja ka Hindi support aur spiritual angle mere liye perfect hai.",
    days: 21,
    location: 'Lucknow',
    emoji: '🔥',
  },
]

const milestones = [
  { days: 1, benefit: 'Dopamine receptors start healing', benefit_hi: 'डोपामाइन रिसेप्टर्स ठीक होने लगते हैं' },
  { days: 7, benefit: 'Testosterone rises by 45%', benefit_hi: 'टेस्टोस्टेरोन 45% बढ़ता है' },
  { days: 14, benefit: 'Better sleep and focus', benefit_hi: 'बेहतर नींद और ध्यान' },
  { days: 30, benefit: 'Confidence and motivation peak', benefit_hi: 'आत्मविश्वास और प्रेरणा चरम पर' },
  { days: 90, benefit: 'Complete neurological reset', benefit_hi: 'पूर्ण न्यूरोलॉजिकल रीसेट' },
]

export default function LandingPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en')
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    "Every urge lasts only 15 minutes. Just delay it.",
    "हर आवेग केवल 15 मिनट तक रहता है। बस देरी करें।",
    "Your energy is your power. Control it, master life.",
    "आपकी ऊर्जा आपकी शक्ति है। इसे नियंत्रित करें, जीवन में महारत हासिल करें।",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-x-0 border-t-0 rounded-none px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl flame-flicker">🔥</span>
            <span className="text-xl font-black gradient-text">URJA</span>
            <span className="text-xs text-white/40 font-medium">ऊर्जा</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(l => l === 'en' ? 'hi' : 'en')}
              className="text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-all"
            >
              {lang === 'en' ? 'हिंदी' : 'English'}
            </button>
            <Link href="/auth/login" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block">
              Login
            </Link>
            <Link href="/auth/register" className="btn-primary text-sm py-2 px-4">
              {lang === 'en' ? 'Start Free' : 'मुफ्त शुरू करें'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-sm text-orange-400 mb-6">
            <Zap size={14} />
            <span>{lang === 'en' ? '10,000+ Indian warriors on their journey' : '10,000+ भारतीय योद्धा अपनी यात्रा पर'}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">
              {lang === 'en' ? 'Control Your' : 'अपनी'}
            </span>
            <br />
            <span className="text-white">
              {lang === 'en' ? 'Energy.' : 'ऊर्जा'}
            </span>
            <br />
            <span className="gradient-text">
              {lang === 'en' ? 'Control Your' : 'नियंत्रित करें।'}
            </span>
            <br />
            <span className="text-white">
              {lang === 'en' ? 'Life.' : ''}
            </span>
          </h1>

          <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            {lang === 'en'
              ? 'Urja is the self-discipline app built for Indian youth. Track streaks, fight urges, build community, and become the best version of yourself.'
              : 'उर्जा भारतीय युवाओं के लिए बनाया गया स्व-अनुशासन ऐप है। स्ट्रीक ट्रैक करें, आवेगों से लड़ें, समुदाय बनाएं और अपना सर्वश्रेष्ठ संस्करण बनें।'}
          </p>

          {/* Rotating tip */}
          <div className="glass-card px-6 py-3 inline-block mb-8 border-orange-500/20">
            <p className="text-sm text-orange-300 italic">&ldquo;{tips[currentTip]}&rdquo;</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register" className="btn-primary flex items-center gap-2 text-base w-full sm:w-auto justify-center">
              {lang === 'en' ? 'Start Your Journey' : 'यात्रा शुरू करें'}
              <ArrowRight size={18} />
            </Link>
            <Link href="#features" className="btn-secondary text-base w-full sm:w-auto text-center">
              {lang === 'en' ? 'See How It Works' : 'कैसे काम करता है देखें'}
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/30">
            {lang === 'en' ? 'Free forever • No credit card • 100% anonymous' : 'हमेशा मुफ्त • क्रेडिट कार्ड नहीं • 100% गुमनाम'}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4">
            {lang === 'en' ? 'What Happens to Your Body' : 'आपके शरीर में क्या होता है'}
          </h2>
          <p className="text-white/50 text-center mb-12 text-sm">
            {lang === 'en' ? 'Science-backed benefits — day by day' : 'विज्ञान समर्थित लाभ — दिन-दर-दिन'}
          </p>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500 to-transparent" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.days} className="flex items-start gap-6 pl-4">
                  <div className="relative z-10 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0">
                    {m.days}
                  </div>
                  <div className="glass-card p-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-orange-400 font-semibold uppercase tracking-wider">Day {m.days}</span>
                    </div>
                    <p className="text-white font-medium">{lang === 'en' ? m.benefit : m.benefit_hi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4 gradient-text">
            {lang === 'en' ? 'Everything You Need' : 'आपको जो चाहिए वो सब'}
          </h2>
          <p className="text-white/50 text-center mb-12">
            {lang === 'en' ? 'Built specifically for Indian youth. Hindi + English. Free forever.' : 'भारतीय युवाओं के लिए बनाया गया। हिंदी + अंग्रेजी। हमेशा के लिए मुफ्त।'}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className={`glass-card p-6 border ${f.border} hover:scale-[1.02] transition-transform duration-200`}>
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <f.icon className={f.color} size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1">{lang === 'en' ? f.title : f.titleHi}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">
            {lang === 'en' ? 'Real Warriors. Real Results.' : 'असली योद्धा। असली नतीजे।'}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-6">
                <div className="text-3xl mb-4">{t.emoji}</div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">{t.location}</span>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-semibold">
                    {t.days} day streak 🔥
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto relative">
          <div className="text-6xl mb-6">🕉️</div>
          <h2 className="text-4xl font-black mb-4">
            {lang === 'en' ? 'Your journey starts today.' : 'आपकी यात्रा आज शुरू होती है।'}
          </h2>
          <p className="text-white/50 mb-8">
            {lang === 'en'
              ? 'Join 10,000+ Indian youth who chose discipline over pleasure. It\'s free. It\'s anonymous. It works.'
              : '10,000+ भारतीय युवाओं से जुड़ें जिन्होंने खुशी पर अनुशासन को चुना।'}
          </p>
          <Link href="/auth/register" className="btn-primary text-lg flex items-center gap-2 justify-center w-full max-w-xs mx-auto">
            {lang === 'en' ? 'Join Urja — Free' : 'उर्जा से जुड़ें — मुफ्त'}
            <ArrowRight size={20} />
          </Link>
          <p className="mt-4 text-xs text-white/30">No credit card. No real name needed. 100% private.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-black gradient-text">URJA</span>
            <span className="text-xs text-white/30">— Control Your Energy</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
            <Link href="/community" className="hover:text-white/70 transition-colors">Community</Link>
          </div>
          <p className="text-xs text-white/30">Made with ❤️ for India</p>
        </div>
      </footer>
    </main>
  )
}
