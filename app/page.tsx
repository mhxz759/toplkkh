import { Header } from "@/components/comuni/header"
import { Hero } from "@/components/comuni/hero"
import { Services } from "@/components/comuni/services"
import { HowItWorks } from "@/components/comuni/how-it-works"
import { Reviews } from "@/components/comuni/reviews"
import { Premium } from "@/components/comuni/premium"
import { Footer } from "@/components/comuni/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Reviews />
      <Premium />
      <Footer />
    </main>
  )
}
