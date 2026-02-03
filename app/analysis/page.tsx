"use client"

import React, { useEffect, useState, useMemo} from "react"
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
  MessageCircle,
  X,
} from "lucide-react"
import { AIChat } from "@/components/etf-master";


interface ETFRecommendation {
  id: number
  name: string
  ticker: string
  category: string
  riskLevel: "낮음" | "중간" | "높음"
  expectedReturn: string
  description: string
  matchScore: number
  investmentType : string
}

// interface ETFRecommendation {
//   id: string
//   name: string
//   ticker: string
//   category: string
//   riskLevel: "낮음" | "중간" | "높음"
//   expectedReturn: string
//   description: string
//   matchScore: number
// }

// const recommendations: ETFRecommendation[] = [
//   {
//     id: "1",
//     name: "KODEX 200",
//     ticker: "069500",
//     category: "국내 대형주",
//     riskLevel: "중간",
//     expectedReturn: "+8.5%",
//     description: "코스피 200 지수를 추종하는 국내 대표 ETF",
//     matchScore: 95,
//   },
//   {
//     id: "2",
//     name: "TIGER 미국S&P500",
//     ticker: "360750",
//     category: "미국 대형주",
//     riskLevel: "중간",
//     expectedReturn: "+12.3%",
//     description: "미국 S&P500 지수에 투자하는 글로벌 분산 ETF",
//     matchScore: 88,
//   },
//   {
//     id: "3",
//     name: "KODEX 단기채권",
//     ticker: "153130",
//     category: "채권형",
//     riskLevel: "낮음",
//     expectedReturn: "+3.2%",
//     description: "안정적인 수익을 원하는 투자자를 위한 채권 ETF",
//     matchScore: 82,
//   },
// ]

// currentPortfolio 타입 정의
interface PortfolioItem {
  investmentProfile: string
  etfRiskScore: number
  dividendScore: number
  expectedTotalReturn: number
  investmentType : string
}

// ETFItem 타입 정의
interface StockItem {
  name: string
  cat: string
  cat_code: number
}
interface ETFItem {
  id: number
  name: string
  fltRt: number
  riskLevel: number
  category: string
  description: string
  investmentType : string
  stockList: StockItem[]
}
interface ETFWithWeight extends ETFItem {
  portfolioWeight: number
}
interface TotalStock {
    cat_code: number
    cat: string
    portfolioWeight: number
}


// 색상 팔레트
const colorPalette = [
  "bg-primary",
  "bg-orange-400",
  "bg-blue-400",
  "bg-emerald-400",
  "bg-purple-400",
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
          <span className="text-sm font-semibold text-primary">{etf.investmentType}</span>
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


const riskLevelMap = (level: number): "낮음" | "중간" | "높음" => {
  if (level <= 2) return "낮음"
  if (level <= 4) return "중간"
  return "높음"
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
  const [surveyData, setSurveyData] = useState<any>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showMoreHoldings, setShowMoreHoldings] = useState(false)

  useEffect(() => {
    // sessionStorage에서 데이터 가져오기
    const storedData = sessionStorage.getItem('surveyResponse')
    // const storedData = localStorage.getItem('surveyResponse')

    if (storedData) {
      setSurveyData(JSON.parse(storedData))
      console.log('Survey Response data:', JSON.parse(storedData))
    }
  }, [])

  console.log('Current Analysis Data:', surveyData);

//   sessionStorage.setItem('etfItems', JSON.stringify(surveyData?.etfs || []));


//   // portfolioWeights와 etfs를 결합하여 ETFItem 배열 생성
// const combinedETFs = useMemo<ETFWithWeight[]>(() => {
//   if (!surveyData?.etfs || !surveyData?.portfolioWeights) return []

//   return surveyData.etfs.map((etf:ETFItem[], index:number) => ({
//     ...etf,
//     portfolioWeight: surveyData.portfolioWeights[index] ?? 0,
//   }))
  // }, [surveyData])
  
    // 2. sessionStorage에 etfItems 저장 (추가)
  useEffect(() => {
    if (surveyData?.etfs) {
      sessionStorage.setItem('etfItems', JSON.stringify(surveyData.etfs))
      console.log('Current Analysis Data:', surveyData)
    }
  }, [surveyData])

  // portfolioWeights와 etfs를 결합하여 ETFItem 배열 생성
  const combinedETFs = useMemo<ETFWithWeight[]>(() => {
    if (!surveyData?.etfs || !surveyData?.portfolioWeights) return []

    return surveyData.etfs.map((etf: ETFItem, index: number) => ({
      ...etf,
      portfolioWeight: surveyData.portfolioWeights[index] ?? 0,
    }))
  }, [surveyData])

  console.log('Combined ETFs with weights:', combinedETFs);

// const totalStocks = useMemo<TotalStock[]>(() => {
//   if (!combinedETFs.length) return []

//   const stockMap = new Map<number, TotalStock>()

// combinedETFs.forEach((etf) => {
//   // stockList의 첫 번째 요소만 확인
//   const stock = etf.stockList[0]
  
//   if (stock) {
//     const existing = stockMap.get(stock.cat_code)
    
//     if (existing) {
//       // 기존에 같은 cat_code가 있으면 weight 누적
//       existing.portfolioWeight += etf.portfolioWeight
//     } else {
//       // 없으면 새로 추가
//       stockMap.set(stock.cat_code, {
//         cat_code: stock.cat_code,
//         cat: stock.cat,
//         portfolioWeight: etf.portfolioWeight,
//       })
//     }
//   }
// })
  

  // // Map을 배열로 변환하고 portfolioWeight 기준 내림차순 정렬
  // return Array.from(stockMap.values()).sort((a, b) => b.portfolioWeight - a.portfolioWeight)
  // }, [combinedETFs])

  // TotalStock에 색상 추가
interface TotalStockWithColor extends TotalStock {
  color: string
}

const totalStocks = useMemo<TotalStockWithColor[]>(() => {
  if (!combinedETFs.length) return []

  const stockMap = new Map<number, TotalStock>()

  combinedETFs.forEach((etf) => {
    const stock = etf.stockList[0]
    
    if (stock) {
      const existing = stockMap.get(stock.cat_code)
      
      if (existing) {
        existing.portfolioWeight += etf.portfolioWeight
      } else {
        stockMap.set(stock.cat_code, {
          cat_code: stock.cat_code,
          cat: stock.cat,
          portfolioWeight: etf.portfolioWeight,
        })
      }
    }
  })

  // Map을 배열로 변환하고 portfolioWeight 기준 내림차순 정렬 후 색상 매핑
  return Array.from(stockMap.values())
    .sort((a, b) => b.portfolioWeight - a.portfolioWeight)
    .map((stock, index) => ({
      ...stock,
      color: colorPalette[index % colorPalette.length]
    }))
}, [combinedETFs])

// cat_code별 색상 매핑 객체 생성
const categoryColorMap = useMemo(() => {
  const colorMap = new Map<number, string>()
  totalStocks.forEach(stock => {
    colorMap.set(stock.cat_code, stock.color)
  })
  return colorMap
}, [totalStocks])

// combinedETFs에 색상 정보 추가
interface ETFWithWeightAndColor extends ETFWithWeight {
  color: string
}

  // const combinedETFsWithColor = useMemo<ETFWithWeightAndColor[]>(() => {
  //   return combinedETFs
  //     .map(etf => ({
  //       ...etf,
  //       color: categoryColorMap.get(etf.stockList[0]?.cat_code) || colorPalette[0]
  //     }))
  //     .sort((a, b) => b.portfolioWeight - a.portfolioWeight) // 내림차순 정렬
  // }, [combinedETFs, categoryColorMap]);

  const combinedETFsWithColor = useMemo<ETFWithWeightAndColor[]>(() => {
    // totalStocks의 cat_code 순서를 인덱스로 매핑
    const catCodeOrder = new Map<number, number>()
    totalStocks.forEach((stock, index) => {
      catCodeOrder.set(stock.cat_code, index)
    })
  
    return combinedETFs
      .map(etf => ({
        ...etf,
        color: categoryColorMap.get(etf.stockList[0]?.cat_code) || colorPalette[0]
      }))
      .sort((a, b) => {
        // 1차 정렬: totalStocks의 순서대로 (비중이 큰 카테고리부터)
        const orderA = catCodeOrder.get(a.stockList[0]?.cat_code) ?? 999
        const orderB = catCodeOrder.get(b.stockList[0]?.cat_code) ?? 999
      
        if (orderA !== orderB) {
          return orderA - orderB
        }
      
        // 2차 정렬: 같은 카테고리 내에서 portfolioWeight 내림차순
        return b.portfolioWeight - a.portfolioWeight
      })
  }, [combinedETFs, categoryColorMap, totalStocks]);

  console.log('TotalStock ETFs with weights:', totalStocks);

  const etfRecommendations: ETFRecommendation[] = combinedETFs.map((etf) => ({
  id: etf.id,
  name: etf.name,
  ticker: `ETF-${etf.id}`, // 실제 ticker 있으면 교체
  category: etf.category,
  riskLevel: riskLevelMap(etf.riskLevel),
  description: etf.description,
  expectedReturn: `${etf.fltRt}%`,
  matchScore: Math.round(etf.portfolioWeight * 100),
  investmentType : etf.investmentType
}))


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
            <span className="text-xl font-black tracking-tight text-primary">Ko-MERIT</span>
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
          {/* <p className="text-muted-foreground text-lg font-medium">
            투자 성향 분석 결과, 균형잡힌 성장형 투자자입니다
          </p> */}
          <p className="text-muted-foreground text-lg font-medium">
            {surveyData?.investmentProfile || "투자 성향 분석 결과, 균형잡힌 성장형 투자자입니다"}
          </p>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-14">
          {/* @TODO 투자 성향 키워드로 가져와야 함 from back*/}
          <StatCard icon={Target} label="투자 성향" value={surveyData?.investmentType} color="bg-gradient-to-br from-primary to-blue-400" />
          <StatCard icon={Shield} label="ETF 위험도" value={surveyData?.etfRiskScore} color="bg-gradient-to-br from-yellow-400 to-orange-400" />
          <StatCard icon={PieChart} label="배당률" value={`${surveyData?.dividendScore}%`} color="bg-gradient-to-br from-green-400 to-emerald-500" />
          {/* @TODO 백엔드에서 데이터 가져올 때 예상 수익률 없음 */}
          <StatCard icon={Zap} label="예상 수익" value={`${surveyData?.expectedTotalReturn}%`} color="bg-gradient-to-br from-purple-400 to-pink-500" />
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
                {showMoreHoldings && (
                  <>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">네이버 200만원</span>
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">하나은행 예금 450만원</span>
                  </>
                )}
                {!showMoreHoldings && (
                  <button
                    type="button"
                    onClick={() => setShowMoreHoldings(true)}
                    className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-bold rounded-full hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    +2개 더보기
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Allocation */}
        {/* <section className="mb-10 md:mb-14">
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
        </section> */}
          <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">추천 포트폴리오 비중</h2>
          </div>
          <div className="p-6 bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50">
            {/* 동적 비중 바 */}
            <div className="flex gap-2 h-8 rounded-full overflow-hidden mb-4">
              {totalStocks.map((etf, index) => (
                <div
                  key={etf.cat_code}
                  className={`${colorPalette[index % colorPalette.length]} flex items-center justify-center`}
                  style={{ flex: etf.portfolioWeight }}
                >
                  <span className="text-xs font-bold text-white truncate px-2">
                    {/* @TODO etfs에 ETF 대분류 카테고리가 없음(예: 국내, 해와, 금, 채권 등) */}
                    {etf.cat || ""} {etf.portfolioWeight}%
                  </span>
                </div>
              ))}
            </div>

            {/* ETF 목록 */}
            <div className="space-y-3 mb-4">
              {combinedETFsWithColor.map((etf) => (
                <div key={etf.id} className="flex items-center gap-3">
                  <div className={`w-4 h-4 ${etf.color} rounded-full`} />
                  <span className="text-sm font-bold text-foreground flex-1">{etf.name}</span>
                  <span className="text-sm font-bold text-primary">{etf.portfolioWeight}%</span>
                </div>
              ))}
            </div>

            {/* 추천 이유 */}
            {surveyData?.reasonSummary && (
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {surveyData?.reasonSummary}
              </p>
            )}
          </div>
        </section>

        {/* ETF Recommendations */}
        <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">맞춤 ETF 추천</h2>
          </div>
          <div className="flex flex-col gap-4">
            {etfRecommendations.map((etf) => (
              <ETFCard key={etf.id} etf={etf} />
            ))}
          </div>
        </section>
        {/* ETF 상세 정보 */}
        {/* <section className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-black text-foreground">맞춤 ETF 추천</h2>
          </div>
          <div className="flex flex-col gap-4">
            {combinedETFs.map((etf, index) => (
              <div key={etf.id} className="p-6 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 ${colorPalette[index % colorPalette.length]} rounded-full`} />
                      <h3 className="text-xl font-black text-foreground">{etf.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        etf.riskLevel <= 2 ? "bg-green-100 text-green-700" :
                        etf.riskLevel <= 4 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        위험도 {etf.riskLevel}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{etf.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground font-medium">비중</span>
                    <p className="text-2xl font-black text-primary">{etf.portfolioWeight}%</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{etf.description}</p>
                {etf.fltRt !== 0 && (
                  <div className="mt-3 pt-3 border-t border-border/30">
                    <span className={`text-sm font-bold ${etf.fltRt > 0 ? "text-green-600" : "text-red-500"}`}>
                      등락률: {etf.fltRt > 0 ? '+' : ''}{etf.fltRt}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section> */}

        {/* 주석 처리_260203 */}
        {/* <AIChat /> */}

        {/* CTA Section */}
        <section className="text-center py-10 md:py-14">
          <div className="p-8 md:p-12 bg-gradient-to-br from-primary to-blue-400 rounded-[2rem] text-white">
            <h3 className="text-2xl md:text-3xl font-black mb-3">지금 바로 투자를 시작해보세요!</h3>
            <p className="text-white/80 mb-6 font-medium">
              Ko-MERIT과 함께 스마트한 투자의 첫 걸음을 내딛어보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-4 bg-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/30 transition-all"
              >
                홈으로 돌아가기
              </Link>
              <Link
                href="/rebalancing"
                className="px-8 py-4 bg-white text-primary font-bold text-lg rounded-2xl hover:scale-105 transition-all"
              >
                포트폴리오 저장하기 및 알림 받기
              </Link>
            </div>
          </div>
        </section>
      </div>

            {/* Floating Chatbot Button with Speech Bubble */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        {!isChatOpen && (
          <div className="relative animate-bounce">
            <div className="bg-card border border-border/50 shadow-xl rounded-3xl px-6 py-5 max-w-[280px]">
              <p className="text-base font-semibold text-foreground leading-relaxed">
                ETF 투자에 대해 궁금한 점이 있으신가요? 
              </p>
              <p className="text-sm text-primary font-bold mt-2">AI에게 물어보세요!</p>
            </div>
            <div className="absolute -bottom-2.5 right-8 w-5 h-5 bg-card border-r border-b border-border/50 transform rotate-45" />
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(true)}
          className="w-20 h-20 bg-gradient-to-br from-primary to-blue-400 rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-all hover:shadow-2xl hover:shadow-primary/40"
        >
          <MessageCircle className="w-9 h-9 text-white" strokeWidth={2.5} />
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsChatOpen(false)}
          />
          
          {/* 팝업 크기 확대: max-w-4xl, 높이 90vh */}
          <div className="relative w-full sm:max-w-4xl h-[92vh] sm:h-[850px] sm:max-h-[90vh] bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl border border-border/50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">
            {/* 헤더 - 닫기 버튼만 */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-foreground text-sm">Ko-MERIT AI 튜터</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            
            {/* AIChat 컴포넌트 */}
            <div className="flex-1 overflow-y-auto"
              style={{
                scrollbarWidth: "none",      // Firefox
                msOverflowStyle: "none",     // IE / Edge
            }}>
              <AIChat />
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
