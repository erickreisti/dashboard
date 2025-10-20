import { MetricCard } from "@/app/(dashboard)/dashboard/components/MetricCard";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface OrderStatsProps {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  };
}

export function OrderStats({ stats }: OrderStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
      <MetricCard
        title="Total Pedidos"
        value={stats.totalOrders.toString()}
        description="Todos os pedidos"
        icon={<ShoppingBag className="h-5 w-5" />}
        trend="up"
      />
      <MetricCard
        title="Pendentes"
        value={stats.pendingOrders.toString()}
        description="Aguardando processamento"
        icon={<Clock className="h-5 w-5" />}
        trend="neutral"
      />
      <MetricCard
        title="Concluídos"
        value={stats.completedOrders.toString()}
        description="Entregues com sucesso"
        icon={<CheckCircle className="h-5 w-5" />}
        trend="up"
      />
      <MetricCard
        title="Cancelados"
        value={stats.cancelledOrders.toString()}
        description="Pedidos cancelados"
        icon={<XCircle className="h-5 w-5" />}
        trend="down"
      />
      <MetricCard
        title="Receita Total"
        value={`R$ ${stats.totalRevenue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`}
        description="Valor total vendido"
        icon={<DollarSign className="h-5 w-5" />}
        trend="up"
      />
      <MetricCard
        title="Ticket Médio"
        value={`R$ ${stats.averageOrderValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`}
        description="Valor médio por pedido"
        icon={<TrendingUp className="h-5 w-5" />}
        trend="up"
      />
    </div>
  );
}
