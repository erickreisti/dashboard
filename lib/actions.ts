// Importa o cliente Prisma para fazer consultas no banco
import prisma from "@/lib/prisma";

// Função que busca as métricas principais do dashboard
export async function getMetrics() {
  // Soma todos os campos `total` da tabela `Order` para obter o valor total de vendas
  const totalSales = await prisma.order.aggregate({
    _sum: { total: true }, // Especifica que queremos somar o campo `total`
  });

  // Conta quantos registros existem na tabela `Order`
  const totalOrders = await prisma.order.count();

  // Conta quantos produtos existem na tabela `Product`
  const totalProducts = await prisma.product.count();

  // Retorna os valores calculados
  return {
    // Retorna o total de vendas, ou 0 se não houver nenhum pedido
    totalSales: totalSales._sum.total || 0,
    totalOrders, // Número total de pedidos
    totalProducts, // Número total de produtos
  };
}

// Função que busca os 5 pedidos mais recentes
export async function getRecentOrders() {
  return await prisma.order.findMany({
    take: 5, // Limita o número de resultados a 5
    orderBy: { createdAt: "desc" }, // Ordena por data de criação, do mais recente para o mais antigo
  });
}

// Função que retorna dados fixos para o gráfico de vendas por mês
// (Poderia ser substituída por uma query real no futuro)
export async function getSalesByMonth() {
  return [
    // Retorna um array de objetos com nome do mês e valor total
    { name: "Jan", total: 4000 },
    { name: "Fev", total: 3000 },
    { name: "Mar", total: 7000 },
    { name: "Abr", total: 5000 },
    { name: "Mai", total: 8000 },
    { name: "Jun", total: 6000 },
  ];
}
