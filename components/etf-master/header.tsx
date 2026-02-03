"use client"

import { useState } from "react"
import { TrendingUp, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleApiTest = async () => {
    try {
      const res = await fetch("/api/survey");

      console.log("HTTP Status:", res.status);

      if (!res.ok) {
        const error = await res.text();
        console.error("Error Response:", error);
        throw new Error("Failed to fetch survey");
      }

      const survey = await res.json();
      console.log("Survey Data:", survey);
    } catch (error) {
      console.error("API Test Error:", error);
    }

  }

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50">
      <div className="px-6 md:px-8 h-20 flex items-center justify-between bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg shadow-primary/10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-primary to-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-primary">Ko-MERIT</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#">
            가이드
          </a>
          <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="#">
            ETF AI 튜터
          </a>
          <a className="text-sm font-bold text-slate-600 hover:text-primary transition-colors" href="/portfolio">
            ETF 찾아보기
          </a>
        </nav>

        {/* Desktop CTA */}
        <button className="hidden md:block px-7 py-3 bg-gradient-to-r from-primary to-blue-400 text-white font-extrabold text-sm rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
        onClick={() => router.push("/portfolio")}>
          내 포트폴리오 만들기
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-2xl bg-white/60 border border-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {isMenuOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-24 left-0 right-0 bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-primary/10 overflow-hidden transition-all duration-300",
          isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
        )}
      >
        <nav className="flex flex-col p-6 gap-4">
          <a
            className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-3 px-4 rounded-2xl hover:bg-primary/5"
            href="#"
            onClick={() => setIsMenuOpen(false)}
          >
            가이드
          </a>
          <a
            className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-3 px-4 rounded-2xl hover:bg-primary/5"
            href="#"
            onClick={() => setIsMenuOpen(false)}
          >
            AI 어드바이저
          </a>
          <a
            className="text-base font-bold text-slate-600 hover:text-primary transition-colors py-3 px-4 rounded-2xl hover:bg-primary/5"
            href="#"
            onClick={() => setIsMenuOpen(false)}
          >
            마켓 비교
          </a>
          <button className="mt-2 px-7 py-4 bg-gradient-to-r from-primary to-blue-400 text-white font-extrabold text-sm rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
          onClick={handleApiTest}>
            무료 시작
          </button>
        </nav>
      </div>
    </header>
  )
}
