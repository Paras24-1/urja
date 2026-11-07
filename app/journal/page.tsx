'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/layout/BottomNav'
import { BookOpen, Smile, Zap, Brain, ChevronDown, ChevronUp, Sun, Moon, Heart, Home } from 'lucide-react'
import Link from 'next/link'

export default function JournalPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [today] = useState(new Date().toISOString().split('T')[0])
  const [journal, setJournal] = useState<any>(null)
  const [mood, setMood] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [focus, setFocus] = useState(5)
  const [morningIntention, setMorningIntention] = useState('')
  const [eveningNotes, setEveningNotes] = useState('')
  const [gratitude, setGratitude] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [pastEntries, setPastEntries] = useState<any[]>([])
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (!user) return

      // Load today's journal
      const { data: todayJournal } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single()

      if (todayJournal) {
        setJournal(todayJournal)
        setMood(todayJournal.mood || 5)
        setEnergy(todayJournal.energy || 5)
        setFocus(todayJournal.focus || 5)
        setMorningIntention(todayJournal.morning_intention || '')
        setEveningNotes(todayJournal.evening_notes || '')
        setGratitude(todayJournal.gratitude || '')
      }

      // Load past 7 entries
      const { data: past } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', user.id)
        .neq('date', today)
        .order('date', { ascending: false })
        .limit(7)

      setPastEntries(past || [])
    }
    init()
  }, [])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)

    await supabase.from('journals').upsert({
      user_id: user.id,
      date: today,
      mood,
      energy,
      focus,
      morning_intention: morningIntention,
      evening_notes: eveningNotes,
      gratitude,
    })

    setSaved(true)
    setSaving(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const getMoodEmoji = (val: number) => {
    if (val <= 2) return '😞'
    if (val <= 4) return '😐'
    if (val <= 6) return '🙂'
    if (val <= 8) return '😊'
    return '😄'
  }

  const getEnergyEmoji = (val: number) => {
    if (val <= 3) return '😴'
    if (val <= 6) return '⚡'
    return '🔥'
  }

  const hour = new Date().getHours()
  const isEvening = hour >= 17

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-black text-lg flex items-center gap-2 text-white">
              <BookOpen size={18} className="text-purple-400" />
              Journal
            </h1>
            <p className="text-xs text-white/40">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/60 hover:text-white transition-all">
              <Home size={14} />
              <span>Home</span>
            </Link>
            {isEvening ? (
              <div className="flex items-center gap-1 text-xs text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                <Moon size={12} />
                Evening
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Sun size={12} />
                Morning
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
        {/* Today's Entry */}
        <div className="glass-card p-5 border-purple-500/20">
          <h3 className="font-bold mb-5 flex items-center gap-2 text-sm text-white/70 uppercase tracking-widest">
            Today&apos;s Check-in
          </h3>

          {/* Mood */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Smile size={16} className="text-yellow-400" />
                Mood
              </label>
              <span className="text-xl">{getMoodEmoji(mood)} <span className="text-sm text-white/50">{mood}/10</span></span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={e => setMood(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/30 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Energy */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Zap size={16} className="text-orange-400" />
                Energy
              </label>
              <span className="text-xl">{getEnergyEmoji(energy)} <span className="text-sm text-white/50">{energy}/10</span></span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={e => setEnergy(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: '#f97316' }}
            />
          </div>

          {/* Focus */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Brain size={16} className="text-blue-400" />
                Focus
              </label>
              <span className="text-sm text-white/50">{focus}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={focus}
              onChange={e => setFocus(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: '#3b82f6' }}
            />
          </div>

          {/* Morning Intention */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
              <Sun size={16} className="text-amber-400" />
              Morning Intention
            </label>
            <textarea
              placeholder="What do I want to achieve today? Who do I want to be today?"
              className="input-field resize-none h-20 text-sm"
              value={morningIntention}
              onChange={e => setMorningIntention(e.target.value)}
            />
          </div>

          {/* Gratitude */}
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
              <Heart size={16} className="text-pink-400" />
              3 Things I&apos;m Grateful For
            </label>
            <textarea
              placeholder="1. &#10;2. &#10;3."
              className="input-field resize-none h-20 text-sm"
              value={gratitude}
              onChange={e => setGratitude(e.target.value)}
            />
          </div>

          {/* Evening Notes */}
          {isEvening && (
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                <Moon size={16} className="text-purple-400" />
                Evening Reflection
              </label>
              <textarea
                placeholder="How did today go? What was my biggest win? Any urges? How did I handle them?"
                className="input-field resize-none h-24 text-sm"
                value={eveningNotes}
                onChange={e => setEveningNotes(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
              saved
                ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                : 'btn-primary'
            }`}
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              '✓ Saved!'
            ) : (
              'Save Entry 📖'
            )}
          </button>
        </div>

        {/* Past Entries */}
        {pastEntries.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Past 7 Days</h3>
            <div className="space-y-2">
              {pastEntries.map((entry: any) => {
                const isExpanded = expandedEntry === entry.id
                const date = new Date(entry.date)
                return (
                  <div key={entry.id} className="glass-card overflow-hidden">
                    <button
                      className="w-full p-4 flex items-center justify-between"
                      onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">
                          {date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <span>{getMoodEmoji(entry.mood || 5)} {entry.mood || '–'}</span>
                          <span>⚡{entry.energy || '–'}</span>
                          <span>🧠{entry.focus || '–'}</span>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-2 border-t border-white/5 pt-3">
                        {entry.morning_intention && (
                          <div>
                            <div className="text-xs text-amber-400 mb-1">Morning Intention</div>
                            <p className="text-sm text-white/60">{entry.morning_intention}</p>
                          </div>
                        )}
                        {entry.gratitude && (
                          <div>
                            <div className="text-xs text-pink-400 mb-1">Gratitude</div>
                            <p className="text-sm text-white/60">{entry.gratitude}</p>
                          </div>
                        )}
                        {entry.evening_notes && (
                          <div>
                            <div className="text-xs text-purple-400 mb-1">Evening Notes</div>
                            <p className="text-sm text-white/60">{entry.evening_notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNav active="journal" />
    </div>
  )
}
