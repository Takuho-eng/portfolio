import { setRequestLocale } from 'next-intl/server'
import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import WorksSection from '@/components/sections/WorksSection'
import ContactSection from '@/components/sections/ContactSection'
import Nav from '@/components/ui/Nav'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="min-h-screen bg-[#F0EDE4]">
      <Nav />
      <HeroSection />
      <StatsSection />
      <WorksSection />
      <ContactSection />
    </main>
  )
}
