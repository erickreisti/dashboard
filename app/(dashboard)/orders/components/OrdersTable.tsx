"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
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
} from "../../../components/ui/dropdown-menu";
import { Badge } from "../../../components/ui/badge";

interface Order {
  id: string;
  customer: string;
  email: string;
  status: string;
  total: number;
  createdAt: Date;
  items?: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
    };
  }>;
}

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        text: "Pendente",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600 bg-yellow-100",
      },
      processing: {
        text: "Processando",
        variant: "secondary" as const,
        icon: Package,
        color: "text-blue-600 bg-blue-100",
      },
      shipped: {
        text: "Enviado",
        variant: "default" as const,
        icon: Truck,
        color: "text-purple-600 bg-purple-100",
      },
      completed: {
        text: "Concluído",
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600 bg-green-100",
      },
      cancelled: {
        text: "Cancelado",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600 bg-red-100",
      },
    };

    return configs[status as keyof typeof configs] || configs.pending;
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
            Lista de Pedidos
          </CardTitle>
          <p className="text-sm text-gray-600">
            {orders.length} pedido{orders.length !== 1 ? "s" : ""} encontrado
            {orders.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Itens</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            #{order.id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.customer}
                          </p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {order.items?.length || 0} item
                            {order.items?.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant={statusConfig.variant}
                          className="flex items-center space-x-1 w-fit"
                        >
                          <StatusIcon className="h-3 w-3" />
                          <span>{statusConfig.text}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
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
                              <Truck className="h-4 w-4 mr-2" />
                              Atualizar Status
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancelar Pedido
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>

            {orders.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Nenhum pedido encontrado
                </p>
                <p className="text-gray-400 mt-1">
                  Os pedidos aparecerão aqui quando forem criados.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
