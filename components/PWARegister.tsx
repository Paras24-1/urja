'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Urja SW registered:', registration.scope)
          })
          .catch((err) => {
            console.log('Urja SW registration failed:', err)
          })
      })
    }
  }, [])

  return null
}
