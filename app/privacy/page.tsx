import Link from 'next/link'
import { ArrowLeft, Shield, Lock, EyeOff, UserCheck } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy — Urja',
  description: 'Your privacy is sacred. Learn how Urja protects your anonymity.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07080b] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all mb-8"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield size={14} /> Absolute Privacy Guarantee
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">Privacy Shield</h1>
          <p className="text-white/50 text-sm">Last updated: November 2026</p>
        </div>

        <div className="space-y-8 glass-card p-6 sm:p-10 border border-white/10 text-sm leading-relaxed text-white/80">
          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <EyeOff size={18} className="text-orange-400" />
              1. 100% Anonymity by Design
            </h2>
            <p>
              Urja never requires your legal name, physical address, or phone number. When you participate in the community, you post using an anonymous warrior handle or under complete anonymity. Your real identity is never exposed to other members.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Lock size={18} className="text-amber-400" />
              2. Data We Collect
            </h2>
            <p>
              We only store what is strictly necessary to run your habit transformation:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-white/70">
              <li>Authentication email address (managed securely via Supabase Auth)</li>
              <li>Streak counters, check-in dates, and milestone badges earned</li>
              <li>Optional mood and energy ratings logged in your personal journal</li>
              <li>Community posts and replies authored by your alias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <UserCheck size={18} className="text-emerald-400" />
              3. We Never Sell Your Data
            </h2>
            <p>
              Your personal struggle and discipline data will never be sold, rented, or monetized for advertising. Urja is funded through voluntary premium features, not user tracking.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Data Deletion</h2>
            <p>
              You maintain full ownership of your data. You may request complete deletion of your account and associated streak history at any time from your Profile settings.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
