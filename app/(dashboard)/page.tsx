import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  ArrowRight,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  const features = [
    {
      icon: BarChart3,
      title: "Analytics em Tempo Real",
      description: "Acompanhe métricas importantes do seu negócio",
    },
    {
      icon: Shield,
      title: "Gestão Segura",
      description: "Controle total com máxima segurança",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Interface rápida e responsiva",
    },
    {
      icon: Globe,
      title: "Multi-plataforma",
      description: "Acesse de qualquer dispositivo",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-white/90">
                Sistema de Gestão Corporativa
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Painel
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Executivo
              </span>
            </h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Gerencie seu negócio com ferramentas profissionais de análise e
              controle. Tudo em um só lugar, com precisão e elegância.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Main Card */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Acesso ao Sistema
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Escolha o módulo que deseja acessar para começar a gerenciar
                  seu negócio
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Dashboard</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Visão geral do negócio
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Produtos</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Gestão de catálogo
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Pedidos</h3>
                  <p className="text-white/60 text-sm mb-4">
                    Controle de vendas
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl"
                >
                  <Link href="/dashboard">
                    Acessar Dashboard Executivo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
