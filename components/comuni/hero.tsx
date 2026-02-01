"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Loader2, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGeolocation } from "@/hooks/use-geolocation"
import { createClient } from "@/lib/supabase/client"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const geo = useGeolocation()
  const supabase = createClient()

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setIsLoggedIn(!!user)
    }
    checkUser()
  }, [supabase.auth])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (isLoggedIn) {
      router.push(`/dashboard?q=${encodeURIComponent(searchQuery)}`)
    } else {
      router.push(`/auth/login?redirect=/dashboard&q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-6">
            Conectando profissionais e clientes
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight text-balance">
            Uma nova forma de{" "}
            <span className="text-accent">contratar profissionais</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Encontre profissionais autônomos de confiança em todo o Brasil. 
            Unindo quem faz, com quem consome.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto bg-card p-2 rounded-2xl shadow-lg border border-border">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por profissionais ou serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>
            <div className="relative flex-1 sm:border-l border-border sm:pl-3">
              <MapPin className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              {geo.loading ? (
                <div className="flex items-center h-12 pl-12">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground mr-2" />
                  <span className="text-sm text-muted-foreground">Obtendo localização...</span>
                </div>
              ) : geo.city ? (
                <Input
                  type="text"
                  value={`${geo.city}, ${geo.state}`}
                  readOnly
                  className="pl-12 h-12 border-0 bg-transparent text-foreground focus-visible:ring-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={geo.requestLocation}
                  className="flex items-center h-12 pl-12 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Permitir localização
                </button>
              )}
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl">
              Buscar
            </Button>
          </form>

          {geo.error && (
            <p className="mt-3 text-sm text-destructive">{geo.error}</p>
          )}

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">10k+</p>
              <p className="text-sm text-muted-foreground">Profissionais</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">50k+</p>
              <p className="text-sm text-muted-foreground">Serviços realizados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">4.8</p>
              <p className="text-sm text-muted-foreground">Avaliação média</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
    </section>
  )
}
