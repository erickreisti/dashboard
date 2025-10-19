import { MetricCard } from "@/app/(dashboard)/dashboard/components/MetricCard";
import { Package, AlertTriangle, DollarSign, Archive } from "lucide-react";

interface ProductStatsProps {
  stats: {
    totalProducts: number;
    outOfStock: number;
    lowStock: number;
    totalValue: number;
  };
}

export function ProductStats({ stats }: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <MetricCard
        title="Total de Produtos"
        value={stats.totalProducts.toString()}
        description="No catálogo ativo"
        icon={<Package className="h-5 w-5" />}
        trend="up"
      />
      <MetricCard
        title="Fora de Estoque"
        value={stats.outOfStock.toString()}
        description="Necessitam reposição"
        icon={<Archive className="h-5 w-5" />}
        trend="down"
      />
      <MetricCard
        title="Estoque Baixo"
        value={stats.lowStock.toString()}
        description="Atenção necessária"
        icon={<AlertTriangle className="h-5 w-5" />}
        trend="down"
      />
      <MetricCard
        title="Valor Total"
        value={`R$ ${stats.totalValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
        })}`}
        description="Em inventário"
        icon={<DollarSign className="h-5 w-5" />}
        trend="up"
      />
    </div>
  );
}
