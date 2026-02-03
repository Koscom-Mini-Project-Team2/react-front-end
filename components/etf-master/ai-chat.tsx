"use client"

import React, { useRef, useEffect } from "react"

import { useState } from "react"
import { ArrowRight, Brain, User, Loader2 } from "lucide-react"

const quickQuestions = ["# 상장폐지 되면 어떡해?", "# 배당금은 어떻게 받아?", "# 환율 영향은?"]

// 더미 AI 응답 데이터
const dummyResponses: Record<string, string> = {
  "상장폐지": "ETF가 상장폐지되면 보유 주식은 청산 과정을 거쳐 현금으로 돌려받게 돼! 보통 청산 가격은 순자산가치(NAV) 기준으로 계산되니까 원금 손실 걱정은 크게 안 해도 돼. 다만 거래가 중단되기 전에 미리 매도하는 게 더 유리할 수 있어!",
  "배당금": "ETF 배당금은 분배금이라고 불러! 보통 분기별 또는 연 1회 지급되고, 증권 계좌로 자동 입금돼. 배당락일 전에 보유하고 있어야 받을 수 있으니 일정을 꼭 확인해봐!",
  "환율": "해외 ETF는 환율 변동에 영향을 받아! 원화 약세(달러 강세)면 수익이 늘어나고, 원화 강세면 수익이 줄어들 수 있어. 환헤지 ETF를 선택하면 환율 변동 위험을 줄일 수 있어!",
  "나스닥": "나스닥 100 ETF는 애플, 마이크로소프트, 구글 같은 세계적인 기술주 100개를 한 번에 담고 있어! 미국 기술주에 투자하고 싶다면 가장 대표적인 선택지야.",
  "s&p": "S&P 500 ETF는 미국 대형주 500개에 분산 투자할 수 있는 ETF야! 나스닥보다 더 넓은 산업에 분산되어 있어서 안정적인 장기 투자에 적합해.",
  "수수료": "ETF 수수료는 총보수(TER)라고 불러! 보통 0.03%~0.5% 수준이야. 같은 지수를 추종하는 ETF라면 수수료가 낮은 걸 선택하는 게 장기적으로 유리해!",
  "레버리지": "레버리지 ETF는 지수 수익률의 2배, 3배를 추종해! 수익도 크지만 손실도 그만큼 커지니까 단기 투자용으로만 활용하는 게 좋아. 장기 보유하면 복리 효과로 손실이 커질 수 있어!",
  "인버스": "인버스 ETF는 지수가 하락하면 수익이 나는 구조야! 시장 하락이 예상될 때 헷지 수단으로 활용할 수 있어. 하지만 장기 보유보다는 단기 전략용으로 적합해.",
  "etf란": "ETF는 Exchange Traded Fund의 약자로, 주식처럼 거래할 수 있는 펀드야! 여러 종목을 한 번에 담고 있어서 분산 투자가 쉽고, 일반 펀드보다 수수료도 저렴해.",
  "시작": "ETF 투자를 시작하려면 먼저 증권 계좌를 개설해야 해! 그다음 투자하고 싶은 ETF를 검색하고 주식처럼 매수하면 돼. 초보자라면 S&P 500이나 코스피 200 ETF부터 시작해보는 걸 추천해!",
  "default": "좋은 질문이야! ETF 투자에서 가장 중요한 건 분산 투자와 장기 보유야. 더 구체적인 질문이 있으면 언제든 물어봐!"
}

interface Message {
  id: number
  type: "ai" | "user"
  message: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "ai",
    message: "안녕! 나는 너의 투자 공부를 도와줄 AI 튜터야. 궁금한 건 뭐든지 편하게 물어봐!"
  },
  {
    id: 2,
    type: "user",
    message: "나스닥 100 ETF가 왜 그렇게 인기가 많아?"
  },
  {
    id: 3,
    type: "ai",
    message: "애플, 마이크로소프트, 구글 같은 세계적인 기술주 100개를 한 번에 담고 있어서 그래! 혁신 기업들의 성장에 올라타려는 투자자들이 가장 먼저 찾는 스테디셀러라고 할 수 있지."
  }
]

export function AIChat() {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(false)
  const [displayQuestions, setDisplayQuestions] = useState<string[]>(quickQuestions)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const storedData = sessionStorage.getItem('etfItems')
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          // ETF 객체 배열을 문자열 배열로 변환
          const etfQuestions = parsedData.map((etf: any) => `# ${etf.name}`)
          setDisplayQuestions(etfQuestions)
        }
      } catch (error) {
        console.error('Failed to parse etfItems from sessionStorage:', error)
      }
    }
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    // 더미 응답에서 매칭되는 키워드 찾기
    const normalizedMessage = userMessage.toLowerCase()
    for (const [key, response] of Object.entries(dummyResponses)) {
      if (key !== "default" && normalizedMessage.includes(key.toLowerCase().replace(/ /g, ""))) {
        return response
      }
    }
    return dummyResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    const newUserMessage: Message = {
      id: Date.now(),
      type: "user",
      message: userMessage
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      // API 호출 예시 (실제 엔드포인트로 교체 필요)
      // const requestBody = { message: userMessage }
      const requestBody ={
        question: userMessage,
        memberId: 0
      }
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to submit tutor settings');
      }

      const data = await response.json();
      console.log('+++Success ChatBot:', data);

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        message: data?.answer || getAIResponse(userMessage)
      }

      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Error:', error);
      // 에러 발생 시 기존 더미 응답으로 폴백
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        message: getAIResponse(userMessage)
      }
      setMessages(prev => [...prev, aiResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleQuickQuestion = (question: string) => {
    const cleanQuestion = question.replace("# ", "")
    setInputValue(cleanQuestion)
  }

  return (
    <section id="ai-tutor" className="py-16 md:py-24 px-6 relative scroll-mt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900">궁금한 건 못 참지!</h2>
          <p className="text-lg md:text-xl text-slate-500 font-bold">AI 튜터가 10초 만에 속 시원하게 알려드려요.</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/80 shadow-xl shadow-primary/10">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-primary to-blue-400 px-6 md:px-10 py-5 md:py-6 flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="font-black text-white text-base md:text-lg">Smart AI Tutor</span>
            </div>
            <div className="bg-white/20 px-3 md:px-4 py-1.5 rounded-full text-xs font-black text-white border border-white/30">
              ONLINE
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-6 md:p-10 space-y-6 md:space-y-8 h-[350px] md:h-[450px] overflow-y-auto bg-slate-50/50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} type={msg.type} message={msg.message} />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-blue-400 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg">
                  <Brain className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="bg-white rounded-3xl rounded-tl-none p-4 md:p-5 shadow-lg border border-white/80">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">생각하는 중...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-5 md:p-8 bg-white/80 border-t border-slate-100 backdrop-blur-md">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="w-full pl-6 md:pl-8 pr-14 md:pr-16 py-4 md:py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-slate-800 placeholder:text-slate-300 outline-none disabled:opacity-50"
                placeholder="무엇이든 물어보세요..."
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-blue-400 text-white rounded-2xl md:rounded-3xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Quick Questions */}
            <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
              {displayQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isLoading}
                  className="px-4 md:px-5 py-2 bg-gradient-to-br from-secondary to-blue-100 text-primary text-xs font-black rounded-full border border-primary/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ChatMessageProps {
  type: "ai" | "user"
  message: React.ReactNode
}

function ChatMessage({ type, message }: ChatMessageProps) {
  if (type === "ai") {
    return (
      <div className="flex gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-blue-400 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-white shadow-lg">
          <Brain className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="max-w-[85%] md:max-w-[80%] bg-white rounded-3xl rounded-tl-none p-4 md:p-5 shadow-lg border border-white/80 text-slate-700 font-medium leading-relaxed text-sm md:text-base">
          {message}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-row-reverse gap-3 md:gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-primary shadow-md border border-slate-100">
        <User className="w-5 h-5 md:w-6 md:h-6" />
      </div>
      <div className="max-w-[85%] md:max-w-[80%] bg-gradient-to-r from-primary to-blue-400 text-white rounded-3xl rounded-tr-none p-4 md:p-5 shadow-xl shadow-primary/20 font-semibold text-sm md:text-base">
        {message}
      </div>
    </div>
  )
}
