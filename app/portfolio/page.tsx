"use client"

import React, { useState } from "react"
import { Database, Wallet, Layers, ShieldCheck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

function FeatureItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-6 p-6 rounded-[28px] bg-muted/50 border border-transparent hover:border-secondary transition-all group">
      <div className="w-16 h-16 bg-card rounded-[20px] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h4 className="font-black text-xl text-foreground">{title}</h4>
        <p className="text-muted-foreground font-medium">{description}</p>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const router = useRouter()

  const handleConnect = () => {
    // 마이데이터 연동 처리 (여기서 실제 연동 로직 추가 가능)
    setIsSuccessOpen(true)
  }

  const handleConfirm = () => {
    setIsSuccessOpen(false)
    router.push("/survey")
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Card Container */}
      <div className="w-full max-w-xl bg-card/90 backdrop-blur-xl rounded-[32px] overflow-hidden relative border-t-8 border-primary shadow-[0_30px_60px_-12px_rgba(43,124,238,0.12),0_18px_36px_-18px_rgba(0,0,0,0.05)]">
        <div className="p-10 md:p-14">
          {/* Header Section */}
          <div className="text-center mb-12 relative">
            {/* Database Icon */}
            <div className="w-24 h-24 bg-gradient-to-b from-primary/10 to-secondary/30 rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-inner transform -rotate-3 drop-shadow-[0_10px_15px_rgba(43,124,238,0.3)]">
              <Database className="w-12 h-12 text-primary" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black mb-5 tracking-tight text-foreground leading-tight text-balance">
              더 정확한 추천을 위해
              <br />
              데이터 연동이 필요해요
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground font-semibold text-lg">
              안전한 MyData 연동으로 딱 맞는 ETF를 찾아드릴게요.
            </p>
          </div>

          {/* Feature Items */}
          <div className="grid gap-5 mb-12">
            <FeatureItem
              icon={Wallet}
              title="자산 규모"
              description="전체 자산 현황을 파악하여 투자 비중을 제안합니다."
            />
            <FeatureItem
              icon={Layers}
              title="투자 상품 종류"
              description="보유 중인 종목과 겹치지 않는 상품을 선별합니다."
            />
          </div>

          {/* Action Section */}
          <div className="text-center">
            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 mb-8 text-primary">
              <ShieldCheck className="w-5 h-5" />
              <p className="text-sm font-extrabold uppercase tracking-wider">
                자동 매수는 절대 없어요
              </p>
            </div>

{/* Primary CTA Button */}
            <button
              type="button"
              onClick={handleConnect}
              className="block w-full py-6 bg-primary text-primary-foreground font-black text-xl md:text-2xl rounded-[28px] shadow-2xl shadow-primary/30 hover:scale-[1.02] hover:-translate-y-1 transition-all active:scale-95 text-center cursor-pointer"
            >
              연동하고 계속하기
            </button>

            {/* Secondary Link */}
            <Link
              href="/"
              className="mt-8 inline-block text-sm text-muted-foreground font-bold hover:text-primary transition-colors tracking-wide"
            >
              나중에 할게요
            </Link>
          </div>
        </div>

{/* Background Decorations */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl -z-10" />
      </div>

      {/* Success Dialog */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="max-w-sm rounded-[24px] p-8 text-center">
          <DialogHeader className="items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-black text-foreground">
              마이데이터 연동 성공!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium mt-2">
              이제 맞춤 ETF 추천을 받을 수 있어요.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleConfirm}
            className="w-full mt-6 py-6 text-lg font-bold rounded-[16px]"
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  )
}
