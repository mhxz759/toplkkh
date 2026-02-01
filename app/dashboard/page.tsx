"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useGeolocation } from "@/hooks/use-geolocation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MapPin,
  Wrench,
  Zap,
  PaintBucket,
  Hammer,
  Car,
  Droplets,
  Loader2,
  LogOut,
  User,
  ChevronRight,
  Phone,
  Send,
  DollarSign,
  Clock,
  Navigation,
  MapPinOff,
  Plus,
  Briefcase,
  Star,
  CheckCircle,
} from "lucide-react";

// Tipos de serviços
const SERVICE_CATEGORIES = [
  { id: "mecanico", name: "Mecanico", icon: Car },
  { id: "eletricista", name: "Eletricista", icon: Zap },
  { id: "pintor", name: "Pintor", icon: PaintBucket },
  { id: "pedreiro", name: "Pedreiro", icon: Hammer },
  { id: "encanador", name: "Encanador", icon: Droplets },
  { id: "geral", name: "Servicos Gerais", icon: Wrench },
];

// Dados simulados de solicitacoes de servico
const MOCK_SERVICES = [
  {
    id: "1",
    title: "Troca de chuveiro eletrico",
    category: "eletricista",
    description: "Preciso trocar um chuveiro eletrico que queimou. E um apartamento no 3 andar. O chuveiro atual e de 5500W e gostaria de instalar um de 7500W.",
    clientName: "Maria Silva",
    clientPhone: "(11) 99999-1234",
    address: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "Sao Paulo",
    state: "SP",
    urgency: "normal",
    postedAt: "Ha 2 horas",
    budget: null,
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: "2",
    title: "Conserto de vazamento na pia",
    category: "encanador",
    description: "A pia da cozinha esta vazando embaixo. Parece ser no sifao. Preciso de alguem para verificar e consertar o mais rapido possivel.",
    clientName: "Ana Costa",
    clientPhone: "(11) 97777-9012",
    address: "Rua dos Pinheiros, 789",
    neighborhood: "Pinheiros",
    city: "Sao Paulo",
    state: "SP",
    urgency: "alta",
    postedAt: "Ha 1 hora",
    budget: null,
    latitude: -23.5667,
    longitude: -46.6910,
  },
  {
    id: "3",
    title: "Pintura externa de casa",
    category: "pintor",
    description: "Casa de 2 andares, preciso pintar toda a parte externa. Aproximadamente 150m2 de area. Cor atual e bege, quero mudar para branco gelo.",
    clientName: "Lucia Mendes",
    clientPhone: "(11) 92222-9012",
    address: "Rua Harmonia, 300",
    neighborhood: "Vila Madalena",
    city: "Sao Paulo",
    state: "SP",
    urgency: "baixa",
    postedAt: "Ha 2 dias",
    budget: "R$ 3.000 - R$ 5.000",
    latitude: -23.5530,
    longitude: -46.6916,
  },
  {
    id: "4",
    title: "Instalacao de ar condicionado",
    category: "eletricista",
    description: "Preciso instalar um ar condicionado split de 12000 BTUs no quarto. Ja tenho o aparelho, so preciso da instalacao.",
    clientName: "Roberto Almeida",
    clientPhone: "(11) 98765-4321",
    address: "Av. Ibirapuera, 500",
    neighborhood: "Moema",
    city: "Sao Paulo",
    state: "SP",
    urgency: "normal",
    postedAt: "Ha 4 horas",
    budget: "R$ 300 - R$ 450",
    latitude: -23.6017,
    longitude: -46.6652,
  },
  {
    id: "5",
    title: "Revisao completa do carro",
    category: "mecanico",
    description: "Preciso fazer uma revisao completa no meu Gol 2018. Trocar oleo, filtros, verificar freios e suspensao. O carro esta com 45.000km.",
    clientName: "Carlos Oliveira",
    clientPhone: "(11) 96666-3456",
    address: "Rua Augusta, 1000",
    neighborhood: "Centro",
    city: "Guarulhos",
    state: "SP",
    urgency: "normal",
    postedAt: "Ha 3 horas",
    budget: "R$ 400 - R$ 600",
    latitude: -23.4538,
    longitude: -46.5333,
  },
  {
    id: "6",
    title: "Construcao de muro 10m",
    category: "pedreiro",
    description: "Preciso construir um muro de 10 metros de comprimento por 2 metros de altura nos fundos do terreno. Material por minha conta.",
    clientName: "Pedro Souza",
    clientPhone: "(11) 95555-7890",
    address: "Rua das Acacias, 200",
    neighborhood: "Vila Assuncao",
    city: "Santo Andre",
    state: "SP",
    urgency: "baixa",
    postedAt: "Ha 1 dia",
    budget: "R$ 2.000 - R$ 3.000",
    latitude: -23.6639,
    longitude: -46.5322,
  },
  {
    id: "7",
    title: "Troca de pastilhas de freio",
    category: "mecanico",
    description: "As pastilhas de freio do meu Honda Civic 2020 estao fazendo barulho. Preciso trocar as dianteiras e verificar as traseiras.",
    clientName: "Ricardo Gomes",
    clientPhone: "(11) 93333-5678",
    address: "Av. dos Autonomistas, 1500",
    neighborhood: "Centro",
    city: "Osasco",
    state: "SP",
    urgency: "alta",
    postedAt: "Ha 30 minutos",
    budget: "R$ 200 - R$ 350",
    latitude: -23.5325,
    longitude: -46.7917,
  },
  {
    id: "8",
    title: "Pintura de quarto 12m2",
    category: "pintor",
    description: "Quero pintar um quarto de aproximadamente 12m2. Atualmente esta branco e quero mudar para azul claro. Precisa raspar a parede antes.",
    clientName: "Joao Santos",
    clientPhone: "(11) 98888-5678",
    address: "Rua Marechal Deodoro, 456",
    neighborhood: "Centro",
    city: "Sao Bernardo do Campo",
    state: "SP",
    urgency: "baixa",
    postedAt: "Ha 5 horas",
    budget: "R$ 300 - R$ 500",
    latitude: -23.6914,
    longitude: -46.5646,
  },
  {
    id: "9",
    title: "Instalacao de tomadas novas",
    category: "eletricista",
    description: "Preciso instalar 5 tomadas novas em diferentes comodos da casa. Algumas precisam ser de 20A para ar condicionado.",
    clientName: "Fernanda Lima",
    clientPhone: "(11) 94444-1234",
    address: "Rua Oscar Freire, 500",
    neighborhood: "Jardins",
    city: "Sao Paulo",
    state: "SP",
    urgency: "normal",
    postedAt: "Ha 4 horas",
    budget: null,
    latitude: -23.5624,
    longitude: -46.6690,
  },
  {
    id: "10",
    title: "Desentupimento de esgoto",
    category: "encanador",
    description: "O esgoto da casa esta entupido, a agua nao esta descendo pelo ralo do banheiro. Preciso urgente!",
    clientName: "Marcelo Ferreira",
    clientPhone: "(19) 98765-1234",
    address: "Rua Barao de Jaguara, 800",
    neighborhood: "Centro",
    city: "Campinas",
    state: "SP",
    urgency: "alta",
    postedAt: "Ha 45 minutos",
    budget: null,
    latitude: -22.9056,
    longitude: -47.0608,
  },
  {
    id: "11",
    title: "Reforma de banheiro pequeno",
    category: "pedreiro",
    description: "Banheiro de 4m2 precisa trocar piso e azulejo. Tambem quero trocar a pia e o vaso. Material por minha conta.",
    clientName: "Helena Rocha",
    clientPhone: "(11) 91111-2222",
    address: "Av. Braz Leme, 1200",
    neighborhood: "Santana",
    city: "Sao Paulo",
    state: "SP",
    urgency: "normal",
    postedAt: "Ha 6 horas",
    budget: "R$ 1.500 - R$ 2.500",
    latitude: -23.5089,
    longitude: -46.6260,
  },
  {
    id: "12",
    title: "Troca de fechadura",
    category: "geral",
    description: "Preciso trocar a fechadura da porta principal. A atual esta com problema e nao tranca direito.",
    clientName: "Sonia Martins",
    clientPhone: "(11) 93456-7890",
    address: "Av. Antonio Piranga, 300",
    neighborhood: "Centro",
    city: "Diadema",
    state: "SP",
    urgency: "alta",
    postedAt: "Ha 1 hora",
    budget: "R$ 80 - R$ 150",
    latitude: -23.6816,
    longitude: -46.6206,
  },
  {
    id: "13",
    title: "Montagem de moveis",
    category: "geral",
    description: "Comprei um guarda-roupa e uma comoda novos e preciso de alguem para montar. Sao moveis da MadeiraMadeira.",
    clientName: "Camila Nunes",
    clientPhone: "(11) 97890-1234",
    address: "Rua Tuiuti, 1500",
    neighborhood: "Tatuape",
    city: "Sao Paulo",
    state: "SP",
    urgency: "baixa",
    postedAt: "Ha 8 horas",
    budget: "R$ 150 - R$ 250",
    latitude: -23.5386,
    longitude: -46.5750,
  },
  {
    id: "14",
    title: "Conserto de portao eletronico",
    category: "eletricista",
    description: "O motor do portao parou de funcionar. Nao sei se e o motor ou a placa. Preciso de alguem para diagnosticar e consertar.",
    clientName: "Antonio Pereira",
    clientPhone: "(11) 94567-8901",
    address: "Rua Vitorino Dell Antonia, 400",
    neighborhood: "Centro",
    city: "Maua",
    state: "SP",
    urgency: "normal",
    postedAt: "Ha 3 horas",
    budget: null,
    latitude: -23.6678,
    longitude: -46.4614,
  },
  {
    id: "15",
    title: "Limpeza de caixa d agua",
    category: "geral",
    description: "Preciso fazer a limpeza da caixa d agua de 1000 litros. Faz mais de 1 ano que nao limpo.",
    clientName: "Vera Lucia",
    clientPhone: "(11) 92345-6789",
    address: "Rua Itaquera, 800",
    neighborhood: "Itaquera",
    city: "Sao Paulo",
    state: "SP",
    urgency: "baixa",
    postedAt: "Ha 1 dia",
    budget: "R$ 100 - R$ 180",
    latitude: -23.5367,
    longitude: -46.4536,
  },
];

// Trabalhadores simulados
const MOCK_WORKERS = [
  {
    id: "w1",
    name: "Jose da Silva",
    category: "eletricista",
    description: "Eletricista com 15 anos de experiencia. Instalacoes, reparos e manutencao eletrica residencial e comercial.",
    phone: "(11) 98765-1111",
    neighborhood: "Centro",
    city: "Sao Paulo",
    state: "SP",
    rating: 4.8,
    reviews: 127,
    priceRange: "R$ 80 - R$ 200/hora",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: "w2",
    name: "Carlos Pedreiro",
    category: "pedreiro",
    description: "Pedreiro profissional. Construcoes, reformas, muros, pisos e revestimentos. Trabalho com qualidade e pontualidade.",
    phone: "(11) 97654-2222",
    neighborhood: "Pinheiros",
    city: "Sao Paulo",
    state: "SP",
    rating: 4.9,
    reviews: 89,
    priceRange: "R$ 150 - R$ 300/dia",
    latitude: -23.5667,
    longitude: -46.6910,
  },
  {
    id: "w3",
    name: "Marcos Pintor",
    category: "pintor",
    description: "Pintor residencial e comercial. Pinturas internas e externas, texturas, grafiato. Material de primeira qualidade.",
    phone: "(11) 96543-3333",
    neighborhood: "Vila Madalena",
    city: "Sao Paulo",
    state: "SP",
    rating: 4.7,
    reviews: 65,
    priceRange: "R$ 25 - R$ 40/m2",
    latitude: -23.5530,
    longitude: -46.6916,
  },
  {
    id: "w4",
    name: "Roberto Mecanico",
    category: "mecanico",
    description: "Mecanico automotivo. Revisoes, trocas de oleo, freios, suspensao. Atendimento em domicilio disponivel.",
    phone: "(11) 95432-4444",
    neighborhood: "Moema",
    city: "Sao Paulo",
    state: "SP",
    rating: 4.6,
    reviews: 203,
    priceRange: "R$ 100 - R$ 250/servico",
    latitude: -23.6017,
    longitude: -46.6652,
  },
  {
    id: "w5",
    name: "Paulo Encanador",
    category: "encanador",
    description: "Encanador e bombeiro hidraulico. Desentupimentos, vazamentos, instalacoes. Atendimento 24 horas.",
    phone: "(11) 94321-5555",
    neighborhood: "Santana",
    city: "Sao Paulo",
    state: "SP",
    rating: 4.5,
    reviews: 156,
    priceRange: "R$ 80 - R$ 180/servico",
    latitude: -23.5089,
    longitude: -46.6260,
  },
  {
    id: "w6",
    name: "Fernando Geral",
    category: "geral",
    description: "Servicos gerais. Montagem de moveis, pequenos reparos, instalacoes diversas. Faco de tudo um pouco!",
    phone: "(11) 93210-6666",
    neighborhood: "Tatuape",
    city: "Sao Paulo",
    state: "SP",
    rating: 4.4,
    reviews: 78,
    priceRange: "R$ 50 - R$ 100/hora",
    latitude: -23.5386,
    longitude: -46.5750,
  },
];

interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  clientName: string;
  clientPhone: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  urgency: string;
  postedAt: string;
  budget: string | null;
  latitude: number;
  longitude: number;
  distance?: number;
}

interface Worker {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  neighborhood: string;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  priceRange: string;
  latitude: number;
  longitude: number;
  distance?: number;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  user_type: string | null;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Funcao para calcular distancia entre dois pontos em km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [maxDistance, setMaxDistance] = useState<number>(100);
  
  // Minhas habilidades (para trabalhador)
  const [mySkills, setMySkills] = useState<string[]>([]);
  
  // Formulario de nova solicitacao (para contratante)
  const [showNewServiceDialog, setShowNewServiceDialog] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    title: "",
    category: "",
    description: "",
    address: "",
    neighborhood: "",
    urgency: "normal",
    budget: "",
  });
  
  // Geolocalizacao
  const { 
    latitude, 
    longitude, 
    city: userCity, 
    state: userState,
    loading: geoLoading, 
    error: geoError,
    requestLocation 
  } = useGeolocation();
  
  // Chat e orcamento
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [budgetValue, setBudgetValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { user: authUser, loading: authLoading, signOut } = useAuth();

  const isWorker = authUser?.user_type === "professional";
  const isClient = authUser?.user_type === "client";

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push("/auth/login");
      return;
    }
    
    if (authUser) {
      setUser({
        id: authUser.id,
        full_name: authUser.full_name || null,
        email: authUser.email || "",
        user_type: authUser.user_type || null,
      });
      setInitialLoading(false);
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    filterData();
  }, [searchQuery, selectedCategory, latitude, longitude, maxDistance, mySkills, user]);

  useEffect(() => {
    if (!initialLoading) {
      if (isWorker && filteredServices.length === 0) {
        setFilteredServices(MOCK_SERVICES);
      }
      if (isClient && filteredWorkers.length === 0) {
        setFilteredWorkers(MOCK_WORKERS);
      }
    }
  }, [initialLoading, isWorker, isClient]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function filterData() {
    // Filtrar servicos (para trabalhador)
    let services: Service[] = MOCK_SERVICES.map(service => ({
      ...service,
      distance: latitude && longitude 
        ? calculateDistance(latitude, longitude, service.latitude, service.longitude)
        : undefined
    }));
    
    // Filtrar trabalhadores (para contratante)
    let workers: Worker[] = MOCK_WORKERS.map(worker => ({
      ...worker,
      distance: latitude && longitude 
        ? calculateDistance(latitude, longitude, worker.latitude, worker.longitude)
        : undefined
    }));
    
    // Aplicar filtro de distancia
    if (latitude && longitude && maxDistance < 100) {
      services = services.filter(s => s.distance !== undefined && s.distance <= maxDistance);
      workers = workers.filter(w => w.distance !== undefined && w.distance <= maxDistance);
    }
    
    // Ordenar por distancia
    if (latitude && longitude) {
      services.sort((a, b) => (a.distance || 999) - (b.distance || 999));
      workers.sort((a, b) => (a.distance || 999) - (b.distance || 999));
    }
    
    // Filtrar por categoria selecionada
    if (selectedCategory) {
      services = services.filter(s => s.category === selectedCategory);
      workers = workers.filter(w => w.category === selectedCategory);
    }
    
    // Para trabalhador: filtrar por minhas habilidades
    if (isWorker && mySkills.length > 0) {
      services = services.filter(s => mySkills.includes(s.category));
    }
    
    // Busca por texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      services = services.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.address.toLowerCase().includes(query) ||
        s.neighborhood.toLowerCase().includes(query) ||
        s.city.toLowerCase().includes(query)
      );
      workers = workers.filter(w => 
        w.name.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.neighborhood.toLowerCase().includes(query) ||
        w.city.toLowerCase().includes(query)
      );
    }
    
    setFilteredServices(services);
    setFilteredWorkers(workers);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    filterData();
  }

  async function handleLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  function getCategoryIcon(categoryId: string) {
    const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
    if (!category) return Wrench;
    return category.icon;
  }

  function getCategoryName(categoryId: string) {
    const category = SERVICE_CATEGORIES.find(c => c.id === categoryId);
    return category?.name || categoryId;
  }

  function getUrgencyColor(urgency: string) {
    switch (urgency) {
      case "alta": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "normal": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "baixa": return "bg-green-500/10 text-green-500 border-green-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  }

  function getUrgencyLabel(urgency: string) {
    switch (urgency) {
      case "alta": return "Urgente";
      case "normal": return "Normal";
      case "baixa": return "Sem pressa";
      default: return urgency;
    }
  }

  function formatDistance(distance: number | undefined): string {
    if (distance === undefined) return "";
    if (distance < 1) return `${Math.round(distance * 1000)}m`;
    return `${distance.toFixed(1)}km`;
  }

  function toggleSkill(categoryId: string) {
    setMySkills(prev => 
      prev.includes(categoryId)
        ? prev.filter(s => s !== categoryId)
        : [...prev, categoryId]
    );
  }

  function openBudgetChat(service: Service) {
    setSelectedService(service);
    setBudgetValue("");
    setChatMessages([
      {
        id: "1",
        role: "assistant",
        content: `Ola! Sou ${service.clientName}. Vi que voce tem interesse no meu servico "${service.title}". Qual seria seu orcamento para este trabalho?`,
      },
    ]);
    setShowChatDialog(true);
  }

  function openWorkerChat(worker: Worker) {
    setSelectedWorker(worker);
    setBudgetValue("");
    setChatMessages([
      {
        id: "1",
        role: "assistant",
        content: `Ola! Sou ${worker.name}. Como posso ajudar voce? Me conte sobre o servico que precisa.`,
      },
    ]);
    setShowChatDialog(true);
  }

  async function sendBudgetMessage() {
    if (!chatInput.trim() && !budgetValue) return;
    
    const userMessage = budgetValue 
      ? `Meu orcamento para este servico e R$ ${budgetValue}`
      : chatInput;
    
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
    }]);
    
    setChatInput("");
    setBudgetValue("");
    setChatLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const budgetNum = parseInt(budgetValue || chatInput.replace(/\D/g, "")) || 0;
    let response = "";
    
    if (isWorker && selectedService) {
      // Resposta como cliente
      if (budgetValue || chatInput.toLowerCase().includes("r$") || chatInput.match(/\d+/)) {
        if (selectedService?.budget) {
          const [min, max] = selectedService.budget.replace(/[R$\s.]/g, "").split("-").map(Number);
          
          if (budgetNum < min * 0.8) {
            response = `Hmm, R$ ${budgetNum} esta um pouco abaixo do que eu esperava gastar. Eu tinha pensado em algo entre ${selectedService.budget}. Voce consegue fazer por um valor um pouco maior? O que esta incluso nesse preco?`;
          } else if (budgetNum >= min * 0.8 && budgetNum <= max * 1.2) {
            response = `R$ ${budgetNum} parece justo! Esta dentro do que eu pesquisei. Quando voce teria disponibilidade para fazer o servico? E o material esta incluso ou e por minha conta?`;
          } else {
            response = `R$ ${budgetNum} esta acima do que eu esperava. Consegui orcamentos na faixa de ${selectedService.budget}. Tem como negociar esse valor? O que justifica esse preco?`;
          }
        } else {
          if (budgetNum < 100) {
            response = `R$ ${budgetNum}? Esse valor parece bem em conta. So para confirmar, isso inclui a mao de obra completa? Quando voce poderia vir fazer?`;
          } else if (budgetNum < 500) {
            response = `R$ ${budgetNum}, entendi. Parece um valor razoavel. Voce pode me explicar o que esta incluso nesse orcamento? Tem garantia do servico?`;
          } else {
            response = `R$ ${budgetNum} e um valor consideravel. Voce pode detalhar melhor o que esta incluso? Gostaria de entender o que justifica esse investimento.`;
          }
        }
      } else if (chatInput.toLowerCase().includes("disponibilidade") || chatInput.toLowerCase().includes("quando")) {
        response = "Tenho flexibilidade de horario. Prefiro durante a semana, de manha se possivel. Qual dia funcionaria melhor pra voce?";
      } else if (chatInput.toLowerCase().includes("material") || chatInput.toLowerCase().includes("incluso")) {
        response = "Boa pergunta! Prefiro que voce traga o material necessario e me passe o valor separado. Assim fica mais transparente pra mim. Pode ser?";
      } else if (chatInput.toLowerCase().includes("garantia")) {
        response = "Sim, garantia e importante pra mim. Quanto tempo de garantia voce oferece no servico?";
      } else {
        response = "Entendi! Pode me falar mais sobre como voce faria o servico? E qual seria o prazo para conclusao?";
      }
    } else if (isClient && selectedWorker) {
      // Resposta como trabalhador
      if (chatInput.toLowerCase().includes("orcamento") || chatInput.toLowerCase().includes("preco") || chatInput.toLowerCase().includes("valor")) {
        response = `Para dar um orcamento preciso, preciso saber mais detalhes. Pode me descrever exatamente o que precisa? Se tiver fotos do local/problema, ajuda bastante! Minha faixa de preco costuma ser ${selectedWorker.priceRange}.`;
      } else if (chatInput.toLowerCase().includes("disponibilidade") || chatInput.toLowerCase().includes("quando")) {
        response = "Tenho disponibilidade esta semana! Prefiro agendar com antecedencia para garantir o melhor horario. Qual dia seria melhor pra voce?";
      } else if (chatInput.toLowerCase().includes("garantia")) {
        response = "Ofereco garantia de 90 dias em todos os meus servicos. Se tiver qualquer problema nesse periodo, volto sem custo adicional!";
      } else {
        response = `Entendi sua necessidade! Com base no que voce descreveu, posso fazer um orcamento. ${selectedWorker.priceRange} e minha faixa de preco usual. Quando seria bom para eu ir ate ai avaliar?`;
      }
    }
    
    setChatMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    }]);
    
    setChatLoading(false);
  }

  function handleNewServiceSubmit() {
    // Simular adicao de novo servico
    alert("Servico publicado com sucesso! Os trabalhadores da regiao serao notificados.");
    setShowNewServiceDialog(false);
    setNewServiceForm({
      title: "",
      category: "",
      description: "",
      address: "",
      neighborhood: "",
      urgency: "normal",
      budget: "",
    });
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="font-serif text-xl font-bold text-primary">ComUni</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex">
                {isWorker ? "Trabalhador" : "Contratante"}
              </Badge>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user?.full_name || user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Ola, {user?.full_name?.split(" ")[0] || "Usuario"}!
          </h1>
          <p className="text-muted-foreground">
            {isWorker 
              ? "Encontre servicos na sua regiao e envie seu orcamento"
              : "Encontre profissionais qualificados para seu servico"
            }
          </p>
        </div>

        {/* Localizacao */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {latitude && longitude ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Navigation className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sua localizacao</p>
                      <p className="text-sm text-muted-foreground">
                        {userCity ? `${userCity}, ${userState}` : "Localizacao detectada"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <MapPinOff className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Localizacao nao detectada</p>
                      <p className="text-sm text-muted-foreground">
                        Ative para ver {isWorker ? "servicos" : "profissionais"} perto de voce
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {latitude && longitude && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Distancia:</span>
                    <select
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(Number(e.target.value))}
                      className="bg-background border border-border rounded-md px-2 py-1 text-sm"
                    >
                      <option value={5}>5 km</option>
                      <option value={10}>10 km</option>
                      <option value={20}>20 km</option>
                      <option value={50}>50 km</option>
                      <option value={100}>Todos</option>
                    </select>
                  </div>
                )}
                <Button
                  onClick={requestLocation}
                  disabled={geoLoading}
                  variant={latitude && longitude ? "outline" : "default"}
                  size="sm"
                >
                  {geoLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <MapPin className="w-4 h-4 mr-2" />
                  )}
                  {latitude && longitude ? "Atualizar" : "Ativar GPS"}
                </Button>
              </div>
            </div>
            
            {geoError && (
              <p className="text-sm text-red-500 mt-2">{geoError}</p>
            )}
          </CardContent>
        </Card>

        {/* Conteudo baseado no tipo de usuario */}
        {isWorker ? (
          /* === DASHBOARD DO TRABALHADOR === */
          <>
            {/* Minhas Habilidades */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Minhas Habilidades (selecione o que voce faz)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isSelected = mySkills.includes(category.id);
                    return (
                      <Button
                        key={category.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSkill(category.id)}
                        className="gap-1"
                      >
                        {isSelected && <CheckCircle className="w-3 h-3" />}
                        <Icon className="w-4 h-4" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
                {mySkills.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Mostrando servicos de: {mySkills.map(s => getCategoryName(s)).join(", ")}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Busca */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por servico, bairro ou cidade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border h-12"
                  />
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground h-12 px-6">
                  Buscar
                </Button>
              </div>
            </form>

            {/* Lista de Servicos */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    {filteredServices.length} servicos {latitude && longitude ? "perto de voce" : "disponiveis"}
                  </h2>
                </div>

                {filteredServices.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Wrench className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Nenhum servico encontrado</h3>
                    <p className="text-sm text-muted-foreground">
                      {mySkills.length === 0 
                        ? "Selecione suas habilidades acima para ver servicos relacionados."
                        : "Tente buscar por outro termo ou aumentar a distancia."}
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredServices.map((service) => {
                      const CategoryIcon = getCategoryIcon(service.category);
                      return (
                        <Card
                          key={service.id}
                          className={`cursor-pointer transition-all hover:border-primary/50 ${
                            selectedService?.id === service.id ? "border-primary ring-1 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedService(service)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <CategoryIcon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h3 className="font-semibold text-foreground truncate">{service.title}</h3>
                                    <p className="text-sm text-muted-foreground truncate">
                                      {service.clientName}
                                    </p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {getCategoryName(service.category)}
                                  </Badge>
                                  <Badge variant="outline" className={`text-xs ${getUrgencyColor(service.urgency)}`}>
                                    {getUrgencyLabel(service.urgency)}
                                  </Badge>
                                  {service.distance !== undefined && (
                                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                                      <Navigation className="w-3 h-3 mr-1" />
                                      {formatDistance(service.distance)}
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-3 mt-2 text-sm">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    {service.neighborhood}, {service.city}
                                  </span>
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {service.postedAt}
                                  </span>
                                </div>
                                
                                {service.budget && (
                                  <div className="mt-2">
                                    <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                                      <DollarSign className="w-3 h-3" />
                                      Expectativa: {service.budget}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Detalhes do Servico */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                {selectedService ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                          {(() => {
                            const CategoryIcon = getCategoryIcon(selectedService.category);
                            return <CategoryIcon className="w-7 h-7 text-primary" />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <h2 className="font-serif text-xl font-bold text-foreground">
                            {selectedService.title}
                          </h2>
                          <p className="text-muted-foreground">{selectedService.clientName}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{getCategoryName(selectedService.category)}</Badge>
                        <Badge variant="outline" className={getUrgencyColor(selectedService.urgency)}>
                          {getUrgencyLabel(selectedService.urgency)}
                        </Badge>
                        {selectedService.distance !== undefined && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                            <Navigation className="w-3 h-3 mr-1" />
                            {formatDistance(selectedService.distance)} de voce
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="font-medium text-foreground mb-2">Descricao do servico</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {selectedService.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-1">Endereco</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedService.address}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedService.neighborhood}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedService.city}, {selectedService.state}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground mb-1">Contato</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {selectedService.clientPhone}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {selectedService.postedAt}
                            </p>
                          </div>
                        </div>
                        
                        {selectedService.budget && (
                          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <h3 className="font-medium text-green-700 mb-1 flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              Expectativa do cliente
                            </h3>
                            <p className="text-green-600 font-semibold">
                              {selectedService.budget}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        className="w-full bg-primary text-primary-foreground"
                        onClick={() => openBudgetChat(selectedService)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Orcamento
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-8 text-center">
                    <Wrench className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Selecione um servico</h3>
                    <p className="text-sm text-muted-foreground">
                      Clique em um servico da lista para ver os detalhes e enviar seu orcamento.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </>
        ) : (
          /* === DASHBOARD DO CONTRATANTE === */
          <>
            {/* Botao Nova Solicitacao */}
            <Button 
              className="w-full mb-6 h-14 text-lg"
              onClick={() => setShowNewServiceDialog(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Solicitar Novo Servico
            </Button>

            {/* Busca */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por profissional, bairro ou cidade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border h-12"
                  />
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground h-12 px-6">
                  Buscar
                </Button>
              </div>
            </form>

            {/* Filtro por Categoria */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                Todos
              </Button>
              {SERVICE_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="whitespace-nowrap"
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {category.name}
                  </Button>
                );
              })}
            </div>

            {/* Lista de Trabalhadores */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    {filteredWorkers.length} profissionais {latitude && longitude ? "perto de voce" : "disponiveis"}
                  </h2>
                </div>

                {filteredWorkers.length === 0 ? (
                  <Card className="p-8 text-center">
                    <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Nenhum profissional encontrado</h3>
                    <p className="text-sm text-muted-foreground">
                      Tente buscar por outro termo ou aumentar a distancia.
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {filteredWorkers.map((worker) => {
                      const CategoryIcon = getCategoryIcon(worker.category);
                      return (
                        <Card
                          key={worker.id}
                          className={`cursor-pointer transition-all hover:border-primary/50 ${
                            selectedWorker?.id === worker.id ? "border-primary ring-1 ring-primary" : ""
                          }`}
                          onClick={() => setSelectedWorker(worker)}
                        >
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <User className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h3 className="font-semibold text-foreground truncate">{worker.name}</h3>
                                    <div className="flex items-center gap-1 text-sm">
                                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                      <span className="text-foreground font-medium">{worker.rating}</span>
                                      <span className="text-muted-foreground">({worker.reviews} avaliacoes)</span>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                                </div>
                                
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-xs">
                                    <CategoryIcon className="w-3 h-3 mr-1" />
                                    {getCategoryName(worker.category)}
                                  </Badge>
                                  {worker.distance !== undefined && (
                                    <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                                      <Navigation className="w-3 h-3 mr-1" />
                                      {formatDistance(worker.distance)}
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-3 mt-2 text-sm">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="w-3 h-3" />
                                    {worker.neighborhood}, {worker.city}
                                  </span>
                                </div>
                                
                                <div className="mt-2">
                                  <span className="flex items-center gap-1 text-sm font-medium text-green-600">
                                    <DollarSign className="w-3 h-3" />
                                    {worker.priceRange}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Detalhes do Trabalhador */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                {selectedWorker ? (
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h2 className="font-serif text-xl font-bold text-foreground">
                            {selectedWorker.name}
                          </h2>
                          <div className="flex items-center gap-1 text-sm mt-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-foreground font-medium">{selectedWorker.rating}</span>
                            <span className="text-muted-foreground">({selectedWorker.reviews} avaliacoes)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">
                          {(() => {
                            const CategoryIcon = getCategoryIcon(selectedWorker.category);
                            return <CategoryIcon className="w-3 h-3 mr-1" />;
                          })()}
                          {getCategoryName(selectedWorker.category)}
                        </Badge>
                        {selectedWorker.distance !== undefined && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                            <Navigation className="w-3 h-3 mr-1" />
                            {formatDistance(selectedWorker.distance)} de voce
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="font-medium text-foreground mb-2">Sobre</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {selectedWorker.description}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-1">Localizacao</h3>
                            <p className="text-sm text-muted-foreground">
                              {selectedWorker.neighborhood}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedWorker.city}, {selectedWorker.state}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground mb-1">Contato</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {selectedWorker.phone}
                            </p>
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                          <h3 className="font-medium text-green-700 mb-1 flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Faixa de Preco
                          </h3>
                          <p className="text-green-600 font-semibold">
                            {selectedWorker.priceRange}
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-primary text-primary-foreground"
                        onClick={() => openWorkerChat(selectedWorker)}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Solicitar Orcamento
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-8 text-center">
                    <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">Selecione um profissional</h3>
                    <p className="text-sm text-muted-foreground">
                      Clique em um profissional da lista para ver os detalhes e solicitar orcamento.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Chat Dialog */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="sm:max-w-[500px] h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              Chat com {isWorker ? selectedService?.clientName : selectedWorker?.name}
            </DialogTitle>
            <DialogDescription>
              {isWorker ? selectedService?.title : `${selectedWorker?.category ? getCategoryName(selectedWorker.category) : ""}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          {/* Budget Quick Input */}
          <div className="border-t pt-4">
            {isWorker && (
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                  <Input
                    type="number"
                    placeholder="Valor do orcamento"
                    value={budgetValue}
                    onChange={(e) => setBudgetValue(e.target.value)}
                    className="pl-10"
                    onKeyDown={(e) => e.key === "Enter" && sendBudgetMessage()}
                  />
                </div>
                <Button onClick={sendBudgetMessage} disabled={chatLoading || (!budgetValue && !chatInput)}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder={isWorker ? "Ou digite uma mensagem..." : "Digite sua mensagem..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendBudgetMessage()}
              />
              <Button variant="outline" onClick={sendBudgetMessage} disabled={chatLoading || (!budgetValue && !chatInput)}>
                Enviar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Nova Solicitacao */}
      <Dialog open={showNewServiceDialog} onOpenChange={setShowNewServiceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Solicitar Novo Servico</DialogTitle>
            <DialogDescription>
              Descreva o servico que voce precisa e os profissionais da regiao serao notificados.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Titulo</label>
              <Input
                placeholder="Ex: Troca de chuveiro eletrico"
                value={newServiceForm.title}
                onChange={(e) => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Categoria</label>
              <Select
                value={newServiceForm.category}
                onValueChange={(value) => setNewServiceForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Descricao</label>
              <Textarea
                placeholder="Descreva o servico com o maximo de detalhes possivel..."
                value={newServiceForm.description}
                onChange={(e) => setNewServiceForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Endereco</label>
                <Input
                  placeholder="Rua, numero"
                  value={newServiceForm.address}
                  onChange={(e) => setNewServiceForm(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Bairro</label>
                <Input
                  placeholder="Seu bairro"
                  value={newServiceForm.neighborhood}
                  onChange={(e) => setNewServiceForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Urgencia</label>
                <Select
                  value={newServiceForm.urgency}
                  onValueChange={(value) => setNewServiceForm(prev => ({ ...prev, urgency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baixa">Sem pressa</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="alta">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Orcamento (opcional)</label>
                <Input
                  placeholder="Ex: R$ 200 - R$ 300"
                  value={newServiceForm.budget}
                  onChange={(e) => setNewServiceForm(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewServiceDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleNewServiceSubmit}>
              Publicar Solicitacao
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
