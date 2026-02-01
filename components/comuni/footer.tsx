import Link from "next/link"
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-serif font-bold text-primary-foreground">Com</span>
              <span className="text-2xl font-serif font-bold text-background">Uni</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Unindo quem faz, com quem consome. Conectando profissionais autônomos com clientes em todo o Brasil.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li><Link href="#como-funciona" className="text-sm text-background/70 hover:text-background transition-colors">Como Funciona</Link></li>
              <li><Link href="#servicos" className="text-sm text-background/70 hover:text-background transition-colors">Serviços</Link></li>
              <li><Link href="#avaliacoes" className="text-sm text-background/70 hover:text-background transition-colors">Avaliações</Link></li>
              <li><Link href="#premium" className="text-sm text-background/70 hover:text-background transition-colors">PremiumPro</Link></li>
            </ul>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="font-semibold mb-4">Para Profissionais</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">Cadastrar como profissional</Link></li>
              <li><Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">Plano PremiumPro</Link></li>
              <li><Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">Central de Ajuda</Link></li>
              <li><Link href="#" className="text-sm text-background/70 hover:text-background transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="w-4 h-4 flex-shrink-0" />
                contato@comuni.com.br
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="w-4 h-4 flex-shrink-0" />
                (11) 99999-9999
              </li>
              <li className="flex items-start gap-3 text-sm text-background/70">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Brasil - Atendimento Nacional
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2026 ComUni. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-background/50 hover:text-background/70 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-sm text-background/50 hover:text-background/70 transition-colors">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
