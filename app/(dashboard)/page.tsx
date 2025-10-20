import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Link from "next/link";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-4">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Painel Administrativo
          </h1>
          <p className="text-gray-600 mb-6">
            Gerencie seus produtos, pedidos e métricas de vendas em um só lugar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold">Produtos</h3>
                <p className="text-sm text-gray-600">Gerencie catálogo</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <ShoppingBag className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold">Pedidos</h3>
                <p className="text-sm text-gray-600">Acompanhe vendas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold">Clientes</h3>
                <p className="text-sm text-gray-600">Visualize dados</p>
              </CardContent>
            </Card>
          </div>
          <Button asChild>
            <Link href="/dashboard">
              Acessar Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
