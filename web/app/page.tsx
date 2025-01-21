import Header from "@/components/Header"
import Hero from "@/components/Hero"
import YearSelection from "@/components/YearSelection"
import FloatingElements from "@/components/FloatingElements"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
      <FloatingElements />
      <Header />
      <Hero />
      <YearSelection />
      <Footer />
    </main>
  )
}

