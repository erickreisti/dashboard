import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ProductList } from "./components/ProductList";
import { ProductFilters } from "./components/ProductFilters";
import { ProductStats } from "./components/ProductStats";
import {
  getProducts,
  getProductStats,
  getProductCategories,
} from "@/lib/actions/products";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;

  const [products, stats, categories] = await Promise.all([
    getProducts({
      search: resolvedSearchParams.search,
      minPrice: resolvedSearchParams.minPrice
        ? Number(resolvedSearchParams.minPrice)
        : undefined,
      maxPrice: resolvedSearchParams.maxPrice
        ? Number(resolvedSearchParams.maxPrice)
        : undefined,
      inStock: resolvedSearchParams.inStock === "true" ? true : undefined,
    }),
    getProductStats(),
    getProductCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestão de Produtos
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie seu catálogo de produtos
              </p>
            </div>
            <Link
              href="/products/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Produto</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <ProductStats stats={stats} />

      {/* Filtros */}
      <ProductFilters
        categories={categories as string[]}
        searchParams={resolvedSearchParams}
      />

      {/* Lista de Produtos */}
      <ProductList products={products} />
    </div>
  );
}
