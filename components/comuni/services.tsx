"use client"

import { Zap, Wrench, Paintbrush, Wind, Hammer, Sofa, Sparkles, Car } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  { name: "Eletricista", icon: Zap, color: "bg-amber-100 text-amber-700" },
  { name: "Encanador", icon: Wrench, color: "bg-blue-100 text-blue-700" },
  { name: "Pintor", icon: Paintbrush, color: "bg-rose-100 text-rose-700" },
  { name: "Ar Condicionado", icon: Wind, color: "bg-sky-100 text-sky-700" },
  { name: "Faz Tudo", icon: Hammer, color: "bg-orange-100 text-orange-700" },
  { name: "Montagem de Móveis", icon: Sofa, color: "bg-emerald-100 text-emerald-700" },
  { name: "Limpeza", icon: Sparkles, color: "bg-teal-100 text-teal-700" },
  { name: "Mecânico", icon: Car, color: "bg-slate-100 text-slate-700" },
]

export function Services() {
  return (
    <section id="servicos" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Serviços populares
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Encontre profissionais qualificados para qualquer tipo de serviço que você precisar
            </p>
          </div>
          <Button variant="link" className="text-accent hover:text-accent/80 mt-4 md:mt-0 p-0">
            Ver tudo →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.name}
                className="group cursor-pointer border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 bg-card"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Profissionais disponíveis
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
