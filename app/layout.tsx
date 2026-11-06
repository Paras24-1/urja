import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Urja — Take Control of Your Energy',
  description: 'Build discipline, track your streaks, and transform your life with Urja — the self-improvement app for Indian youth.',
  keywords: ['self improvement', 'discipline', 'NoFap', 'brahmacharya', 'habit tracker', 'urja', 'self control', 'Indian youth'],
  authors: [{ name: 'Urja Team' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Urja — Take Control of Your Energy',
    description: 'Build discipline, track your streaks, and transform your life.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Urja',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urja — Take Control of Your Energy',
    description: 'Build discipline, track your streaks, and transform your life.',
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/apple-touch-icon.png',
  },
}

import PWARegister from '@/components/PWARegister'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Urja" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <PWARegister />
        {children}
      </body>
    </html>
  )
}
