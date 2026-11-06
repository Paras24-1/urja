import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatStreak(days: number): string {
  if (days === 0) return 'Starting fresh...'
  if (days === 1) return '1 day'
  return `${days} days`
}

export function getStreakEmoji(days: number): string {
  if (days === 0) return '🌱'
  if (days < 3) return '🔥'
  if (days < 7) return '⚡'
  if (days < 14) return '💪'
  if (days < 21) return '🏅'
  if (days < 30) return '💎'
  if (days < 60) return '👑'
  if (days < 90) return '🕉️'
  return '🌟'
}

export function getStreakTitle(days: number): string {
  if (days === 0) return 'Seedling'
  if (days < 3) return 'Warrior'
  if (days < 7) return 'Fighter'
  if (days < 14) return 'Champion'
  if (days < 21) return 'Hero'
  if (days < 30) return 'Legend'
  if (days < 60) return 'Master'
  if (days < 90) return 'Grandmaster'
  return 'Brahmacharya Master'
}

export function getStreakColor(days: number): string {
  if (days === 0) return 'text-gray-400'
  if (days < 3) return 'text-orange-400'
  if (days < 7) return 'text-yellow-400'
  if (days < 14) return 'text-green-400'
  if (days < 30) return 'text-blue-400'
  if (days < 60) return 'text-purple-400'
  return 'text-amber-400'
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100
}

export function getMotivationalMessage(days: number, lang: 'en' | 'hi' = 'en'): string {
  const messages = {
    en: [
      "Every journey starts with a single step. You got this! 💪",
      "Day 1 is the hardest. You're already stronger than yesterday.",
      "3 days! Your brain is already changing. Keep going!",
      "One week strong! Testosterone is rising. Feel the power!",
      "Two weeks! You're rewiring your brain. The old you is fading.",
      "21 days! You've broken the habit cycle. This is transformation!",
      "One month! You are a different person now. Respect! 👑",
      "60 days! You're in the top 5% who make it this far. Incredible!",
      "90 days! Full transformation achieved. You are a Brahmacharya Master! 🕉️",
    ],
    hi: [
      "हर यात्रा एक कदम से शुरू होती है। आप यह कर सकते हैं! 💪",
      "पहला दिन सबसे कठिन है। आप कल से पहले से मजबूत हैं।",
      "3 दिन! आपका दिमाग पहले से बदल रहा है। जारी रखें!",
      "एक सप्ताह मजबूत! टेस्टोस्टेरोन बढ़ रहा है। शक्ति महसूस करें!",
      "दो सप्ताह! आप अपने दिमाग को फिर से जोड़ रहे हैं।",
      "21 दिन! आपने आदत का चक्र तोड़ दिया। यह परिवर्तन है!",
      "एक महीना! आप अब एक अलग इंसान हैं। सम्मान! 👑",
      "60 दिन! आप शीर्ष 5% में हैं। अविश्वसनीय!",
      "90 दिन! पूर्ण परिवर्तन। आप ब्रह्मचर्य मास्टर हैं! 🕉️",
    ]
  }

  const msgs = messages[lang]
  if (days === 0) return msgs[0]
  if (days === 1) return msgs[1]
  if (days <= 3) return msgs[2]
  if (days <= 7) return msgs[3]
  if (days <= 14) return msgs[4]
  if (days <= 21) return msgs[5]
  if (days <= 30) return msgs[6]
  if (days <= 60) return msgs[7]
  return msgs[8]
}

export function timeAgo(date: string): string {
  const now = new Date()
  const past = new Date(date)
  const diff = now.getTime() - past.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return past.toLocaleDateString('en-IN')
}

export function getDaysSince(date: string): number {
  const start = new Date(date)
  const now = new Date()
  const diff = now.getTime() - start.getTime()
  return Math.floor(diff / 86400000)
}
