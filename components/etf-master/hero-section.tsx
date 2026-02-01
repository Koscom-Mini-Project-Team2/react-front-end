import Link from "next/link"
import { CircleDollarSign, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-40 md:pt-48 pb-24 px-6 relative">
      {/* Background Decorations */}
      <div className="absolute top-20 right-[10%] w-48 md:w-72 h-48 md:h-72 bg-secondary rounded-full blur-[100px] opacity-40" />
      <div className="absolute bottom-0 left-[5%] w-40 md:w-64 h-40 md:h-64 bg-primary rounded-full blur-[120px] opacity-10" />

      {/* Floating Icons */}
      <div className="absolute top-32 left-[10%] animate-bounce hidden md:flex" style={{ animationDuration: "4s" }}>
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-400 rounded-full flex items-center justify-center text-white shadow-2xl">
          <CircleDollarSign className="w-8 h-8" />
        </div>
      </div>
      <div className="absolute top-48 right-[15%] animate-bounce hidden md:flex" style={{ animationDuration: "5s" }}>
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl rotate-12">
          <TrendingUp className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/60 border border-white rounded-full mb-8 backdrop-blur-xl shadow-lg shadow-primary/10">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary text-xs font-black uppercase tracking-widest">MZ Investment Guide</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-8 tracking-tighter text-slate-900 text-balance">
          ETF,{" "}
          <span className="text-primary relative inline-block">
            진짜 쉽게
            <svg
              className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 text-secondary/60 -z-10"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="transparent" stroke="currentColor" strokeWidth="8" />
            </svg>
          </span>
          <br />
          알려줄게!
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-semibold leading-relaxed text-balance">
          복잡한 숫자는 빼고, 핵심만 콕!
          <br />
          요즘 애들의 똑똑한 투자 파트너.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          <Link
            href="/portfolio"
            className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-primary to-blue-400 text-white font-black text-base md:text-lg rounded-3xl shadow-2xl shadow-primary/40 hover:-translate-y-2 hover:shadow-primary/30 transition-all duration-300"
          >
            ETF 찾기
          </Link>
          <a
            href="#ai-tutor"
            className="px-8 md:px-10 py-4 md:py-5 bg-white text-slate-900 font-black text-base md:text-lg rounded-3xl shadow-xl hover:bg-slate-50 transition-all border border-slate-100"
          >
            질문하기
          </a>
        </div>
      </div>
    </section>
  )
}
