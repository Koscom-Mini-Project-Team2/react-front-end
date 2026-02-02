"use client"

import Link from "next/link"
import {
  TrendingUp,
  PieChart,
  RefreshCw,
  HelpCircle,
  AlertTriangle,
  ChevronRight,
  Settings,
  Mail,
} from "lucide-react"
import { useEffect, useState, useMemo } from "react"

// Portfolio data
const portfolioItems = [
  { name: "KODEX 200", percentage: 40, color: "bg-primary" },
  { name: "TIGER 미국S&P500", percentage: 35, color: "bg-blue-400" },
  { name: "ARIRANG 고배당", percentage: 25, color: "bg-emerald-400" },
]

// Rebalancing changes
const rebalancingChanges = [
  { name: "KODEX 200", before: 45, after: 40 },
  { name: "TIGER 미국S&P500", before: 30, after: 35 },
  { name: "ARIRANG 고배당", before: 25, after: 25 },
]

// 색상 팔레트 정의
const colorPalette = [
  "bg-primary",
  "bg-blue-400",
  "bg-emerald-400",
  "bg-purple-400",
  "bg-orange-400",
]

// currentPortfolio 타입 정의
interface PortfolioItem {
  etfId: number
  etfName: string
  category: string
  currentWeight: number
}

// 비율 높은 순으로 색상 할당하는 함수
const assignColorsToPortfolio = (portfolio: PortfolioItem[]) => {
  // 1. currentWeight 기준으로 내림차순 정렬
  const sorted = [...portfolio].sort((a, b) => b.currentWeight - a.currentWeight)
  
  // 2. 정렬된 순서대로 색상 할당
  return sorted.map((item, index) => ({
    ...item,
    color: colorPalette[index % colorPalette.length] // 색상이 부족하면 반복
  }))
}

export default function RebalancingResultPage() {
  const [rebalancingData, setRebalancingData] = useState<any>(null)

  useEffect(() => {
    // sessionStorage에서 데이터 가져오기
    const storedData = sessionStorage.getItem('rebalancingResult')
    if (storedData) {
      setRebalancingData(JSON.parse(storedData))
      // 사용 후 삭제 (선택사항)
      sessionStorage.removeItem('rebalancingResult')
    }
  }, [])

  console.log('Rebalancing Result data:', rebalancingData);

  // useMemo로 색상 할당된 포트폴리오 생성 (최적화)
  const portfolioWithColors = useMemo(() => {
    if (!rebalancingData?.currentPortfolio) {
      return []
    }
    return assignColorsToPortfolio(rebalancingData.currentPortfolio)
  }, [rebalancingData]) // rebalancingData를 의존성으로 변경

  console.log('> portfolioWithColors:', portfolioWithColors);


  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[100px] -z-10" />

      {/* Email-style Container */}
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-card/90 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-border/50 bg-gradient-to-br from-primary/5 to-secondary/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-lg font-black tracking-tight text-primary">Ko-MERIT</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2 text-balance">
              이번 리밸런싱 결과를 정리해봤어
            </h1>
            <p className="text-muted-foreground font-medium">
              지금의 너 기준으로 이렇게 달라졌어
            </p>
          </div>

          {/* Intro Message */}
          <div className="p-6 md:p-8 border-b border-border/30">
            <p className="text-foreground leading-relaxed">
              지난 설정한 주기에 맞춰 포트폴리오를 다시 점검했어.
              <br />
              큰 변화는 아니지만, 지금 자산 상황에 맞게 조금 다듬었어.
            </p>
          </div>

          {/* Card Sections */}
          <div className="p-6 md:p-8 flex flex-col gap-6">
            {/* 1. Portfolio Summary Card */}
            {/* <div className="p-5 bg-gradient-to-br from-primary/5 to-secondary/20 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">현재 포트폴리오 한눈에 보기</h2>
              </div>
              <div className="flex flex-col gap-3">
                {portfolioItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-foreground">{item.name}</span>
                        <span className="text-sm font-bold text-primary">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="p-5 bg-gradient-to-br from-primary/5 to-secondary/20 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">현재 포트폴리오 한눈에 보기</h2>
              </div>
              <div className="flex flex-col gap-3">
                {portfolioWithColors.map((item) => (
                  <div key={item.etfId} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-foreground">{item.etfName}</span>
                        <span className="text-sm font-bold text-primary">{item.currentWeight}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all`}
                          style={{ width: `${item.currentWeight}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Rebalancing Result Card */}
            <div className="p-5 bg-card/60 rounded-2xl border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">이번에 이렇게 조정했어</h2>
              </div>
              
              {/* Before/After Comparison */}
              <div className="mb-5">
                <div className="grid grid-cols-3 gap-2 text-xs font-bold text-muted-foreground mb-3 px-1">
                  <span>ETF</span>
                  <span className="text-center">이전</span>
                  <span className="text-center">이후</span>
                </div>
                {rebalancingChanges.map((item) => (
                  <div key={item.name} className="grid grid-cols-3 gap-2 py-3 border-b border-border/30 last:border-0">
                    <span className="text-sm font-bold text-foreground">{item.name}</span>
                    <span className="text-sm text-muted-foreground text-center">{item.before}%</span>
                    <span className={`text-sm font-bold text-center ${item.after > item.before ? "text-green-600" : item.after < item.before ? "text-red-500" : "text-foreground"}`}>
                      {item.after}%
                      {item.after > item.before && " (+)"}
                      {item.after < item.before && " (-)"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bullet Points */}
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p>- 변동성이 조금 높은 ETF 비중을 줄였어</p>
                <p>- 상대적으로 안정적인 자산 비중을 늘렸어</p>
              </div>
            </div>

            {/* 3. Why This Change Card */}
            <div className="p-5 bg-card/60 rounded-2xl border border-border/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">왜 이런 조정을 했냐면</h2>
              </div>
              <div className="flex flex-col gap-3 text-sm text-foreground leading-relaxed">
                <p>- 최근 자산 변동이 컸고</p>
                <p>- 네가 선택한 투자 성향 기준으로는</p>
                <p>- 이 구성이 더 편할 것 같아서</p>
              </div>
            </div>

            {/* 4. Risk & Reminder Card */}
            <div className="p-5 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">이건 꼭 알고 있어</h2>
              </div>
              <div className="flex flex-col gap-2 text-sm text-orange-800">
                <p>- 단기적으로는 여전히 흔들릴 수 있어</p>
                <p>- 이건 참고용이고, 최종 선택은 항상 네 몫이야</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-6 md:p-8 border-t border-border/30 bg-gradient-to-br from-primary/5 to-secondary/10">
            <div className="flex flex-col gap-4">
              <Link
                href="/analysis"
                className="w-full py-4 bg-gradient-to-r from-primary to-blue-400 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:scale-[1.02] hover:-translate-y-1 transition-all active:scale-95"
              >
                지금 내 ETF 다시 보기
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/rebalancing"
                className="w-full py-3 text-muted-foreground font-bold text-sm text-center hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                리밸런싱 주기 바꾸기
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 md:p-8 border-t border-border/30 bg-muted/30">
            <div className="flex flex-col items-center gap-3 text-center">
              <Link
                href="#"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="w-3 h-3" />
                알림 설정 변경 / 수신 거부
              </Link>
              <p className="text-sm text-muted-foreground">
                필요할 때만, 부담 안 되게 알려줄게
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
