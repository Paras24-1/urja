'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/layout/BottomNav'
import { User, Settings, LogOut, Globe, Bell, Shield, ChevronRight, Edit2, Save, Flame } from 'lucide-react'
import { getLevelFromXP, getXPForNextLevel, getStreakEmoji, getStreakTitle } from '@/lib/utils'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [streak, setStreak] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [language, setLanguage] = useState('en')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      setUser(user)

      const [profRes, streakRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('streaks').select('*').eq('user_id', user.id).single(),
      ])

      setProfile(profRes.data)
      setStreak(streakRes.data)
      setDisplayName(profRes.data?.display_name || '')
      setBio(profRes.data?.bio || '')
      setLanguage(profRes.data?.language || 'en')
      setIsAnonymous(profRes.data?.is_anonymous || false)
      setLoading(false)
    }
    init()
  }, [])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    await supabase.from('profiles').update({
      display_name: displayName,
      bio,
      language,
      is_anonymous: isAnonymous,
    }).eq('id', user.id)
    setProfile((p: any) => ({ ...p, display_name: displayName, bio, language, is_anonymous: isAnonymous }))
    setSaving(false)
    setEditing(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    )
  }

  const level = getLevelFromXP(profile?.xp || 0)
  const days = streak?.current_days || 0

  return (
    <div className="min-h-screen pb-28">
      {/* Header */}
      <div className="glass-card border-x-0 border-t-0 rounded-none px-4 py-4 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="font-black text-lg">Profile</h1>
          <button
            onClick={() => setEditing(!editing)}
            className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            {editing ? <><Save size={14} /> Done</> : <><Edit2 size={14} /> Edit</>}
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 fade-in">
        {/* Avatar + Stats */}
        <div className="glass-card p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-orange-500/20">
            <User size={36} className="text-white" />
          </div>

          {editing ? (
            <input
              type="text"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Display name"
              className="input-field text-center text-sm mb-2"
            />
          ) : (
            <h2 className="text-xl font-bold mb-1">{profile?.display_name || profile?.username || 'Warrior'}</h2>
          )}

          <div className="text-sm text-white/40 mb-1">@{profile?.username}</div>

          {editing ? (
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Your bio (optional)..."
              className="input-field text-center text-sm resize-none h-16 mt-2"
            />
          ) : (
            profile?.bio && <p className="text-sm text-white/50 mt-1">{profile.bio}</p>
          )}

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-xl font-black gradient-text">{days}</div>
              <div className="text-xs text-white/40">Day streak</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-amber-400">Lv.{level}</div>
              <div className="text-xs text-white/40">Level</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black gradient-text">{streak?.longest_streak || 0}</div>
              <div className="text-xs text-white/40">Best</div>
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 text-sm text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
            {getStreakEmoji(days)} {getStreakTitle(days)}
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card divide-y divide-white/5 overflow-hidden">
          {/* Language */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Globe size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">Language</div>
                <div className="text-xs text-white/40">App language</div>
              </div>
            </div>
            {editing ? (
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="input-field text-sm w-28 py-1.5"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            ) : (
              <span className="text-sm text-white/50">{language === 'hi' ? 'हिंदी' : 'English'}</span>
            )}
          </div>

          {/* Anonymous mode */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Shield size={18} className="text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">Anonymous Mode</div>
                <div className="text-xs text-white/40">Hide username in community</div>
              </div>
            </div>
            <div
              onClick={() => editing && setIsAnonymous(!isAnonymous)}
              className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${isAnonymous ? 'bg-purple-500' : 'bg-white/20'} ${editing ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${isAnonymous ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </div>

          {/* Account email */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                <User size={18} className="text-white/40" />
              </div>
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-xs text-white/40">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Your Journey</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-2xl font-black gradient-text">{streak?.total_days_clean || 0}</div>
              <div className="text-xs text-white/40 mt-1">Total Clean Days</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-red-400">{streak?.relapses_count || 0}</div>
              <div className="text-xs text-white/40 mt-1">Times Tried Again</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-2xl font-black gradient-text">{profile?.xp || 0}</div>
              <div className="text-xs text-white/40 mt-1">XP Earned</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-amber-400">Lv.{level}</div>
              <div className="text-xs text-white/40 mt-1">Current Level</div>
            </div>
          </div>
        </div>

        {/* Save button */}
        {editing && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '💾 Save Changes'}
          </button>
        )}

        {/* Links */}
        <div className="glass-card divide-y divide-white/5 overflow-hidden">
          <Link href="/leaderboard" className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Flame size={18} className="text-orange-400" />
              <span className="text-sm font-semibold">Leaderboard</span>
            </div>
            <ChevronRight size={16} className="text-white/30" />
          </Link>
          <Link href="/achievements" className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <span>🏆</span>
              <span className="text-sm font-semibold">My Achievements</span>
            </div>
            <ChevronRight size={16} className="text-white/30" />
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn-danger w-full flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Sign Out
        </button>

        <p className="text-center text-xs text-white/20 pb-4">
          Urja v1.0 · Made for India 🇮🇳 · Keep going 🔥
        </p>
      </div>

      <BottomNav active="profile" />
    </div>
  )
}
