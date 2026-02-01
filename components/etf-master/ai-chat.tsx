"use client"

import React from "react"

import { useState } from "react"
import { ArrowRight, Brain, User } from "lucide-react"

const quickQuestions = ["# 상장폐지 되면 어떡해?", "# 배당금은 어떻게 받아?", "# 환율 영향은?"]

export function AIChat() {
  const [inputValue, setInputValue] = useState("")

  return (
    <section id="ai-tutor" className="py-16 md:py-24 px-6 relative scroll-mt-24">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900">{"궁금한 건 못 참지! 💬"}</h2>
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
          <div className="p-6 md:p-10 space-y-6 md:space-y-8 h-[350px] md:h-[450px] overflow-y-auto bg-background/50">
            {/* AI Message */}
            <ChatMessage
              type="ai"
              message="안녕! 나는 너의 투자 공부를 도와줄 AI 튜터야. 궁금한 건 뭐든지 편하게 물어봐! 🚀"
            />

            {/* User Message */}
            <ChatMessage type="user" message="나스닥 100 ETF가 왜 그렇게 인기가 많아?" />

            {/* AI Response */}
            <ChatMessage
              type="ai"
              message={
                <>
                  애플, 마이크로소프트, 구글 같은 세계적인 기술주 100개를 한 번에 담고 있어서 그래!
                  <br />
                  <br />
                  {"혁신 기업들의 성장에 올라타려는 투자자들이 가장 먼저 찾는 스테디셀러라고 할 수 있지. 😎"}
                </>
              }
            />
          </div>

          {/* Chat Input */}
          <div className="p-5 md:p-8 bg-white/80 border-t border-slate-100 backdrop-blur-md">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full pl-6 md:pl-8 pr-14 md:pr-16 py-4 md:py-5 bg-white border-2 border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold text-slate-800 placeholder:text-slate-300 outline-none"
                placeholder="무엇이든 물어보세요..."
              />
              <button className="absolute right-3 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-primary to-blue-400 text-white rounded-2xl md:rounded-3xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/30">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Questions */}
            <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question.replace("# ", ""))}
                  className="px-4 md:px-5 py-2 bg-gradient-to-br from-secondary to-blue-100 text-primary text-xs font-black rounded-full border border-primary/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
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
