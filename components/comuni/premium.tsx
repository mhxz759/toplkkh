"use client"

import { Check, Crown, Sparkles, TrendingUp, Award, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const features = [
  { icon: TrendingUp, text: "Maior visibilidade nas pesquisas" },
  { icon: Star, text: "Indicação frequente para clientes" },
  { icon: Award, text: "Certificado digital dentro do app" },
  { icon: Sparkles, text: "Destaque especial no perfil" },
  { icon: Check, text: "Avaliações obrigatórias garantidas" },
  { icon: Crown, text: "Selo PremiumPro exclusivo" },
]

export function Premium() {
  return (
    <section id="premium" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6">
              <Crown className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Para Profissionais</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Plano PremiumPro
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Destaque-se da concorrência e conquiste mais clientes com nosso plano exclusivo
            </p>
          </div>

          <Card className="bg-card border-border overflow-hidden">
            <div className="md:flex">
              <CardContent className="p-8 md:p-10 flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Turbine seu perfil profissional
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{feature.text}</span>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
              
              <div className="bg-primary p-8 md:p-10 md:w-80 flex flex-col justify-center items-center text-center">
                <p className="text-primary-foreground/80 text-sm mb-2">A partir de</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-primary-foreground">R$ 49</span>
                  <span className="text-primary-foreground/80">/mês</span>
                </div>
                <p className="text-primary-foreground/70 text-sm mb-6">
                  Cancele quando quiser
                </p>
                <Button 
                  size="lg" 
                  className="w-full bg-card text-foreground hover:bg-card/90 rounded-xl font-semibold"
                >
                  Começar agora
                </Button>
                <p className="text-primary-foreground/60 text-xs mt-4">
                  7 dias grátis para testar
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
