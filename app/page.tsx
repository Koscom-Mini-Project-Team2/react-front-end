import {
  Header,
  HeroSection,
  ETFExplanation,
  FeatureCards,
  InvestmentTypes,
  AIChat,
  CTASection,
  Footer,
} from "@/components/etf-master"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ETFExplanation />
      <FeatureCards />
      <InvestmentTypes />
      <AIChat />
      <CTASection />
      <Footer />
    </main>
  )
}
