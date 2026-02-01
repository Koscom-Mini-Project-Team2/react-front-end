import React from "react"
import { BadgeCheck, PiggyBank } from "lucide-react"

const stockIcons = ["🍎", "💻", "🔋", "🎬", "🍔", "🚗"]

export function ETFExplanation() {
  return (
    <section className="py-16 md:py-24 px-6" id="guide">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Visual Card */}
        <div className="flex-1 relative w-full max-w-md mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-br from-secondary to-blue-100 rounded-[2.5rem] blur-2xl opacity-30" />
          <div className="relative w-full aspect-square bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] flex items-center justify-center p-8 md:p-12 shadow-xl shadow-primary/10">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {stockIcons.map((icon, index) => (
                <div
                  key={index}
                  className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-4xl shadow-lg border border-slate-50 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
            <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-primary to-blue-400 text-white rounded-2xl md:rounded-3xl font-black shadow-2xl rotate-3 text-sm md:text-base">
              종합 선물 세트! 💎
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight text-balance">
            ETF는 한 마디로
            <br />
            <span className="text-primary">{"'주식 모둠 박스'"}</span>예요
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
            애플 하나 사기엔 너무 비싸죠? ETF는 인기 있는 주식들을 골고루 담아놓은 쇼핑백과 같아요. 하나만 사도 수많은
            기업의 주주가 될 수 있죠.
          </p>
          <div className="space-y-4">
            <FeatureBadge icon={<BadgeCheck className="w-8 h-8 text-primary" />} text="번거로운 분석 없이 한 번에!" />
            <FeatureBadge icon={<PiggyBank className="w-8 h-8 text-primary" />} text="소액으로 대기업 주주 되기" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-5 p-5 md:p-6 rounded-[2rem] bg-white/60 border border-white backdrop-blur-xl shadow-lg shadow-primary/5">
      {icon}
      <p className="font-extrabold text-base md:text-lg text-slate-800">{text}</p>
    </div>
  )
}
