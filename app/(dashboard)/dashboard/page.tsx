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
import { DollarSign, ShoppingCart, Package, AlertCircle } from "lucide-react";

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard de Vendas
          </h1>
          <p className="text-gray-600 mt-2">Visão geral do seu e-commerce</p>
        </div>
        <div className="text-sm text-gray-500 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-lg">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Vendas Totais"
          value={`R$ ${metrics.totalSales.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Total de Pedidos"
          value={metrics.totalOrders.toString()}
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <MetricCard
          title="Produtos Cadastrados"
          value={metrics.totalProducts.toString()}
          icon={<Package className="h-4 w-4" />}
        />
        <MetricCard
          title="Pedidos Pendentes"
          value={metrics.pendingOrders.toString()}
          icon={<AlertCircle className="h-4 w-4" />}
        />
      </div>

      {/* Gráfico e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div className="space-y-6">
          <LowStockAlert products={lowStockProducts} />
        </div>
      </div>

      {/* Tabela de Pedidos */}
      <div>
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
