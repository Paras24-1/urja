'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Flame, Shield, Users, BookOpen, Trophy, User, Calendar, Zap, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { getStreakEmoji, getStreakTitle, getStreakColor, getMotivationalMessage, formatStreak, getLevelFromXP, getXPForNextLevel } from '@/lib/utils'
import BottomNav from '@/components/layout/BottomNav'

interface DashboardClientProps {
  user: any
  profile: any
  streak: any
  todayJournal: any
  recentAchievements: any[]
  tips: any[]
}

export default function DashboardClient({
  user,
  profile,
  streak,
  todayJournal,
  recentAchievements,
  tips,
}: DashboardClientProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [checkInDone, setCheckInDone] = useState(!!todayJournal)
  const [showRelapseModal, setShowRelapseModal] = useState(false)
  const [relapseNote, setRelapseNote] = useState('')
  const [relapseTrigger, setRelapseTrigger] = useState('')
  const [currentTipIndex] = useState(Math.floor(Math.random() * Math.min(tips.length, 10)))

  const days = streak?.current_days || 0
  const level = getLevelFromXP(profile?.xp || 0)
  const xpForNext = getXPForNextLevel(level)
  const xpProgress = ((profile?.xp || 0) % xpForNext) / xpForNext * 100
  const lang = profile?.language || 'en'

  const handleDailyCheckIn = async () => {
    if (checkInDone) return
    setIsCheckingIn(true)

    const today = new Date().toISOString().split('T')[0]

    // Update streak
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const lastCheckIn = streak?.last_check_in

    let newDays = days
    if (!lastCheckIn || lastCheckIn === yesterday) {
      newDays = days + 1
    } else if (lastCheckIn !== today) {
      // streak broken
      newDays = 1
    }

    await supabase.from('streaks').update({
      current_days: newDays,
      longest_streak: Math.max(newDays, streak?.longest_streak || 0),
      last_check_in: today,
      total_days_clean: (streak?.total_days_clean || 0) + 1,
    }).eq('user_id', user.id)

    // Award XP
    await supabase.from('profiles').update({
      xp: (profile?.xp || 0) + 50,
    }).eq('id', user.id)

    // Create journal entry
    await supabase.from('journals').upsert({
      user_id: user.id,
      date: today,
    })

    setCheckInDone(true)
    setIsCheckingIn(false)
    router.refresh()
  }

  const handleRelapse = async () => {
    await supabase.from('relapses').insert({
      user_id: user.id,
      trigger: relapseTrigger,
      notes: relapseNote,
    })

    await supabase.from('streaks').update({
      current_days: 0,
      streak_start_date: new Date().toISOString().split('T')[0],
      last_check_in: null,
      relapses_count: (streak?.relapses_count || 0) + 1,
    }).eq('user_id', user.id)

    setShowRelapseModal(false)
    router.refresh()
  }

  const currentTip = tips[currentTipIndex]

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <span className="font-black gradient-text">URJA</span>
            </div>
            <p className="text-xs text-white/40">Hey, {profile?.username || 'Warrior'} 👋</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-white/40">Level {level}</div>
              <div className="text-sm font-bold text-amber-400">{profile?.xp || 0} XP</div>
            </div>
            <Link href="/profile" className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <User size={16} className="text-orange-400" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 fade-in">
        {/* Main Streak Card */}
        <div className="glass-card p-6 text-center border-orange-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
          
          {/* Streak ring */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="w-36 h-36 rounded-full border-4 border-orange-500/20 flex items-center justify-center relative">
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"
                style={{ animationDuration: '3s' }}
              />
              <div className="text-center">
                <div className="text-5xl font-black gradient-text">{days}</div>
                <div className="text-xs text-white/50 font-medium uppercase tracking-widest">days</div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 text-2xl">{getStreakEmoji(days)}</div>
          </div>

          <div className="text-sm text-orange-400 font-semibold uppercase tracking-widest mb-1">
            {getStreakTitle(days)}
          </div>
          <p className="text-white/60 text-sm mb-6 max-w-xs mx-auto">
            {getMotivationalMessage(days, lang)}
          </p>

          {/* XP Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-white/40 mb-2">
              <span>Level {level}</span>
              <span>{Math.round(xpProgress)}% to Level {level + 1}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${xpProgress}%` }} />
            </div>
          </div>

          {/* Check-in Button */}
          {!checkInDone ? (
            <button
              onClick={handleDailyCheckIn}
              disabled={isCheckingIn}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCheckingIn ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle size={18} />
                  Daily Check-In (+50 XP)
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-semibold py-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <CheckCircle size={16} />
              Checked in today! Great work! 🎉
            </div>
          )}

          <button
            onClick={() => setShowRelapseModal(true)}
            className="mt-3 text-xs text-white/30 hover:text-red-400 transition-colors w-full text-center"
          >
            I relapsed — Log it honestly
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="stat-card text-center">
            <div className="text-2xl font-black gradient-text">{streak?.longest_streak || 0}</div>
            <div className="text-xs text-white/40">Best Streak</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-2xl font-black gradient-text">{streak?.total_days_clean || 0}</div>
            <div className="text-xs text-white/40">Total Clean</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-2xl font-black gradient-text">{recentAchievements.length}</div>
            <div className="text-xs text-white/40">Badges</div>
          </div>
        </div>

        {/* SOS Card */}
        <Link href="/sos" className="block glass-card p-5 border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="text-red-400" size={24} />
            </div>
            <div className="flex-1">
              <div className="font-bold flex items-center gap-2">
                🚨 SOS — Urge Hitting?
              </div>
              <div className="text-sm text-white/50 mt-0.5">
                Tap here NOW for breathing, timer & emergency tools
              </div>
            </div>
            <div className="text-red-400">→</div>
          </div>
        </Link>

        {/* Daily Tip */}
        {currentTip && (
          <div className="glass-card p-5 border-amber-500/20 bg-amber-500/5">
            <div className="text-xs text-amber-400 uppercase tracking-widest font-semibold mb-2">💡 Daily Wisdom</div>
            <p className="text-white/80 text-sm leading-relaxed">
              {lang === 'hi' && currentTip.content_hi ? currentTip.content_hi : currentTip.content}
            </p>
            {currentTip.author && (
              <p className="text-xs text-white/30 mt-2">— {currentTip.author}</p>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/journal" className="glass-card p-4 hover:border-purple-500/30 transition-all duration-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center">
                <BookOpen className="text-purple-400" size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Journal</div>
                <div className="text-xs text-white/40">Today's entry</div>
              </div>
            </Link>

            <Link href="/achievements" className="glass-card p-4 hover:border-amber-500/30 transition-all duration-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center">
                <Trophy className="text-amber-400" size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Achievements</div>
                <div className="text-xs text-white/40">View badges</div>
              </div>
            </Link>

            <Link href="/community" className="glass-card p-4 hover:border-blue-500/30 transition-all duration-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <Users className="text-blue-400" size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Community</div>
                <div className="text-xs text-white/40">Share & connect</div>
              </div>
            </Link>

            <Link href="/leaderboard" className="glass-card p-4 hover:border-green-500/30 transition-all duration-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center">
                <TrendingUp className="text-green-400" size={18} />
              </div>
              <div>
                <div className="text-sm font-semibold">Leaderboard</div>
                <div className="text-xs text-white/40">Top warriors</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Achievements */}
        {recentAchievements.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">Recent Badges</h3>
              <Link href="/achievements" className="text-xs text-orange-400">View all</Link>
            </div>
            <div className="space-y-2">
              {recentAchievements.map((ua: any) => (
                <div key={ua.id} className="achievement-card">
                  <div className="text-2xl">{ua.achievements?.icon}</div>
                  <div>
                    <div className="text-sm font-semibold">{ua.achievements?.name}</div>
                    <div className="text-xs text-white/40">{ua.achievements?.description}</div>
                  </div>
                  <div className="ml-auto text-xs text-amber-400 font-semibold">+{ua.achievements?.xp_reward} XP</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Relapse Modal */}
      {showRelapseModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center p-4">
          <div className="glass-card p-6 w-full max-w-sm border-red-500/20 slide-up">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">💪</div>
              <h3 className="text-lg font-bold">That's okay, Warrior</h3>
              <p className="text-sm text-white/50 mt-1">
                Every master has failed. What matters is you're here, being honest.
              </p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">What was the trigger?</label>
                <input
                  type="text"
                  placeholder="e.g., boredom, stress, late night..."
                  className="input-field text-sm"
                  value={relapseTrigger}
                  onChange={e => setRelapseTrigger(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Any notes? (optional)</label>
                <textarea
                  placeholder="Reflect on what happened..."
                  className="input-field text-sm resize-none h-20"
                  value={relapseNote}
                  onChange={e => setRelapseNote(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowRelapseModal(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={handleRelapse} className="btn-danger flex-1">
                Reset & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav active="dashboard" />
    </div>
  )
}
