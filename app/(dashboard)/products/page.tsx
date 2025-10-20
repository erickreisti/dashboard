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
import { Package, TrendingUp, BarChart3, Plus } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
              Gestão de Inventário
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo de Produtos
          </h1>
          <p className="text-gray-600 mt-2">
            Controle completo do seu inventário e estoque
          </p>
        </div>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-green-900">
              {products.length} produto{products.length !== 1 ? "s" : ""} ativo
              {products.length !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* KPI Grid - Usando ProductStats */}
      <ProductStats stats={stats} />

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product List */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Inventário de Produtos
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Lista completa do catálogo ativo
                    </p>
                  </div>
                </div>
                <Link
                  href="/products/new"
                  className="text-sm text-green-600 hover:text-green-700 font-medium bg-green-50 hover:bg-green-100 px-3 py-1 rounded-full transition-colors flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Novo Produto</span>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ProductList products={products} />
            </CardContent>
          </Card>
        </div>

        {/* Filters and Quick Stats */}
        <div className="space-y-6">
          <ProductFilters
            categories={categories as string[]}
            searchParams={resolvedSearchParams}
          />

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Estatísticas Rápidas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Categorias Ativas
                    </p>
                    <p className="text-xs text-gray-500">Diversificação</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {categories.length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Produtos em Destaque
                    </p>
                    <p className="text-xs text-gray-500">
                      Marcados como featured
                    </p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">12</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Valor Médio
                    </p>
                    <p className="text-xs text-gray-500">Por produto</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  R${" "}
                  {(stats.totalValue / stats.totalProducts).toLocaleString(
                    "pt-BR",
                    { minimumFractionDigits: 2 }
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
