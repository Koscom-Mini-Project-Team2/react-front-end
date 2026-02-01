import React from "react"
import { AlertTriangle, Sparkles, UserCircle } from "lucide-react"

const investmentTypes = [
  {
    tag: "Singles",
    title: "개별 주식",
    description: '"난 하나만 판다! 대박 아니면 쪽박, 자신감 넘치는 스타일"',
    footer: { icon: <AlertTriangle className="w-4 h-4" />, text: "고위험 · 직접 관리" },
    isRecommended: false,
  },
  {
    tag: "Smart Set",
    title: "ETF",
    description: '"반도체? AI? 트렌드에 올라타서 안전하게 수익 내고 싶어!"',
    footer: { icon: <Sparkles className="w-4 h-4" />, text: "밸런스 · 실시간 거래" },
    isRecommended: true,
  },
  {
    tag: "Managed",
    title: "펀드",
    description: '"전부 다 맡길게요. 저는 그냥 지켜보기만 하는 게 편해요."',
    footer: { icon: <UserCircle className="w-4 h-4" />, text: "저위험 · 위탁 수수료" },
    isRecommended: false,
  },
]

export function InvestmentTypes() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 md:mb-20 text-slate-900">
          내 투자 취향은 어디쯤?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {investmentTypes.map((type, index) => (
            <InvestmentCard key={index} {...type} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface InvestmentCardProps {
  tag: string
  title: string
  description: string
  footer: { icon: React.ReactNode; text: string }
  isRecommended: boolean
}

function InvestmentCard({ tag, title, description, footer, isRecommended }: InvestmentCardProps) {
  if (isRecommended) {
    return (
      <div className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-br from-primary to-blue-400 text-white flex flex-col h-full relative overflow-hidden md:scale-105 shadow-2xl shadow-primary/30 z-10">
        {/* Recommended Badge */}
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-[10px] px-3 py-1.5 rounded-full font-black uppercase border border-white/30">
          Recommended
        </div>

        <div className="text-white/70 font-black mb-3 uppercase tracking-widest text-xs">{tag}</div>
        <h4 className="text-2xl md:text-3xl font-black mb-6">{title}</h4>
        <p className="text-white mb-10 flex-grow font-medium text-base md:text-lg leading-snug">{description}</p>
        <div className="pt-6 md:pt-8 border-t border-white/20 text-sm font-black text-white/90 flex items-center gap-2">
          {footer.icon}
          {footer.text}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 md:p-10 rounded-[2rem] border-2 border-slate-100 bg-white/50 flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
      <div className="text-slate-400 font-black mb-3 uppercase tracking-widest text-xs">{tag}</div>
      <h4 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">{title}</h4>
      <p className="text-slate-500 mb-10 flex-grow font-medium text-base md:text-lg">{description}</p>
      <div className="pt-6 md:pt-8 border-t border-dashed border-slate-200 text-sm font-black text-slate-400 flex items-center gap-2">
        {footer.icon}
        {footer.text}
      </div>
    </div>
  )
}
