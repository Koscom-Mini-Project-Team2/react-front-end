import { Rocket } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-blue-400 rounded-[2.5rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-primary/30 group">
        {/* Background Decorations */}
        <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
        <div className="absolute -bottom-20 -left-20 w-64 md:w-80 h-64 md:h-80 bg-secondary/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-8 md:mb-10 backdrop-blur-md border border-white/30">
            <Rocket className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 md:mb-10 leading-tight text-balance">
            자, 이제 실전으로
            <br />
            가볼까요?
          </h2>

          {/* Subheading */}
          <p className="text-base md:text-xl text-white/80 mb-10 md:mb-14 font-bold max-w-xl mx-auto text-balance">
            간단한 밸런스 게임을 통해 당신에게 딱 맞는 ETF 포트폴리오를 만들어드릴게요.
          </p>

          {/* CTA Button */}
          <Link
            href="/portfolio"
            className="inline-block px-10 md:px-14 py-5 md:py-6 bg-white text-primary font-black text-lg md:text-2xl rounded-[2rem] hover:scale-110 hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)] transition-all"
          >
            포트폴리오 추천받기
          </Link>
        </div>
      </div>
    </section>
  )
}
