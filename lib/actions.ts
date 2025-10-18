// lib/actions.ts
import prisma from "@/lib/prisma";

export async function getMetrics() {
  const [totalSales, totalOrders, totalProducts, pendingOrders] =
    await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: "completed" },
      }),
      prisma.order.count(),
      prisma.product.count(),
      prisma.order.count({
        where: { status: "pending" },
      }),
    ]);

  return {
    totalSales: totalSales._sum.total || 0,
    totalOrders,
    totalProducts,
    pendingOrders,
  };
}

export async function getRecentOrders() {
  return await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getSalesByMonth() {
  const salesData = await prisma.order.groupBy({
    by: ["createdAt"],
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Desde o início do ano
        lte: new Date(),
      },
      status: "completed",
    },
    _sum: {
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Agrupar por mês
  const monthlySales = salesData.reduce((acc: any[], sale) => {
    const month = sale.createdAt.toLocaleString("pt-BR", { month: "short" });
    const existing = acc.find((item) => item.name === month);

    if (existing) {
      existing.total += sale._sum.total || 0;
    } else {
      acc.push({
        name: month,
        total: sale._sum.total || 0,
      });
    }

    return acc;
  }, []);

  return monthlySales;
}

export async function getLowStockProducts() {
  return await prisma.product.findMany({
    where: {
      stock: {
        lt: 10, // Produtos com menos de 10 unidades
      },
    },
    orderBy: {
      stock: "asc",
    },
    take: 5,
  });
}
