'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Shield, Users, BookOpen, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Home', key: 'dashboard' },
  { href: '/sos', icon: Shield, label: 'SOS', key: 'sos' },
  { href: '/community', icon: Users, label: 'Community', key: 'community' },
  { href: '/learn', icon: BookOpen, label: 'Learn', key: 'learn' },
  { href: '/achievements', icon: Trophy, label: 'Badges', key: 'achievements' },
]

export default function BottomNav({ active }: { active?: string }) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="glass-card border-x-0 border-b-0 rounded-none px-2 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = active === item.key || pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link flex-1 py-1',
                  isActive && 'active',
                )}
              >
                {item.key === 'sos' ? (
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40 -mt-5 mb-0.5">
                      <item.icon size={22} className="text-white" />
                    </div>
                    <div className="absolute top-[-20px] w-12 h-12 rounded-full bg-red-500/40 animate-ping" />
                    <span className={cn('text-xs', isActive ? 'text-red-400' : 'text-red-500/70')}>SOS</span>
                  </div>
                ) : (
                  <>
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
