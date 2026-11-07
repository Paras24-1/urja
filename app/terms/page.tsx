import Link from 'next/link'
import { ArrowLeft, FileText, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Terms of Discipline — Urja',
  description: 'Our code of brotherhood and community guidelines.',
}

export default function TermsPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText size={14} /> Code of Brotherhood
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">Terms of Discipline</h1>
          <p className="text-white/50 text-sm">Last updated: November 2026</p>
        </div>

        <div className="space-y-8 glass-card p-6 sm:p-10 border border-white/10 text-sm leading-relaxed text-white/80">
          <section>
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-orange-400" />
              1. Acceptance of Community Code
            </h2>
            <p>
              By joining Urja, you commit to upholding the principles of self-mastery, mutual respect, and constructive encouragement within our community.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Respect & Safe Environment</h2>
            <p>
              The community exists to empower individuals overcoming behavioral compulsion. We have zero tolerance for hate speech, harassment, triggering explicit content, or predatory behavior. Violators will be banned immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Health Disclaimer</h2>
            <p>
              Urja is an educational, self-improvement, and behavioral habit tracking platform. Content provided across our Learn Academy and SOS suites does not replace professional psychiatric or medical treatment. If you are experiencing clinical depression or severe distress, please consult a qualified healthcare professional.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Service Availability</h2>
            <p>
              We strive for 99.9% uptime and offline capability via Progressive Web App technology. We reserve the right to modify or enhance features to better serve the brotherhood.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
