"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const reviews = [
  {
    id: 1,
    name: "João Silva",
    profession: "Eletricista",
    rating: 4,
    review: "Ótimo profissional, recomendo!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    initials: "JS",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    profession: "Profissional de limpeza",
    rating: 5,
    review: "Serviço realizado de maneira eficiente e atenciosa",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    initials: "MO",
  },
  {
    id: 3,
    name: "Carlos Santos",
    profession: "Encanador",
    rating: 5,
    review: "Profissional pontual e trabalho impecável. Super indico!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    initials: "CS",
  },
  {
    id: 4,
    name: "Ana Paula",
    profession: "Pintora",
    rating: 4,
    review: "Excelente custo-benefício, serviço de qualidade!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    initials: "AP",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  return (
    <section id="avaliacoes" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              Avaliações
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Veja o que nossos usuários estão dizendo sobre os profissionais
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6">
            Avaliar
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-14 h-14 border-2 border-border">
                    <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.profession}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.review}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
