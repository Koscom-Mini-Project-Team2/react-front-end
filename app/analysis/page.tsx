"use client"

import React from "react"
import Link from "next/link"
import {
  TrendingUp,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  PieChart,
  BarChart3,
  Target,
  Shield,
  Zap,
  Database,
  Wallet,
  Building2,
  CreditCard,
} from "lucide-react"
import { AIChat } from "@/components/etf-master";

interface ETFRecommendation {
  id: string
  name: string
  ticker: string
  category: string
  riskLevel: "낮음" | "중간" | "높음"
  expectedReturn: string
  description: string
  matchScore: number
}

const recommendations: ETFRecommendation[] = [
  {
    id: "1",
    name: "KODEX 200",
    ticker: "069500",
    category: "국내 대형주",
    riskLevel: "중간",
    expectedReturn: "+8.5%",
    description: "코스피 200 지수를 추종하는 국내 대표 ETF",
    matchScore: 95,
  },
  {
    id: "2",
    name: "TIGER 미국S&P500",
    ticker: "360750",
    category: "미국 대형주",
    riskLevel: "중간",
    expectedReturn: "+12.3%",
    description: "미국 S&P500 지수에 투자하는 글로벌 분산 ETF",
    matchScore: 88,
  },
  {
    id: "3",
    name: "KODEX 단기채권",
    ticker: "153130",
    category: "채권형",
    riskLevel: "낮음",
    expectedReturn: "+3.2%",
    description: "안정적인 수익을 원하는 투자자를 위한 채권 ETF",
    matchScore: 82,
  },
]

function ETFCard({ etf }: { etf: ETFRecommendation }) {
  const riskColors = {
    낮음: "bg-green-100 text-green-700",
    중간: "bg-yellow-100 text-yellow-700",
    높음: "bg-red-100 text-red-700",
  }

  return (
    <div className="group p-6 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-black text-foreground">{etf.name}</h3>
            <span className="text-sm text-muted-foreground font-medium">({etf.ticker})</span>
          </div>
          <span className="text-sm font-semibold text-primary">{etf.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${riskColors[etf.riskLevel]}`}>
            {etf.riskLevel}
          </span>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">{etf.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs text-muted-foreground font-medium">예상 수익률</span>
            <p className="text-lg font-black text-green-600">{etf.expectedReturn}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium">적합도</span>
            <p className="text-lg font-black text-primary">{etf.matchScore}%</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string
  color: string
}) {
  return (
    <div className="p-5 bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <p className="text-xl font-black text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[100px] -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <TrendingUp className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tight text-primary">REME-IK</span>
          </Link>
          <Link
            href="/survey"
            className="flex items-center gap-2 text-muted-foreground font-bold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-card/50"
          >
            <ArrowLeft className="w-4 h-4" />
            다시 분석하기
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Analysis Result Header */}
        <section className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">AI 분석 완료</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 text-balance">
            당신에게 딱 맞는<br />
            <span className="text-primary">ETF 포트폴리오</span>를 찾았어요!
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            투자 성향 분석 결과, 균형잡힌 성장형 투자자입니다
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-14">
          <StatCard icon={Target} label="투자 성향" value="성장형" color="bg-gradient-to-br from-primary to-blue-400" />
          <StatCard icon={Shield} label="위험 허용도" value="중간" color="bg-gradient-to-br from-yellow-400 to-orange-400" />
          <StatCard icon={PieChart} label="추천 ETF" value="3개" color="bg-gradient-to-br from-green-400 to-emerald-500" />
          <StatCard icon={Zap} label="예상 수익" value="+8.2%" color="bg-gradient-to-br from-purple-400 to-pink-500" />
        </section>

        {/* MyData Summary Section */}
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">마이데이터 분석 요약</h2>
          </div>
          <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/30 backdrop-blur-xl rounded-3xl border border-primary/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Total Assets */}
              <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">총 자산</span>
                </div>
                <p className="text-2xl font-black text-foreground">2,450만원</p>
                <p className="text-xs text-green-600 font-semibold mt-1">+12.3% (지난달 대비)</p>
              </div>

              {/* Investment Assets */}
              <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">투자 자산</span>
                </div>
                <p className="text-2xl font-black text-foreground">850만원</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">전체 자산의 34.7%</p>
              </div>

              {/* Monthly Savings */}
              <div className="p-5 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">월 평균 저축</span>
                </div>
                <p className="text-2xl font-black text-foreground">65만원</p>
                <p className="text-xs text-muted-foreground font-medium mt-1">수입의 약 28%</p>
              </div>
            </div>

            {/* Current Holdings Summary */}
            <div className="p-4 bg-card/60 rounded-2xl border border-border/30">
              <h4 className="text-sm font-bold text-foreground mb-3">현재 보유 상품</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">삼성전자 320만원</span>
                <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">KODEX 200 180만원</span>
                <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">국민은행 예금 850만원</span>
                <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">카카오 150만원</span>
                <span className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-bold rounded-full">+2개 더보기</span>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Allocation */}
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">추천 포트폴리오 비중</h2>
          </div>
          <div className="p-6 bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50">
            <div className="flex gap-2 h-8 rounded-full overflow-hidden mb-4">
              <div className="bg-primary flex-[50] flex items-center justify-center">
                <span className="text-xs font-bold text-white">국내주식 50%</span>
              </div>
              <div className="bg-blue-400 flex-[30] flex items-center justify-center">
                <span className="text-xs font-bold text-white">해외주식 30%</span>
              </div>
              <div className="bg-green-400 flex-[20] flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">채권 20%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              안정성과 성장성의 균형을 맞춘 포트폴리오입니다. 국내외 주식에 80%, 채권에 20%를 배분하여 적정 수준의 리스크로 높은 수익을 추구합니다.
            </p>
          </div>
        </section>

        {/* ETF Recommendations */}
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">맞춤 ETF 추천</h2>
          </div>
          <div className="flex flex-col gap-4">
            {recommendations.map((etf) => (
              <ETFCard key={etf.id} etf={etf} />
            ))}
          </div>
        </section>

        <AIChat />

        {/* CTA Section */}
        <section className="text-center py-10 md:py-14">
          <div className="p-8 md:p-12 bg-gradient-to-br from-primary to-blue-400 rounded-[2rem] text-white">
            <h3 className="text-2xl md:text-3xl font-black mb-3">지금 바로 투자를 시작해보세요!</h3>
            <p className="text-white/80 mb-6 font-medium">
              REME-IK과 함께 스마트한 투자의 첫 걸음을 내딛어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-2xl hover:scale-105 transition-all"
              >
                홈으로 돌아가기
              </Link>
              <Link
                href="/rebalancing"
                className="px-8 py-4 bg-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/30 transition-all"
              >
                포트폴리오 저장하기 및 알림 받기
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
