import { TrendingUp } from "lucide-react"

const footerLinks = [
  { label: "이용약관", href: "#" },
  { label: "프라이버시", href: "#" },
  { label: "서포트", href: "#" },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 md:py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-blue-100 rounded-2xl flex items-center justify-center shadow-inner">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Ko-MERIT</span>
        </div>

        {/* Links */}
        <nav className="flex gap-8 md:gap-12 text-sm font-black text-slate-400">
          {footerLinks.map((link, index) => (
            <a key={index} className="hover:text-primary transition-colors" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-sm font-bold text-slate-400">© 2024 Ko-MERIT. Built for MZ.</p>
        </div>
      </div>
    </footer>
  )
}
