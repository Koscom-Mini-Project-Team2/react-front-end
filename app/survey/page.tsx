'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, Search, AlertTriangle, Rocket, ChevronRight, ArrowLeft } from 'lucide-react'

interface Message {
  id: number
  type: 'bot' | 'user'
  content: string
}

interface Option {
  id: string
  title: string
  subtitle: string
  icon: string
}

const conversationFlow = [
  {
    id: 0,
    messages: [
      '오늘은 1년을 되돌아보는 날이야.',
      '마이데이터 연동 완료! 지금 네가 실제로 굴릴 수 있는 돈 기준으로 시뮬레이션 해볼게.',
      '선택에 따라 앞으로 등장하는 상황이 조금씩 달라질 거야.',
      '그럼 시작해볼까?',
      '친구 조A는 너랑 가까운 친구 사이고 터울이 없어서 투자 얘기 자주 하고 가끔 자랑해 😎',
    ],
    question: null,
  },
  {
    id: 1,
    messages: [
      '📅 시나리오 1. xxxx년 1월: 처음 흔들리는 날',
      '금요일 저녁, 친구랑 맥주 마시는 중 🍻',
      '친구 A: "야… 나 오늘 계좌 열어봤는데 생각보다 많이 빠졌더라."',
      '📉 요즘 뉴스: "글로벌 경기 둔화 우려, 증시 조정 국면"',
      '네 자산 1,000만원 → 920만원 (-8%)',
      '친구 A: "이거 더 떨어지는 거 아니냐… 너 같으면 어떻게 할 거야?"',
    ],
    question: {
      text: '너의 반응은?',
      options: [
        { id: 'A', title: '난 무서워서 일단 다 팔 듯…', subtitle: '손실 회피 성향이 강해요', icon: 'alert' },
        { id: 'B', title: '반만 줄이고 상황 보지 뭐', subtitle: '신중하게 리스크를 관리해요', icon: 'search' },
        { id: 'C', title: '원래 이런 거니까 그냥 둔다', subtitle: '장기적 관점으로 바라봐요', icon: 'search' },
        { id: 'D', title: '이럴 때 조금 더 사는 거 아님?', subtitle: '기회를 포착하는 타입이에요', icon: 'rocket' },
      ],
    },
  },
  {
    id: 2,
    messages: [
      '📅 시나리오 2. xxxx년 3월: 반등의 기미',
      '주말 카페에서 노트북 켜고 있는 중 ☕',
      '뉴스 알림: "증시 반등 조짐, 기술주 강세"',
      '네 자산 920만원 → 980만원 (+6.5%)',
      '친구 A: "오 좀 올랐네? 더 오르려나?"',
    ],
    question: {
      text: '이때 너의 선택은?',
      options: [
        { id: 'A', title: '본전 오면 빠진다', subtitle: '안전하게 원금 회복이 목표', icon: 'alert' },
        { id: 'B', title: '좀 더 지켜본다', subtitle: '섣불리 움직이지 않아요', icon: 'search' },
        { id: 'C', title: '추가 매수 고려', subtitle: '상승장에 더 태우고 싶어요', icon: 'rocket' },
      ],
    },
  },
  {
    id: 3,
    messages: [
      '📅 시나리오 3. xxxx년 6월: 예상치 못한 급등',
      '출근길 지하철에서 📱',
      '뉴스 속보: "AI 관련주 폭등, 나스닥 사상 최고치"',
      '네 자산 980만원 → 1,250만원 (+27.5%)',
      '친구 A: "대박! 나 AI주 샀었는데 완전 떡상했어!"',
    ],
    question: {
      text: '네 포트폴리오도 올랐어. 어떻게 할래?',
      options: [
        { id: 'A', title: '수익 실현하고 안전자산으로', subtitle: '번 돈은 지키는 게 우선', icon: 'alert' },
        { id: 'B', title: '일부만 정리', subtitle: '반은 챙기고 반은 계속', icon: 'search' },
        { id: 'C', title: '계속 홀딩', subtitle: '더 오를 수 있으니까', icon: 'rocket' },
      ],
    },
  },
  {
    id: 4,
    messages: [
      '📅 시나리오 4. xxxx년 9월: 급락의 공포',
      '밤늦게 침대에서 핸드폰 확인 중 🌙',
      '긴급 뉴스: "미국 금리 추가 인상, 글로벌 증시 급락"',
      '네 자산 1,250만원 → 950만원 (-24%)',
      '친구 A: "야 이거 진짜 큰일 아니냐? 나 멘탈 나갈 것 같아…"',
    ],
    question: {
      text: '이 상황에서 너는?',
      options: [
        { id: 'A', title: '손절하고 현금화', subtitle: '더 잃기 전에 빠져나가야 해', icon: 'alert' },
        { id: 'B', title: '일부 정리', subtitle: '리스크를 줄이면서 관망', icon: 'search' },
        { id: 'C', title: '버틴다', subtitle: '언젠간 다시 오르겠지', icon: 'search' },
        { id: 'D', title: '추가 매수', subtitle: '공포에 사라는 말이 있잖아', icon: 'rocket' },
      ],
    },
  },
  {
    id: 5,
    messages: [
      '📅 시나리오 5. xxxx년 12월: 1년의 마무리',
      '연말 정산하면서 1년 투자 돌아보는 중 📊',
      '네 최종 자산: 1,080만원 (+8%)',
      '친구 A: "그래도 플러스로 끝났네. 내년에는 어떻게 할 거야?"',
    ],
    question: {
      text: '내년 투자 계획은?',
      options: [
        { id: 'A', title: '안전하게 예금/채권 위주로', subtitle: '변동성은 이제 싫어', icon: 'alert' },
        { id: 'B', title: '비슷하게 유지', subtitle: '올해처럼 하면 되지', icon: 'search' },
        { id: 'C', title: '더 공격적으로', subtitle: '경험 쌓았으니 더 도전', icon: 'rocket' },
      ],
    },
  },
]

export default function SurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const totalQuestions = conversationFlow.filter((f) => f.question).length
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, showOptions])

  useEffect(() => {
    const flow = conversationFlow[currentStep]
    if (!flow) return

    if (currentMessageIndex < flow.messages.length) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: 'bot',
            content: flow.messages[currentMessageIndex],
          },
        ])
        setCurrentMessageIndex((prev) => prev + 1)
        setIsTyping(false)
      }, 800)
      return () => clearTimeout(timer)
    } else if (flow.question) {
      const timer = setTimeout(() => {
        setShowOptions(true)
      }, 300)
      return () => clearTimeout(timer)
    } else if (currentStep === 0) {
      // Auto-advance from intro
      const timer = setTimeout(() => {
        setCurrentStep(1)
        setCurrentMessageIndex(0)
        setShowOptions(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentStep, currentMessageIndex])

  const handleOptionSelect = (optionId: string, optionTitle: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        content: optionTitle,
      },
    ])

    setAnswers((prev) => ({ ...prev, [currentStep]: optionId }))
    setShowOptions(false)

    // Move to next step
    if (currentStep < conversationFlow.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setCurrentMessageIndex(0)
      }, 500)
    } else {
      // Survey complete
      setTimeout(() => {
        setIsComplete(true)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: 'bot',
            content: '수고했어! 모든 시나리오가 끝났어. 이제 네 투자 성향을 분석해볼게 🎯',
          },
        ])
      }, 500)
    }
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return Search
      case 'alert':
        return AlertTriangle
      case 'rocket':
        return Rocket
      default:
        return TrendingUp
    }
  }

  const generateResponseBody = (answers: Record<number, string>) => {
  const qaList = Object.entries(answers).map(([stepId, optionId]) => {
    const step = conversationFlow[parseInt(stepId)]
    
    if (!step || !step.question) {
      return null
    }

    // 모든 메시지를 하나로 합치고, 질문 텍스트 추가
    const questionText = [...step.messages, step.question.text].join(' ')
    
    // 선택된 옵션 찾기
    const selectedOption = step.question.options.find(opt => opt.id === optionId)
    
    return {
      question: questionText,
      answer: selectedOption?.title || ''
    }
  }).filter(qa => qa !== null) // null 값 제거

  return {
    qaList
  }
}

// 사용 예시
const handleCompleteAnalysis = () => {
  const responseBody = generateResponseBody(answers)
  console.log(JSON.stringify(responseBody, null, 2))
  
  // API 호출 등에 사용
  // await fetch('/api/analysis', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(responseBody)
  // })
}
  
const handleAnalysisClick = async () => {
  const responseBody = generateResponseBody(answers);
  console.log(">> SurveyResult Response Body >>>: ", responseBody);

  try {
    // API로 POST 요청
    const response = await fetch(`${window.location.origin}/api/survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseBody),
    });

    if (!response.ok) {
      console.error('Failed to submit survey:', response.status);
      // 에러 처리 (선택사항)
      alert('설문 제출에 실패했습니다.');
      return;
    }

    const data = await response.json();
    console.log(">> Survey submission success:", data);

    // localStorage에도 저장 (백업용)
    localStorage.setItem('surveyResults', JSON.stringify(responseBody));
    //localStorage.setItem('surveyResponse', JSON.stringify(data));

    // sessionStorage에 데이터 저장
    // sessionStorage.setItem('surveyResponse', JSON.stringify(data));
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('rebalancingResult', JSON.stringify(data));
    }

    // 분석 페이지로 이동
    router.push('/analysis');
  } catch (error) {
    console.error('Error submitting survey:', error);
    alert('네트워크 오류가 발생했습니다.');
  }
}

  const currentFlow = conversationFlow[currentStep]

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100 p-4">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Blurred shapes */}
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-sky-200/50 blur-3xl" />

        {/* Floating decorative icons */}
        <div className="absolute left-[8%] top-[12%] flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/20">
          <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>

        <div className="absolute right-[10%] top-[18%] flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl">
          <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>

        <div className="absolute bottom-[30%] left-[5%] flex h-14 w-14 items-center justify-center rounded-full bg-blue-400 shadow-lg shadow-blue-500/30">
          <span className="text-2xl">💰</span>
        </div>

        <div className="absolute bottom-[20%] right-[8%] flex h-12 w-12 items-center justify-center">
          <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      {/* Backdrop blur overlay behind card */}
      <div className="absolute inset-0 backdrop-blur-sm" />

      {/* Chat Container Card */}
      <div className="relative flex h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-2xl backdrop-blur-xl">
        {/* Blue top border */}
        <div className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />

        {/* Header */}
        <header className="shrink-0 border-b border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 shadow-lg shadow-blue-500/20">
                <TrendingUp className="h-5 w-5 text-white" strokeWidth={3} />
              </div>
              <span className="text-lg font-black tracking-tight text-blue-500">Ko-MERIT</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-500">
                Question
              </span>
              <span className="text-sm font-bold text-gray-900">
                {answeredQuestions} <span className="text-gray-400">/ {totalQuestions}</span>
              </span>
            </div>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        {/* Chat Messages Area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-100 bg-white text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            )}

            {showOptions && currentFlow?.question && (
              <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                    <p className="text-sm font-medium text-gray-800">{currentFlow.question.text}</p>
                  </div>
                </div>

                {currentFlow.question.options.map((option, index) => {
                  const IconComponent = getIconComponent(option.icon)
                  const isAlert = option.icon === 'alert'
                  const isRocket = option.icon === 'rocket'

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id, option.title)}
                      className="group w-full rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md active:scale-[0.98]"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                            isAlert
                              ? 'bg-orange-100'
                              : isRocket
                                ? 'bg-gradient-to-br from-blue-500 to-blue-400'
                                : 'bg-blue-100'
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${
                              isAlert
                                ? 'text-orange-500'
                                : isRocket
                                  ? 'text-white'
                                  : 'text-blue-500'
                            }`}
                            strokeWidth={2}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{option.title}</h3>
                          <p className="mt-0.5 text-xs text-gray-500">{option.subtitle}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-500" />
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Footer */}
        <footer className="shrink-0 border-t border-gray-100 bg-white/90 px-6 py-4 backdrop-blur-sm">
          <div className="space-y-3">
            <Button
              // onClick={() => router.push('/analysis')}
              onClick={handleAnalysisClick}
              className="w-full rounded-full bg-white py-6 text-base font-bold text-blue-500 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md"
              size="lg"
            >
              분석 바로보기
            </Button>
                    <Link
          href="/portfolio"
          className="flex items-center gap-2 text-muted-foreground font-bold hover:text-primary transition-colors py-3 px-5 rounded-2xl hover:bg-card/50"
        >
          <ArrowLeft className="w-5 h-5" />
          이전으로
        </Link>
            <p className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              익명으로 안전하게 분석됩니다
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
