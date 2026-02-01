"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Search, LogOut, User, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserData {
  id: string
  email: string
  full_name: string | null
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (authUser) {
        setUser({
          id: authUser.id,
          email: authUser.email || "",
          full_name: authUser.user_metadata?.full_name || null,
        })
      }
      setLoading(false)
    }
    
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          full_name: session.user.user_metadata?.full_name || null,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary">Com</span>
            <span className="text-2xl font-serif font-bold text-foreground">Uni</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como Funciona
          </Link>
          <Link href="#servicos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Serviços
          </Link>
          <Link href="#avaliacoes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Avaliações
          </Link>
          <Link href="#premium" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            PremiumPro
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          
          {loading ? (
            <div className="w-24 h-9 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{user.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/cadastro">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Cadastrar-se
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-card">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="#como-funciona" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                Como Funciona
              </Link>
              <Link href="#servicos" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                Serviços
              </Link>
              <Link href="#avaliacoes" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                Avaliações
              </Link>
              <Link href="#premium" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                PremiumPro
              </Link>
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span className="truncate">{user.full_name || user.email}</span>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent">
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/auth/cadastro" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        Cadastrar-se
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
