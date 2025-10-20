import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { OrdersTable } from "./components/OrdersTable";
import { OrderStats } from "./components/OrderStats";
import { OrderFilters } from "./components/OrderFilters";
import { getOrders, getOrderStats } from "@/lib/actions/orders";
import { ShoppingBag, TrendingUp, BarChart3, Plus } from "lucide-react";
import Link from "next/link";

interface OrdersPageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const resolvedSearchParams = await searchParams;

  const [orders, stats] = await Promise.all([
    getOrders({
      status: resolvedSearchParams.status,
      search: resolvedSearchParams.search,
      startDate: resolvedSearchParams.startDate,
      endDate: resolvedSearchParams.endDate,
    }),
    getOrderStats(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
              Gestão de Vendas
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Controle de Pedidos
          </h1>
          <p className="text-gray-600 mt-2">
            Acompanhamento completo do ciclo de vendas
          </p>
        </div>
        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-purple-900">
              {orders.length} pedido{orders.length !== 1 ? "s" : ""} encontrado
              {orders.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KPI Grid - Usando OrderStats */}
      <OrderStats stats={stats} />

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Histórico de Pedidos
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Todos os pedidos do sistema
                    </p>
                  </div>
                </div>
                <Link
                  href="/orders/new"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-full transition-colors flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Novo Pedido</span>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <OrdersTable orders={orders} />
            </CardContent>
          </Card>
        </div>

        {/* Filters and Quick Stats */}
        <div className="space-y-6">
          <OrderFilters searchParams={resolvedSearchParams} />

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Métricas de Vendas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Ticket Médio
                    </p>
                    <p className="text-xs text-gray-500">Valor por pedido</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  R${" "}
                  {stats.averageOrderValue.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Taxa de Conclusão
                    </p>
                    <p className="text-xs text-gray-500">Pedidos entregues</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {((stats.completedOrders / stats.totalOrders) * 100).toFixed(
                    1
                  )}
                  %
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Taxa de Cancelamento
                    </p>
                    <p className="text-xs text-gray-500">Pedidos estornados</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {((stats.cancelledOrders / stats.totalOrders) * 100).toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
