import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { OrdersTable } from "./components/OrdersTable";
import { OrderStats } from "./components/OrderStats";
import { OrderFilters } from "./components/OrderFilters";
import { getOrders, getOrderStats } from "@/lib/actions/orders";
import { Plus } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Pedidos
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie e acompanhe todos os pedidos da loja
              </p>
            </div>
            <Link
              href="/orders/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Pedido</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <OrderStats stats={stats} />

      {/* Filtros */}
      <OrderFilters searchParams={resolvedSearchParams} />

      {/* Tabela de Pedidos */}
      <OrdersTable orders={orders} />
    </div>
  );
}
