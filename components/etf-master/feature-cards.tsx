const features = [
  {
    icon: "🛡️",
    title: "갓벽한 방어력",
    description: "한 곳이 떨어져도 다른 곳이 메워주는 철벽 분산 투자!",
    isHighlighted: false,
  },
  {
    icon: "🤖",
    title: "극강의 편리함",
    description: "전문가가 24시간 관리하니까 나는 그냥 고르기만 하면 끝!",
    isHighlighted: true,
  },
  {
    icon: "🔓",
    title: "오픈 마인드 가격",
    description: "커피 몇 잔 아껴서 전 세계 1등 기업의 주인이 되어보세요.",
    isHighlighted: false,
  },
]

export function FeatureCards() {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 text-balance">
            왜 다들 ETF에 열광할까요?
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-bold">당신이 ETF와 사랑에 빠질 3가지 모먼트</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  isHighlighted: boolean
}

function FeatureCard({ icon, title, description, isHighlighted }: FeatureCardProps) {
  return (
    <div
      className={`p-10 md:p-12 rounded-[2.5rem] text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group relative overflow-hidden ${
        isHighlighted
          ? "border-2 border-primary/20 bg-white/70 backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-primary/10"
      }`}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary to-blue-100 opacity-20 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

      {/* Icon */}
      <div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 md:mb-10 text-4xl md:text-5xl transition-transform ${
          isHighlighted
            ? "bg-gradient-to-br from-primary to-blue-400 shadow-xl shadow-primary/20 group-hover:scale-110"
            : "bg-gradient-to-br from-secondary to-blue-100 group-hover:rotate-12"
        }`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-slate-900">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
    </div>
  )
}
