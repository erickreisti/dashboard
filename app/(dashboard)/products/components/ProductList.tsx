"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Trash2,
  Package,
  MoreHorizontal,
  Eye,
  BarChart3,
  Tag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  category?: string | null;
  sku?: string | null;
  isActive?: boolean;
  featured?: boolean;
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        text: "Sem Estoque",
        variant: "destructive" as const,
        color: "bg-red-500",
      };
    if (stock < 5)
      return {
        text: "Crítico",
        variant: "destructive" as const,
        color: "bg-orange-500",
      };
    if (stock < 10)
      return {
        text: "Baixo",
        variant: "secondary" as const,
        color: "bg-yellow-500",
      };
    return {
      text: "Disponível",
      variant: "default" as const,
      color: "bg-green-500",
    };
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAllProducts = () => {
    setSelectedProducts(
      selectedProducts.length === products.length
        ? []
        : products.map((p) => p.id)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
                  {products.length} produto{products.length !== 1 ? "s" : ""} no
                  catálogo
                </p>
              </div>
            </div>

            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {selectedProducts.length} selecionado
                  {selectedProducts.length !== 1 ? "s" : ""}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedProducts.length === products.length &&
                        products.length > 0
                      }
                      onCheckedChange={toggleAllProducts}
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Produto
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    SKU
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    Preço
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-center">
                    Estoque
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Categoria
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => {
                  const stockStatus = getStockStatus(product.stock);

                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-b border-gray-100 hover:bg-gray-50/70 transition-colors ${
                        selectedProducts.includes(product.id)
                          ? "bg-blue-50/50"
                          : ""
                      }`}
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() =>
                            toggleProductSelection(product.id)
                          }
                        />
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                              {product.description || "Sem descrição"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {product.sku || "N/A"}
                        </code>
                      </TableCell>

                      <TableCell className="py-4 text-right">
                        <span className="font-bold text-gray-900">
                          {formatCurrency(product.price)}
                        </span>
                      </TableCell>

                      <TableCell className="py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <span
                            className={`w-2 h-2 rounded-full ${stockStatus.color}`}
                          ></span>
                          <span className="font-semibold text-gray-900">
                            {product.stock}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <Badge
                          variant={stockStatus.variant}
                          className="font-medium"
                        >
                          {stockStatus.text}
                        </Badge>
                      </TableCell>

                      <TableCell className="py-4">
                        {product.category ? (
                          <Badge
                            variant="outline"
                            className="text-gray-600 border-gray-300"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {product.category}
                          </Badge>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>

                      <TableCell className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar Detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar Produto
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Ver Estatísticas
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir Produto
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>

            {products.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-300 mb-4">
                  <Package className="h-16 w-16 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">
                  Nenhum produto encontrado
                </p>
                <p className="text-gray-400 max-w-md mx-auto">
                  Comece adicionando produtos ao seu catálogo para gerenciar seu
                  inventário.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
