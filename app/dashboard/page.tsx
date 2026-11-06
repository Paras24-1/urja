import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch all user data server-side
  const [profileRes, streakRes, journalRes, achievementsRes, tipsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('streaks').select('*').eq('user_id', user.id).single(),
    supabase.from('journals').select('*').eq('user_id', user.id).eq('date', new Date().toISOString().split('T')[0]).single(),
    supabase.from('user_achievements').select('*, achievements(*)').eq('user_id', user.id).order('earned_at', { ascending: false }).limit(3),
    supabase.from('tips').select('*').limit(10),
  ])

  return (
    <DashboardClient
      user={user}
      profile={profileRes.data}
      streak={streakRes.data}
      todayJournal={journalRes.data}
      recentAchievements={achievementsRes.data || []}
      tips={tipsRes.data || []}
    />
  )
}
