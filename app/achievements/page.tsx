'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/layout/BottomNav'
import { Trophy, Star, Lock, Zap } from 'lucide-react'

const rarityColors: Record<string, string> = {
  common: 'border-gray-500/30 bg-gray-500/5',
  rare: 'border-blue-500/30 bg-blue-500/5',
  epic: 'border-purple-500/30 bg-purple-500/5',
  legendary: 'border-amber-500/30 bg-amber-500/10',
}

const rarityLabels: Record<string, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary ✨',
}

const rarityTextColors: Record<string, string> = {
  common: 'text-gray-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-amber-400',
}

export default function AchievementsPage() {
  const supabase = createClient()
  const [achievements, setAchievements] = useState<any[]>([])
  const [userAchievements, setUserAchievements] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [streak, setStreak] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'earned' | 'all'>('all')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [achRes, userAchRes, profRes, streakRes] = await Promise.all([
        supabase.from('achievements').select('*').order('condition_value'),
        supabase.from('user_achievements').select('*').eq('user_id', user.id),
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('streaks').select('*').eq('user_id', user.id).single(),
      ])

      setAchievements(achRes.data || [])
      setUserAchievements(userAchRes.data || [])
      setProfile(profRes.data)
      setStreak(streakRes.data)
      setLoading(false)
    }
    init()
  }, [])

  const earnedIds = new Set(userAchievements.map((ua: any) => ua.achievement_id))
  const totalXP = achievements.filter((a: any) => earnedIds.has(a.id)).reduce((sum: number, a: any) => sum + a.xp_reward, 0)

  const displayAchievements = activeTab === 'earned'
    ? achievements.filter((a: any) => earnedIds.has(a.id))
    : achievements

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-black text-lg">Achievements</h1>
          <p className="text-xs text-white/40">Earn badges. Level up. Transform.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 fade-in">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="stat-card text-center">
            <div className="text-2xl font-black gradient-text">{earnedIds.size}</div>
            <div className="text-xs text-white/40">Earned</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-2xl font-black text-amber-400">{profile?.xp || 0}</div>
            <div className="text-xs text-white/40">Total XP</div>
          </div>
          <div className="stat-card text-center">
            <div className="text-2xl font-black gradient-text">{profile?.level || 1}</div>
            <div className="text-xs text-white/40">Level</div>
          </div>
        </div>

        {/* Level card */}
        <div className="glass-card p-5 border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Star className="text-amber-400" size={24} />
            </div>
            <div>
              <div className="font-bold">Level {profile?.level || 1} Warrior</div>
              <div className="text-xs text-white/50">{profile?.xp || 0} XP total</div>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((profile?.xp || 0) % (Math.pow(profile?.level || 1, 2) * 100)) / (Math.pow(profile?.level || 1, 2) * 100) * 100}%`, background: 'linear-gradient(90deg, #f59e0b, #f97316)' }}
            />
          </div>
          <div className="text-xs text-white/30 mt-1 text-right">to Level {(profile?.level || 1) + 1}</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'all' ? 'bg-orange-500 text-white' : 'text-white/50'}`}
          >
            All ({achievements.length})
          </button>
          <button
            onClick={() => setActiveTab('earned')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'earned' ? 'bg-orange-500 text-white' : 'text-white/50'}`}
          >
            Earned ({earnedIds.size})
          </button>
        </div>

        {/* Achievement Cards */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass-card p-5 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl" />
                  <div className="flex-1">
                    <div className="h-4 bg-white/5 rounded mb-2 w-1/2" />
                    <div className="h-3 bg-white/5 rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayAchievements.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🏅</div>
            <p className="text-white/50">No achievements earned yet</p>
            <p className="text-sm text-white/30 mt-1">Keep going! Your first badge is close.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayAchievements.map((ach: any) => {
              const earned = earnedIds.has(ach.id)
              const lang = profile?.language || 'en'
              return (
                <div
                  key={ach.id}
                  className={`achievement-card border ${rarityColors[ach.rarity]} ${!earned ? 'opacity-50' : ''}`}
                >
                  <div className={`text-3xl ${!earned ? 'grayscale' : ''}`}>
                    {earned ? ach.icon : <Lock size={28} className="text-white/30" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {lang === 'hi' && ach.name_hi ? ach.name_hi : ach.name}
                      </span>
                      <span className={`text-xs ${rarityTextColors[ach.rarity]}`}>
                        {rarityLabels[ach.rarity]}
                      </span>
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {lang === 'hi' && ach.description_hi ? ach.description_hi : ach.description}
                    </div>
                    {!earned && (
                      <div className="text-xs text-white/30 mt-1">
                        {ach.condition_type === 'streak_days' && `Need ${ach.condition_value} day streak (${streak?.current_days || 0}/${ach.condition_value})`}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                      <Zap size={12} />
                      {ach.xp_reward} XP
                    </div>
                    {earned && <div className="text-xs text-green-400">✓ Earned</div>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <BottomNav active="achievements" />
    </div>
  )
}
