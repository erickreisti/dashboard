"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getOrders(filters?: {
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}) {
  const where: any = {};

  if (filters?.status && filters.status !== "all") {
    where.status = filters.status;
  }

  if (filters?.search) {
    where.OR = [
      { customer: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
      { id: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {};
    if (filters.startDate) {
      where.createdAt.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      where.createdAt.lte = new Date(filters.endDate);
    }
  }

  return await prisma.order.findMany({
    where,
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderById(id: string) {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });
}

export async function updateOrderStatus(id: string, status: string) {
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/orders");
  revalidatePath(`/orders/${id}`);
  return order;
}

export async function getOrderStats() {
  const [
    totalOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue,
    averageOrderValue,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.order.count({ where: { status: "completed" } }),
    prisma.order.count({ where: { status: "cancelled" } }),
    prisma.order.aggregate({
      where: { status: "completed" },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: { status: "completed" },
      _avg: { total: true },
    }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    averageOrderValue: averageOrderValue._avg.total || 0,
  };
}

export async function deleteOrder(id: string) {
  // Primeiro deleta os itens do pedido
  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  // Depois deleta o pedido
  const order = await prisma.order.delete({
    where: { id },
  });

  revalidatePath("/orders");
  return order;
}
