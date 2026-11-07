'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import BottomNav from '@/components/layout/BottomNav'
import { TrendingUp, Flame, Crown, Home } from 'lucide-react'
import Link from 'next/link'
import { getStreakEmoji, getStreakTitle } from '@/lib/utils'

export default function LeaderboardPage() {
  const supabase = createClient()
  const [leaders, setLeaders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [myRank, setMyRank] = useState<number | null>(null)
  const [myStreak, setMyStreak] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'global' | 'weekly'>('global')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data } = await supabase
        .from('streaks')
        .select('*, profiles(username, level, is_anonymous)')
        .order('current_days', { ascending: false })
        .limit(100)

      setLeaders(data || [])
      setLoading(false)

      if (user) {
        const idx = (data || []).findIndex((s: any) => s.user_id === user.id)
        setMyRank(idx >= 0 ? idx + 1 : null)
        setMyStreak((data || []).find((s: any) => s.user_id === user.id))
      }
    }
    init()
  }, [])

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRowBg = (rank: number) => {
    if (rank === 1) return 'border-amber-500/40 bg-amber-500/5'
    if (rank === 2) return 'border-gray-400/30 bg-gray-400/5'
    if (rank === 3) return 'border-orange-700/30 bg-orange-900/5'
    return ''
  }

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-black text-lg flex items-center gap-2 text-white">
              <TrendingUp size={18} className="text-emerald-400" />
              Leaderboard
            </h1>
            <p className="text-xs text-white/40">Top warriors by clean streak</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/60 hover:text-white transition-all">
              <Home size={14} />
              <span>Home</span>
            </Link>
            <Crown className="text-amber-400" size={24} />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 fade-in">
        {/* My rank */}
        {myStreak && (
          <div className="glass-card p-4 border-orange-500/30 bg-orange-500/5">
            <div className="text-xs text-orange-400 uppercase tracking-widest mb-2">Your Rank</div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black gradient-text">
                {myRank ? (myRank <= 100 ? `#${myRank}` : '100+') : 'Unranked'}
              </div>
              <div>
                <div className="font-semibold flex items-center gap-1">
                  {getStreakEmoji(myStreak.current_days)} {myStreak.current_days} day streak
                </div>
                <div className="text-xs text-white/40">{getStreakTitle(myStreak.current_days)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('global')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'global' ? 'bg-orange-500 text-white' : 'text-white/50'}`}
          >
            🌍 Global
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'weekly' ? 'bg-orange-500 text-white' : 'text-white/50'}`}
          >
            📅 This Week
          </button>
        </div>

        {/* Top 3 Podium */}
        {!loading && leaders.length >= 3 && (
          <div className="flex items-end justify-center gap-3 py-4">
            {/* 2nd */}
            <div className="text-center flex-1">
              <div className="text-2xl mb-1">🥈</div>
              <div className="bg-gray-500/20 border border-gray-500/30 rounded-t-xl pt-6 pb-3 px-2">
                <div className="text-sm font-bold">
                  {leaders[1]?.profiles?.is_anonymous ? '🎭 Anon' : (leaders[1]?.profiles?.username || 'Warrior')}
                </div>
                <div className="text-xs text-white/50 font-mono">{leaders[1]?.current_days}d 🔥</div>
              </div>
            </div>

            {/* 1st */}
            <div className="text-center flex-1">
              <div className="text-3xl mb-1">👑</div>
              <div className="bg-amber-500/20 border border-amber-500/30 rounded-t-xl pt-10 pb-3 px-2">
                <div className="text-sm font-bold">
                  {leaders[0]?.profiles?.is_anonymous ? '🎭 Anon' : (leaders[0]?.profiles?.username || 'Warrior')}
                </div>
                <div className="text-xs text-amber-400 font-mono font-bold">{leaders[0]?.current_days}d 🔥</div>
              </div>
            </div>

            {/* 3rd */}
            <div className="text-center flex-1">
              <div className="text-2xl mb-1">🥉</div>
              <div className="bg-orange-900/20 border border-orange-700/30 rounded-t-xl pt-4 pb-3 px-2">
                <div className="text-sm font-bold">
                  {leaders[2]?.profiles?.is_anonymous ? '🎭 Anon' : (leaders[2]?.profiles?.username || 'Warrior')}
                </div>
                <div className="text-xs text-white/50 font-mono">{leaders[2]?.current_days}d 🔥</div>
              </div>
            </div>
          </div>
        )}

        {/* Full list */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="glass-card p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-white/5 rounded-full" />
                  <div className="flex-1 h-4 bg-white/5 rounded" />
                  <div className="w-16 h-4 bg-white/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {leaders.map((leader: any, index: number) => {
              const rank = index + 1
              const isAnon = leader.profiles?.is_anonymous
              const username = isAnon ? '🎭 Anonymous Warrior' : (leader.profiles?.username || 'Warrior')
              return (
                <div key={leader.id} className={`glass-card p-4 border ${getRowBg(rank)}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center text-sm font-bold text-white/60">
                      {getMedalEmoji(rank)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold flex items-center gap-2">
                        {username}
                        <span className="text-xs text-white/30">Lv.{leader.profiles?.level || 1}</span>
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">{getStreakTitle(leader.current_days)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold flex items-center gap-1 justify-end">
                        <Flame size={14} className="text-orange-400" />
                        <span className="gradient-text">{leader.current_days}</span>
                      </div>
                      <div className="text-xs text-white/30">days</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {leaders.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🏆</div>
            <p className="text-white/50">No warriors yet. Be the first!</p>
          </div>
        )}
      </div>

      <BottomNav active="leaderboard" />
    </div>
  )
}
