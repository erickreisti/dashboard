import { MetricCard } from "./components/MetricCard";
import { OrdersTable } from "./components/OrdersTable";
import { SalesChart } from "./components/SalesChart";
import { LowStockAlert } from "./components/LowStockAlert";
import {
  getMetrics,
  getRecentOrders,
  getSalesByMonth,
  getLowStockProducts,
} from "@/lib/actions";
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertCircle,
  TrendingUp,
  Users,
  CreditCard,
} from "lucide-react";

export default async function DashboardPage() {
  const [metrics, orders, salesData, lowStockProducts] = await Promise.all([
    getMetrics(),
    getRecentOrders(),
    getSalesByMonth(),
    getLowStockProducts(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header do Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo ao seu painel administrativo
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/60 shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Vendas Totais */}
        <MetricCard
          title="Vendas Totais"
          value={`R$ ${metrics.totalSales.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          description="+12% em relação ao mês anterior"
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
        />

        {/* Total de Pedidos */}
        <MetricCard
          title="Total de Pedidos"
          value={metrics.totalOrders.toString()}
          description="+5% em relação ao mês anterior"
          icon={<ShoppingCart className="h-5 w-5" />}
          trend="up"
        />

        {/* Produtos Cadastrados */}
        <MetricCard
          title="Produtos Cadastrados"
          value={metrics.totalProducts.toString()}
          description="+2 novos produtos"
          icon={<Package className="h-5 w-5" />}
          trend="up"
        />

        {/* Pedidos Pendentes */}
        <MetricCard
          title="Pedidos Pendentes"
          value={metrics.pendingOrders.toString()}
          description="Necessitam atenção"
          icon={<AlertCircle className="h-5 w-5" />}
          trend="down"
        />
      </div>

      {/* Segunda Linha de Gráficos e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Vendas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Desempenho de Vendas
                  </h2>
                  <p className="text-sm text-gray-600">
                    Vendas mensais do último semestre
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <SalesChart data={salesData} />
            </div>
          </div>
        </div>

        {/* Alertas e Estatísticas Rápidas */}
        <div className="space-y-6">
          {/* Alertas de Estoque */}
          <LowStockAlert products={lowStockProducts} />

          {/* Estatísticas Rápidas */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumo Rápido
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Clientes Ativos
                    </p>
                    <p className="text-xs text-gray-500">Este mês</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">24</span>
              </div>

              <div className="flex items-center justify-between">
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
                <span className="text-lg font-bold text-gray-900">3.2%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <ShoppingCart className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Ticket Médio
                    </p>
                    <p className="text-xs text-gray-500">Por pedido</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  R$ 245,80
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Pedidos Recentes */}
      <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Pedidos Recentes
              </h2>
              <p className="text-sm text-gray-600">
                Últimos pedidos realizados
              </p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos →
            </button>
          </div>
        </div>
        <div className="p-6">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
