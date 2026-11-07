'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Shield, Users, BookOpen, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

export default function BottomNav({ active }: { active?: string }) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => {
        setIsAuthenticated(!!data?.user)
      }).catch(() => {
        setIsAuthenticated(false)
      })
    } catch {
      setIsAuthenticated(false)
    }
  }, [])

  // If user is logged in, Home routes to dashboard; if guest, Home routes to landing page
  const homeHref = isAuthenticated ? '/dashboard' : '/'

  const navItems = [
    { 
      href: homeHref, 
      icon: Home, 
      label: 'Home', 
      key: 'home',
      matches: ['/', '/dashboard'] 
    },
    { 
      href: '/sos', 
      icon: Shield, 
      label: 'SOS', 
      key: 'sos',
      matches: ['/sos'] 
    },
    { 
      href: '/community', 
      icon: Users, 
      label: 'Community', 
      key: 'community',
      matches: ['/community'] 
    },
    { 
      href: '/learn', 
      icon: BookOpen, 
      label: 'Learn', 
      key: 'learn',
      matches: ['/learn'] 
    },
    { 
      href: '/achievements', 
      icon: Trophy, 
      label: 'Badges', 
      key: 'achievements',
      matches: ['/achievements'] 
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="glass-card border-x-0 border-b-0 rounded-none px-2 py-2 bg-[#0a0c10]/95 backdrop-blur-xl border-t border-white/[0.08]">
        <div className="max-w-2xl mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = 
              active === item.key || 
              (active === 'dashboard' && item.key === 'home') ||
              item.matches.includes(pathname)

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'nav-link flex-1 py-1 transition-all',
                  isActive ? 'text-orange-400 font-bold' : 'text-white/40 hover:text-white/80'
                )}
              >
                {item.key === 'sos' ? (
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/40 -mt-5 mb-0.5 active:scale-95 transition-transform">
                      <item.icon size={22} className="text-white" />
                    </div>
                    <div className="absolute top-[-20px] w-12 h-12 rounded-full bg-red-500/40 animate-ping pointer-events-none" />
                    <span className={cn('text-xs font-bold', isActive ? 'text-red-400' : 'text-red-400/90')}>SOS</span>
                  </div>
                ) : (
                  <>
                    <item.icon size={20} className={isActive ? 'text-orange-400' : 'text-white/40'} />
                    <span className="text-[11px] font-medium tracking-tight mt-0.5">{item.label}</span>
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
