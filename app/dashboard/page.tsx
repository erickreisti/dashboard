// Importa o componente que exibe métricas em forma de card
import { MetricCard } from "./components/MetricCard";
// Importa o componente que exibe a tabela de pedidos recentes
import { OrdersTable } from "./components/OrdersTable";
// Importa o componente que exibe o gráfico de vendas
import { SalesChart } from "./components/SalesChart";
// Importa as funções que buscam dados do banco (Server Actions)
import { getMetrics, getRecentOrders, getSalesByMonth } from "@/lib/actions";

// Define a página como assíncrona, pois ela faz chamadas ao banco de dados
export default async function DashboardPage() {
  // Busca as métricas totais do banco (vendas, pedidos, produtos)
  // `await` é necessário porque `getMetrics` é uma função assíncrona
  const { totalSales, totalOrders, totalProducts } = await getMetrics();
  // Busca os pedidos recentes do banco
  const orders = await getRecentOrders();
  // Busca os dados de vendas por mês
  const salesData = await getSalesByMonth();

  return (
    // Container principal com padding de 6 unidades
    <div className="p-6">
      {/* Título da página */}
      <h1 className="text-2xl font-bold">Dashboard de Vendas</h1>
      {/* Cria um grid responsivo: 1 coluna em telas pequenas, 3 em médias e maiores */}
      {/* Gap de 4 unidades entre os cards e margem-top de 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Exibe o card de vendas totais, formatando o valor com 2 casas decimais */}
        <MetricCard
          title="Vendas Totais"
          value={`R$ ${totalSales.toFixed(2)}`}
        />
        {/* Exibe o card com o número total de pedidos */}
        <MetricCard title="Pedidos" value={totalOrders.toString()} />
        {/* Exibe o card com o número total de produtos */}
        <MetricCard title="Produtos" value={totalProducts.toString()} />
      </div>

      <div className="mt-6">
        {/* Exibe o gráfico de vendas passando os dados */}
        <SalesChart data={salesData} />
      </div>

      <div className="mt-6">
        {/* Exibe a tabela de pedidos recentes passando os dados */}
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
