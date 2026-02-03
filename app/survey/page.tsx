'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, Search, AlertTriangle, Rocket, ChevronRight, ArrowLeft } from 'lucide-react'

interface Message {
  id: number
  type: 'bot' | 'user' | 'question'
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
    id: 1,
    messages: [
      '시작하기 전에 몇 가지만 물어볼게 🙂',
      '지금 상황에 맞게 시뮬레이션을 맞추려는 거야.',
    ],
    question: {
      text: '투자 금액은 얼마야?',
      options: [
        { id: 'A', title: '0만원 이상 ~ 500만원 이하', icon: '' , subtitle:''},
        { id: 'B', title: '500만원 이상 ~ 2,000만원 이하', icon: '', subtitle:''  },
        { id: 'C', title: '2,000만원 이상 ~ 5,000만원 이하', icon: '' , subtitle:'' },
        { id: 'D', title: '5,000만원 이상', icon: '', subtitle:''  },
      ],
    },
  },
  {
    id: 2,
    messages: [
    ],
    question: {
      text: '이 투자의 목적은 뭐야?',
      options: [
        { id: 'A', title: '노후 자금 마련', icon: '', subtitle:''  },
        { id: 'B', title: '내 집 마련', icon: '', subtitle:''  },
        { id: 'C', title: '자녀 교육비', icon: '' , subtitle:'' },
        { id: 'D', title: '특별한 목적 없이 자산 증식', icon: '' , subtitle:'' },
        { id: 'E', title: '배당', icon: '', subtitle:''  },
        { id: 'F', title: '기타 (직접 입력)', icon: '', subtitle:''  },
      ],
    },
  },
  {
    id: 3,
    messages: [
    ],
    question: {
      text: '1년 안에 큰돈 나갈 일 있어?',
      options: [
        { id: 'A', title: '전세 / 보증금', icon: '', subtitle:''  },
        { id: 'B', title: '결혼 / 여행', icon: '' , subtitle:'' },
        { id: 'C', title: '이직 / 휴식', icon: '' , subtitle:'' },
        { id: 'D', title: '없음', icon: '' , subtitle:'' },
      ],
    },
  },
  {
    id: 4,
    messages: [
      '📅 시나리오 1. 주말에 지인과 외출 중인 나',
      '오늘도 롯데시네마 갔다가 햄버거 먹는거야?!',
      '야 오늘은 맨날 가보던데 말고 다른데 가자~!',
      '가본 적 없는 동네나 처음 보는 가게, 낯선 길을 선택할 수 있는 상황이다.\n이때 나는 새로운 장소를 직접 탐색해보는 것이 즐겁고 흥미롭다고 느끼는가?',
    ],
    question: {
      text: '이 상황에서 너는?',
options: [
  {
    id: 'A',
    title: '익숙한 데로 가자',
    subtitle: '괜히 헤매느니 늘 가던 곳이 편해',
    icon: 'alert'
  },
  {
    id: 'B',
    title: '살짝만 바꿔볼까',
    subtitle: '완전 처음은 부담, 근처 새로운 가게 정도?',
    icon: 'search'
  },
  {
    id: 'C',
    title: '일단 따라가 본다',
    subtitle: '큰 기대는 없지만 나쁘진 않겠지',
    icon: 'search'
  },
  {
    id: 'D',
    title: '완전 새로운 데 가자!',
    subtitle: '처음 보는 동네·길이 제일 재밌어',
    icon: 'rocket'
  },
]

    },
  },
  {
    id: 5,
    messages: [
      '📅 시나리오 2. 내일 중요한 발표(또는 면접, 시험)를 앞둔 나',
      '자료는 이미 다 준비해놨는데, \n자꾸 “잘 못하면 어쩌지?”, “실수하면 어색해지지 않을까?” 같은 생각이 머릿속을 맴돈다.',
      '잠자리에 누워도 쉽게 잠이 오지 않고, 심장이 평소보다 빨리 뛰는 느낌이 든다.',
    ],
    question: {
      text: '이런 상황에서 나는 중요한 일이 있기 전에 긴장을 많이 하는 편인가?',
options: [
  {
    id: 'A',
    title: '머릿속이 과열된다',
    subtitle: '별별 최악의 상황까지 다 상상하게 돼',
    icon: 'alert'
  },
  {
    id: 'B',
    title: '긴장되긴 하지만 관리 가능',
    subtitle: '불안은 있어도 스스로 진정시키려 해',
    icon: 'search'
  },
  {
    id: 'C',
    title: '평소랑 크게 다르지 않다',
    subtitle: '중요한 날이어도 마음은 비교적 차분해',
    icon: 'search'
  },
  {
    id: 'D',
    title: '오히려 집중이 잘 된다',
    subtitle: '약간의 긴장이 컨디션을 끌어올려줘',
    icon: 'rocket'
  },
]

    },
  },
]
// const conversationFlow = [
//   {
//     id: 0,
//     messages: [
//       '시작하기 전에 몇 가지만 물어볼게 🙂',
//       '지금 상황에 맞게 시뮬레이션을 맞추려는 거야.',
//     ],
//     question: {
//       text: '투자 금액은 얼마야?',
//       options: [
//         { id: 'A', title: '0만원 이상 ~ 500만원 이하' },
//         { id: 'B', title: '500만원 이상 ~ 2,000만원 이하' },
//         { id: 'C', title: '2,000만원 이상 ~ 5,000만원 이하' },
//         { id: 'D', title: '5,000만원 이상' },
//       ],
//     },
//   },
//   {
//     id: 1,
//     messages: [
//       '좋아, 그럼 이 투자의 목적을 알려줘.',
//       '목적에 따라 전략이 꽤 달라져.',
//     ],
//     question: {
//       text: '이 투자의 목적은 뭐야?',
//       options: [
//         { id: 'A', title: '노후 자금 마련' },
//         { id: 'B', title: '내 집 마련' },
//         { id: 'C', title: '자녀 교육비' },
//         { id: 'D', title: '특별한 목적 없이 자산 증식' },
//         { id: 'E', title: '배당' },
//         { id: 'F', title: '기타 (직접 입력)' },
//       ],
//     },
//   },
//   {
//     id: 2,
//     messages: [
//       '마지막으로 하나만 더!',
//       '가까운 미래의 현금 필요 여부도 중요해.',
//     ],
//     question: {
//       text: '1년 안에 큰돈 나갈 일 있어?',
//       options: [
//         { id: 'A', title: '전세 / 보증금' },
//         { id: 'B', title: '결혼 / 여행' },
//         { id: 'C', title: '이직 / 휴식' },
//         { id: 'D', title: '없음' },
//       ],
//     },
//   },

//   // 👉 여기서부터 기존 시나리오 id: 3, 4, 5 ...
// ]

export default function SurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isTyping, setIsTyping] = useState(false)
const [isComplete, setIsComplete] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)

  const totalQuestions = conversationFlow.filter((f) => f.question).length
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / totalQuestions) * 100

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToQuestion = () => {
    questionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  useEffect(() => {
    // 마지막 메시지가 question 타입이면 질문으로 스크롤, 아니면 하단으로 스크롤
    const lastMessage = messages[messages.length - 1]
    if (lastMessage?.type === 'question') {
      setTimeout(() => {
        scrollToQuestion()
      }, 100)
    } else {
      scrollToBottom()
    }
  }, [messages])

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
        // 질문 텍스트를 메시지에 추가 (question 타입으로)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: 'question',
            content: flow.question.text,
          },
        ])
        setShowOptions(true)
      }, 300)
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

  setIsAnalyzing(true);

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
      setIsAnalyzing(false);
      alert('설문 제출에 실패했습니다.');
      return;
    }

    const data = await response.json();
    console.log(">> Survey submission success:", data);

    // localStorage에도 저장 (백업용)
    localStorage.setItem('surveyResults', JSON.stringify(responseBody));

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('surveyResponse', JSON.stringify(data));
    }

    // sessionStorage에 데이터 저장
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('rebalancingResult', JSON.stringify(data));
    }

    // 분석 페이지로 이동
    router.push('/analysis');
  } catch (error) {
    console.error('Error submitting survey:', error);
    setIsAnalyzing(false);
    alert('네트워크 오류가 발생했습니다.');
  }
}

  const currentFlow = conversationFlow[currentStep]

// Animated Graph Loading Component
  const GraphLoadingAnimation = () => {
    return (
      <div className="flex items-end justify-center gap-1.5 h-16">
        {[0, 1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className="w-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
            style={{
              animation: `graphBar 1.2s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
              height: '20px',
            }}
          />
        ))}
        <style jsx>{`
          @keyframes graphBar {
            0%, 100% {
              height: 20px;
            }
            50% {
              height: 56px;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100 p-4">
      {/* Analysis Loading Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="mx-4 w-full max-w-sm rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
            {/* Content */}
            <div className="flex flex-col items-center gap-6">
              {/* Graph Animation Container */}
              <div className="flex h-24 w-full items-end justify-center rounded-2xl bg-gradient-to-b from-blue-50 to-white p-4">
                <GraphLoadingAnimation />
              </div>
              
              {/* Text */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800">분석 중...</h3>
                <p className="mt-2 text-sm text-gray-500">
                  투자 성향을 분석하고 있어요
                </p>
              </div>
              
              {/* Loading dots */}
              {/* <div className="flex gap-1.5">
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
              </div> */}
            </div>
          </div>
        </div>
      )}
      
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
            {messages.map((message, index) => {
              // bot 메시지만 번갈아 색상 적용 (짝수: 청록색, 홀수: 연보라색)
              const botMessageIndex = messages
                .slice(0, index + 1)
                .filter((m) => m.type === 'bot').length - 1
              const isEvenBotMessage = botMessageIndex % 2 === 0

              // question 타입 메시지 스타일
              if (message.type === 'question') {
                // 마지막 question 메시지에만 ref 적용
                const isLastQuestion = index === messages.map((m, i) => (m.type === 'question' ? i : -1)).filter(i => i !== -1).pop()
                return (
                  <div
                    key={message.id}
                    ref={isLastQuestion ? questionRef : undefined}
                    className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 px-6 py-4 shadow-md">
                      <p className="whitespace-pre-wrap text-base font-semibold leading-relaxed text-amber-700">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : isEvenBotMessage
                          ? 'border border-teal-200 bg-teal-50 text-teal-800'
                          : 'border border-indigo-200 bg-indigo-50 text-indigo-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              )
            })}

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
