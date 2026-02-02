"use client"

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { TrendingUp, ArrowLeft, Bell, Calendar, Mail, Check } from "lucide-react"

type RebalancingPeriod = "monthly" | "quarterly" | "semiannually"

interface PeriodOption {
  id: RebalancingPeriod
  label: string
  description: string
  period : string
}

const periodOptions: PeriodOption[] = [
  {
    id: "monthly",
    label: "매월",
    description: "매달 정기적으로 리밸런싱 알림",
    period : "1"
  },
  {
    id: "quarterly",
    label: "분기별",
    description: "3개월마다 리밸런싱 알림",
    period : "3"
  },
  {
    id: "semiannually",
    label: "반기별",
    description: "6개월마다 리밸런싱 알림",
    period : "6"
  },
]


export default function RebalancingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<RebalancingPeriod | null>(null)

  const router = useRouter()
  // const [selectedPeriod, setSelectedPeriod] = useState<RebalancingPeriod | null>(null)

  const handleRebalancingResultClick = async () => {
    if (!selectedPeriod) {
      alert('알림 주기를 선택해주세요.');
      return;
    }

    const selectedOption = periodOptions.find(option => option.id === selectedPeriod);
    
    if (!selectedOption) {
      alert('유효하지 않은 선택입니다.');
      return;
    }

    const requestBody = {
      portfolioId: 2, // 실제 portfolioId로 교체 필요
      memberId: 1, // 실제 memberId로 교체 필요
      userEmail: "user@example.com", // 실제 userEmail로 교체 필요
      period: parseInt(selectedOption.period)
    };

    console.log(">> Rebalancing Request Body >>>: ", requestBody);

    try {
      // // API 호출 예시 (실제 엔드포인트로 교체 필요)
      // const response = await fetch('/api/rebalancing', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestBody),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit rebalancing settings');
      // }
      
      // const data = await response.json();
      // console.log('Success:', data);

      const data = {
  portfolioId: 1,
  portfolioName: "내 안정형 포트폴리오",
  rebalancingRequired: true,
  rebalancingReason:
    "삼성전자에서 임원 및 주요주주들의 지분 변동이 집중적으로 발생하고 있으며, 삼성SDI가 작년 연간 1조7천억원의 영업손실을 기록하며 적자 전환했습니다.",

  currentPortfolio: [
    {
      etfId: 1,
      etfName: "KODEX 200",
      category: "국내주식",
      currentWeight: 45.0
    },
    {
      etfId: 2,
      etfName: "TIGER 미국S&P500",
      category: "해외주식",
      currentWeight: 30.0
    },
    {
      etfId: 5,
      etfName: "KODEX 코스닥150",
      category: "국내주식",
      currentWeight: 25.0
    }
  ],

  recommendedPortfolio: [
    {
      etfId: 1,
      etfName: "KODEX 200",
      category: "국내주식",
      currentWeight: 45.0,
      recommendedWeight: 40.0,
      changeAmount: -5.0,
      changeReason: "비중 축소 권장"
    },
    {
      etfId: 2,
      etfName: "TIGER 미국S&P500",
      category: "해외주식",
      currentWeight: 30.0,
      recommendedWeight: 35.0,
      changeAmount: 5.0,
      changeReason: "비중 확대 권장"
    },
    {
      etfId: 5,
      etfName: "KODEX 코스닥150",
      category: "국내주식",
      currentWeight: 25.0,
      recommendedWeight: 25.0,
      changeAmount: 0.0,
      changeReason: "유지"
    }
  ],

  newsEvidence: [
    {
      etfId: 1,
      etfName: "KODEX 200",
      newsTitle: "삼성전자, 임원ㆍ주요주주 특정증권등 소유주식수 변동",
      newsUrl: "https://news.koscom.co.kr/news/N20260202001",
      publishedAt: "2026-02-02T13:32:00",
      impact: "NEGATIVE",
      summary: "삼성전자 임원진의 대규모 지분 변동 발생"
    },
    {
      etfId: 1,
      etfName: "KODEX 200",
      newsTitle: "삼성SDI, 작년 연간 연결 영업손실 1조7223억...적자전환",
      newsUrl: "https://news.koscom.co.kr/news/N20260202002",
      publishedAt: "2026-02-02T13:31:00",
      impact: "NEGATIVE",
      summary: "삼성SDI가 대규모 적자를 기록하며 실적 악화"
    }
  ],

  riskAssessment: "MEDIUM",

  recommendations: [
    "국내 반도체 섹터의 단기 변동성을 고려하여 해외 주식 비중을 확대하는 것이 안정적입니다",
    "삼성SDI 등 2차전지 관련 종목의 실적 회복 시기를 주시하며 재조정을 고려하세요",
    "단기적 조정보다는 분할 매매를 통한 점진적 리밸런싱을 권장합니다"
  ],

  analyzedAt: "2026-02-02T14:30:15"
};

      // sessionStorage에 데이터 저장
      sessionStorage.setItem('rebalancingResult', JSON.stringify(data));
      
      router.push('/rebalancing-result');
    } catch (error) {
      console.error('Error submitting rebalancing settings:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
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
            href="/analysis"
            className="flex items-center gap-2 text-muted-foreground font-bold hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-card/50"
          >
            <ArrowLeft className="w-4 h-4" />
            이전으로
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/30 rounded-3xl flex items-center justify-center border border-primary/20">
              <Bell className="w-10 h-10 text-primary" strokeWidth={2} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3 text-balance">
              리밸런싱 알림 받기
            </h1>
            <p className="text-muted-foreground font-medium">
              원하는 주기를 선택해주세요
            </p>
          </div>

          {/* Period Options */}
          <div className="flex flex-col gap-4 mb-8">
            {periodOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedPeriod(option.id)}
                className={`group p-5 bg-card/80 backdrop-blur-xl rounded-2xl border-2 transition-all text-left ${
                  selectedPeriod === option.id
                    ? "border-primary shadow-lg shadow-primary/20"
                    : "border-border/50 hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        selectedPeriod === option.id
                          ? "bg-gradient-to-br from-primary to-blue-400"
                          : "bg-muted"
                      }`}
                    >
                      <Calendar
                        className={`w-6 h-6 ${
                          selectedPeriod === option.id ? "text-white" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{option.label}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                  {selectedPeriod === option.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground font-medium text-sm">
              이 주기에 맞춰 포트폴리오 변화를 정리해서 알려드릴게요
            </p>
          </div>

          {/* Primary CTA */}
          {/* <Link
            href="/rebalancing-result"
            className="w-full py-5 font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all bg-gradient-to-r from-primary to-blue-400 text-white shadow-xl shadow-primary/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95"
          >
            <Mail className="w-5 h-5" />
            이메일로 받아보기
          </Link> */}
          <button
            onClick={handleRebalancingResultClick}
            disabled={!selectedPeriod}
            className="w-full py-5 font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all bg-gradient-to-r from-primary to-blue-400 text-white shadow-xl shadow-primary/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
          <Mail className="w-5 h-5" />
          이메일로 받아보기
          </button>

          {/* Skip Link */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-muted-foreground font-bold text-sm hover:text-primary transition-colors"
            >
              나중에 설정할게요
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
