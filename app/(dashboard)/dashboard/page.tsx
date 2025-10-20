import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { MetricCard } from "./components/MetricCard";
import { OrdersTable } from "./components/OrdersTable";
import { SalesChart } from "./components/SalesChart";
import { LowStockAlert } from "./components/LowStockAlert";
import {
  getMetrics,
  getRecentOrders,
  getSalesByMonth,
  getLowStockProducts,
} from "@/lib/actions/actions";
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertCircle,
  TrendingUp,
  Users,
  CreditCard,
  BarChart3,
} from "lucide-react";

export default async function DashboardPage() {
  const [metrics, orders, salesData, lowStockProducts] = await Promise.all([
    getMetrics(),
    getRecentOrders(),
    getSalesByMonth(),
    getLowStockProducts(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
              Dashboard Executivo
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Visão Geral do Negócio
          </h1>
          <p className="text-gray-600 mt-2">
            Análise em tempo real do desempenho da empresa
          </p>
        </div>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-blue-900">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Receita Total"
          value={`R$ ${metrics.totalSales.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          description="+12.5% em relação ao mês anterior"
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
          gradient="from-green-500 to-emerald-600"
        />

        <MetricCard
          title="Total de Pedidos"
          value={metrics.totalOrders.toString()}
          description="+8.2% em relação ao mês anterior"
          icon={<ShoppingCart className="h-5 w-5" />}
          trend="up"
          gradient="from-blue-500 to-cyan-600"
        />

        <MetricCard
          title="Produtos Ativos"
          value={metrics.totalProducts.toString()}
          description="+5 novos produtos este mês"
          icon={<Package className="h-5 w-5" />}
          trend="up"
          gradient="from-purple-500 to-violet-600"
        />

        <MetricCard
          title="Pedidos Pendentes"
          value={metrics.pendingOrders.toString()}
          description="Requerem atenção imediata"
          icon={<AlertCircle className="h-5 w-5" />}
          trend="down"
          gradient="from-orange-500 to-red-600"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Performance de Vendas
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Tendência mensal de receita
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <SalesChart data={salesData} />
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Quick Stats */}
        <div className="space-y-6">
          <LowStockAlert products={lowStockProducts} />

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Métricas de Negócio
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Clientes Ativos
                    </p>
                    <p className="text-xs text-gray-500">Últimos 30 dias</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">247</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <CreditCard className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Taxa de Conversão
                    </p>
                    <p className="text-xs text-gray-500">
                      Visitantes para clientes
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">4.7%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Ticket Médio
                    </p>
                    <p className="text-xs text-gray-500">Valor por transação</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  R$ 289,50
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Orders */}
      <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Transações Recentes
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Últimos pedidos processados
                </p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors">
              Ver todos ↗
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <OrdersTable orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
}
