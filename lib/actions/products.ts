"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export async function getProducts(filters?: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}) {
  const where: any = {};

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
    if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
  }

  if (filters?.inStock !== undefined) {
    if (filters.inStock) {
      where.stock = { gt: 0 };
    } else {
      where.stock = { equals: 0 };
    }
  }

  return await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: ProductFormData) {
  const product = await prisma.product.create({
    data,
  });

  revalidatePath("/products");
  return product;
}

export async function updateProduct(id: string, data: ProductFormData) {
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/products");
  revalidatePath(`/products/${id}`);
  return product;
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/products");
  return product;
}

export async function getProductCategories() {
  return [];
}

export async function getProductStats() {
  const [totalProducts, outOfStock, lowStock, totalValue] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { stock: 0 } }),
    prisma.product.count({ where: { stock: { lt: 10, gt: 0 } } }),
    prisma.product.aggregate({
      _sum: { price: true },
    }),
  ]);

  return {
    totalProducts,
    outOfStock,
    lowStock,
    totalValue: totalValue._sum?.price || 0,
  };
}
