"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2, Package, MoreHorizontal, Eye } from "lucide-react";
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
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
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
      return { text: "Sem estoque", variant: "destructive" as const };
    if (stock < 10)
      return { text: "Estoque baixo", variant: "secondary" as const };
    return { text: "Em estoque", variant: "default" as const };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Lista de Produtos
          </CardTitle>
          <p className="text-sm text-gray-600">
            {products.length} produto{products.length !== 1 ? "s" : ""}{" "}
            encontrado
            {products.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estoque</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
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
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
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
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {product.description || "Sem descrição"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-semibold text-gray-900">
                          {formatCurrency(product.price)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-gray-900">
                          {product.stock} un
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.text}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-sm text-gray-600">
                          {formatDate(product.createdAt)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
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
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum produto encontrado
                </p>
                <p className="text-gray-400 mt-1">
                  Os produtos aparecerão aqui quando forem criados.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
