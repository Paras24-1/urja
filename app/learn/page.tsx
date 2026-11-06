'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/layout/BottomNav'
import { BookOpen, ExternalLink, ChevronRight, Brain, Heart, Flame, Leaf, Zap } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'What NoFap Actually Does to Your Brain',
    titleHi: 'NoFap वास्तव में आपके दिमाग पर क्या करता है',
    summary: 'The neuroscience behind dopamine, pornography, and addiction — explained simply.',
    summaryHi: 'डोपामाइन, पोर्नोग्राफी और लत के पीछे का तंत्रिका विज्ञान — सरल तरीके से समझाया गया।',
    category: 'science',
    readTime: '5 min',
    icon: Brain,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    content: `## The Dopamine Loop

When you watch pornography or masturbate, your brain releases a surge of dopamine — the same chemical released by drugs, gambling, and social media. This surge is 2-5x higher than what natural rewards produce.

## What Happens Over Time

With repeated overstimulation:
- Your dopamine receptors become **desensitized**
- You need MORE stimulation to feel the same pleasure
- Real-life rewards (food, conversation, nature) feel dull
- You experience "flatline" — emotional numbness, low motivation

## What NoFap Does

When you stop:
- **Day 1-7**: Dopamine receptors begin recovering
- **Day 7-14**: Testosterone rises (study showed 45% increase at day 7)
- **Day 30+**: Motivation, energy, and focus return
- **Day 90+**: Near-complete neurological reset

## The Science

A 2007 Chinese study showed testosterone peaked 145% above baseline after 7 days of abstinence. Multiple studies confirm improved androgen receptor sensitivity with abstinence.

Your brain is **neuroplastic** — it can and does rewire. Every day clean, new neural pathways form.`,
  },
  {
    id: 2,
    title: 'Brahmacharya: Ancient Wisdom for Modern Times',
    titleHi: 'ब्रह्मचर्य: आधुनिक समय के लिए प्राचीन ज्ञान',
    summary: 'What Swami Vivekananda, yoga, and Ayurveda say about sexual energy.',
    summaryHi: 'स्वामी विवेकानंद, योग और आयुर्वेद यौन ऊर्जा के बारे में क्या कहते हैं।',
    category: 'spiritual',
    readTime: '7 min',
    icon: Leaf,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    content: `## Brahmacharya Defined

Brahmacharya (ब्रह्मचर्य) literally means "walking in Brahma" or living in consciousness of the divine. In practice, it means the conservation and redirection of vital energy (ojas).

## Swami Vivekananda's Teaching

> "The chaste brain has tremendous energy and gigantic will power... The soul that has attained brahmacharya becomes divinely powerful."

Vivekananda himself practiced strict brahmacharya and believed it was the foundation of his incredible energy and intellectual power.

## Ojas — The Life Force

In Ayurveda, **ojas** is the finest product of digestion — the essence of vitality, immunity, and spiritual power. Sexual fluid is considered the densest form of ojas. Conservation leads to:
- Superior physical health
- Bright eyes and glowing skin
- Sharp memory and intelligence
- Deep inner peace

## How to Practice

1. **Avoid triggers** — control environment
2. **Cold water baths** (snan) — reduces heat
3. **Yoga and pranayama** — redirects energy upward
4. **Brahma muhurta** — wake at 4-5 AM for meditation
5. **Sattvic diet** — avoid tamasic foods (meat, alcohol, strong spices)
6. **Satsang** — keep good company`,
  },
  {
    id: 3,
    title: '7 Science-Backed Benefits of NoFap',
    titleHi: 'NoFap के 7 विज्ञान-समर्थित लाभ',
    summary: 'Real studies, real benefits. Here\'s what the research actually says.',
    summaryHi: 'वास्तविक अध्ययन, वास्तविक लाभ। शोध वास्तव में क्या कहता है।',
    category: 'science',
    readTime: '4 min',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    content: `## 1. Higher Testosterone (Day 7 Peak)

A 2007 study published in the Journal of Zhejiang University found testosterone levels peaked at **145.7% of baseline** on day 7 of abstinence. This aligns with reports of increased energy, assertiveness, and drive.

## 2. Improved Dopamine Sensitivity

Research on addiction shows receptor upregulation after abstinence. Users report previously bland activities becoming enjoyable again.

## 3. Better Sleep Quality

PMO (Porn, Masturbation, Orgasm) disrupts sleep architecture. Many NoFap practitioners report deeper, more restorative sleep within 2-3 weeks.

## 4. Increased Motivation and Drive

Excess dopamine from PMO depletes motivational drive. Without the artificial spike, the brain relearns to pursue real goals.

## 5. Improved Skin and Appearance

Zinc is a key mineral in semen. Frequent loss = zinc depletion = skin issues, hair thinning. Conservation may improve these.

## 6. Social Confidence

Many men report increased eye contact, voice projection, and confidence in social situations — possibly related to androgen receptor sensitivity.

## 7. Mental Clarity and Focus

The brain on PMO is in a constant search for stimulation. Without it, the prefrontal cortex (planning, focus) becomes more active.`,
  },
  {
    id: 4,
    title: 'The 5 Triggers and How to Beat Them',
    titleHi: '5 ट्रिगर और उन्हें कैसे हराएं',
    summary: 'Most relapses come from 5 predictable triggers. Learn to identify and disarm them.',
    summaryHi: 'अधिकतर रिलैप्स 5 पूर्वानुमानित ट्रिगर से आते हैं। उन्हें पहचानना और निष्क्रिय करना सीखें।',
    category: 'urge',
    readTime: '6 min',
    icon: Flame,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    content: `## Trigger 1: Boredom

**The trap**: Idle time = your brain defaults to dopamine-seeking.
**Solution**: Schedule every hour. Productive boredom (reading, walking) is fine. Unstructured screen time is dangerous.

## Trigger 2: Stress & Anxiety

**The trap**: Brain seeks relief. PMO provides temporary numbness.
**Solution**: Replace with exercise, cold shower, deep breathing. Address the stress directly.

## Trigger 3: Loneliness

**The trap**: Social disconnection triggers comfort-seeking behavior.
**Solution**: Call a friend. Post in the Urja community. Go somewhere public.

## Trigger 4: Late Night / No Sleep

**The trap**: Willpower depletes after 10 PM. Prefrontal cortex is offline.
**Solution**: Sleep by 10 PM. No phone in bed. Phone charger outside bedroom.

## Trigger 5: Visual Triggers / Accidental Exposure

**The trap**: The brain reacts instantly. One image can hijack the whole evening.
**Solution**: 
- Use content blockers (Cold Turkey, DNS filters)
- Bounce your eyes immediately
- Use the 5-second rule: notice → turn away → move to another room

## The 3 D's Rule
When an urge hits:
1. **Delay** — set a 15-minute timer
2. **Distract** — physical movement
3. **Decide** — after 15 min, the urge is usually gone`,
  },
  {
    id: 5,
    title: 'Cold Shower — The #1 Anti-Urge Tool',
    titleHi: 'ठंडा शॉवर — सबसे बड़ा आवेग-विरोधी उपकरण',
    summary: 'The science and practice of using cold water to kill urges and boost willpower.',
    summaryHi: 'आवेगों को मारने और इच्छाशक्ति बढ़ाने के लिए ठंडे पानी का उपयोग करने का विज्ञान और अभ्यास।',
    category: 'health',
    readTime: '3 min',
    icon: Heart,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    content: `## Why Cold Showers Kill Urges

Cold water triggers the sympathetic nervous system (fight-or-flight). This:
- Floods the body with norepinephrine (100-300% increase)
- Instantly kills sexual arousal signals
- Creates a shock that breaks the urge cycle

Additionally, cold water is associated with alertness and discipline — psychologically reinforcing the NoFap mindset.

## The 30-Day Cold Shower Protocol

**Week 1**: End every shower with 30 seconds cold.
**Week 2**: 60 seconds cold at the end.
**Week 3**: Start with 30 seconds cold, then warm, then cold again.
**Week 4**: Full cold shower, 3-5 minutes.

## Other Benefits

- **Improved circulation**
- **Increased testosterone** (brief cold exposure increases LH, which stimulates testosterone)
- **Reduced inflammation**
- **Stronger immune system** (Wim Hof studies)
- **Mental toughness** — doing hard things daily builds willpower

## The Emergency Protocol

Urge hitting hard? Go turn the shower to cold RIGHT NOW. Stand in it for 2 minutes. The urge will be gone.

> "Every cold shower is a vote for the man you want to become."`,
  },
]

const categoryColors: Record<string, string> = {
  science: 'bg-blue-500/20 text-blue-400',
  spiritual: 'bg-green-500/20 text-green-400',
  urge: 'bg-red-500/20 text-red-400',
  health: 'bg-cyan-500/20 text-cyan-400',
  motivation: 'bg-orange-500/20 text-orange-400',
}

export default function LearnPage() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = ['all', 'science', 'spiritual', 'urge', 'health']

  const filteredArticles = activeFilter === 'all'
    ? articles
    : articles.filter(a => a.category === activeFilter)

  if (selectedArticle) {
    return (
      <div className="min-h-screen pb-28">
        <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <button onClick={() => setSelectedArticle(null)} className="text-white/50 hover:text-white">
              ← Back
            </button>
            <span className="text-sm font-semibold truncate flex-1">{selectedArticle.title}</span>
          </div>
        </div>

        <article className="max-w-2xl mx-auto px-4 py-6 fade-in">
          <div className="mb-6">
            <div className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${categoryColors[selectedArticle.category]}`}>
              {selectedArticle.category}
            </div>
            <h1 className="text-2xl font-black mb-2">{selectedArticle.title}</h1>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <span>📖 {selectedArticle.readTime} read</span>
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="prose prose-invert prose-sm max-w-none">
              {selectedArticle.content.split('\n').map((line: string, i: number) => {
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-lg font-bold mt-6 mb-2 gradient-text">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold text-white/90 mb-1">{line.replace(/\*\*/g, '')}</p>
                }
                if (line.startsWith('> ')) {
                  return (
                    <blockquote key={i} className="border-l-2 border-orange-500 pl-4 italic text-white/70 my-3">
                      {line.replace('> ', '')}
                    </blockquote>
                  )
                }
                if (line.startsWith('- ')) {
                  return <li key={i} className="text-white/70 ml-4 mb-1">{line.replace('- ', '')}</li>
                }
                if (line === '') return <br key={i} />
                return <p key={i} className="text-white/70 mb-2 leading-relaxed">{line}</p>
              })}
            </div>
          </div>
        </article>

        <BottomNav active="learn" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-black text-lg flex items-center gap-2">
            <BookOpen size={18} className="text-green-400" />
            Learn
          </h1>
          <p className="text-xs text-white/40">Science, spirituality & practical tools</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 fade-in">
        {/* Featured */}
        <div
          className="glass-card p-6 border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent cursor-pointer hover:border-orange-500/50 transition-all"
          onClick={() => setSelectedArticle(articles[0])}
        >
          <div className="text-xs text-orange-400 uppercase tracking-widest mb-2">📌 Featured</div>
          <h2 className="text-xl font-black mb-2">{articles[0].title}</h2>
          <p className="text-sm text-white/50 mb-3">{articles[0].summary}</p>
          <div className="flex items-center gap-2 text-sm text-orange-400 font-semibold">
            Read article <ChevronRight size={16} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all capitalize ${
                activeFilter === f
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                  : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Article Cards */}
        <div className="space-y-3">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`glass-card p-5 border ${article.border} cursor-pointer hover:scale-[1.01] transition-all duration-200`}
              onClick={() => setSelectedArticle(article)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${article.bg} flex items-center justify-center flex-shrink-0`}>
                  <article.icon className={article.color} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColors[article.category]}`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-white/30">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{article.title}</h3>
                  <p className="text-xs text-white/50 line-clamp-2">{article.summary}</p>
                </div>
                <ChevronRight size={16} className="text-white/30 flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="learn" />
    </div>
  )
}
