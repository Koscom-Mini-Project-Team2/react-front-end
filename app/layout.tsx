import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr'
});

export const metadata: Metadata = {
  title: 'REME-IK - 스마트한 투자 시작',
  description: 'ETF, 진짜 쉽게 알려줄게! MZ를 위한 똑똑한 투자 가이드',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} antialiased bg-background text-foreground overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
