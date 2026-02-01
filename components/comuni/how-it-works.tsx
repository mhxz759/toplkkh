"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, FileText, Users, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    id: 1,
    title: "CONTE O QUE VOCÊ PRECISA",
    description: "Especifique o que você procura e inclua o máximo de detalhes, como: serviço específico, região e cidade para a melhor busca do profissional.",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "RECEBA UMA DIVERSIDADE DE PROFISSIONAIS",
    description: "Aonde você irá encontrar profissionais de confiança, podendo dar oportunidade para quem está começando, e também ter a melhor média de preço do mercado!",
    icon: Users,
    color: "bg-emerald-500",
  },
  {
    id: 3,
    title: "AGENDE O SEU SERVIÇO",
    description: "Converse com o profissional escolhido e agende o seu serviço para o melhor dia e horário.",
    icon: Calendar,
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "PAGUE SÓ DEPOIS",
    description: "Após o serviço realizado, pague pelo aplicativo e parcele em até 9x sem juros no cartão de crédito.",
    icon: CreditCard,
    color: "bg-primary",
  },
]

export function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length)
  }

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Como Funciona?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Contratar um profissional nunca foi tão fácil e seguro
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Card className="bg-card border-border max-w-sm mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl ${steps[currentStep].color} flex items-center justify-center mb-6`}>
                  {(() => {
                    const Icon = steps[currentStep].icon
                    return <Icon className="w-10 h-10 text-white" />
                  })()}
                </div>
                <h3 className="font-bold text-foreground mb-4 text-sm tracking-wide">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevStep}
              className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-card"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentStep ? "bg-foreground" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir para passo ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextStep}
              className="h-10 w-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-card"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={step.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-3 text-xs tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
